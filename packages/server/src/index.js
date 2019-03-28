const sockjs = require('@fabienjuif/sockjs')
const engine = require('@2-game/engine').default
const http = require('http')

const board = engine({ width: 12, height: 12, players: 2 })

const ws = sockjs.createServer({ prefix: '/ws' })

let player = 1

ws.on('connection', (conn) => {
  conn.write(JSON.stringify({ type: 'SET_PLAYER', payload: `player${player}` }))
  player += 1
  if (player > 2) player = 1

  let state
  const sendState = () => {
    const newState = board.getState()
    if (newState !== state) conn.write(JSON.stringify({ type: 'SYNC', payload: newState }))
    state = newState
  }
  board.subscribe(sendState)
  sendState()

  conn.on('data', (message) => {
    const { type, payload } = JSON.parse(message)

    if (type === 'NEXT') return board.next()
    if (type === 'SET_NEWASSET') return board.selectAsset(payload)
    if (type === 'ACTION') return board.actionOnTile(payload)
  })
})

const server = http.createServer()
ws.attach(server)

server.listen(9999, '0.0.0.0', () => {
  console.log('Listening on ::9999')
})
