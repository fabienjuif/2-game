import React, { useEffect, useState, useContext } from 'react'
import { navigate } from 'hookrouter'
import SocketContext from '../../server'
import './rooms.css'

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
      register([
        ['JOIN_ROOM', roomId => navigate(`/room/${roomId}`)],
        ['SET_ROOM', room => addRoom(room)],
        ['SET_ROOMS', rooms => setRooms(rooms)],
        ['SET_NAME', name => setName(name)],
        ['SET_NAMES', names => setNames(names)],
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
        <div
          key={room.id}
        >
          <h3>{room.name}</h3>

          <button
            onClick={() => navigate(`/room/${room.id}`)}
          >
            Join
          </button>

          <div>players:</div>
          <div>
            {room.players.map(id => (
              <div
                key={id}
              >
                {players[id]}
              </div>
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
