const uuid = require('uuid/v1')

import setRoom from './setRoom'

// TODO: socket from sockjs
export default (context: Context, socket: any) => async (name: string = 'anonymous') => {
  const { players, rooms } = context
  const id = uuid()

  const player = {
    socket,
    id,
    name,
    status: 'ROOMS',
  } as Player
  players.set(id, player)

  // send id to the player
  player.socket.write(JSON.stringify({ type: 'SET_ID', payload: id }))

  // send name <-> id to all players
  players.forEach((curr) => {
    if (!['ROOMS', 'ROOM'].includes(curr.status)) return
    curr.socket.write(JSON.stringify({ type: 'SET_NAME', payload: { id, name } }))
  })

  // send names to player
  player.socket.write(JSON.stringify({ type: 'SET_NAMES', payload: Array.from(players.values()).map(({ id, name }) => ({ id, name })) }))

  // send rooms to player
  player.socket.write(JSON.stringify({ type: 'SET_ROOMS', payload: Array.from(rooms.values()).filter(room => room.status === 'OPEN') }))

  return id
}
