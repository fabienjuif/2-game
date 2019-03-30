import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import grave from './eggs.png'

const Grave = (props) => {
  return (
    <Sprite
      {...props}
      image={grave}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.7}
    />
  )
}

export default Grave
