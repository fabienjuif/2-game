import { getUnitCost } from './utils'
import mapAvailabilities from './availabilities'

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

  return mapAvailabilities(
    {
      ...state,
      selectedAsset: payload,
      selectedUnit: undefined,
    },
    payload,
  )
}
