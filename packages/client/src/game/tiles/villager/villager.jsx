import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import villager from './boar.png'

const Tree = (props) => {
  return (
    <Sprite
      {...props}
      image={villager}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.7}
    />
  )
}

export default Tree
