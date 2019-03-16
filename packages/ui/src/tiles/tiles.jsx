import React, { useEffect, useState } from 'react'
import { ParticleContainer } from '@inlet/react-pixi'
import { random } from '@2-game/utils'
import Tile from './tile'

const getTint = (player) => {
  switch (player) {
    case 'player1': return 0xcc2020
    case 'player2': return 0x2020cc
    default: return 0xffffff
  }
}

const getTiles = (width, height) => {
  const tiles = []

  const player1 = {
    x: Math.round(random(0, Math.floor(width / 20))),
    y: Math.round(random(0, Math.floor(height / 15))),
  }

  const player2 = {
    x: Math.round(random(0, Math.floor(width / 20))),
    y: Math.round(random(0, Math.floor(height / 15))),
  }

  while (player2.x === player1.x) player2.x = random(0, Math.floor(width / 20))

  for (let i = 0; i < Math.floor(width / 20); i += 1) {
    const line = []
    tiles.push(line)

    for (let j = 0; j < Math.floor(height / 15); j += 1) {
      let player = undefined
      if (player1.x === i && player1.y === j) player = 'player1'
      if (player2.x === i && player2.y === j) player = 'player2'

      line.push({
        key: `${i}-${j}`,
        x: i * 20 + (j % 2 * 10),
        y: j * 15,
        player,
      })
    }
  }

  return tiles
}

const Tiles = ({ width, height }) => {
  const [tiles, setTiles] = useState([])

  useEffect(() => {
    setTiles(getTiles(width, height))
  }, [])

  useEffect(() => {
    if (tiles.length === 0) return

    setTimeout(
      () => {
        setTiles(tiles.map((line, x) => line.map((tile, y) => {
          const getPlayer = () => {
            if (tile.player) return tile.player
            if (tiles[x - 1] && tiles[x - 1][y] && tiles[x - 1][y].player) return tiles[x - 1][y].player
            if (tiles[x + 1] && tiles[x + 1][y] && tiles[x + 1][y].player) return tiles[x + 1][y].player
            if (line[y - 1] && line[y - 1].player) return line[y - 1].player
            if (line[y + 1] && line[y + 1].player) return line[y + 1].player

            return undefined
          }

          return {
            ...tile,
            player: getPlayer(),
          }
        })))
      },
      500,
    )
  }, [tiles])

  return [].concat(...tiles.map(line => line.map(({ player, ...tile }) => (
    <Tile
      {...tile}
      tint={getTint(player)}
    />
  ))))
}

const Wrapper = (props) => (
  <ParticleContainer {...props}>
    <Tiles
      width={300}
      height={300}
    // width={780}
    // height={580}
    />
  </ParticleContainer>
)

export default Wrapper
