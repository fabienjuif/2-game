import React, { useContext } from 'react'
import TilesContext from '../contexts/tiles'
import './ui.css'

const UI = () => {
  const { next, getPlayer, getGold, setSelectedAsset } = useContext(TilesContext)

  return (
    <div className="ui">
      <div className="infos">
        <h1>2-game</h1>
        <h3>{`${getPlayer()} turn!`}</h3>
        <span>You have {getGold()} golds</span>
      </div>

      <div className="actions">
        <button
          onClick={() => setSelectedAsset('villager')}
        >
          Villager [10 gold / 2 gold per turn]
        </button>
        <button
          onClick={() => setSelectedAsset('soldier')}
        >
          Soldier [20 gold / 5 gold per turn]
        </button>
        <button
          onClick={next}
        >
          {getPlayer() === 'player1' ? 'To player 2' : 'Next turn'}
        </button>
      </div>
    </div>
  )
}

export default UI
