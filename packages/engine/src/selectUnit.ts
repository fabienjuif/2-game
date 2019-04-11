import { getShortestPath } from '@2-game/astar'
import availabilities from './availabilities'

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

  // default availabilities
  const stateWithAvailabilities = availabilities(
    {
      ...state,
      selectedUnit: payload,
      selectedAsset: undefined,
    },
    selectedUnitType as UnitType,
  )

  // override availabilities so a unit can't move further than 4 units

  // TODO: test
  return {
    ...stateWithAvailabilities,
    tiles: stateWithAvailabilities.tiles.map(line => line.map((tile) => {
      if (!tile.available) return tile

      // - a star
      const path = getShortestPath(
        stateWithAvailabilities.tiles,
        { x, y },
        tile,
        ({ x, y }) => (state.turn === stateWithAvailabilities.tiles[y][x].player ? 1 : Infinity)
      )

      return {
        ...tile,
        available: path.length > 0 && path.length < 5,
      }
    }))
  }
}
