// TODO: rename it board?
import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { random } from '@2-game/utils'

const Context = createContext()

const prices = new Map()
prices.set('villager', 10)
prices.set('soldier', 20)

const giveTileToPlayer = tiles => (tile) => {
  const getPlayer = () => {
    if (tile.player) return tile.player

    const getPlayer = (tx, ty) => tiles[tx] && tiles[tx][ty] && tiles[tx][ty].player && tiles[tx][ty].player

    const { x, y } = tile

    return (
      getPlayer(x - 1, y)
      || getPlayer(x + 1, y)
      || getPlayer(y % 2 ? x : x - 1, y - 1)
      || getPlayer(y % 2 ? x + 1 : x, y - 1)
      || getPlayer(y % 2 ? x : x - 1, y + 1)
      || getPlayer(y % 2 ? x + 1 : x, y + 1)
      || undefined
    )
  }

  return {
    ...tile,
    player: getPlayer(),
  }
}

const getTiles = (width, height) => {
  const tiles = []

  const player1 = {
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
  }

  const player2 = {
    x: Math.round(random(0, Math.ceil(width / 20))),
    y: Math.round(random(0, Math.ceil(height / 15))),
  }

  while (player2.x === player1.x) player2.x = random(0, Math.round(width / 20))

  const maxX = Math.round(width / 20)
  const maxY = Math.round(height / 15)
  for (let i = 0; i < maxX; i += 1) {
    const line = []
    tiles.push(line)

    for (let j = 0; j < maxY; j += 1) {
      let player = undefined
      let object = undefined
      if (player1.x === i && player1.y === j) player = 'player1'
      if (player2.x === i && player2.y === j) player = 'player2'

      if (random(0, 10) === 0) object = 'tree'

      line.push({
        key: `${i}-${j}`,
        x: i,
        y: j,
        player,
        empty: !!(!player && !random(0, (Math.min(i, Math.abs(i - maxX)) + Math.min(j, Math.abs(j - maxY))) / 5)),
        object,
      })
    }
  }

  return tiles.map(line => line.map(giveTileToPlayer(tiles)))
}

const TilesProvider = ({ children, width, height }) => {
  const [tiles, setTiles] = useState(getTiles(width, height))
  const [gold, setGold] = useState(new Map())
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [player, setPlayer] = useState('player1')

  useEffect(() => {
    const gold = new Map()
    gold.set('player1', 30)
    gold.set('player2', 30)
    setGold(gold)
  }, [])

  const next = () => {
    setPlayer(old => old === 'player1' ? 'player2' : 'player1')

    // turn is not over yet
    if (player === 'player1') return

    // turn is over
    // - count gold
    const updateGold = (player, g) => gold.set(player, gold.get(player) + g)
    tiles.forEach(line => line.forEach((tile) => {
      if (!tile.player) return
      if (tile.empty) return

      if (tile.object !== 'tree') updateGold(tile.player, 1)
      if (tile.object === 'villager') updateGold(tile.player, -2)
      if (tile.object === 'soldier') updateGold(tile.player, -5)
    }))

    // after we do balances, if a player as no money left (<0) then, all its units are killed
    gold.forEach((gold, player) => {
      if (gold >= 0) return

      setTiles(tiles => tiles.map(line => line.map((tile) => {
        if (tile.player !== player) return tile
        return {
          ...tile,
          object: 'killed',
        }
      })))
    })
  }

  const action = (x, y) => {
    if (!prices.has(selectedAsset)) return
    if (prices.get(selectedAsset) > gold.get(player)) return

    // cell should be next to a player owned one
    const isSamePlayer = (tx, ty) => tiles[tx] && tiles[tx][ty] && tiles[tx][ty].player === player
    if (
      tiles[x][y].player !== player
      && !(
        isSamePlayer(x - 1, y)
        || isSamePlayer(x + 1, y)
        || isSamePlayer(y % 2 ? x : x - 1, y - 1)
        || isSamePlayer(y % 2 ? x + 1 : x, y - 1)
        || isSamePlayer(y % 2 ? x : x - 1, y + 1)
        || isSamePlayer(y % 2 ? x + 1 : x, y + 1)
      )
    ) {
      return
    }

    // some assets are stronger than other
    if (selectedAsset === 'villager' && tiles[x][y].object && tiles[x][y].object !== 'tree') return

    gold.set(player, gold.get(player) - prices.get(selectedAsset))
    setGold(gold)

    setTiles(tiles => tiles.map((line, tx) => line.map((tile, ty) => {
      if (tx !== x || ty !== y) return tile

      return {
        ...tile,
        object: selectedAsset,
        player,
      }
    })))
  }

  return (
    <Context.Provider
      value={{
        getData: () => tiles,
        getPlayer: () => player,
        getGold: () => gold.get(player),
        getSelectedAsset: () => selectedAsset,
        setSelectedAsset,
        next,
        action,
      }}
    >
      {children}
    </Context.Provider>
  )
}

TilesProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Context
export { TilesProvider }
