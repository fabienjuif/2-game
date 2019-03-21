// TODO: rename it board?
import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { random } from '@2-game/utils'
import BALANCES from './balances'
import PRICES from './prices'

const Context = createContext()

const giveTileToPlayer = tiles => (tile) => {
  const getPlayer = () => {
    if (tile.empty) return undefined
    if (tile.player) return tile.player

    // TODO: this code is duplicated
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

const getGold = () => ({
  player1: 30,
  player2: 30,
})

const TilesProvider = ({ children, width, height }) => {
  const [tiles, setTiles] = useState(getTiles(width, height))
  const [gold, setGold] = useState(getGold())
  const [newAsset, setNewAsset] = useState(null)
  const [selectedUnit, setSelectedUnit] = useState(null)
  const [player, setPlayer] = useState('player1')

  const setAvailableTiles = () => {
    setTiles(tiles => {
      const isSamePlayer = (tx, ty) => tiles[tx] && tiles[tx][ty] && tiles[tx][ty].player === player

      return tiles.map(line => line.map((tile) => {
        if (!newAsset && !selectedUnit) return { ...tile, isAvailable: true }

        const { x, y } = tile

        const isAvailable = (
          tile.player === player
          || isSamePlayer(x - 1, y)
          || isSamePlayer(x + 1, y)
          || isSamePlayer(y % 2 ? x : x - 1, y - 1)
          || isSamePlayer(y % 2 ? x + 1 : x, y - 1)
          || isSamePlayer(y % 2 ? x : x - 1, y + 1)
          || isSamePlayer(y % 2 ? x + 1 : x, y + 1)
        )

        return {
          ...tile,
          isAvailable,
        }
      }))
    })
  }

  useEffect(setAvailableTiles, [player, newAsset, selectedUnit])

  const getBalances = () => {
    const balances = Object.keys(gold).reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
    const updateBalance = (player, g) => {
      if (!balances[player]) balances[player] = 0
      balances[player] += g
    }

    tiles.forEach(line => line.forEach((tile) => {
      if (!tile.player) return
      if (tile.empty) return

      if (tile.object !== 'tree') updateBalance(tile.player, BALANCES.get('default'))
      if (BALANCES.has(tile.object)) updateBalance(tile.player, BALANCES.get(tile.object))
    }))

    return balances
  }


  const next = () => {
    setPlayer(old => old === 'player1' ? 'player2' : 'player1')
    setNewAsset(null)
    setSelectedUnit(null)

    // turn is not over yet
    if (player === 'player1') return

    // turn is over
    // - count gold
    const balances = getBalances()
    const newGold = Object.entries(gold).reduce(
      (acc, [player, gold]) => ({ ...acc, [player]: gold + balances[player] }),
      {},
    )
    setGold(newGold)
    // - after we do balances, if a player as no money left (<0) then, all its units are killed
    Object.entries(newGold).forEach(([player, gold]) => {
      if (gold >= 0) return

      setTiles(tiles => tiles.map(line => line.map((tile) => {
        if (tile.player !== player) return tile
        if (tile.object === 'tree') return tile

        return {
          ...tile,
          object: 'killed',
        }
      })))
    })
    // - plant some trees
    setTiles(tiles => tiles.map(line => line.map((tile) => {
      if (tile.object) return tile

      return {
        ...tile,
        object: random(0, 20) === 0 ? 'tree' : undefined,
      }
    })))
  }

  const placeNewAsset = (x, y) => {
    if (!newAsset) return false
    if (!PRICES.has(newAsset)) return false
    if (PRICES.get(newAsset) > gold[player]) return false

    // cell should be next to a player owned one
    // TODO: this code is duplicated
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
      return false
    }

    // some assets are stronger than other
    if (newAsset === 'villager' && tiles[x][y].object && tiles[x][y].object !== 'tree') return false
    if (newAsset === 'house' && tiles[x][y].object && tiles[x][y].object !== 'tree') return false

    // some assets can't be placed in a board that is not owned
    if (newAsset === 'house' && tiles[x][y].player !== player) return false

    gold[player] -= PRICES.get(newAsset)
    setGold(gold)

    setTiles(tiles => tiles.map((line, tx) => line.map((tile, ty) => {
      if (tx !== x || ty !== y) return tile

      return {
        ...tile,
        object: newAsset,
        player,
      }
    })))

    setAvailableTiles()

    return true
  }

  const moveUnit = (x, y) => {
    if (!selectedUnit) return false

    // max 4 cells of movement
    if (Math.sqrt((x - selectedUnit.x)**2 + (y - selectedUnit.y)**2) > 4) return false

    // the targeted cell must be next to the player owned cells
    // TODO: this code is duplicated
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

    console.log('moving unit to ', x, y)

    setTiles(tiles => tiles.map((line, tx) => line.map((tile, ty) => {
      if (tx === x && ty === y) {
        return {
          ...tile,
          object: selectedUnit.object,
          player: selectedUnit.player,
        }
      }

      if (tx === selectedUnit.x && ty === selectedUnit.y) {
        return {
          ...tile,
          object: undefined,
        }
      }

      return tile
    })))

    setSelectedUnit(null)

    return true
  }

  const selectUnit = (x, y) => {
    const tile = tiles[x][y]
    if (tile.player !== player) return false
    if (!['villager', 'soldier'].includes(tile.object)) return false

    console.log('selecting unit from', x, y)

    setSelectedUnit(tile)
    setNewAsset(null)

    return true
  }

  const action = (x, y) => {
    setAvailableTiles()
    return (
      selectUnit(x, y)
      || moveUnit(x, y)
      || placeNewAsset(x, y)
    )
  }

  return (
    <Context.Provider
      value={{
        tiles,
        player,
        gold,
        newAsset,
        // getBalances,
        setNewAsset,
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
