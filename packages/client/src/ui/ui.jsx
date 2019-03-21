import React, { useContext, Fragment, memo } from 'react'
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
          {Object.entries(balances).map(([player, balance]) => (
            <Fragment>
              <div className="player">{player}:</div>
              <div className="gold">{gold[player]}</div>
              <div className="balance">({balance >= 0 ? '+' : ''}{balance})</div>
            </Fragment>
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

export default memo(UI)
