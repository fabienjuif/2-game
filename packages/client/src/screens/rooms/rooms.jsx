import React, { useEffect, useState, useContext } from 'react'
import { navigate } from 'hookrouter'
import SocketContext from '../../server'
import './rooms.css'

// TODO: socket should not be connected twice (here and in game)
// TODO: it should be shared across screens

const Rooms = () => {
  const { playerId, send, register } = useContext(SocketContext)
  const [rooms, setRooms] = useState([])
  const [players, setPlayers] = useState({})

  const addRoom = (room) => {
    setRooms((oldRooms) => {
      const rooms = oldRooms.filter(({ id }) => id !== room.id)
      if (room.players.length === 0) return rooms
      return [...rooms, room]
    })
  }

  const setName = ({ id, name }) => {
    setPlayers((oldPlayers) => ({ ...oldPlayers, [id]: name }))
  }

  const setNames = (players) => {
    players.forEach(setName)
  }

  useEffect(
    () => {
      register((action, socket) => {
        const { type, payload } = action

        if (type === 'SET_ROOM') return addRoom(payload)
        if (type === 'SET_ROOMS') return setRooms(payload)
        if (type === 'START_GAME') return navigate(`/game/${payload}`)
        if (type === 'SET_NAME') return setName(payload)
        if (type === 'SET_NAMES') return setNames(payload)
      })
    },
    [],
  )

  return (
    <div className="screen">
      2-game

      You are: {players[playerId]}

      <button
        onClick={() => send({ type: 'CREATE_ROOM' })}
      >
        Create room
      </button>

      <h2>Rooms</h2>
      {rooms.map(room => (
        <div>
          <h3>{room.name}</h3>

          {room.players.includes(playerId) || (
            <button
              onClick={() => send({ type: 'JOIN_ROOM', payload: room.id })}
            >
              Join
            </button>
          )}

          {room.players.includes(playerId) && (
            <button
              onClick={() => send({ type: 'LEAVE_ROOM', payload: room.id })}
            >
              Leave
            </button>
          )}

          {room.players.includes(playerId) && room.players[0] === playerId && (
            <button
              onClick={() => send({ type: 'START_GAME', payload: room.id })}
            >
              Start
            </button>
          )}

          <div>players:</div>
          <div>
            {room.players.map(playerId => (
              <div>{players[playerId]}</div>
            ))}
          </div>
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/game/local')
        }}
      >
        <input
          type="text"
          required
          placeholder="pseudo"
        />
        <button
          type="submit"
        >
          Go online
        </button>
      </form>
    </div>
  )
}

export default Rooms
