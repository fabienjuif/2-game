import React from 'react'
import Game from './game'
import UI from './ui'
import { TilesProvider } from './contexts/tiles'

const App = () => {
  const width = 20 * 15
  const height = 15 * 15

  return (
    <TilesProvider
      width={width}
      height={height}
    >
      <Game
        width={width}
        height={height}
      />

      <UI />
    </TilesProvider>
  )
}

export default App
