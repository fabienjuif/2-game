import React, { createContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import SockJs from 'sockjs-client'

const Context = createContext()

const ServerProvider = ({ children }) => {
  const socket = useRef()
  const socketReady = useRef(false)
  const callbacks = useRef([])
  const [playerId, setPlayerId] = useState()

  const send = (action) => {
    if (!socketReady) return
    if (!socket.current) return
    if (socket.current.readyState !== 1) return

    console.log(`▷  ${action.type.padEnd(15, ' ')} [${new Date().toLocaleTimeString()}]`, action.payload)

    socket.current.send(JSON.stringify(action))
  }

  const register = (cbs) => {
    callbacks.current = [...callbacks.current, ...[].concat(cbs)]
  }

  useEffect(
    () => {
      const setConnection = () => {
        socket.current = new SockJs('/ws')

        socket.current.onopen = function () {
          socketReady.current = true

          const urlParams = new URLSearchParams(window.location.search)

          send({ type: 'GET_ID', payload: urlParams.get('name') })
        }

        socket.current.onmessage = (e) => {
          const action = JSON.parse(e.data)

          console.log(`◀︎  ${action.type.padEnd(15, ' ')} [${new Date().toLocaleTimeString()}]`, action.payload)

          if (action.type === 'SET_ID') setPlayerId(action.payload)

          callbacks.current.forEach(cb => cb(action, { socket: socket.current }))
        }

        socket.current.onclose = () => {
          setConnection()
        }
      }

      setConnection()

      return () => {
        socket.current.close()
      }
    },
    [],
  )

  return (
    <Context.Provider
      value={{
        send,
        register,
        playerId,
      }}
    >
      {children}
    </Context.Provider>
  )
}

ServerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Context
export { ServerProvider }
