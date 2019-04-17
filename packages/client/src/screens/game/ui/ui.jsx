import React, { useRef, useContext, useEffect, useLayoutEffect, useState } from 'react'
import cn from 'classnames'
import { getUnitCost, getUnitBalance } from '@2-game/engine'
import BoardContext from '../board'
import './ui.css'

const AssetButton = ({ children }) => {
  const {
    tiles,
    turn,
    setNewAsset,
    selectedAsset,
    currentPlayer,
    players,
  } = useContext(BoardContext)

  if (!tiles) return null
  const player = players.find(({ name }) => name === turn)
  if (!player) return null

  const cost = getUnitCost(children, { tiles }, { name: turn })
  const balance = getUnitBalance(children)
  const disabled = (
    (currentPlayer && currentPlayer !== turn)
    || cost > player.gold
  )

  return (
    <button
      onClick={() => setNewAsset(children)}
      className={cn({ selected: selectedAsset === children })}
      disabled={disabled}
    >
      {children} [{cost}/{balance >= 0 ? '+' : ''}{balance}]
    </button>
  )
}

const UI = () => {
  const {
    turn,
    players,
    currentPlayer,
    balances,
    next,
    setNewAsset,
    concede,
  } = useContext(BoardContext)

  const [disabled, setDisabled] = useState(true)
  const [sizes, setSizes] = useState({})
  const [time, setTime] = useState()
  const interval = useRef()

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
    setTime(20)
    const start = Date.now()
    if (interval.current) clearInterval(interval.current)
    interval.current = setInterval(
      () => setTime(Math.ceil(20 - (Date.now() - start) / 1000)),
      500,
    )
  }, [turn])

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

    const [{ width, height }] = rects

    setSizes({ width, height });
  })

  return (
    <div className="ui" style={sizes}>
      <div className="infos">
        <h3>{`${turn} turn!`} {`(${time} secs)`}</h3>

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
        <AssetButton>house</AssetButton>
        <AssetButton>villager</AssetButton>
        <AssetButton>soldier</AssetButton>
        <AssetButton>king</AssetButton>

        <button
          onClick={() => concede()}
          className="concede"
          disabled={disabled}
        >
          😵Concede
        </button>

        <button
          onClick={() => next()}
          className="next"
          disabled={disabled}
        >
          Next turn
        </button>
      </div>
    </div>
  )
}

export default UI
