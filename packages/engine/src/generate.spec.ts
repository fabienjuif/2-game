import generate from './generate'

const TIMES = process.env.CI ? 100 : 5

const times = (test: Function) => () => {
  for (let i = 0; i < TIMES; i += 1) {
    test()
  }
}

describe('generation', () => {
  it('should generate the right amount of tiles', times(() => {
    const count = (tiles: Tile[][]) => tiles.reduce((acc, line) => acc + line.length, 0)
    const testTiles = (width: number, height: number) => {
      const { tiles } = generate({ width, height, players: 1 })
      expect(count(tiles)).toBeGreaterThanOrEqual(width * height)
      expect(tiles.length).toBeGreaterThanOrEqual(height)
      expect(tiles[0].length).toBeGreaterThanOrEqual(width)
    }

    testTiles(100, 100)
    testTiles(200, 100)
    testTiles(100, 200)
  }))

  it('should generate 1 house per player', () => {
    const { tiles, players } = generate({ width: 30, height: 30, players: 3 })

    const houseTiles: Tile[] = []
    tiles.forEach(line => line.forEach((tile) => {
      if (tile.unit === 'house') houseTiles.push(tile)
    }))

    expect(houseTiles).toHaveLength(3)
    houseTiles.sort((a, b) => {
      if (!a.player) return -1
      if (!b.player) return -1

      return a.player.localeCompare(b.player)
    })
    expect(houseTiles[0]).toMatchObject({
      unit: 'house',
      player: 'player1',
      x: players[0].x,
      y: players[0].y,
    })
    expect(houseTiles[1]).toMatchObject({
      unit: 'house',
      player: 'player2',
      x: players[1].x,
      y: players[1].y,
    })
    expect(houseTiles[2]).toMatchObject({
      unit: 'house',
      player: 'player3',
      x: players[2].x,
      y: players[2].y,
    })
  })

  it('should give same tiles for all the players, and at least 6 tiles', times(() => {
    const { tiles } = generate({ width: 30, height: 30, players: 3 })

    const player1Tiles: Tile[] = []
    const player2Tiles: Tile[] = []
    const player3Tiles: Tile[] = []

    tiles.forEach(line => line.forEach(tile => {
      if (tile.player === 'player1') player1Tiles.push(tile)
      if (tile.player === 'player2') player2Tiles.push(tile)
      if (tile.player === 'player3') player3Tiles.push(tile)
    }))

    expect(player1Tiles.length).toBeGreaterThan(5)
    expect(player1Tiles.length).toEqual(player2Tiles.length)
    expect(player2Tiles.length).toEqual(player3Tiles.length)

    const filterNoUnit = (tile: Tile) => tile.unit === undefined && !tile.empty

    expect(player1Tiles.filter(filterNoUnit).length).toEqual(player2Tiles.filter(filterNoUnit).length)
    expect(player2Tiles.filter(filterNoUnit).length).toEqual(player3Tiles.filter(filterNoUnit).length)
  }))

  it('should give 10 gold for for first player, 20 for second, etc', () => {
    const { players } = generate({ width: 30, height: 30, players: 3 })

    expect(players[0].gold).toEqual(10)
    expect(players[1].gold).toEqual(20)
    expect(players[2].gold).toEqual(30)
  })

  it('should generate ~5% of tree', times(() => {
    const width = 100
    const height = 100
    const { tiles } = generate({ width, height, players: 1 })
    const trees = []
    tiles.forEach(line => line.forEach(tile => {
      if (tile.unit === 'tree') trees.push(tile)
    }))

    expect(trees.length).toBeGreaterThan((width * height) * 0.04) // greater than 4%
    expect(trees.length).toBeLessThan((width * height) * 0.6) // less than 6%
  }))

  it('should generate ~10% of empty cells', times(() => {
    const width = 100
    const height = 100
    const { tiles } = generate({ width, height, players: 1 })
    const empty = []
    tiles.forEach(line => line.forEach(tile => {
      if (tile.empty) empty.push(tile)
    }))

    expect(empty.length).toBeGreaterThan((width * height) * 0.09) // greater than 9%
    expect(empty.length).toBeLessThan((width * height) * 0.11) // less than 11%
  }))

  it('should separate players at least 5 cells from each others start point', times(() => {
    const { players } = generate({ width: 30, height: 30, players: 3 })

    const getDistance = (playerA: Player, playerB: Player) => Math.sqrt((playerA.x - playerB.x)**2 + (playerA.y - playerB.y)**2)
    expect(getDistance(players[0], players[1])).toBeGreaterThan(5)
    expect(getDistance(players[0], players[2])).toBeGreaterThan(5)
    expect(getDistance(players[1], players[2])).toBeGreaterThan(5)
  }))

  it('should set all tiles as available', () => {
    const { tiles } = generate({ width: 15, height: 15, players: 2 })
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it.skip('should generate a battlefield where all player can see each others', () => {
  })
})
