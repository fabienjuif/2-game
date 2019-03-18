import React, { useState, useEffect } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'
import { easing } from '@2-game/utils'
import bunny from './bunny.png'

// const texture = new PIXI.Texture.fromImage(bunny)

const Bunny = ({
  x,
  y,
  targetX,
  targetY,
  speed, // px per seconds
  easeTime = 'linear',
  easeX = 'linear',
  easeY = 'linear',
  ...props,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [target, setTarget] = useState({
    distance: 0,
    frames: 0,
    x: targetX,
    y: targetY,
  })
  const [position, setPosition] = useState({
    x: x,
    y: y,
  })

  useEffect(
    () => {
      const distance = Math.sqrt((targetX - x) ** 2 + (targetY - y) ** 2)
      const frames = distance / (speed / 60)

      setTarget({
        ...target,
        distance,
        frames,
      })

      setCurrentFrame(0)
    },
    [targetX, targetY, x, y, speed],
  )

  useEffect(
    () => {
      if (target.distance === 0) return

      const nextFramePercent = (currentFrame / target.frames)
      const easeNextFramePercent = easing[easeTime](nextFramePercent)
      const nextDistance = easeNextFramePercent * target.distance

      const percentDistance = nextDistance / target.distance

      const nextX = ((target.x - x) * easing[easeX](percentDistance)) + x
      const nextY = ((target.y - y) * easing[easeY](percentDistance)) + y

      setPosition({
        x: nextX,
        y: nextY,
      })
    },
    [currentFrame],
  )

  useTick((delta) => {
    if (target.distance === 0) return
    if (target.frames <= currentFrame) return

    setCurrentFrame(currentFrame + delta)
  })

  return (
    <Sprite
      {...props}
      // texture={texture}
      image={bunny}
      // cacheAsBitmap={true}
      x={position.x}
      y={position.y}
      interactive={false}
      anchor={0.5}
    />
  )
}

export default Bunny
