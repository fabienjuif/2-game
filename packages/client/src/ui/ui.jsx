import React, { useContext } from 'react'
import TilesContext from '../contexts/tiles'
import './ui.css'

const UI = () => {
  const { next } = useContext(TilesContext)

  return (
    <div className="ui">
      <h1>2-game</h1>

      <button
        onClick={next}
      >
        next turn
      </button>
    </div>
  )
}

export default UI
