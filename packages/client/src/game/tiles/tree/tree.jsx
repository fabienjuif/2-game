import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import tree from './tree.png'

const Tree = (props) => {
  return (
    <Sprite
      {...props}
      image={tree}
      anchor="0.5"
      x={0}
      y={0}
      scale={0.05}
    />
  )
}

export default Tree
