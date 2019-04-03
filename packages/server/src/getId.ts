const uuid = require('uuid/v4')

// TODO: socket from sockjs
export default (context: Context, socket: any) => async () => {
  const { players, rooms } = context
  const id = uuid()
  const name = 'anonymous' // TODO: take a random name

  const player = {
    socket,
    id,
    name,
    status: 'ROOMS',
  } as Player
  players.set(id, player)

  // send id to the player
  player.socket.write(JSON.stringify({ type: 'SET_ID', payload: id }))

  // send names & rooms to player
  // player.socket.write(JSON.stringify({ type: 'SET_NAMES', payload: Array.from(players.values()).map(({ id, name }) => ({ id, name })) }))
  // player.socket.write(JSON.stringify({ type: 'SET_ROOMS', payload: Array.from(rooms.values()).filter(room => room.status === 'OPEN') }))

  return id
}
