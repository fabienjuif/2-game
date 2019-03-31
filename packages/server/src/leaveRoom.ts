import setRoom from './setRoom'

export default (context: Context) => (playerId: string, roomId: string) => {
  const { rooms, players } = context

  if (!rooms.has(roomId)) return
  if (!players.has(playerId)) return

  const player = {
    ...players.get(playerId),
    status: 'ROOMS',
  } as Player
  players.set(player.id, player)

  const oldRoom = rooms.get(roomId) as Room

  console.log(`${playerId} is leaving room ${roomId}`)

  const room = {
    ...rooms.get(roomId) as Room,
    full: false,
    players: oldRoom.players.filter(id => id !== playerId),
  }

  players.forEach(player => {
    if (!['ROOMS', 'ROOM'].includes(player.status)) return
    if (player.status === 'ROOM' && player.roomId !== room.id) return

    player.socket.write(JSON.stringify(setRoom(context)(room)))
  })

  if (room.players.length === 0) {
    rooms.delete(roomId)

    console.log(`Room ${roomId} is empty, so it is deleted`)

    // TODO: say to remove room to clients

    return undefined
  }

  rooms.set(room.id, room)
  return room
}
