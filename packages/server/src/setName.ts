export default (context: Context) => async (playerId: string, name: string) => {
  const { players, rooms } = context
  if (!players.has(playerId)) return

  const player = {
    ...players.get(playerId),
    name,
  } as Player
  players.set(playerId, player)

  // send name <-> id to all players
  players.forEach((curr) => {
    if (!['ROOMS', 'ROOM'].includes(curr.status)) return
    if (curr.status === 'ROOM' && curr.roomId !== player.roomId) return

    curr.socket.send({ type: 'SET_NAME', payload: { id: playerId, name } })
  })
}
