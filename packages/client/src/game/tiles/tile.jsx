import React, { useContext, useRef, useState } from 'react'
import { Sprite } from '@inlet/react-pixi'
import { darker } from '@2-game/utils'
import TilesContext from '../../contexts/tiles'
import tile from './tile.png'

const Tile = ({ x, y, tint, ...props }) => {
  const { ownTile } = useContext(TilesContext)
  const [shadow, setShadow] = useState(false)
  const click = useRef(undefined)

  const pointerup = (e) => {
    if (!click.current) return
    if (click.current > Date.now() - 200) {
      ownTile(x, y)
    }
    click.current = undefined
  }

  const pointerdown = (e) => {
    click.current = Date.now()
  }

  const pointerover = () => {
    setShadow(true)
  }

  const pointerout = () => {
    setShadow(false)
  }

  return (
    <Sprite
      {...props}
      image={tile}
      anchor={0.5}
      interactive
      x={x * 20 + (y % 2 * 10)}
      y={y * 15}
      tint={shadow ? darker(tint) : tint}
      pointerdown={pointerdown}
      pointerup={pointerup}
      pointerover={pointerover}
      pointerout={pointerout}
    />
  )
}

export default Tile
