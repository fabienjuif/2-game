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
