import { getUnitCost, getUnitBalance } from './utils'

const unselect = (state: State): State => ({
  ...state,
  selectedAsset: undefined,
  tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true }))),
})

export default (state: State, payload: Point): State => {
  if (state.selectedAsset === undefined) return unselect(state)

  // const unitCost = getUnitCost(state.selectedAsset as UnitType)
  // const foundPlayer = state.players.find(({ name }) => name === state.turn)
  // if (!foundPlayer || foundPlayer.gold < unitCost) return unselect(state)
  // const currentPlayer = {
  //   ...foundPlayer,
  //   gold: foundPlayer.gold - unitCost,
  // }

  let droped = false
  const tiles = state.tiles.map(line => line.map((tile) => {
    if (
      payload.x !== tile.x
      || payload.y !== tile.y
      || !tile.available
    ) {
      return tile
    }

    droped = true

    return {
      ...tile,
      available: false,
      unit: state.selectedAsset,
      player: state.turn,
      gold: getUnitBalance(state.selectedAsset as UnitType) + 1,
    }
  }))

  return {
    ...state,
    tiles,
    players: state.players.map((player) => {
      if (!droped) return player
      if (player.name !== state.turn) return player
      return {
        ...player,
        gold: player.gold - getUnitCost(state.selectedAsset as UnitType),
      }
    })
  }
}
