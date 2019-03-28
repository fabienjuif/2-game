import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import house from './pieApple.png'

const House = (props) => {
  return (
    <Sprite
      {...props}
      image={house}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.7}
    />
  )
}

export default House
