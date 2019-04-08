import React, { useContext, useEffect, useState } from 'react'
import { navigate } from 'hookrouter'
import SocketContext from '../../server'
import './room.css'

const Room = ({ id }) => {
  const [room, setRoom] = useState({})
  const [playerNames, setPlayerNames] = useState({})
  const { playerId, send, register } = useContext(SocketContext)

  useEffect(
    () => {
      register([
        ['SET_ID', () => send({ type: 'JOIN_ROOM', payload: id })],
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
    <div className="screen room">
      <h1>2-game</h1>

      <div className="room">
        <h2>{room.name}</h2>
        <div className="panels">
          <div className="panel left-panel">
            <h3>Players ({(room.players || []).length}/4)</h3>
            <div>
              {(room.players || []).map(id => (
                <div
                  key={id}
                  className="player"
                >
                  {playerNames[id] || 'Anonymous'}
                  {/* {isOwner && id !== playerId && (
                    <button
                      className="kick"
                    >
                      x
                    </button>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          <div className="panel right-panel">
            <button
              className="leave"
              onClick={leave}
            >
              Leave
            </button>
            {isOwner && (
              <button
                className="start"
                onClick={start}
              >
                Start
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
