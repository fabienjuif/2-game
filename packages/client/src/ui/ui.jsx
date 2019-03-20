import React, { useContext, Fragment } from 'react'
import TilesContext from '../contexts/tiles'
import './ui.css'

const UI = () => {
  const {
    getPlayer,
    getGold,
    getBalances,
    next,
    setNewAsset,
  } = useContext(TilesContext)

  const gold = getGold()

  return (
    <div className="ui">
      <div className="infos">
        <h1>2-game</h1>
        <h3>{`${getPlayer()} turn!`}</h3>

        <div className="balances">
          {Object.entries(getBalances()).map(([player, balance]) => (
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
          House [10gold / +10gold per turn]
        </button>
        <button
          onClick={() => setNewAsset('villager')}
        >
          Villager [10 gold / -2 gold per turn]
        </button>
        <button
          onClick={() => setNewAsset('soldier')}
        >
          Soldier [20 gold / -5 gold per turn]
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
