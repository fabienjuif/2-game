const path = require('path')
const fs = require('fs')
const sockjs = require('@fabienjuif/sockjs')
const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')

import createSocket from './createSocket'
import getId from './getId'
import createRoom from './createRoom'
import joinRoom from './joinRoom'
import setRoom from './setRoom'
import leaveRoom from './leaveRoom'
import startGame from './startGame'
import setName from './setName'
import attachGame from './attachGame'

const app = new Koa()
app.use(serve(path.resolve(__dirname, 'client')))
app.use((ctx: any) => { // TODO: type
  ctx.set('Content-Type', 'text/html')
  ctx.body = fs.createReadStream(path.resolve(__dirname, 'client', 'index.html'))
})

const ws = sockjs.createServer({ prefix: '/ws' })

const context: Context = {
  boards: new Map(),
  rooms: new Map(),
  players: new Map(),
}

setInterval(() => {
  context.rooms.forEach(room => {
    if (room.date.getTime() < new Date().getTime() - 10 * 60 * 1000) {
      console.log(`Cleaning up ${room.id} room (timeout)`)
      context.rooms.delete(room.id)
    }
  })
}, 1000)

const sendMessageToRoom = (playerId: string, message: string) => {
  // TODO:
}

// TODO: handle socket disconnection (memory leak atm)

ws.on('connection', (sockSocket: any) => {
  let id: string

  const onClose = () => {
    let player = context.players.get(id)
    console.log('ici')
    if (!player) return

    console.log(`Player (${player.name})[${id}] is disconnected, waiting for him to reconnect...`)
    player.disconnected = new Date()
    player.removedAt = new Date(Date.now() + 30000 /* 30sec */)

    setTimeout(() => {
      console.log(`Player (${(player as Player).name})[${id}] is disconnected for 30sec, removing it...`)
      context.players.delete(id);
    }, 30000)
  }

  const socket = createSocket(sockSocket, onClose)

  socket.on('data', async (message: string) => {
    const { type, payload } = JSON.parse(message)
    let reconnection = false

    if (type === 'PONG') return

    // login
    if (type === 'SET_ID') {
      const oldPlayer = context.players.get(payload)
      if (!oldPlayer) {
        socket.send({ type: 'NOTFOUND_ID' })
        return
      }

      id = payload
      reconnection = true
      const player = {
        ...oldPlayer,
        socket,
      }
      context.players.set(id, player)

      socket.send({ type: 'SET_ID', payload })
    }
    if (type === 'GET_ID') {
      id = await getId(context, socket)()
    }
    if (!id) return

    if (type === 'SET_NAME') return setName(context)(id, payload)
    if (type === 'CREATE_ROOM') return createRoom(context)(id)
    if (type === 'JOIN_ROOM') joinRoom(context)(id, payload)
    if (type === 'LEAVE_ROOM') leaveRoom(context)(id, payload)
    if (type === 'START_GAME') startGame(context)(id, payload)
    if (type === 'MESSAGE') sendMessageToRoom(id, payload)

    // one of this types doesn't need sync
    // these are game types
    if (['MOUSE', 'SET_NEWASSET', 'ACTION', 'NEXT', 'CONCEDE'].includes(type)) return

    // what ever the client ask, we try to adjust on its state and send him what it could need
    const player = context.players.get(id)
    if (!player) return
    const room = context.rooms.get(player.roomId as string)
    const board = context.boards.get(player.id)
    const filterMapPlayer = (filter: (player: Player) => any) => {
      return Array.from(context.players.values())
        .filter(filter)
        .map(({ id, name }) => ({ id, name }))
    }
    if (room) {
      if (board) {
        if (reconnection) attachGame(context)(player, room, board)
        player.socket.send({ type: 'START_GAME', payload: room.id })
        player.socket.send({ type: 'SET_PLAYER', payload: player.player })

        return
      }
      player.socket.send(setRoom(context)(room))
      socket.send({ type: 'SET_NAMES', payload: filterMapPlayer(currPlayer => currPlayer.status === 'ROOM' && player.roomId === room.id) })
    } else {
      socket.send({ type: 'SET_ROOMS', payload: Array.from(context.rooms.values()).filter(room => room.status === 'OPEN') })
      socket.send({ type: 'SET_NAMES', payload: filterMapPlayer(currPlayer => currPlayer.status !== 'PLAY') })
    }
  })
})

const server = http.createServer(app.callback())
ws.attach(server)

const PORT = process.env.PORT || 9999
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on ::${PORT}`)
})
