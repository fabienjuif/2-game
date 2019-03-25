import { GenerateActionPayload } from './actions'
import { random } from '@2-game/utils'
import { isSamePlayerAround } from './utils'

const getPlayers = (payload : GenerateActionPayload): Player[] => {
  const { width, height, players: count } = payload

  const players = Array.from({ length: count }).map((_, index) => ({
    name: `player${index + 1}`,
    gold: 10,
    x: random(0, width),
    y: random(0, height),
  }))

  const positions = new Set()
  players.forEach(({ x, y }) => positions.add([x, y]))

  if (positions.size < count) {
    console.log('Not all players are on the board, retrying...')
    return getPlayers(payload)
  }

  const getDistance = (playerA: Player, playerB: Player): number => Math.sqrt((playerA.x - playerB.x) ** 2 + (playerA.y - playerB.y) ** 2)
  for (let i = 0; i < players.length; i += 1) {
    for (let j = i + 1; j < players.length; j += 1) {
      if (getDistance(players[i], players[j]) < 6) return getPlayers(payload)
    }
  }

  return players
}

const getTiles = (payload: GenerateActionPayload) => (players: Player[]): Tile[][] => {
  const { width, height } = payload

  // first generation
  let tiles: Tile[][] = []
  for (let y = 0; y < height; y += 1) {
    const line: Tile[] = []
    tiles.push(line)

    for (let x = 0; x < width; x += 1) {
      let player = players.find(player => player.x === x && player.y === y)

      let unit: UnitType | undefined = undefined
      if (Math.random() <= 0.10) unit = 'tree'

      line.push({
        x,
        y,
        unit,
        available: true,
        empty: player ? false : Math.random() <= Math.max(0.05, 1 / (Math.min(y, Math.abs(y - height)) + Math.min(x, Math.abs(x - width)) + 1)),
        player: player ? player.name : undefined,
        gold: unit === undefined ? 1 : 0,
        played: false,
      })
    }
  }

  // spread players 1 time
  tiles = tiles.map(line => line.map((tile) => {
    if (tile.empty) return tile

    let player = players.find(({ name }) => isSamePlayerAround(tiles)(tile.x, tile.y, name))

    return {
      ...tile,
      player: player ? player.name : undefined,
    }
  }))

  return tiles
}

const check = ({ players, tiles }: State) => {
  if (players.length < 1) return false

  const tilesPerPlayers: Map<string, number> = new Map()
  const tilesWithoutUnitPerPlayers: Map<string, number> = new Map()
  tiles.forEach(line => line.forEach((tile) => {
    if (!tile.player) return
    if (tile.empty) return

    tilesPerPlayers.set(tile.player, (tilesPerPlayers.get(tile.player) || 0) + 1)

    if (tile.unit) return

    tilesWithoutUnitPerPlayers.set(tile.player, (tilesWithoutUnitPerPlayers.get(tile.player) || 0) + 1)
  }))

  if (tilesPerPlayers.size !== players.length) return false
  if (tilesWithoutUnitPerPlayers.size !== players.length) return false
  if (tilesPerPlayers.values().next().value < 6) return false
  if (tilesWithoutUnitPerPlayers.values().next().value < 2) return false
  if (new Set(tilesPerPlayers.values()).size > 1) return false
  if (new Set(tilesWithoutUnitPerPlayers.values()).size > 1) return false

  return true
}

const iteration = (payload: GenerateActionPayload): State => {
  const players = getPlayers(payload)
  const tiles = getTiles(payload)(players)

  return {
    tiles,
    players,
    selectedAsset: undefined,
    selectedUnit: undefined,
    turn: 'player1',
  }
}

export default (payload: GenerateActionPayload): State => {
  let state: State = {
    players: [],
    tiles: [],
    selectedAsset: undefined,
    selectedUnit: undefined,
    turn: 'player1',
  }

  let retries = -1
  let totalRetries = -1
  let { width, height } = payload
  while (!check(state)) {
    retries += 1
    totalRetries += 1

    if (retries > 100) {
      retries = 0
      width = Math.round(1.2 * width)
      height = Math.round(1.2 * height)
    }

    state = iteration({ ...payload, width, height })
  }

  if (totalRetries > 100) {
    console.log('Generating state took more than 100 retries:', totalRetries, payload, { width, height })
  }

  return state
}
