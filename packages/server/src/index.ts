const path = require('path')
const fs = require('fs')
const sockjs = require('@fabienjuif/sockjs')
const http = require('http')
const Koa = require('koa')
const serve = require('koa-static')

import getId from './getId'
import createRoom from './createRoom'
import joinRoom from './joinRoom'
import leaveRoom from './leaveRoom'
import startGame from './startGame'

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

ws.on('connection', (socket: any) => {
  let id: string

  socket.on('data', async (message: string) => {
    const { type, payload } = JSON.parse(message)

    // login
    if (type === 'GET_ID') {
      id = await getId(context, socket)(payload)
      return
    }
    if (!id) return

    // rooms
    if (type === 'CREATE_ROOM') return createRoom(context)(id)
    if (type === 'JOIN_ROOM') return joinRoom(context)(id, payload)
    if (type === 'LEAVE_ROOM') return leaveRoom(context)(id, payload)
    if (type === 'START_GAME') return startGame(context)(id, payload)
    if (type === 'MESSAGE') return sendMessageToRoom(id, payload)
  })
})

const server = http.createServer(app.callback())
ws.attach(server)

const PORT = process.env.PORT || 9999
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on ::${PORT}`)
})
