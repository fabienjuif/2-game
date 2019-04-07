import { getUnitCost } from './utils'
import mapAvailabilities from './availabilities'

export default (state: State, payload: AssetType): State => {
  const reset = () => ({
    ...state,
    tiles: state.tiles.map(line => line.map(tile => ({ ...tile, available: true }))),
      selectedAsset: undefined,
        selectedUnit: undefined,
  })

  // if not enough gold
  // - do not select asset
  // - mark all tiles as available
  const currentPlayer = state.players.find(({ name }) => name === state.turn)
  if (!currentPlayer) return reset()
  const unitCost = getUnitCost(payload, state, currentPlayer)
  if (currentPlayer.gold < unitCost) return reset()

  return mapAvailabilities(
    {
      ...state,
      selectedAsset: payload,
      selectedUnit: undefined,
    },
    payload,
  )
}
