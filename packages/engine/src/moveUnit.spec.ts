import moveUnit from './moveUnit'

const createTile = (x: number, y: number): Tile => ({
  x,
  y,
  available: false,
  empty: false,
  gold: 1,
  unit: undefined,
  player: undefined,
  played: false,
})

const createTiles = (width: number, height: number): Tile[][] => {
  const tiles = []

  for (let y = 0; y < height; y += 1) {
    const line: Tile[] = []
    tiles.push(line)

    for (let x = 0; x < width; x += 1) {
      line.push(createTile(x, y))
    }
  }

  return tiles
}

describe('moveUnit', () => {
  it('should mark all tiles as available if there is no selectedUnit', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[1][1].unit = 'king'
    state.tiles[1][1].gold = -39
    state.tiles[1][1].player = 'player1'
    state.tiles[2][2].available = true

    const { tiles } = moveUnit(state, { x: 2, y: 2 })
    expect(tiles[1][1]).toMatchObject({
      unit: 'king',
      gold: -39,
      player: 'player1',
    })
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should move unit on an available tile', () => {
    const state: State = {
      tiles: createTiles(4, 4),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: { x: 2, y: 1 },
      turn: 'player1',
    }

    state.tiles[1][2].unit = 'king'
    state.tiles[1][2].gold = -39
    state.tiles[1][2].player = 'player1'
    state.tiles[2][3].available = true

    const { tiles, selectedUnit } = moveUnit(state, { x: 3, y: 2 })
    expect(selectedUnit).toBeUndefined()
    expect(tiles[2][3]).toMatchObject({
      unit: 'king',
      player: 'player1',
      played: true,
      gold: -39,
    })
    expect(tiles[1][2]).toMatchObject({
      unit: undefined,
      player: 'player1',
      played: true,
      gold: 1,
    })
  })

  it('should not move unit on an unavailable tile', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: { x: 1, y: 1 },
      turn: 'player1',
    }

    state.tiles[1][1].unit = 'king'
    state.tiles[1][1].gold = -39
    state.tiles[1][1].player = 'player1'
    state.tiles[2][2].available = false

    const { tiles, selectedUnit } = moveUnit(state, { x: 2, y: 2 })
    expect(selectedUnit).toBeUndefined()
    expect(tiles[2][2]).toMatchObject({
      available: true,
      unit: undefined,
      player: undefined,
      gold: 1,
      played: false,
    })
    expect(tiles[1][1]).toMatchObject({
      unit: 'king',
      available: true,
      player: 'player1',
      gold: -39,
      played: false,
    })
  })

  it('should mark all tiles as available after move', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: { x: 1, y: 1 },
      turn: 'player1',
    }

    state.tiles[1][1].unit = 'king'
    state.tiles[1][1].gold = -39
    state.tiles[1][1].player = 'player1'
    state.tiles[2][2].available = true

    const { tiles } = moveUnit(state, { x: 2, y: 2 })
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })
})
