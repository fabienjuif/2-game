const uuid = require('uuid/v4')

import joinRoom from './joinRoom'

export default (context: Context) => (playerId: string) => {
  const { rooms, players } = context

  console.log(`${playerId} is creating a new room`)
  const { name: playerName } = players.get(playerId) || { name: 'Anonymous' }

  const room: Room = {
    id: uuid(),
    full: false,
    name: `${playerName}'s room`,
    status: "OPEN",
    date: new Date(),
    players: [],
  }

  rooms.set(room.id, room)

  return joinRoom(context)(playerId, room.id)
}
