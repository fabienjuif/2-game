import processZones from './processZones'

const setAvailable = (state: State): State => ({
  ...state,
  tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true })))
})

export default (state: State, payload: Point): State => {
  if (state.selectedUnit === undefined) return setAvailable(state)
  if (!state.tiles[payload.y][payload.x].available) return setAvailable({ ...state, selectedUnit: undefined })

  const newState = {
    ...state,
    tiles: state.tiles.map(line => line.map((tile) => {
      if (
        !state.selectedUnit
        || (
          // target point
          !(tile.x === payload.x && tile.y === payload.y)
          // source
          && !(tile.x === state.selectedUnit.x && tile.y === state.selectedUnit.y)
        )
      ) {
        return {
          ...tile,
          available: true,
        }
      }

      // source
      if (tile.x === state.selectedUnit.x && tile.y === state.selectedUnit.y) {
        return {
          ...tile,
          available: true,
          gold: 1,
          played: true,
          unit: undefined,
        }
      }

      // target
      const {
        unit,
        gold,
        player,
      } = state.tiles[state.selectedUnit.y][state.selectedUnit.x]

      return {
        ...tile,
        played: true,
        available: true,
        unit,
        gold,
        player,
      }
    })),
    selectedUnit: undefined,
  }

  return processZones(newState, payload) // TODO: update test with this
}
