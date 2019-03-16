import React, { useState, useEffect, memo } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import bunny from './bunny.png'

// source: https://gist.github.com/gre/1650294
const easing = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t * t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t * t * t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t * t * t * t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t * t * t * t * t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },
  // elastic bounce effect at the beginning
  easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
  // elastic bounce effect at the end
  easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
  // elastic bounce effect at the beginning and end
  easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(90 * t) : (.02 - .01 / t) * Math.sin(90 * t) + 1 },
  easeInSin: function (t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
  easeOutSin: function (t) { return Math.sin(Math.PI / 2 * t); },
  easeInOutSin: function (t) { return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2; },
}

const texture = new PIXI.Texture.fromImage(bunny)
console.log(texture)

const Bunny = ({
  x,
  y,
  targetX,
  targetY,
  speed, // px per seconds
  easeTime = 'linear',
  easeX = 'linear',
  easeY = 'linear',
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
      texture={texture}
      // image={bunny}
      cacheAsBitmap={true}
      x={position.x}
      y={position.y}
      interactive={false}
      anchor={0.5}
    />
  )
}

export default Bunny
