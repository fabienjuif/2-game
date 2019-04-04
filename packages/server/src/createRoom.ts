const uuid = require('uuid/v4')

import joinRoom from './joinRoom'

export default (context: Context) => (playerId: string) => {
  const { rooms, players } = context

  console.log(`${playerId} is creating a new room`)
  const player = players.get(playerId)
  if (!player) return

  const playerName = player.name || 'Anonymous'

  const room: Room = {
    id: uuid(),
    full: false,
    name: `${playerName}'s room`,
    status: "OPEN",
    date: new Date(),
    players: [],
  }

  rooms.set(room.id, room)

  player.socket.write(JSON.stringify({ type: 'JOIN_ROOM', payload: room.id }))
}
