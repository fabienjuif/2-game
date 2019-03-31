import React, { Fragment } from 'react'
import Scene from './scene'
import UI from './ui'
import { BoardProvider } from './board'

const Game = ({ roomId }) => {
  return (
    <BoardProvider
      roomId={roomId}
    >
    {({ width, height }) => (
      <Fragment>
        <Scene
          width={width}
          height={height}
        />

        <UI />
      </Fragment>
    )}
    </BoardProvider>
  )
}

export default Game
