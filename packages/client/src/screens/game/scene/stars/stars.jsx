import React, { useState, useLayoutEffect } from 'react'
import { random, easing, darker } from '@2-game/utils'
import { useTick, ParticleContainer } from '@inlet/react-pixi'
import Star from './star'

const getStars = (count, windowWidth, windowHeight) => Array
  .from({ length: count })
  .map((_, index) => {
    const x = random(50, windowWidth - 100)
    const y = random(50, windowHeight - 100)
    return {
      key: index,
      x,
      y,
      targetX: random(50, windowWidth - 100),
      targetY: random(50, windowHeight - 100),
      speed: random(5, 10),
      scale: random(0.5, 3),
      easeTime: 'easeOutCubic',
      easeX: 'easeInCubic',
      easeY: 'easeInQuint',
    }
  })

const BEATING = 400 // frames

const Stars = ({ count = 20, windowWidth, windowHeight }) => {
  const [stars, setStars] = useState(getStars(count, windowWidth, windowHeight))
  const [frame, setFrame] = useState(0)
  const [endAnimationFrame, setEndAnimationFrame] = useState(frame + BEATING)
  const [disapeared, setDisapeared] = useState(true)
  const [tint, setTint] = useState(0)

  useTick((delta) => {
    setFrame(frame => frame + delta)
  })

  useLayoutEffect(() => {
    if (endAnimationFrame <= frame) {
      setEndAnimationFrame(frame => frame + BEATING)
      setDisapeared(disapeared => !disapeared)

      if (disapeared) setStars(getStars(count, windowWidth, windowHeight))
    }

    if (endAnimationFrame) {
      if (disapeared) setTint(Math.max(0x222222, darker(0xFFFFFF, easing.easeOutCubic((endAnimationFrame - frame) / BEATING))))
      else setTint(Math.max(0x222222, darker(0xFFFFFF, easing.easeInCubic(1 - (endAnimationFrame - frame) / BEATING))))
    }
  }, [frame, disapeared, endAnimationFrame])

  return (
    <ParticleContainer
      tint={tint}
    >
      {stars.map(star => React.createElement(Star, star))}
    </ParticleContainer>
  )
}

export default Stars
