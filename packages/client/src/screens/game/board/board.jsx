import React, { createContext, useState, useLayoutEffect, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
// import gameEngine from '@2-game/engine'
import useBalances from './useBalances'
import useOnline from './useOnline'

const Context = createContext()

const BoardProvider = ({ children, roomId }) => {
  // const { current: engine } = useRef(gameEngine({ width, height, players: 2 }))
  // const refSocket = useRef()
  // const [state, setState] = useState({
  //   players: [],
  //   tiles: [],
  // })
  // const [currentPlayer, setCurrentPlayer] = useState()

  const { state, currentPlayer, ...callbacks } = useOnline(roomId)
  const balances = useBalances(state)

  // useLayoutEffect(() => {
  //   engine.subscribe(() => {
  //     if (state === engine.getState()) return
  //     setState(engine.getState())
  //   })
  // }, [])


  // useLayoutEffect(
  //   () => {
  //     const balances = state.players.reduce((acc, { name }) => ({ ...acc, [name]: 0 }), {})
  //     state.tiles.forEach(line => line.forEach((tile) => {
  //       if (!tile.player) return
  //       if (tile.empty) return

  //       balances[tile.player] += tile.gold
  //     }))

  //     setBalances(balances)
  //   },
  //   [state]
  // )

  return (
    <Context.Provider
      value={{
        ...state,
        ...callbacks,
        currentPlayer,
        balances,
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
