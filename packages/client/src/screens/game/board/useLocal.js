import { useState, useEffect } from 'react'
import gameEngine from '@2-game/engine'

const useLocal = (width, height) => {
  const [engine, setEngine] = useState({})
  const [state, setState] = useState({ tiles: [], players: [] })

  useEffect(() => {
    const instance = gameEngine({ width, height, players: 3 })
    setEngine(instance)
    setState(instance.getState())

    instance.subscribe(() => {
      if (state === instance.getState()) return
      setState(instance.getState())
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

export default useLocal
