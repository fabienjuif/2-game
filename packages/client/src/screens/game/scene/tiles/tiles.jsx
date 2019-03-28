import React, { useState, useContext } from 'react'
import { Container, useTick } from '@inlet/react-pixi'
import { easing, hexRgb, rgbHex, getTint } from '@2-game/utils'
import BoardContext from '../../board'
import Tile from './tile'

const mergeTiles = (graphical, data) => {
  const {
    tint,
    targetR,
    targetG,
    targetB,
    targetFrame,
    currentFrame,
    previousPlayer,
  } = graphical

  return {
    tint,
    targetR,
    targetG,
    targetB,
    targetFrame,
    currentFrame,
    previousPlayer,
    ...data
  }
}

const Tiles = ({ camera }) => {
  const [tiles, setTiles] = useState([])
  const { tiles: baseTiles } = useContext(BoardContext)

  useTick((delta) => {
    setTiles(baseTiles.map(line => line.map((tile) => {
      if (!tiles[tile.y] || !tiles[tile.y][tile.x]) return { ...tile, tint: getTint(tile.player) }
      const innerTile = tiles[tile.y][tile.x]

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

      if (innerTile.targetFrame === undefined) return mergeTiles(innerTile, tile)
      if (innerTile.currentFrame >= innerTile.targetFrame) return mergeTiles(innerTile, tile)

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

      return {
        ...mergeTiles(innerTile, tile),
        tint: newTint,
        currentFrame: innerTile.currentFrame + delta,
      }
    })))
  })

  return [].concat(...tiles.map(line => line.map(tile => (
    <Tile
      key={`${tile.x}-${tile.y}`}
      {...tile}
    />
  ))))
}

const Wrapper = ({ camera, ...props }) => (
  <Container {...props}>
    <Tiles />
  </Container>
)

export default Wrapper
