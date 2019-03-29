import { isSamePlayerAround, isOneOfEnemyUnitsAround, isOneOfAlliedUnitsAround } from './utils'

export default (state: State, unitType: UnitType): State => {
  const base = (tile: Tile) => (
    isSamePlayerAround(state.tiles)(tile.x, tile.y, state.turn)
    && (
      tile.player !== state.turn
      || tile.unit === undefined
      || tile.unit === 'tree'
    )
  )

  // house
  // - we remove all tiles that are not owned
  // - we remove trees tiles
  if (unitType === 'house') {
    return {
      ...state,
      tiles: state.tiles.map(line => line.map(tile => ({
        ...tile,
        available: (
          base(tile)
          && tile.player === state.turn
          && tile.unit === undefined
          && isOneOfAlliedUnitsAround(state.tiles)(tile.x, tile.y, state.turn, ['house'])
        ),
      }))),
    }
  }

  // villager
  // - can't be droped on any unit except trees
  // - can't be droped on tile next to soldier or king
  if (unitType === 'villager') {
    return {
      ...state,
      tiles: state.tiles.map(line => line.map(tile => ({
        ...tile,
        available: (
            base(tile)
            && (tile.unit === undefined || tile.unit === 'tree')
          && !isOneOfEnemyUnitsAround(state.tiles)(tile.x, tile.y, state.turn, ['villager', 'soldier', 'king'])
        ),
      }))),
    }
  }

  // soldier
  // - can be droped on any unit <= him (tree, house, villager)
  // - can't be droped on tile next to a king
  if (unitType === 'soldier') {
    return {
      ...state,
      tiles: state.tiles.map(line => line.map(tile => ({
        ...tile,
        available: (
          base(tile)
          && (tile.unit === undefined || !['soldier', 'king'].includes(tile.unit))
          && !isOneOfEnemyUnitsAround(state.tiles)(tile.x, tile.y, state.turn, ['soldier', 'king'])
        ),
      }))),
    }
  }

  if (unitType === 'king') {
    return {
      ...state,
      tiles: state.tiles.map(line => line.map(tile => ({
        ...tile,
        available: base(tile),
      }))),
    }
  }

  throw new Error(`Unknown unit while looking for availabilities: ${unitType}`)
}
