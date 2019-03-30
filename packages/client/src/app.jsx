import React from 'react'
import { useRoutes } from 'hookrouter'
import Game from './screens/game'
import Rooms from './screens/rooms'
import { ServerProvider } from './server'

const routes = {
  '/': () => <Rooms />,
  '/game/:roomId': ({ roomId }) => <Game roomId={roomId} />
}

const App = () => {
  const screen = useRoutes(routes)

  return (
    <ServerProvider>
      {screen}
    </ServerProvider>
  )
}

export default App
