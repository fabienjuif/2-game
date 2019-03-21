import React, { useContext, useRef, useState, useEffect } from 'react'
import { Sprite, Container } from '@inlet/react-pixi'
import { darker } from '@2-game/utils'
import TilesContext from '../../contexts/tiles'
import Tree from './tree'
import Villager from './villager'
import Soldier from './soldier'
import House from './house'
import tile from './tile.png'

const Asset = ({ name, ...props }) => {
  switch (name) {
    case 'tree': return <Tree {...props} />
    case 'villager': return <Villager {...props} />
    case 'soldier': return <Soldier {...props} />
    case 'house': return <House {...props} />
    default: return null
  }
}

const Tile = ({ x, y, tint, object, empty, ...props }) => {
  if (empty) return null

  const { action } = useContext(TilesContext)
  const [innerTint, setInnerTint] = useState(tint)
  const click = useRef(undefined)

  useEffect(
    () => {
      setInnerTint(tint)
    },
    [tint],
  )

  const pointerup = (e) => {
    if (!click.current) return
    if (click.current > Date.now() - 200) {
      action(x, y)
    }
    click.current = undefined
  }

  const pointerdown = (e) => {
    click.current = Date.now()
  }

  const pointerover = () => {
    setInnerTint(darker(tint))
  }

  const pointerout = () => {
    setInnerTint(tint)
  }

  return (
    <Container
      {...props}
      x={x * 20 + (y % 2 * 10)}
      y={y * 15}
      interactive
      pointerdown={pointerdown}
      pointerup={pointerup}
      pointerover={pointerover}
      pointerout={pointerout}
    >
      <Sprite
        image={tile}
        anchor={0.5}
        scale={0.1}
        x={0}
        y={0}
        tint={innerTint}
      />
      <Asset
        name={object}
      />
    </Container>
  )
}

export default Tile
