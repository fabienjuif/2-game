import { random } from '@2-game/utils'
import { getEmptyTilesAround } from './utils'

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
  const player = state.players.find(({ name }) => name === state.turn)
  if (player && (player.gold + balance) < 0) {
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

  // plant some tree, with 10% chance
  const tilesWhereToPlantTrees: Tile[] = []
  tiles.forEach(line => line.forEach((tile) => {
    if (tile.unit !== 'tree') return
    if (Math.random() > 0.10) return

    const emptyTiles = getEmptyTilesAround(tiles)(tile.x, tile.y)
    if (emptyTiles.length === 0) return

    const [x, y] = emptyTiles[random(0, emptyTiles.length - 1)]
    tilesWhereToPlantTrees.push(tiles[y][x])
  }))
  tiles = tiles.map(line => line.map((tile) => {
    if (!tilesWhereToPlantTrees.includes(tile)) return tile
    return {
      ...tile,
      unit: 'tree' as UnitType,
    }
  }))

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
