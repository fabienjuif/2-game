import React, { useContext } from 'react'
import cn from 'classnames'
import TilesContext from '../contexts/tiles'
import './ui.css'

const UI = () => {
  const {
    player,
    gold,
    balances,
    next,
    setNewAsset,
  } = useContext(TilesContext)

  return (
    <div className="ui">
      <div className="infos">
        <h1>2-game</h1>
        <h3>{`${player} turn!`}</h3>

        <div className="balances">
          {Object.entries(balances).map(([currPlayer, balance]) => (
            <div
              key={currPlayer}
              className={cn(
                'balance',
                {
                  selected: currPlayer === player,
                },
              )}
            >
              <div className="player">{currPlayer}:</div>
              <div className="gold">{gold[currPlayer]}</div>
              <div className="value">({balance >= 0 ? '+' : ''}{balance})</div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button
          onClick={() => setNewAsset('house')}
        >
          House [10gold / +10 gold per turn]
        </button>
        <button
          onClick={() => setNewAsset('villager')}
        >
          Villager [10 gold / -5 gold per turn]
        </button>
        <button
          onClick={() => setNewAsset('soldier')}
        >
          Soldier [20 gold / -20 gold per turn]
        </button>
        <button
          onClick={() => setNewAsset('king')}
        >
          King [40 gold / -40 gold per turn]
        </button>
        <button
          onClick={next}
        >
          {player === 'player1' ? 'To player 2' : 'Next turn'}
        </button>
      </div>
    </div>
  )
}

export default UI
