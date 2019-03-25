export default (state: State): State => {
  let nextPlayerIndex = state.players.findIndex(({ name }) => name === state.turn) + 1
  if (state.players.length === nextPlayerIndex) nextPlayerIndex = 0

  // remove graves
  // mark all tiles as available
  // mark all tiles as not played
  let tiles: Tile[][] = state.tiles.map(line => line.map(tile => ({
    ...tile,
    available: true,
    played: false,
    unit: tile.unit === 'grave' ? undefined : tile.unit,
  })))

  let balance = 0
  state.tiles.forEach(line => line.forEach((tile) => {
    if (tile.player !== state.turn) return
    balance += tile.gold
  }))
  if (balance < 0) {
    tiles = tiles.map(line => line.map((tile) => {
      if (tile.player !== state.turn) return tile
      if (tile.unit === undefined) return tile
      if (['house', 'tree'].includes(tile.unit)) return tile

      return {
        ...tile,
        gold: 1,
        unit: 'grave' as UnitType,
      }
    }))
  }

  // TODO: plant tree

  return {
    ...state,
    tiles,
    selectedAsset: undefined,
    selectedUnit: undefined,
    turn: state.players[nextPlayerIndex].name,
    players: state.players.map((player) => {
      if (player.name != state.turn) return player
      return {
        ...player,
        gold: player.gold + balance,
      }
    }),
  }
}
