import React, { useEffect, useState, useContext } from 'react'
import { navigate } from 'hookrouter'
import SocketContext from '../../server'
import './rooms.css'

const Rooms = () => {
  const { playerId, send, register } = useContext(SocketContext)
  const [rooms, setRooms] = useState([])
  const [players, setPlayers] = useState({})

  const addRoom = (room, { id }) => {
    console.log(room, id)
    if (room.players.includes(id)) return navigate(`/room/${room.id}`)

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
      register([
        ['SET_ROOM', addRoom],
        ['SET_ROOMS', setRooms],
        ['SET_NAME', setName],
        ['SET_NAMES', setNames],
      ])
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
              onClick={() => navigate(`/room/${room.id}`)}
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
