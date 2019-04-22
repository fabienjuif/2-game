const createBus = require('events')

export default (context: Context) => (player: Player, room: Room, board: any /* TODO: Board from engine */) => {
  player.socket.send({ type: 'START_GAME', payload: room.id })

  player.socket.send({ type: 'SET_PLAYER', payload: player.player })

  let state: any // TODO: import State from engine!!
  const sendState = () => {
    const newState = board.getState()
    if (newState !== state) player.socket.send({ type: 'SYNC', payload: newState })
    state = newState
  }
  board.subscribe(sendState)
  sendState()

  if (!room.bus) room.bus = new createBus()

  // TODO: disconnect at the end of the game
  room.bus.on('MOUSE', (payload: any /* TODO: type */) => {
    if (payload.currentPlayer === player.player) return

    player.socket.send({ type: 'MOUSE', payload })
  })

  // TODO: disconnect at the end of the game
  player.socket.on('data', (message: string) => {
    // this is not this player turn
    if (board.getState().turn !== player.player) return

    const { type, payload } = JSON.parse(message)

    room.date = new Date()

    if (type === 'CONCEDE') return board.concede()
    if (type === 'NEXT') return board.next()
    if (type === 'SET_NEWASSET') return board.selectAsset(payload)
    if (type === 'ACTION') return board.actionOnTile(payload)
    if (type === 'MOUSE' && board.getState().turn === player.player) room.bus.emit('MOUSE', { currentPlayer: player.player, ...payload })
  })
}
