import generate from './generate'
import selectAsset from './selectAsset'
import dropAsset from './dropAsset'
import next from './next'
import selectUnit from './selectUnit'
import moveUnit from './moveUnit'
import concede from './concede'

import {
  GenerateAction,
  SelectAssetAction,
  DropAssetAction,
  NextAction,
  SelectUnitAction,
  MoveUnitAction,
  ConcedeAction,
} from './actions'

type Action = (
  GenerateAction
  | SelectAssetAction
  | DropAssetAction
  | NextAction
  | SelectUnitAction
  | MoveUnitAction
  | ConcedeAction
)

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
      return dropAsset(selectAsset(state, state.selectedAsset), action.payload)
    }
    case 'SELECT_UNIT': return selectUnit(state, action.payload)
    case 'MOVE_UNIT': return moveUnit(state, action.payload)
    case 'NEXT': return next(state)
    case 'CONCEDE': return concede(state)
    default: return state
  }
}
