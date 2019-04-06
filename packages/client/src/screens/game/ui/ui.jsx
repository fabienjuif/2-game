import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import cn from 'classnames'
import BoardContext from '../board'
import './ui.css'

const UI = () => {
  const {
    turn,
    players,
    currentPlayer,
    balances,
    next,
    setNewAsset,
    selectedAsset,
  } = useContext(BoardContext)

  const [disabled, setDisabled] = useState(true)
  const [sizes, setSizes] = useState({})

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

  useLayoutEffect(() => {
    setDisabled(currentPlayer && currentPlayer !== turn)
  }, [currentPlayer, turn])

  useEffect(() => {
    if (!window || !window.document) return

    const canvas = window.document.getElementsByTagName('canvas')
    if (!canvas || canvas.length === 0) return

    const game = canvas[0]
    const rects = game.getClientRects()
    if (!rects || rects.length === 0) return

    const [{ top, left, width, height }] = rects

    setSizes({ width, height });
  })

  return (
    <div className="ui" style={sizes}>
      <div className="infos">
        <h3>{`${turn} turn!`}</h3>

        <div className="balances">
          {players.map(({ name, gold }) => (
            <div
              key={name}
              className={cn(
                'balance',
                {
                  selected: name === turn,
                },
              )}
            >
              <div className="player">{name}:</div>
              <div className="gold">{gold}</div>
              <div className="value">({balances[name] >= 0 ? '+' : ''}{balances[name]})</div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn('actions', turn)}>
        <button
          onClick={() => setNewAsset('house')}
          className={cn({ selected: selectedAsset === 'house' })}
          disabled={disabled}
        >
          House [10/+10]
        </button>
        <button
          onClick={() => setNewAsset('villager')}
          className={cn({ selected: selectedAsset === 'villager' })}
          disabled={disabled}
        >
          Villager [10/-5]
        </button>
        <button
          onClick={() => setNewAsset('soldier')}
          className={cn({ selected: selectedAsset === 'soldier' })}
          disabled={disabled}
        >
          Soldier [20/-20]
        </button>
        <button
          onClick={() => setNewAsset('king')}
          className={cn({ selected: selectedAsset === 'king' })}
          disabled={disabled}
        >
          King [40/-40]
        </button>
        <button
          onClick={() => next()}
          className="next"
          disabled={disabled}
        >
          {turn === 'player1' ? 'To player 2' : 'Next turn'}
        </button>
      </div>
    </div>
  )
}

export default UI
