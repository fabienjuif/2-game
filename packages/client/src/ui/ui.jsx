import React, { useContext, useEffect } from 'react'
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
    newAsset,
  } = useContext(TilesContext)

  useEffect(() => {
    const listener = ({ keyCode, repeat }) => {
      if (repeat) return
      if (keyCode === 49) setNewAsset('house')
      if (keyCode === 50) setNewAsset('villager')
      if (keyCode === 51) setNewAsset('soldier')
      if (keyCode === 52) setNewAsset('king')
      if (keyCode === 13) next()
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [setNewAsset, next])

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

      <div className={cn('actions', player)}>
        <button
          onClick={() => setNewAsset('house')}
          className={cn({ selected: newAsset === 'house' })}
        >
          House [10/+10]
        </button>
        <button
          onClick={() => setNewAsset('villager')}
          className={cn({ selected: newAsset === 'villager' })}
        >
          Villager [10/-5]
        </button>
        <button
          onClick={() => setNewAsset('soldier')}
          className={cn({ selected: newAsset === 'soldier' })}
        >
          Soldier [20/-20]
        </button>
        <button
          onClick={() => setNewAsset('king')}
          className={cn({ selected: newAsset === 'king' })}
        >
          King [40/-40]
        </button>
        <button
          onClick={next}
          className="next"
        >
          {player === 'player1' ? 'To player 2' : 'Next turn'}
        </button>
      </div>
    </div>
  )
}

export default UI
