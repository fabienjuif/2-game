interface Action {
  type: string,
}

type AssetType = 'house' | 'villager' | 'soldier' | 'king'
type UnitType = 'tree' | 'grave' | AssetType

interface Point {
  x: number,
  y: number,
}

interface Tile extends Point {
  available: boolean,
  empty: boolean,
  player: string | undefined,
  unit: UnitType | undefined,
  gold: number,
  played: boolean,
  zone: string | undefined,
}

interface Player extends Point {
  name: string,
  gold: number,
  concede: boolean,
}

interface State {
  tiles: Tile[][],
  players: Player[],
  selectedAsset: AssetType | undefined,
  selectedUnit: Point | undefined,
  turn: string,
}

interface Board {
  subscribe: Function,
  getState: () => State,
  selectAsset: (assetType: AssetType) => [boolean, State],
  next: () => [boolean, State],
  actionOnTile: (tile: Point) => [boolean, State],
}
