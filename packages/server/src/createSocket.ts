const HEARTBEAT_TIMEOUT = 500
const HEARTBEAT_INTERVAL = 250

export default (socket: any, onClose: Function): Socket => {
  let timeout: NodeJS.Timeout | undefined
  let nextPing: NodeJS.Timeout | undefined
  let connected = true

  // wrappers
  const send = (message: any) => socket.write(JSON.stringify(message))
  const on = (...args: any[]) => socket.on(...args)
  const isConnected = () => connected
  const close = () => {
    console.log(`Closing socket ${socket.id}...`)
    onClose()

    connected = false
    if (timeout) clearTimeout(timeout)
    if (nextPing) clearTimeout(nextPing)
    socket.close()
  }

  // heartbeating
  const ping = () => {
    send({ type: 'PING' })

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(close, HEARTBEAT_TIMEOUT)
  }
  on('data', (message: string) => {
    const { type } = JSON.parse(message)
    if (type !== 'PONG') return

    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    if (nextPing) {
      clearTimeout(nextPing)
      nextPing = undefined
    }

    nextPing = setTimeout(ping, HEARTBEAT_INTERVAL)
  })
  ping()

  return {
    send,
    on,
    close,
    isConnected,
    id: socket.id,
  }
}
