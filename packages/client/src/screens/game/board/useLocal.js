import { useRef, useState, useEffect } from 'react'
import gameEngine from '@2-game/engine'

const useOnline = (width, height) => {
  const { current: engine } = useRef(gameEngine({ width, height, players: 3 }))
  const [state, setState] = useState(engine.getState())

  useEffect(() => {
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
    concede: engine.concede,
  }
}

export default useOnline
