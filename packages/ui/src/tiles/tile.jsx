import React from 'react'
import { Sprite } from '@inlet/react-pixi'
import tile from './tile.png'

const Tile = (props) => (
  <Sprite
    image={tile}
    anchor={0.5}
    {...props}
  />
)

export default Tile
