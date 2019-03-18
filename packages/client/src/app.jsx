import React from 'react'
import Game from './game'
import UI from './ui'
import { TilesProvider } from './contexts/tiles'

const App = () => {
  return (
    <TilesProvider width={780} height={480}>
      <Game />
      <UI />
    </TilesProvider>
  )
}

export default App
