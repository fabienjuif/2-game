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
}

interface Player extends Point {
  name: string,
  gold: number,
}

interface State {
  tiles: Tile[][],
  players: Player[],
  selectedAsset: AssetType | undefined,
  selectedUnit: Point | undefined,
  turn: string,
}
