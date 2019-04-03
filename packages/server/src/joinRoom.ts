import leaveRoom from './leaveRoom'
import setRoom from './setRoom'

const sendRoom = (context: Context) => (player: Player, room: Room) => player.socket.write(JSON.stringify(setRoom(context)(room)))

export default (context: Context) => (playerId: string, roomId: string) => {
  const { rooms, players } = context

  if (!players.has(playerId)) return
  const oldPlayer = players.get(playerId) as Player

  if (!rooms.has(roomId)) {
    oldPlayer.socket.write(JSON.stringify({ type: 'ROOM_NOTFOUND', payload: roomId }))
    return
  }

  const oldRoom = rooms.get(roomId) as Room
  if (oldRoom.full || oldRoom.players.includes(playerId)) return sendRoom(context)(oldPlayer, oldRoom)

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

    sendRoom(context)(player, room)
  })

  return room
}
