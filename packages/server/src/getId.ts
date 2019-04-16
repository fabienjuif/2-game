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
  player.socket.send({ type: 'SET_ID', payload: id })

  return id
}
