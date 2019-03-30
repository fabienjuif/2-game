import React, { useContext } from 'react'
import { Sprite } from '@inlet/react-pixi'
import { getTint, darker } from '@2-game/utils'
import BoardContext from '../../board'
import mouse from '../tiles/tile.png'

const Mouse = ({ camera }) => {
  const { mousePosition, turn, currentPlayer } = useContext(BoardContext)

  if (currentPlayer === turn) return null

  return (
    <Sprite
      image={mouse}
      tint={darker(getTint(turn))}
      anchor="0.5"
      scale={0.1}
      alpha={0.5}
      x={mousePosition.x * 20 + (mousePosition.y % 2 * 10)}
      y={mousePosition.y * 15}
    />
  )
}

export default Mouse
