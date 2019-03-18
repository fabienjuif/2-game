import React, { useState, useContext } from 'react'
import { ParticleContainer, useTick } from '@inlet/react-pixi'
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

const Tiles = ({ width, height }) => {
  const [tiles, setTiles] = useState([])
  const { getData } = useContext(TilesContext) || {}

  useTick((delta) => {
    setTiles(getData().map((line, x) => line.map((tile, y) => {
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

      if (innerTile.targetFrame === undefined) return innerTile
      if (innerTile.currentFrame >= innerTile.targetFrame) return innerTile

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
        tint: newTint,
        currentFrame: innerTile.currentFrame + delta,
      }

      return newTile
    })))
  })

  return [].concat(...tiles.map(line => line.map(({ key, x, y, tint }) => (
    <Tile
      key={key}
      x={x}
      y={y}
      tint={tint || 0xFFFFFF}
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
