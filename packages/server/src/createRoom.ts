const uuid = require('uuid/v1')

import joinRoom from './joinRoom'

export default (context: Context) => (playerId: string) => {
  const { rooms } = context

  console.log(`${playerId} is creating a new room`)
  const room: Room = {
    id: uuid(),
    full: false,
    status: "OPEN",
    date: new Date(),
    players: [],
  }

  rooms.set(room.id, room)

  return joinRoom(context)(playerId, room.id)
}
