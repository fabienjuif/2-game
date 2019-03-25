import { isSamePlayerAround, isOneOfEnemyUnitsAround } from './utils'

const markAvailable = (state: State): State => ({
  ...state,
  tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true })))
})

export default (state: State, payload: Point): State => {
  const { x, y } = payload

  // return all tiles as available and do not select a unit
  // - if there is no tile at the given point
  // - if there is no unit at the given point
  // - if there is no playable unit at the given point
  // - if there is no player unit at the given point
  // - if the unit is a tree or a house
  if (
    !state.tiles[y]
    || !state.tiles[y][x]
    || state.tiles[y][x].unit === undefined
    || state.tiles[y][x].played
    || state.tiles[y][x].player !== state.turn
    || ['tree', 'house'].includes(state.tiles[y][x].unit as string)
  ) {
    return markAvailable(state)
  }

  const selectedUnitType = state.tiles[y][x].unit

  // TODO: this code is like selectAsset one, factorize these code blocs and tests
  // default
  // - all tiles around the unit are availables
  // - a self owned tile with a unit in it is unavailable
  const availableTiles: Set<Tile> = new Set()
  const tiles: Tile[][] = state.tiles.map(line => line.map((tile) => {
    const newTile = {
      ...tile,
      available: (
        isSamePlayerAround(state.tiles)(tile.x, tile.y, state.turn)
        && (tile.player !== state.turn || tile.unit === undefined || tile.unit === 'tree')
      ),
    }
    availableTiles.add(newTile)

    return newTile
  }))

  // villager
  // - can't be moved on any unit except trees
  // - can't be moved on tile next to soldier or king
  if (selectedUnitType === 'villager') {
    availableTiles.forEach((tile) => {
      if (
        tile.unit !== undefined
        && tile.unit !== 'tree'
        || isOneOfEnemyUnitsAround(tiles)(tile.x, tile.y, state.turn, ['soldier', 'king'])
      ) {
        tile.available = false
        availableTiles.delete(tile)
      }
    })
  }
  // soldier
  // - can be moved on any unit <= him (tree, house, villager)
  // - can't be moved on tile next to a king
  if (selectedUnitType === 'soldier') {
    availableTiles.forEach((tile) => {
      if (
        tile.unit !== undefined
        && ['soldier', 'king'].includes(tile.unit)
        || isOneOfEnemyUnitsAround(tiles)(tile.x, tile.y, state.turn, ['king'])
      ) {
        tile.available = false
        availableTiles.delete(tile)
      }
    })
  }

  return {
    ...state,
    selectedUnit: payload,
  }
}
