import { isSamePlayerAround, isOneOfEnemyUnitsAround, getUnitCost } from './utils'

export default (state: State, payload: AssetType): State => {
  // if not enough gold
  // - do not select asset
  // - mark all tiles as available
  const unitCost = getUnitCost(payload)
  const currentPlayer = state.players.find(({ name }) => name === state.turn)
  if (!currentPlayer || currentPlayer.gold < unitCost) {
    return {
      ...state,
      tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true }))),
      selectedAsset: undefined,
      selectedUnit: undefined,
    }
  }

  // default
  // - all tiles around the players one are available
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

  // house
  // - we remove all tiles that are not owned
  // - we remove trees tiles
  if (payload === 'house') {
    availableTiles.forEach((tile) => {
      if (tile.player !== state.turn || tile.unit === 'tree') {
        tile.available = false
        availableTiles.delete(tile)
      }
    })
  }

  // villager
  // - can't be droped on any unit except trees
  // - can't be droped on tile next to soldier or king
  if (payload === 'villager') {
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
  // - can be droped on any unit <= him (tree, house, villager)
  // - can't be droped on tile next to a king
  if (payload === 'soldier') {
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
    tiles,
    selectedAsset: payload,
    selectedUnit: undefined,
  }
}
