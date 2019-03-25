import './types.d'
import selectUnit from './selectUnit'

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

describe('selectUnit', () => {
  it('should select the given unit', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player1'
    state.tiles[3][3].played = false
    state.tiles[3][3].unit = 'villager'

    const { selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual({ x: 3, y: 3 })
  })

  it('should not select the tile if there is not unit on it and mark all surrounded tiles as available', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player1'
    state.tiles[3][3].played = false
    state.tiles[3][3].unit = undefined

    const { tiles, selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual(undefined)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should not select the already played unit and mark all surrounded tiles as available', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player1'
    state.tiles[3][3].played = true
    state.tiles[3][3].unit = 'villager'

    const { tiles, selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual(undefined)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should not select an enemy unit and mark all surrounded tiles as available', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player2'
    state.tiles[3][3].played = false
    state.tiles[3][3].unit = 'villager'

    const { tiles, selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual(undefined)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should not select a tree and mark all surrounded tiles as available', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player1'
    state.tiles[3][3].played = false
    state.tiles[3][3].unit = 'tree'

    const { tiles, selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual(undefined)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should not select a house and mark all surrounded tiles as available', () => {
    const state: State = {
      tiles: createTiles(5, 5),
      players: [],
      turn: 'player1',
      selectedAsset: undefined,
      selectedUnit: undefined,
    }

    state.tiles[3][3].player = 'player1'
    state.tiles[3][3].played = false
    state.tiles[3][3].unit = 'house'

    const { tiles, selectedUnit } = selectUnit(state, { x: 3, y: 3 })
    expect(selectedUnit).toEqual(undefined)
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })
})
