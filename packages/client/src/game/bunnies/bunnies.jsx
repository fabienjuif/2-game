import React, { useState, useEffect } from 'react'
import { random } from '@2-game/utils'
import { ParticleContainer } from '@inlet/react-pixi'
import Bunny from './bunny'

const getBunnys = (count) => Array
  .from({ length: count })
  .map((_, index) => {
    const x = random(50, 750)
    const y = random(50, 550)
    return {
      key: index,
      x,
      y,
      targetX: random(50, 750),
      targetY: random(50, 550),
      speed: random(100, 200),
      scale: random(0.5, 2),
      tint: random(0x555555, 0xffffff),
      easeTime: 'easeOutCubic',
      easeX: 'easeInCubic',
      easeY: 'easeInQuint',
    }
  })

const Bunnys = ({ count }) => {
  const [bunnys, setBunnys] = useState([])

  useEffect(() => {
    setBunnys(getBunnys(count))

    setInterval(
      () => {
        setBunnys(getBunnys(count))
      },
      3000,
    )
  }, [])

  return bunnys.map(bunny => React.createElement(Bunny, bunny))
}

const Wrapper = (props) => (
  <ParticleContainer>
    <Bunnys count={10} />
  </ParticleContainer>
)

export default Wrapper
