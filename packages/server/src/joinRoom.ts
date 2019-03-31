import leaveRoom from './leaveRoom'

export default (context: Context) => (playerId: string, roomId: string) => {
  const { rooms, players } = context

  if (!rooms.has(roomId)) return
  if (!players.has(playerId)) return

  const oldRoom = rooms.get(roomId) as Room
  if (oldRoom.full) return
  if (oldRoom.players.includes(playerId)) return

  const oldPlayer = players.get(playerId) as Player
  if (oldPlayer.roomId) leaveRoom(context)(playerId, oldPlayer.roomId)

  console.log(`${playerId} is joining room ${roomId}`)

  const player = {
    ...oldPlayer,
    roomId,
    status: 'ROOM',
  } as Player
  players.set(player.id, player)

  const room = {
    ...oldRoom,
    players: [
      ...oldRoom.players,
      playerId,
    ]
  }

  if (room.players.length === 4) room.full = true

  rooms.set(room.id, room)

  players.forEach(player => {
    if (!['ROOMS', 'ROOM'].includes(player.status)) return
    if (player.status === 'ROOM' && player.roomId !== room.id) return

    player.socket.write(JSON.stringify({ type: 'SET_ROOM', payload: room }))
  })

  return room
}
