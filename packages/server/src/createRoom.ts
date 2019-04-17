const uuid = require('uuid/v4')

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
    bus: undefined,
  }

  rooms.set(room.id, room)

  player.socket.send({ type: 'JOIN_ROOM', payload: room.id })
}
