import './types.d'
import selectAsset from './selectAsset'

const createTile = (x: number, y: number): Tile => ({
  x,
  y,
  available: true,
  empty: false,
  gold: 1,
  unit: undefined,
  player: undefined,
})

const createTiles = (width, height): Tile[][] => {
  const tiles = []

  for (let y = 0; y < height; y += 1) {
    const line = []
    tiles.push(line)

    for (let x = 0; x < width; x += 1) {
      line.push(createTile(x, y))
    }
  }

  return tiles
}

describe('selectAsset', () => {
  it('should select the asset', () => {
    const state: State = {
      tiles: [],
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
    const { selectedAsset } = selectAsset(state, 'villager')
    expect(selectedAsset).toEqual('villager')
  })

  it('should unselect the unit', () => {
    const state: State = {
      tiles: [],
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: { x: 0, y: 0 },
      turn: 'player1',
    }
    const { selectedUnit } = selectAsset(state, 'villager')
    expect(selectedUnit).toBeUndefined()
  })

  describe('house', () => {
    it('should mark availables owned tiles', () => {
      const state: State = {
        players: [{
          name: 'player1',
          gold: 1000,
          x: 0,
          y: 0,
        }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'

      const { tiles } = selectAsset(state, 'house')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(1)
      expect(tiles[3][3].available).toBe(true)
    })

    it('should not let a house be droped on a owned tile with a unit on it', () => {
      const state: State = {
        players: [{
          name: 'player1',
          gold: 1000,
          x: 0,
          y: 0,
        }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      // villager
      state.tiles[3][3].player = 'player1'
      state.tiles[3][3].unit = 'villager'
      let { tiles } = selectAsset(state, 'house')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(0)

      // tree
      state.tiles[3][3].unit = 'tree'
      tiles = selectAsset(state, 'house').tiles
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(0)
    })
  })

  describe('villager', () => {
    it('can be droped around its cells', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'

      const { tiles } = selectAsset(state, 'villager')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be droped on a owned unit (except trees)', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      // villager
      state.tiles[3][3].player = 'player1'
      state.tiles[3][3].unit = 'house'
      let { tiles } = selectAsset(state, 'villager')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)

      // tree
      state.tiles[3][3].unit = 'tree'
      tiles = selectAsset(state, 'villager').tiles
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be be droped on an enemy house', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[3][4].player = 'player2'
      state.tiles[3][4].unit = 'house'

      const { tiles } = selectAsset(state, 'villager')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can be droped to a cell that is surrounded by something <= at him', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[5][2].player = 'player2'
      state.tiles[5][2].unit = 'villager'

      const { tiles } = selectAsset(state, 'villager')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be droped to a cell that is surrounded by something > at him', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[5][2].player = 'player2'
      state.tiles[5][2].unit = 'soldier'

      const { tiles } = selectAsset(state, 'villager')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })
  })

  describe('soldier', () => {
    it('can be droped around its cells', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'

      const { tiles } = selectAsset(state, 'soldier')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be droped on a owned unit (except trees)', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      // villager
      state.tiles[3][3].player = 'player1'
      state.tiles[3][3].unit = 'house'
      let { tiles } = selectAsset(state, 'soldier')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)

      // tree
      state.tiles[3][3].unit = 'tree'
      tiles = selectAsset(state, 'soldier').tiles
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can be be droped on an enemy house', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[3][4].player = 'player2'
      state.tiles[3][4].unit = 'house'

      const { tiles } = selectAsset(state, 'soldier')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can be droped to a cell that is surrounded by something <= at him', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[5][2].player = 'player2'
      state.tiles[5][2].unit = 'villager'

      const { tiles } = selectAsset(state, 'soldier')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be droped to a cell that is surrounded by something > at him', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[5][2].player = 'player2'
      state.tiles[5][2].unit = 'king'

      const { tiles } = selectAsset(state, 'soldier')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })
  })

  describe('king', () => {
    it('can be droped around its cells', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'

      const { tiles } = selectAsset(state, 'king')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can not be droped on a owned unit (except trees)', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      // villager
      state.tiles[3][3].player = 'player1'
      state.tiles[3][3].unit = 'house'
      let { tiles } = selectAsset(state, 'king')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(6)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)

      // tree
      state.tiles[3][3].unit = 'tree'
      tiles = selectAsset(state, 'soldier').tiles
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can be be droped on an enemy house', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[3][4].player = 'player2'
      state.tiles[3][4].unit = 'house'

      const { tiles } = selectAsset(state, 'king')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })

    it('can be droped to all cells that is surrounded by something', () => {
      const state: State = {
        players: [{ name: 'player1', gold: 1000, x: 0, y: 0, }],
        selectedAsset: undefined,
        selectedUnit: undefined,
        turn: 'player1',
        tiles: createTiles(10, 10),
      }

      state.tiles[3][3].player = 'player1'
      state.tiles[5][2].player = 'player2'
      state.tiles[5][2].unit = 'king'

      const { tiles } = selectAsset(state, 'king')
      expect(tiles.reduce(
        (acc, line) => acc + line.reduce(
          (acc, tile) => acc + (tile.available ? 1 : 0),
          0,
        ),
        0
      )).toEqual(7)
      expect(tiles[3][3].available).toBe(true)
      expect(tiles[3][4].available).toBe(true)
      expect(tiles[3][2].available).toBe(true)
      expect(tiles[2][3].available).toBe(true)
      expect(tiles[2][4].available).toBe(true)
      expect(tiles[4][3].available).toBe(true)
      expect(tiles[4][4].available).toBe(true)
    })
  })

  it('should not select asset if not enough gold to pay it (also mark all tiles as availables)', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 0,
        x: 0,
        y: 0,
      }],
      selectedAsset: undefined,
      selectedUnit: undefined,
      turn: 'player1',
    }

    const { tiles, selectedAsset } = selectAsset(state, 'king')
    expect(selectedAsset).toBeUndefined()
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })
})
