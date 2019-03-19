import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { random } from '@2-game/utils'

const Context = createContext()

const getTiles = (width, height) => {
  const tiles = []

  const player1 = {
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
  }

  const player2 = {
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
  }

  while (player2.x === player1.x) player2.x = random(0, Math.round(width / 20))

  for (let i = 0; i < Math.round(width / 20); i += 1) {
    const line = []
    tiles.push(line)

    for (let j = 0; j < Math.round(height / 15); j += 1) {
      let player = undefined
      if (player1.x === i && player1.y === j) player = 'player1'
      if (player2.x === i && player2.y === j) player = 'player2'

      line.push({
        key: `${i}-${j}`,
        x: i,
        y: j,
        player,
      })
    }
  }

  return tiles
}

const TilesProvider = ({ children, width, height }) => {
  const [tiles, setTiles] = useState(getTiles(width, height))
  const [player, setPlayer] = useState('player1')
  const [pieces, setPieces] = useState(2)

  const next = () => {
    setPlayer(old => old === 'player1' ? 'player2' : 'player1')
    setPieces(2)

    if (player === 'player1') return

    setTiles(curr => curr
      .map((line, x) => line.map((tile, y) => {
        const getPlayer = () => {
          if (tile.player) return tile.player

          const getPlayer = (tx, ty) => tiles[tx] && tiles[tx][ty] && tiles[tx][ty].player && tiles[tx][ty].player

          return (
            getPlayer(x - 1, y)
            || getPlayer(x + 1, y)
            || getPlayer(y % 2 ? x : x - 1, y - 1)
            || getPlayer(y % 2 ? x + 1 : x, y - 1)
            || getPlayer(y % 2 ? x : x - 1, y + 1)
            || getPlayer(y % 2 ? x + 1 : x, y + 1)
            || undefined
          )
        }

        return {
          ...tile,
          player: getPlayer(),
        }
      })))
  }

  const ownTile = (x, y) => {
    if (pieces <= 0) return
    setPieces(old => old - 1)

    setTiles(tiles => tiles.map((line, tx) => line.map((tile, ty) => {
      if (tx === x && ty === y) return { ...tile, player }
      return tile
    })))
  }

  return (
    <Context.Provider
      value={{
        getData: () => tiles,
        getPlayer: () => player,
        next,
        ownTile,
      }}
    >
      {children}
    </Context.Provider>
  )
}

TilesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Context
export { TilesProvider }
