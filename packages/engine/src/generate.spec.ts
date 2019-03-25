import generate from './generate'

const TIMES = process.env.CI ? 100 : 5

const times = test => () => {
  for (let i = 0; i < TIMES; i += 1) {
    test()
  }
}

describe('generation', () => {
  it('should generate the right amount of tiles', times(() => {
    const count = tiles => tiles.reduce((acc, line) => acc + line.length, 0)
    const testTiles = (width, height) => {
      const { tiles } = generate({ width, height, players: 1 })
      expect(count(tiles)).toBeGreaterThanOrEqual(width * height)
      expect(tiles.length).toBeGreaterThanOrEqual(height)
      expect(tiles[0].length).toBeGreaterThanOrEqual(width)
    }

    testTiles(100, 100)
    testTiles(200, 100)
    testTiles(100, 200)
  }))

  it('should give same tiles for all the players, and at least 6 tiles', times(() => {
    const { tiles } = generate({ width: 30, height: 30, players: 3 })

    const player1Tiles = []
    const player2Tiles = []
    const player3Tiles = []

    tiles.forEach(line => line.forEach(tile => {
      if (tile.player === 'player1') player1Tiles.push(tile)
      if (tile.player === 'player2') player2Tiles.push(tile)
      if (tile.player === 'player3') player3Tiles.push(tile)
    }))

    expect(player1Tiles.length).toBeGreaterThan(5)
    expect(player1Tiles.length).toEqual(player2Tiles.length)
    expect(player2Tiles.length).toEqual(player3Tiles.length)

    const filterNoUnit = tile => tile.unit === undefined && !tile.empty

    expect(player1Tiles.filter(filterNoUnit).length).toEqual(player2Tiles.filter(filterNoUnit).length)
    expect(player2Tiles.filter(filterNoUnit).length).toEqual(player3Tiles.filter(filterNoUnit).length)
  }))

  it('should give 10 gold for each players', () => {
    const { players } = generate({ width: 30, height: 30, players: 2 })

    players.forEach(player => {
      expect(player.gold).toEqual(10)
    })
  })

  it('should generate ~10% of tree', times(() => {
    const width = 100
    const height = 100
    const { tiles } = generate({ width, height, players: 1 })
    const trees = []
    tiles.forEach(line => line.forEach(tile => {
      if (tile.unit === 'tree') trees.push(tile)
    }))

    expect(trees.length).toBeGreaterThan((width * height) * 0.08) // greater than 8%
    expect(trees.length).toBeLessThan((width * height) * 0.12) // less than 12%
  }))

  it('should generate ~5% of empty cells', times(() => {
    const width = 100
    const height = 100
    const { tiles } = generate({ width, height, players: 1 })
    const empty = []
    tiles.forEach(line => line.forEach(tile => {
      if (tile.empty) empty.push(tile)
    }))

    expect(empty.length).toBeGreaterThan((width * height) * 0.03) // greater than 3%
    expect(empty.length).toBeLessThan((width * height) * 0.08) // less than 8%
  }))

  it('should separate players at least 5 cells from each others start point', times(() => {
    const { players } = generate({ width: 30, height: 30, players: 3 })

    const getDistance = (playerA, playerB) => Math.sqrt((playerA.x - playerB.x)**2 + (playerA.y - playerB.y)**2)
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
