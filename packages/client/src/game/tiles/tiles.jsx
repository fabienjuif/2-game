import React, { useState, useContext } from 'react'
import { Container, useTick } from '@inlet/react-pixi'
import { easing, hexRgb, rgbHex } from '@2-game/utils'
import TilesContext from '../../contexts/tiles'
import Tile from './tile'

const getTint = (player) => {
  switch (player) {
    case 'player1': return 0xcc2020
    case 'player2': return 0x2020cc
    default: return 0xffffff
  }
}

const Tiles = () => {
  const [tiles, setTiles] = useState([])
  const { tiles: baseTiles } = useContext(TilesContext) || {}

  useTick((delta) => {
    setTiles(baseTiles.map((line, x) => line.map((tile, y) => {
      if (!tiles[x] || !tiles[x][y]) return { ...tile, tint: getTint(tile.player) }
      const innerTile = tiles[x][y]

      if (innerTile.player !== tile.player) {
        const [targetR, targetG, targetB] = hexRgb(getTint(tile.player))

        return {
          ...tile,
          targetR,
          targetG,
          targetB,
          targetFrame: 10,
          currentFrame: 0,
          previousPlayer: innerTile.player,
        }
      }

      if (innerTile.targetFrame === undefined) return { ...innerTile, ...tile }
      if (innerTile.currentFrame >= innerTile.targetFrame) return { ...innerTile, ...tile }

      const nextFramePercent = (innerTile.currentFrame + delta) / innerTile.targetFrame
      const easeNextFramePercent = Math.min(1, easing.linear(nextFramePercent))

      const [prevR, prevG, prevB] = hexRgb(getTint(innerTile.previousPlayer))

      const nextValue = (value, targetValue) => {
        const distance = targetValue - value
        if (distance === 0) return value

        const nextDistance = easeNextFramePercent * distance
        const newValue = nextDistance + value

        return Math.round(newValue)
      }

      const newTint = rgbHex(
        nextValue(prevR, innerTile.targetR),
        nextValue(prevG, innerTile.targetG),
        nextValue(prevB, innerTile.targetB),
      )

      const newTile = {
        ...innerTile,
        ...tile,
        tint: newTint,
        currentFrame: innerTile.currentFrame + delta,
      }

      return newTile
    })))
  })

  return [].concat(...tiles.map(line => line.map(tile => (
    <Tile
      key={tile.key}
      {...tile}
    />
  ))))
}

const Wrapper = (props) => (
  <Container {...props}>
    <Tiles />
  </Container>
)

export default Wrapper
