import React from 'react'
import Game from './game'
import UI from './ui'
import { BoardProvider } from './contexts/board'

const App = () => {
  const width = 12
  const height = 12

  return (
    <BoardProvider
      width={width}
      height={height}
    >
      <Game
        width={width}
        height={height}
      />

      <UI />
    </BoardProvider>
  )
}

export default App
