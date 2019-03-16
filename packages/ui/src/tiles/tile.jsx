import React, { useState, useEffect } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'
import { easing, hexRgb, rgbHex } from '@2-game/utils'
import tile from './tile.png'

const Tile = ({ tint, ...props }) => {
  const [currentTint, setCurrentTint] = useState(tint)
  const [previousTint, setPreviousTint] = useState(tint)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [target, setTarget] = useState({
    frames: 0,
    r: 0,
    g: 0,
    b: 0,
  })

  useEffect(
    () => {
      setPreviousTint(currentTint)
    },
    [tint]
  )

  useEffect(
    () => {
      const frames = 10

      const [r, g, b] = hexRgb(tint)

      setTarget({
        ...target,
        frames,
        r,
        g,
        b,
      })

      setCurrentFrame(0)
    },
    [tint, previousTint],
  )

  useEffect(
    () => {
      if (target.frames === 0) return

      const nextFramePercent = (currentFrame / target.frames)
      const easeNextFramePercent = easing.linear(nextFramePercent)

      const [currentR, currentG, currentB] = hexRgb(previousTint)

      const nextValue = (value, targetValue) => {
        const distance = targetValue - value
        if (distance === 0) return value
        const nextDistance = easeNextFramePercent * distance
        const percentDistance = Math.min(1, nextDistance / distance)

        const newValue = distance * percentDistance + value

        return newValue
      }

      const newTint = rgbHex(
        nextValue(currentR, target.r),
        nextValue(currentG, target.g),
        nextValue(currentB, target.b),
      )
      setCurrentTint(newTint)
    },
    [currentFrame],
  )

  useTick((delta) => {
    if (target.frames === 0) return
    if (target.frames < currentFrame) return

    setCurrentFrame(currentFrame + delta)
  })

  return (
    <Sprite
      image={tile}
      anchor={0.5}
      {...props}
      tint={currentTint}
    />
  )
}

export default Tile
