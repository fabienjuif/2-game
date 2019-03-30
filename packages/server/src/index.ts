import engine from '@2-game/engine'

const sockjs = require('@fabienjuif/sockjs')
const http = require('http')
const createBus = require('events')
const uuid = require('uuid/v1')

const bus = new createBus()

const ws = sockjs.createServer({ prefix: '/ws' })

// TODO: import Board type???
const boards: Map<string, Object> = new Map()
const rooms: Map<string, Room> = new Map()
const players: Map<string, Player> = new Map()

setInterval(() => {
  rooms.forEach(room => {
    if (room.date.getTime() < new Date().getTime() - 10 * 60 * 1000) {
      console.log(`Cleaning up ${room.id} room (timeout)`)
      rooms.delete(room.id)
    }
  })
}, 1000)

const createRoom = (playerId: string) => {
  console.log(`${playerId} is creating a new room`)
  const room: Room = {
    id: uuid(),
    full: false,
    status: "OPEN",
    date: new Date(),
    players: [
      playerId,
    ],
  }

  rooms.set(room.id, room)

  const oldPlayer = players.get(playerId)
  const player = {
    ...oldPlayer as Player,
    roomId: room.id,
  }
  players.set(player.id, player)

  players.forEach(player => {
    if (player.status !== 'ROOMS') return

    player.socket.write(JSON.stringify({ type: 'SET_ROOM', payload: room }))
  })

  return room
}

const joinRoom = (playerId: string, roomId: string) => {
  if (!rooms.has(roomId)) return
  if (!players.has(playerId)) return

  const player = {
    ...players.get(playerId),
    roomId,
    status: 'ROOM',
  } as Player
  players.set(player.id, player)

  const oldRoom = rooms.get(roomId) as Room
  if (oldRoom.full) return

  console.log(`${playerId} is joining room ${roomId}`)

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

const leaveRoom = (playerId: string, roomId: string) => {
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

    player.socket.write(JSON.stringify({ type: 'SET_ROOM', payload: room }))
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

const startGame = (playerId: string, roomId: string) => {
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

const sendMessageToRoom = (playerId: string, message: string) => {
  // TODO:
}

// TODO: type socket (SockJS)
ws.on('close', (...args: any[]) => {
  console.log('close', args) // TODO: try or remove
})

ws.on('disconnection', (...args: any[]) => {
  console.log('disconnection', args) // TODO: try or remove
})

ws.on('connection', (socket: any) => {
  const id = uuid()
  socket.write(JSON.stringify({ type: 'SET_ID', payload: id }))

  rooms.forEach((room) => {
    if (room.status !== 'OPEN') return
    socket.write(JSON.stringify({ type: 'SET_ROOM', payload: room }))
  })

  socket.on('close', () => { // TODO: try or remove
    console.log(`${id} is disconnecting`)
  })

  const player = {
    socket,
    id,
    status: 'ROOMS',
    name: 'anonymous',
  }
  players.set(id, player as Player)

  socket.on('data', (message: string) => {
    const { type, payload } = JSON.parse(message)

    if (type === 'CREATE_ROOM') return createRoom(id)
    if (type === 'JOIN_ROOM') return joinRoom(id, payload)
    if (type === 'LEAVE_ROOM') return leaveRoom(id, payload)
    if (type === 'START_GAME') return startGame(id, payload)
    if (type === 'MESSAGE') return sendMessageToRoom(id, payload)
  })
})

const server = http.createServer()
ws.attach(server)

server.listen(9999, '0.0.0.0', () => {
  console.log('Listening on ::9999')
})
