import React, { useContext, useRef, useState, useEffect } from 'react'
import { Sprite, Container } from '@inlet/react-pixi'
import { darker } from '@2-game/utils'
import BoardContext from '../../contexts/board'
import Tree from './tree'
import Villager from './villager'
import Soldier from './soldier'
import House from './house'
import King from './king'
import Grave from './grave'
import tile from './tile.png'

const Asset = ({ name, playable, ...props }) => {
  const alpha = playable ? 1 : 0.5

  switch (name) {
    case 'tree': return <Tree {...props} />
    case 'house': return <House {...props} />
    case 'villager': return <Villager {...props} alpha={alpha} />
    case 'soldier': return <Soldier {...props} alpha={alpha} />
    case 'king': return <King {...props} alpha={alpha} />
    case 'grave': return <Grave {...props} />
    default: return null
  }
}

const Tile = ({ x, y, tint = 0xFFFFFF, available, unit, empty, played }) => {
  if (empty) return null

  const { actionOnTile } = useContext(BoardContext)
  const [innerTint, setInnerTint] = useState(tint)
  const [alpha, setAlpha] = useState(1)
  const click = useRef(undefined)

  const setBaseTint = () => {
    setInnerTint(tint)
    setAlpha(available ? 1 : 0.6)
  }

  useEffect(setBaseTint, [tint, available])

  const pointerup = (e) => {
    if (!click.current) return
    if (click.current > Date.now() - 200) {
      actionOnTile({ x, y })
    }
    click.current = undefined
  }

  const pointerdown = (e) => {
    click.current = Date.now()
  }

  const pointerover = () => {
    if (!available) return
    setInnerTint(darker(innerTint))
  }

  const pointerout = () => {
    setBaseTint()
  }

  return (
    <Container
      x={x * 20 + (y % 2 * 10)}
      y={y * 15}
      interactive
      pointerdown={pointerdown}
      pointerup={pointerup}
      pointerover={pointerover}
      pointerout={pointerout}
      alpha={alpha}
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
        name={unit}
        playable={!played}
      />
    </Container>
  )
}

export default Tile
