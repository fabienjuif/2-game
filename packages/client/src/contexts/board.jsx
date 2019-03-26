import React, { createContext, useState, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gameEngine from '@2-game/engine'

const Context = createContext()

const BoardProvider = ({ children, width, height }) => {
  const { current: engine } = useRef(gameEngine({ width, height, players: 2 }))
  const [state, setState] = useState(engine.getState())
  const [balances, setBalances] = useState({ player1: 0, player2: 0 })

  useLayoutEffect(() => {
    engine.subscribe(() => {
      if (state === engine.getState()) return
      setState(engine.getState())
    })
  }, [])

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
        setNewAsset: engine.selectAsset,
        actionOnTile: engine.actionOnTile,
        next: engine.next,
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
