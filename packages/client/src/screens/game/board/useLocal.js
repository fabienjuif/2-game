import { useRef, useState, useLayoutEffect } from 'react'
import gameEngine from '@2-game/engine'

const useOnline = (width, height) => {
  const { current: engine } = useRef(gameEngine({ width, height, players: 2 }))
  const [state, setState] = useState(engine.getState())

  useLayoutEffect(() => {
    engine.subscribe(() => {
      if (state === engine.getState()) return
      setState(engine.getState())
    })
  }, [])

  return {
    state,
    setNewAsset: engine.selectAsset,
    actionOnTile: engine.actionOnTile,
    next: engine.next,
  }
}

export default useOnline
