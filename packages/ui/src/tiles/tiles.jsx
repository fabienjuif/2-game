import React, { useState } from 'react'
import { ParticleContainer, useTick } from '@inlet/react-pixi'
import { random, easing, hexRgb, rgbHex } from '@2-game/utils'
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
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
  }

  const player2 = {
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
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
        tint: getTint(player),
      })
    }
  }

  return tiles
}

const nextTurn = (tiles, time, setTime) => {
  if (Date.now() - time < 500) return tiles
  setTime(Date.now())

  return tiles
    .map((line, x) => line.map((tile, y) => {
      const getPlayer = () => {
        if (tile.player) return tile.player
        if (tiles[x - 1] && tiles[x - 1][y] && tiles[x - 1][y].player) return tiles[x - 1][y].player
        if (tiles[x + 1] && tiles[x + 1][y] && tiles[x + 1][y].player) return tiles[x + 1][y].player
        if (line[y - 1] && line[y - 1].player) return line[y - 1].player
        if (line[y + 1] && line[y + 1].player) return line[y + 1].player

        return undefined
      }

      const newPlayer = getPlayer()
      const newTile = { ...tile }
      if (tile.player !== newPlayer) {
        const tint = getTint(newPlayer)
        const [r, g, b] = hexRgb(tint)

        newTile.player = newPlayer
        newTile.currentFrame = 0
        newTile.targetFrame = 20
        newTile.previousTint = tile.tint || 0xffffff
        newTile.targetTint = tint
        newTile.targetR = r
        newTile.targetG = g
        newTile.targetB = b
        newTile.tint = 0xffffff
      }

      return newTile
    }))
}

const Tiles = ({ width, height }) => {
  const [tiles, setTiles] = useState(getTiles(width, height))
  const [time, setTime] = useState(Date.now())

  useTick((delta) => {
    setTiles(nextTurn(tiles, time, setTime).map((line, x) => line.map((tile, y) => {
      if (tile.targetFrame === undefined) return tile
      if (tile.currentFrame >= tile.targetFrame) return tile

      const nextFramePercent = (tile.currentFrame + delta) / tile.targetFrame
      const easeNextFramePercent = Math.min(1, easing.linear(nextFramePercent))

      const [prevR, prevG, prevB] = hexRgb(tile.previousTint)

      const nextValue = (value, targetValue) => {
        const distance = targetValue - value
        if (distance === 0) return value

        const nextDistance = easeNextFramePercent * distance
        const newValue = nextDistance + value

        return Math.round(newValue)
      }

      const newTint = rgbHex(
        nextValue(prevR, tile.targetR),
        nextValue(prevG, tile.targetG),
        nextValue(prevB, tile.targetB),
      )

      const newTile = {
        ...tile,
        tint: newTint,
        currentFrame: tile.currentFrame + delta,
      }

      return newTile
    })))
  })

  return [].concat(...tiles.map(line => line.map(({ key, x, y, tint }) => (
    <Tile
      key={key}
      x={x}
      y={y}
      tint={tint}
    />
  ))))
}

const Wrapper = (props) => (
  <ParticleContainer {...props}>
    <Tiles
      width={780}
      height={580}
    />
  </ParticleContainer>
)

export default Wrapper
