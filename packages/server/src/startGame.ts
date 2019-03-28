import engine from '@2-game/engine'
import attachGame from './attachGame'

export default (context: Context) => (playerId: string, roomId: string) => {
  const { rooms, players, boards } = context

  if (!rooms.has(roomId)) return
  if (!players.has(playerId)) return
  const oldRoom = rooms.get(roomId) as Room
  if (oldRoom.status === 'STARTED') return

  const player = {
    ...players.get(playerId),
    status: 'PLAY',
  } as Player
  players.set(player.id, player)

  console.log(`${playerId} is starting game for room ${roomId}`)

  // TODO: make sure that the player who start the game is the first player

  const room = {
    ...oldRoom,
    status: 'STARTED',
    date: new Date(),
  } as Room
  rooms.set(room.id, room)

  const playerSize = room.players.length

  const board = engine({ width: 10 + playerSize, height: 10 + playerSize, players: playerSize })

  room.players.forEach((playerId, index) => {
    const oldPlayer = players.get(playerId)
    if (!oldPlayer) return

    const player = {
      ...oldPlayer,
      player: `player${index + 1}`,
    }

    players.set(playerId, player)
    boards.set(playerId, board)

    attachGame(context)(player, room, board)
  })
}
