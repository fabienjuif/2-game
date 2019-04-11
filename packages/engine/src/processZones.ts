// TODO: tests

import { getShortestPath } from '@2-game/astar'
import { getTilesAround } from './utils'

export default (state: State, { x, y }: Point): State => {
  // zone might be cut down
  // 1. retrieve cells around target
  // 2. for each different players
  // 2a. reset its zones
  // 2b. first cells found is the new zone "playerX-0"
  // 2b. test cells pairs with a star
  // 2c. if the target cell is not reachable, create a new zone for it
  //     - else its zone is the source zone
  // 2d. once all cells are tested the zones with more gold becomes the "main" zone
  // 2e. the main zone is kept, the other zones are wiped out (unit is deleted, tile becomes neutral)
  // 3. return new state
  const aroundTiles = getTilesAround(state.tiles)(x, y)
  const impactedPlayers = aroundTiles.reduce(
    (acc, curr) => {
      if (!curr.player) return acc
      if (acc.includes(curr.player)) return acc
      return [...acc, curr.player]
    },
    [] as string[],
  )
  let { tiles } = state
  impactedPlayers.forEach((playerName) => {
    // player tiles can be muted because there are copied tiles from loop after
    const playerTiles: Tile[] = []

    tiles = tiles.map(line => line.map((tile) => {
      if (tile.player !== playerName) return tile

      let newTile = {
        ...tile,
        zone: undefined
      }

      newTile.zone = undefined
      playerTiles.push(newTile)

      return newTile
    }))

    // from here tiles can be muted since there are copied in the loop before
    let zoneIndex = 0
    const getNextZone = () => {
      const zone = `${playerName}-${zoneIndex}`
      zoneIndex += 1
      return zone
    }

    const goldPerZone = new Map()
    for (let i = 0; i < playerTiles.length; i += 1) {
      const start = playerTiles[i]
      if (!start.zone) start.zone = getNextZone()

      if (!goldPerZone.has(start.zone)) goldPerZone.set(start.zone, start.gold)
      else goldPerZone.set(start.zone, goldPerZone.get(start.zone) + start.gold)

      for (let j = i + 1; j < playerTiles.length; j += 1) {
        const end = playerTiles[j]
        if (end.zone) continue;

        const path = getShortestPath(
          tiles,
          start,
          end,
          ({ x, y }) => {
            if (tiles[y][x].player !== start.player) return Infinity
            return 1
          }
        )

        if (path.length === 0) continue
        else end.zone = start.zone
      }
    }

    let zoneWithMoreGold: string
    goldPerZone.forEach((gold, zone) => {
      if (!zoneWithMoreGold) {
        zoneWithMoreGold = zone
        return
      }

      if (goldPerZone.get(zoneWithMoreGold) < gold) {
        zoneWithMoreGold = zone
      }
    })

    playerTiles.forEach((tile) => {
      if (tile.zone === zoneWithMoreGold) return
      tile.unit = undefined
      tile.player = undefined
      tile.gold = 1
      tile.played = false
    })

  })

  return {
    ...state,
    tiles,
  }
}
