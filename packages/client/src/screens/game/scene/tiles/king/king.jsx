import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import king from './jam.png'

const King = (props) => {
  return (
    <Sprite
      {...props}
      image={king}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.7}
    />
  )
}

export default King
