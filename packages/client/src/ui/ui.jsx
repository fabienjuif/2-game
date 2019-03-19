import React, { useContext } from 'react'
import TilesContext from '../contexts/tiles'
import './ui.css'

const UI = () => {
  const { next, getPlayer } = useContext(TilesContext)

  return (
    <div className="ui">
      <h1>2-game</h1>
      <h3>{`${getPlayer()} turn!`}</h3>

      <button
        onClick={next}
      >
        {getPlayer() === 'player1' ? 'To player 2' : 'Next turn'}
      </button>
    </div>
  )
}

export default UI
