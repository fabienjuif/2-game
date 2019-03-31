import React, { Fragment } from 'react'
import { useRoutes } from 'hookrouter'
import Game from './screens/game'
import Rooms from './screens/rooms'
import Login from './screens/login'
import { ServerProvider } from './server'

const offlineRoutes = {
  '/': () => <Login />,
  '/game': () => <Game />,
}

const onlineRoutes = {
  '/rooms': () => <Rooms />,
  '/game/:roomId': ({ roomId }) => <Game roomId={roomId} />
}

const App = () => {
  const offlineScreen = useRoutes(offlineRoutes)
  const onlineScreen = useRoutes(onlineRoutes)

  return (
    <Fragment>
      {offlineScreen}
      {onlineScreen && (
        <ServerProvider>
          {onlineScreen}
        </ServerProvider>
      )}
    </Fragment>
  )
}

export default App
