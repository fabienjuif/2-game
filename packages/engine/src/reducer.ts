import generate from './generate'
import selectAsset from './selectAsset'
import dropAsset from './dropAsset'
import next from './next'
import {
  GenerateAction,
  SelectAssetAction,
  DropAssetAction,
  NextAction
} from './actions'

type Action = GenerateAction | SelectAssetAction | DropAssetAction | NextAction

const initState: State = {
  tiles: [],
  players: [],
  selectedAsset: undefined,
  selectedUnit: undefined,
  turn: 'player1',
}

export default (state = initState, action: Action): State => {
  switch (action.type) {
    case 'GENERATE': return generate(action.payload)
    case 'SELECT_ASSET': return selectAsset(state, action.payload)
    case 'DROP_ASSET': {
      if (!state.selectedAsset) return state
      let newState = selectAsset(state, state.selectedAsset)
      newState = dropAsset(newState, action.payload)
      return selectAsset(newState, state.selectedAsset)
    }
    case 'NEXT': return next(state)
    default: return state
  }
}
