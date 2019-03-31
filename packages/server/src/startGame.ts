const createBus = require('events')

import engine from '@2-game/engine'

const bus = new createBus()

export default ({ rooms, players, boards }: Context) => (playerId: string, roomId: string) => {
  if (!rooms.has(roomId)) return
  if (!players.has(playerId)) return

  const player = {
    ...players.get(playerId),
    status: 'PLAY',
  } as Player
  players.set(player.id, player)

  console.log(`${playerId} is starting game for room ${roomId}`)

  // TODO: make sure that the player who start the game is the first player

  const room = {
    ...rooms.get(roomId),
    status: 'STARTED',
    date: new Date(),
  } as Room
  rooms.set(room.id, room)

  const playerSize = room.players.length

  const board = engine({ width: 10 + playerSize, height: 10 + playerSize, players: playerSize })

  // TODO: update room
  // TODO: dispatch 'SET_ROOM' for others players

  room.players.forEach((playerId) => {
    const player = players.get(playerId)
    if (!player) return

    player.socket.write(JSON.stringify({ type: 'START_GAME', payload: roomId }))
  })

  room.players.forEach((playerId, index) => {
    const oldPlayer = players.get(playerId)
    if (!oldPlayer) return

    const player = {
      ...oldPlayer,
      player: `player${index + 1}`,
    }

    players.set(playerId, player)
    boards.set(playerId, board)

    player.socket.write(JSON.stringify({ type: 'SET_PLAYER', payload: player.player }))

    let state: any // TODO: import State from engine!!
    const sendState = () => {
      const newState = board.getState()
      if (newState !== state) player.socket.write(JSON.stringify({ type: 'SYNC', payload: newState }))
      state = newState
    }
    board.subscribe(sendState)
    sendState()

    // TODO: disconnect at the end of the game
    bus.on('MOUSE', (payload: any /* TODO: type */) => {
      if (payload.currentPlayer === player.player) return

      player.socket.write(JSON.stringify({ type: 'MOUSE', payload }))
    })

    // TODO: disconnect at the end of the game
    player.socket.on('data', (message: string) => {
      const { type, payload } = JSON.parse(message)

      room.date = new Date()

      if (type === 'NEXT') return board.next()
      if (type === 'SET_NEWASSET') return board.selectAsset(payload)
      if (type === 'ACTION') return board.actionOnTile(payload)
      if (type === 'MOUSE' && board.getState().turn === player.player) bus.emit('MOUSE', { currentPlayer: player.player, ...payload })
    })
  })
}
