import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import useBalances from './useBalances'
import useOnline from './useOnline'
import useLocal from './useLocal'

const Context = createContext()

const BoardProvider = ({ children, roomId }) => {
  const { state, currentPlayer, ...callbacks } = (roomId ? useOnline(roomId) : useLocal(12, 12))
  const balances = useBalances(state)

  const height = state.tiles.length
  if (height === 0) return null
  const width = state.tiles[0].length
  if (width === 0) return null

  return (
    <Context.Provider
      value={{
        ...state,
        ...callbacks,
        currentPlayer,
        balances,
      }}
    >
      {children({ width, height })}
    </Context.Provider>
  )
}

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Context
export { BoardProvider }
