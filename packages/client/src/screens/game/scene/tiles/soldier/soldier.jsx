import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import soldier from './pineapple.png'

const Soldier = (props) => {
  return (
    <Sprite
      {...props}
      image={soldier}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.7}
    />
  )
}

export default Soldier
