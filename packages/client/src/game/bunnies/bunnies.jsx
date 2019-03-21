import React, { useState } from 'react'
import { random, easing } from '@2-game/utils'
import { useTick, ParticleContainer } from '@inlet/react-pixi'
import Bunny from './bunny'

const getBunnys = (count, windowWidth, windowHeight) => Array
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
      speed: random(10, 20),
      scale: random(0.5, 3),
      easeTime: 'easeOutCubic',
      easeX: 'easeInCubic',
      easeY: 'easeInQuint',
    }
  })

const Bunnies = ({ count = 20, windowWidth, windowHeight }) => {
  const [bunnys, setBunnys] = useState(getBunnys(count, windowWidth, windowHeight))
  const [frame, setFrame] = useState(0)
  const [endAnimationFrame, setEndAnimationFrame] = useState(undefined)
  const [disapeared, setDisapeared] = useState(true)
  const [alpha, setAlpha] = useState(0)

  useTick((delta) => {
    setFrame(frame => frame + 1)

    if (endAnimationFrame <= frame && disapeared) setBunnys(getBunnys(count, windowWidth, windowHeight))

    if (endAnimationFrame) {
      if (disapeared) setAlpha(easing.easeOutCubic((endAnimationFrame - frame) / 100))
      else setAlpha(easing.easeInCubic(1 - (endAnimationFrame - frame) / 100))
    }

    if (Math.round(frame) % 100 === 0) {
      setEndAnimationFrame(frame + 100)
      setDisapeared(disapeared => !disapeared)
    }
  })

  return (
    <ParticleContainer
      alpha={alpha}
    >
      {bunnys.map(bunny => React.createElement(Bunny, bunny))}
    </ParticleContainer>
  )
}

export default Bunnies
