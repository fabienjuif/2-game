import dropAsset from './dropAsset'

const createTile = (x: number, y: number): Tile => ({
  x,
  y,
  available: false,
  empty: false,
  gold: 1,
  unit: undefined,
  player: undefined,
  played: false,
  zone: 'player-0',
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

describe('dropAsset', () => {
  it('should drop an asset on an available tile', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'king',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true

    const { tiles, selectedAsset } = dropAsset(state, { x: 2, y: 2 })
    expect(selectedAsset).toEqual(undefined)
    expect(tiles[2][2]).toMatchObject({
      unit: 'king',
      player: 'player1',
      gold: -39,
    })

    expect(tiles.reduce(
      (acc, line) => acc + line.reduce(
        (acc, tile) => acc + (tile.unit === undefined ? 0 : 1),
        0,
      ),
      0
    )).toEqual(1)
  })

  it('should not drop an asset on an unavailable tile', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'king',
      selectedUnit: undefined,
      turn: 'player1',
    }

    const { tiles } = dropAsset(state, { x: 2, y: 2 })
    expect(tiles[2][2]).toMatchObject({
      unit: undefined,
      player: undefined,
      gold: 1,
    })

    expect(tiles.reduce(
      (acc, line) => acc + line.reduce(
        (acc, tile) => acc + (tile.unit === undefined ? 0 : 1),
        0,
      ),
      0
    )).toEqual(0)
  })

  it('should remove gold price from players', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 21,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'villager',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true

    const { players } = dropAsset(state, { x: 2, y: 2 })
    expect(players[0].gold).toEqual(11)
  })

  it('should mark all tiles as available if no selectedAsset', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 21,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: undefined,
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true
    const { tiles } = dropAsset(state, { x: 2, y: 2 })
    expect(tiles.find(line => !!line.find(tile => !tile.available))).toBeFalsy()
  })

  it('should not be playable when droped on a unit', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'soldier',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true
    state.tiles[2][2].unit = 'house'
    state.tiles[2][2].player = 'player1'

    const { tiles } = dropAsset(state, { x: 2, y: 2 })
    expect(tiles[2][2]).toMatchObject({
      played: true,
      unit: 'soldier',
    })
  })

  it('should not be playable when droped in enemy territory', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'soldier',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true
    state.tiles[2][2].unit = undefined
    state.tiles[2][2].player = 'player2'

    const { tiles } = dropAsset(state, { x: 2, y: 2 })
    expect(tiles[2][2]).toMatchObject({
      played: true,
      unit: 'soldier',
    })
  })

  it('should be playable when droped on an empty tile of its own', () => {
    const state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'soldier',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[2][2].available = true
    state.tiles[2][2].unit = undefined
    state.tiles[2][2].player = 'player1'

    const { tiles } = dropAsset(state, { x: 2, y: 2 })
    expect(tiles[2][2]).toMatchObject({
      played: false,
      unit: 'soldier',
    })
  })

  it('should index house price on amount of already owned houses', () => {
    let state: State = {
      tiles: createTiles(3, 3),
      players: [{
        name: 'player1',
        gold: 1000,
        x: 0,
        y: 0,
        concede: false,
      }],
      selectedAsset: 'house',
      selectedUnit: undefined,
      turn: 'player1',
    }

    state.tiles[1][2].available = true
    state.tiles[1][2].unit = undefined
    state.tiles[1][2].player = 'player1'
    state.tiles[2][1].available = true
    state.tiles[2][1].unit = undefined
    state.tiles[2][1].player = 'player1'
    state.tiles[2][2].available = true
    state.tiles[2][2].unit = undefined
    state.tiles[2][2].player = 'player1'

    // first house (==10)
    state = dropAsset(state, { x: 2, y: 2 })
    expect(state.tiles[2][2]).toMatchObject({
      played: false,
      unit: 'house',
    })
    expect(state.players[0].gold).toEqual(990)

    // second house (==12)
    state = dropAsset({ ...state, selectedAsset: 'house' }, { x: 1, y: 2 })
    expect(state.tiles[2][1]).toMatchObject({
      played: false,
      unit: 'house',
    })
    expect(state.players[0].gold).toEqual(978)

    // third house (==14)
    state = dropAsset({ ...state, selectedAsset: 'house' }, { x: 2, y: 1 })
    expect(state.tiles[1][2]).toMatchObject({
      played: false,
      unit: 'house',
    })
    expect(state.players[0].gold).toEqual(964)
  })
})
