import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'hookrouter'
import SocketContext from '../../server'

const Room = ({ id }) => {
  const [room, setRoom] = useState({})
  const [playerNames, setPlayerNames] = useState({})
  const { playerId, send, register } = useContext(SocketContext)

  useEffect(
    () => {
      register([
        ['SET_ID', () => send({ type: 'JOIN_ROOM', payload: id })],
        ['START_GAME', gameId => navigate(`/game/${gameId}`)],
        ['ROOM_NOTFOUND', () => navigate('/rooms')],
        ['SET_ROOM', room => setRoom(room)],
        ['SET_NAME', ({ id, name }) => setPlayerNames(old => ({ ...old, [id]: name }))],
        ['SET_NAMES', (players) => {
          setPlayerNames(players.reduce(
            (acc, { id, name }) => ({ ...acc, [id]: name }),
            {},
          ))
        }],
      ])
    },
    [],
  )

  useEffect(
    () => {
      send({ type: 'JOIN_ROOM', payload: id })
    },
    [playerId],
  )

  const leave = () => {
    send({ type: 'LEAVE_ROOM', payload: id })
    navigate('/rooms')
  }

  const start = () => {
    send({ type: 'START_GAME', payload: room.id })
  }

  const isOwner = (room.players || []).length > 0 && room.players[0] === playerId

  return (
    <div className="screen">
      <h1>{room.name}</h1>
      <ul>
        <li>full: {room.full ? 'true' : 'false'}</li>
        <li>status: {room.status}</li>
      </ul>

      <h2>Players</h2>
      <ul>
        {(room.players || []).map(id => (
          <li
            key={id}
          >
            {playerNames[id] || 'Anonymous'}
            {isOwner && id !== playerId && (
              <button>
                Kick
              </button>
            )}
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={leave}
        >
          Leave
        </button>
        {isOwner && (
          <button
            onClick={start}
          >
            Start game
          </button>
        )}
      </div>
    </div>
  )
}

export default Room
