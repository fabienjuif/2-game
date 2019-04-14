export interface GenerateActionPayload {
  width: number,
  height: number,
  players: number,
}
export interface GenerateAction extends Action {
  type: 'GENERATE',
  payload: GenerateActionPayload,
}
export const generate = ({ width, height, players = 2 }: GenerateActionPayload): GenerateAction => ({ type: 'GENERATE', payload: { players, width, height } })

export interface SelectAssetAction extends Action {
  type: 'SELECT_ASSET',
  payload: AssetType,
}
export const selectAsset = (assetType: AssetType): SelectAssetAction => ({ type: 'SELECT_ASSET', payload: assetType })

export interface DropAssetAction extends Action {
  type: 'DROP_ASSET',
  payload: Point,
}
export const dropAsset = (tile: Point): DropAssetAction => ({ type: 'DROP_ASSET', payload: tile })

export interface NextAction extends Action {
  type: 'NEXT',
}
export const next = (): NextAction => ({ type: 'NEXT' })


export interface SelectUnitAction extends Action {
  type: 'SELECT_UNIT',
  payload: Point,
}
export const selectUnit = (tile: Point): SelectUnitAction => ({ type: 'SELECT_UNIT', payload: tile })

export interface MoveUnitAction extends Action {
  type: 'MOVE_UNIT',
  payload: Point,
}
export const moveUnit = (tile: Point): MoveUnitAction => ({ type: 'MOVE_UNIT', payload: tile })

export interface ConcedeAction extends Action {
  type: 'CONCEDE',
}
export const concede = (): ConcedeAction => ({ type: 'CONCEDE' })
