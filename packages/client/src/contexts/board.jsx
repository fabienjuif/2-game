import React, { createContext, useState, useLayoutEffect, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import SockJs from 'sockjs-client'
// import gameEngine from '@2-game/engine'

const Context = createContext()

const BoardProvider = ({ children, width, height }) => {
  // const { current: engine } = useRef(gameEngine({ width, height, players: 2 }))
  const refSocket = useRef()
  const [state, setState] = useState({
    players: [],
    tiles: [],
  })
  const [currentPlayer, setCurrentPlayer] = useState()
  const [balances, setBalances] = useState({ player1: 0, player2: 0 })

  // useLayoutEffect(() => {
  //   engine.subscribe(() => {
  //     if (state === engine.getState()) return
  //     setState(engine.getState())
  //   })
  // }, [])

  useEffect(
    () => {
      const setConnection = () => {
        refSocket.current = new SockJs('/ws')

        refSocket.current.onopen = function () {
          // console.log('open');
          // socket.send('test');
        }

        refSocket.current.onmessage = (e) => {
          const { type, payload } = JSON.parse(e.data)

          if (type === 'SYNC') return setState(payload)
          if (type === 'SET_PLAYER') return setCurrentPlayer(payload)
        }

        refSocket.current.onclose = () => {
          setConnection()
        }
      }

      setConnection()
    },
    [],
  )

  useLayoutEffect(
    () => {
      const balances = state.players.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
      state.tiles.forEach(line => line.forEach((tile) => {
        if (!tile.player) return
        if (tile.empty) return

        balances[tile.player] += tile.gold
      }))

      setBalances(balances)
    },
    [state]
  )

  return (
    <Context.Provider
      value={{
        ...state,
        balances,
        currentPlayer,
        setNewAsset: (payload) => {
          if (refSocket.current) refSocket.current.send(JSON.stringify({ type: 'SET_NEWASSET', payload }))
          // else engine.selectAsset(payload)
        },
        actionOnTile: (payload) => {
          if (refSocket.current) refSocket.current.send(JSON.stringify({ type: 'ACTION', payload }))
          // else engine.actionOnTile(payload)
        },
        next: (payload) => {
          if (refSocket.current) refSocket.current.send(JSON.stringify({ type: 'NEXT' }))
          // else engine.next()
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Context
export { BoardProvider }
