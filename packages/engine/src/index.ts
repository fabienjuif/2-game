import { createStore } from 'redux'
import reducer from './reducer'
import { generate, selectAsset, dropAsset, next } from './actions'

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

export default (config: { width: number, height: number, players: number }) => {
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

  return {
    subscribe: store.subscribe,
    getState: store.getState,
    selectAsset: decorate(selectAsset),
    dropAsset: decorate(dropAsset),
    next: decorate(next),
  }
}
