import { getUnitCost, getUnitBalance } from './utils'
import processZones from './processZones'

const unselect = (state: State): State => ({
  ...state,
  selectedAsset: undefined,
  tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true }))),
})

export default (state: State, payload: Point): State => {
  if (state.selectedAsset === undefined) return unselect(state)

  let droped = false
  let shouldProcessZones = false

  let newState = {
    ...state,
    tiles: state.tiles.map(line => line.map((tile) => {
      if (
        tile.x !== payload.x
        || tile.y !== payload.y
        || !tile.available
      ) {
        return tile
      }

      droped = true

      shouldProcessZones = (tile.player !== state.turn)

      return {
        ...tile,
        played: (
          tile.player !== state.turn
          || tile.unit !== undefined
        ),
        available: false,
        unit: state.selectedAsset,
        player: state.turn,
        gold: getUnitBalance(state.selectedAsset as UnitType) + 1,
      }
    }))
  }

  if (shouldProcessZones) newState = processZones(newState, payload)

  return {
    ...newState,
    players: state.players.map((player) => {
      if (!droped) return player
      if (player.name !== state.turn) return player
      return {
        ...player,
        gold: player.gold - getUnitCost(state.selectedAsset as UnitType, state, player),
      }
    })
  }
}
