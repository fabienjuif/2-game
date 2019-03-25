import './types.d'
import next from './next'

const createTile = (x: number, y: number): Tile => ({
  x,
  y,
  available: false,
  empty: false,
  gold: 3,
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

describe('next', () => {
  it('should take the next user', () => {
    let state: State = {
      tiles: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
      players: [
        {
          name: 'player1',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player2',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player3',
          gold: 10,
          x: 0,
          y: 0,
        },
      ],
    }

    state = next(state)
    expect(state.turn).toEqual('player2')
    state = next(state)
    expect(state.turn).toEqual('player3')
    state = next(state)
    expect(state.turn).toEqual('player1')
  })

  it('should count gold balance for the player that pass its turn', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
      players: [
        {
          name: 'player1',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player2',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player3',
          gold: 10,
          x: 0,
          y: 0,
        },
      ],
    }

    state.tiles[0][0].player = 'player1'
    state.tiles[0][0].gold = 12
    state.tiles[0][1].player = 'player1'
    state.tiles[0][1].gold = 7
    state.tiles[2][1].player = 'player2'
    state.tiles[2][1].gold = -5

    const { players } = next(state)
    expect(players.map(({ gold }) => gold)).toEqual([
      29,
      10,
      10,
    ])
  })

  it('should mark all tiles as availables', () => {
    const state: State = {
      tiles: createTiles(10, 10),
      players: [{
        name: 'player1',
        gold: 10,
        x: 0,
        y: 0,
      }],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    const { tiles } = next(state)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should unset selected unit & asset', () => {
    const state: State = {
      tiles: createTiles(10, 10),
      players: [{
        name: 'player1',
        gold: 10,
        x: 0,
        y: 0,
      }],
      turn: 'player1',
      selectedAsset: 'king',
      selectedUnit: {
        x: 0,
        y: 0,
      },
    }

    const { selectedAsset } = next(state)
    expect(selectedAsset).toBeUndefined()
  })

  it('should kill units if the player do not have enough gold', () => {
    const state: State = {
      tiles: createTiles(10, 10),
      selectedAsset: undefined,
      selectedUnit: undefined,
      players: [
        {
          name: 'player1',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player2',
          gold: 10,
          x: 0,
          y: 0,
        },
      ],
      turn: 'player1',
    }

    state.tiles[0][0].player = 'player1'
    state.tiles[0][0].unit = 'king'
    state.tiles[0][0].gold = -39

    state.tiles[1][0].player = 'player2'
    state.tiles[1][0].unit = 'soldier'
    state.tiles[1][0].gold = -19

    const { tiles } = next(state)
    expect(tiles.find(line => !!line.find(tile => tile.unit === 'king'))).toBeFalsy()
    expect(tiles[0][0]).toMatchObject({
      gold: 1,
      unit: 'grave',
      player: 'player1',
    })
    expect(tiles[1][0]).toMatchObject({
      player: 'player2',
      unit: 'soldier',
      gold: -19,
    })
  })

  it('should remove all graves', () => {
    const state: State = {
      tiles: createTiles(10, 10),
      selectedAsset: undefined,
      selectedUnit: undefined,
      players: [
        {
          name: 'player1',
          gold: 10,
          x: 0,
          y: 0,
        },
        {
          name: 'player2',
          gold: 10,
          x: 0,
          y: 0,
        },
      ],
      turn: 'player1',
    }

    state.tiles[0][0].unit = 'grave'

    const { tiles } = next(state)
    expect(tiles.find(line => !!line.find(tile => tile.unit === 'grave'))).toBeFalsy()
  })
})
