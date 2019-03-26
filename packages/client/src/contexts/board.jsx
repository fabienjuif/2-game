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

  // const moveUnit = (x, y) => {
  //   if (!selectedUnit) return false
  //   if (!tiles[x][y].available) return false

  //   console.log('moving unit to ', x, y)

  //   setTiles(tiles => tiles.map((line, tx) => line.map((tile, ty) => {
  //     if (tx === x && ty === y) {
  //       return {
  //         ...tile,
  //         unit: selectedUnit.unit,
  //         player: selectedUnit.player,
  //         playable: false,
  //       }
  //     }

  //     if (tx === selectedUnit.x && ty === selectedUnit.y) {
  //       return {
  //         ...tile,
  //         unit: undefined,
  //         playable: false,
  //       }
  //     }

  //     return tile
  //   })))

  //   setSelectedUnit(null)

  //   return true
  // }

  // const selectUnit = (x, y) => {
  //   const tile = tiles[x][y]
  //   if (tile.player !== state.turn) return false
  //   if (!['villager', 'soldier', 'king'].includes(tile.unit)) return false
  //   if (!tile.playable) return false

  //   console.log('selecting unit from', x, y)

  //   setSelectedUnit(tile)
  //   setNewAsset(null) // TODO: in next engine

  //   return true
  // }

  // const action = (x, y) => {
  //   return (
  //     // selectUnit(x, y)
  //     // moveUnit(x, y)
  //     placeNewAsset(x, y)
  //   )
  // }

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
