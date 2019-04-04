import React, { createContext, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'hookrouter'
import SockJs from 'sockjs-client'

const Context = createContext()

const ServerProvider = ({ children }) => {
  const socket = useRef()
  const socketReady = useRef(false)
  const waitingActions = useRef([])
  const listeners = useRef([])
  const name = useRef(undefined)
  const [playerId, setPlayerId] = useState(window.sessionStorage.getItem('id'))

  const send = (action) => {
    if (!socketReady || !socket.current || socket.current.readyState !== 1) {
      waitingActions.current.push(action)
      return
    }

    console.log(`▷  ${action.type.padEnd(15, ' ')} [${new Date().toLocaleTimeString()}]`, action.payload)

    socket.current.send(JSON.stringify(action))
  }

  const register = (cbs) => {
    listeners.current = [...listeners.current, ...[].concat(cbs)]
  }

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('name') || window.localStorage.getItem('name')
    const urlParams = new URLSearchParams(window.location.search)

    const newName = (urlParams && urlParams.get('name')) || sessionName
    if (!newName || newName === name.current) return

    name.current = newName
    window.sessionStorage.setItem('name', name.current)
    window.localStorage.setItem('name', name.current)

    send({ type: 'SET_NAME', payload: name.current })
  })

  useEffect(
    () => {
      let playerId

      const setConnection = () => {
        socket.current = new SockJs('/ws')

        socket.current.onopen = function () {
          playerId = window.sessionStorage.getItem('id') || window.localStorage.getItem('id')

          if (playerId) send({ type: 'SET_ID', payload: playerId })
          else send({ type: 'GET_ID' })

          socketReady.current = true
        }

        socket.current.onmessage = (e) => {
          const action = JSON.parse(e.data)

          console.log(`◀︎  ${action.type.padEnd(15, ' ')} [${new Date().toLocaleTimeString()}]`, action.payload)

          if (action.type === 'SET_ID') {
            window.sessionStorage.setItem('id', action.payload)
            window.localStorage.setItem('id', action.payload)
            playerId = action.payload
            setPlayerId(action.payload)

            waitingActions.current.forEach(send)
            waitingActions.current = []
          }

          if (action.type === 'NOTFOUND_ID') {
            playerId = undefined
            window.sessionStorage.removeItem('id')
            window.localStorage.removeItem('id')
            navigate('/')
            return
          }

          if (action.type === 'START_GAME') {
            navigate(`/game/${action.payload}`)
            return
          }

          if (action.type === 'SET_ROOM') {
            if (!window.location.pathname.includes('/room/')) {
              if (action.payload.players.includes(playerId)) {
                navigate(`/room/${action.payload.id}`)
                return
              }
            }
          }


          listeners.current
            .filter(([type]) => type === action.type)
            .forEach(([_, reaction]) => reaction(
              action.payload,
              {
                id: (action.type === 'SET_ID' ? action.payload : playerId),
                socket: socket.current,
                action,
              },
            ))
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
