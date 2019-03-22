import React from 'react'
import Game from './game'
import UI from './ui'
import { TilesProvider } from './contexts/tiles'

const App = () => {
  const width = 20 * 12
  const height = 15 * 12

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
