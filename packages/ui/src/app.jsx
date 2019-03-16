import React, { useState, useEffect } from 'react'
import { Stage, Container, Sprite, ParticleContainer } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import Bunny from './bunny'
import bg from './bg.png'

// PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.CAN_UPLOAD_SAME_BUFFER = true


const random = (x, y) => (Math.random() * (y - x)) + x

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

const App = () => (
  <Stage
    width={800}
    height={600}
    options={{
      backgroundColor: 0x07ff9c,
      antialias: false,
      roundPixel: false,
      clearBeforeRender: true,
      preserveDrawingBuffer: true,
    }}
  >
    <Sprite
      image={bg}
      x={5}
      y={5}
      width={790}
      height={590}
      tint={0x505050}
      interactive={false}
    />

    <Container
      interactive={false}
      interactiveChildren={false}
    >
      <Bunnys count={100} />
    </Container>
  </Stage >
)

export default App
