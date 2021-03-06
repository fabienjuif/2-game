import { useEffect, useRef, useState, useContext } from 'react'
import ServerContext from '../../../server'

const useOnline = (roomId) => {
  const server = useContext(ServerContext)
  const frame = useRef()
  const [currentPlayer, setCurrentPlayer] = useState()
  const [state, setState] = useState({
    players: [],
    tiles: [],
  })
  const [mousePosition, setMousePosition] = useState({})

  useEffect(
    () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        if (state.turn !== currentPlayer) return

        server.send({ type: 'MOUSE', payload: mousePosition })
      })
    },
    [mousePosition],
  )

  useEffect(
    () => {
      server.register([
        ['SYNC', payload => setState(payload)],
        ['SET_PLAYER', payload => setCurrentPlayer(payload)],
        ['MOUSE', payload => setMousePosition(payload)],
      ])
    },
    [],
  )

  const wrap = type => payload => {
    if (state.turn !== currentPlayer) return

    server.send({ type, payload })
  }

  return {
    state,
    currentPlayer,
    mousePosition,
    setNewAsset: wrap('SET_NEWASSET'),
    actionOnTile: wrap('ACTION'),
    next: wrap('NEXT'),
    concede: wrap('CONCEDE'),
    overTile: (position) => {
      if (state.turn !== currentPlayer) return
      setMousePosition(position)
    },
  }
}

export default useOnline
