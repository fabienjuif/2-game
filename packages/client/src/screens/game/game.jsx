import React from 'react'
import Scene from './scene'
import UI from './ui'
import { BoardProvider } from './board'

const Game = ({ roomId }) => {
  const width = 12
  const height = 12

  console.log({ roomId })

  return (
    <BoardProvider
      width={width}
      height={height}
      roomId={roomId}
    >
      <Scene
        width={width}
        height={height}
      />

      <UI />
    </BoardProvider>
  )
}

export default Game
