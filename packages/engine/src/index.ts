import { createStore } from 'redux'
import reducer from './reducer'
import { generate, selectAsset, dropAsset, next, selectUnit, moveUnit, concede } from './actions'
import { getUnitCost, getUnitBalance } from './utils'

export { getUnitCost, getUnitBalance }

// TODO: find a way not to declare types twice (here and in types.ts)

type AssetType = 'house' | 'villager' | 'soldier' | 'king'
type UnitType = 'tree' | 'grave' | AssetType

interface Point {
  x: number,
  y: number,
}

interface Tile extends Point {
  available: boolean,
  empty: boolean,
  player: string | undefined,
  unit: UnitType | undefined,
  gold: number,
  played: boolean,
}

interface Player extends Point {
  name: string,
  gold: number,
  concede: boolean,
}

interface State {
  tiles: Tile[][],
  players: Player[],
  selectedAsset: AssetType | undefined,
  selectedUnit: Point | undefined,
  turn: string,
}

interface Board {
  subscribe: Function,
  getState: () => State,
  selectAsset: (assetType: AssetType) => [boolean, State],
  next: () => [boolean, State],
  actionOnTile: (tile: Point) => [boolean, State],
  concede: () => [boolean, State],
}

const getReduxDevToolsEnhancer = () => {
  if (
    typeof process !== 'undefined' // process exists
    && process.env // env exists
    && process.env.NODE_ENV === 'production' // production build -> unactivate
  ) {
    return undefined
  }

  if (typeof window === 'undefined') return undefined

  // eslint-disable-next-line no-underscore-dangle
  if ((<any>window).__REDUX_DEVTOOLS_EXTENSION__) return (<any>window).__REDUX_DEVTOOLS_EXTENSION__({ name: 'engine' })
  return undefined
}

export default (config: { width: number, height: number, players: number }): Board => {
  const store = createStore(
    reducer,
    getReduxDevToolsEnhancer(),
  )
  store.dispatch(generate(config))

  const decorate = (cb: Function) => (...args: any[]): [boolean, State] => {
    const before = store.getState()
    store.dispatch(cb(...args))

    return [
      before !== store.getState(),
      store.getState(),
    ]
  }

  const actionOnTile = (tile: Point): [boolean, State] => {
    if (store.getState().selectedAsset !== undefined) {
      const getPlayerGold = (state: State): number => {
        const { gold } = state.players.find(({ name }) => name === state.turn) as Player
        return gold
      }

      const gold = getPlayerGold(store.getState())
      const res = decorate(dropAsset)(tile)

      // if the selected asset didn't droped (gold didn't move), then we go to the next action
      if (res[0] && gold !== getPlayerGold(res[1])) return res
    }

    if (store.getState().selectedUnit) {
      const { x, y } = store.getState().selectedUnit as Point
      const res = decorate(moveUnit)(tile)

      // if the selected unit didn't move we go to the next action
      if (res[0] && res[1].tiles[y][x].unit === undefined) return res
    }

    return decorate(selectUnit)(tile)
  }

  return {
    subscribe: store.subscribe,
    getState: store.getState,
    selectAsset: decorate(selectAsset),
    next: decorate(next),
    concede: decorate(concede),
    actionOnTile,
  }
}
