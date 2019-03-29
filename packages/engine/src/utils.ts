const tileExists = (tiles: Tile[][]) => (x: number, y: number): boolean => !!(tiles[y] && tiles[y][x] && !tiles[y][x].empty)
const isSamePlayer = (tiles: Tile[][]) => (x: number, y: number, player: string): boolean => tileExists(tiles)(x, y) && tiles[y][x].player === player
const isOneOfEnemyUnits = (tiles: Tile[][]) => (x: number, y: number, player: string, units: UnitType[]): boolean => !!(tileExists(tiles)(x, y) && tiles[y][x].player !== player && tiles[y][x].unit && units.includes(tiles[y][x].unit as UnitType))
const isOneOfAlliedUnits = (tiles: Tile[][]) => (x: number, y: number, player: string, units: UnitType[]): boolean => !!(tileExists(tiles)(x, y) && tiles[y][x].player === player && tiles[y][x].unit && units.includes(tiles[y][x].unit as UnitType))

const getAroundArea = (x: number, y: number) => [
  [x, y],
  [x - 1, y],
  [x + 1, y],
  [x, y - 1],
  [(y % 2 === 1 ? x + 1 : x - 1), y - 1],
  [x, y + 1],
  [(y % 2 === 1 ? x + 1 : x - 1), y + 1],
]

export const isSamePlayerAround = (tiles: Tile[][]) => (x: number, y: number, player: string): boolean => !!getAroundArea(x, y).find(([x, y]) => isSamePlayer(tiles)(x, y, player))
export const isOneOfEnemyUnitsAround = (tiles: Tile[][]) => (x: number, y: number, player: string, units: UnitType[]): boolean => !!getAroundArea(x, y).find(([x, y]) => isOneOfEnemyUnits(tiles)(x, y, player, units))
export const isOneOfAlliedUnitsAround = (tiles: Tile[][]) => (x: number, y: number, player: string, units: UnitType[]): boolean => !!getAroundArea(x, y).find(([x, y]) => isOneOfAlliedUnits(tiles)(x, y, player, units))

export const getEmptyTilesAround = (tiles: Tile[][]) => (x: number, y: number) => getAroundArea(x, y).filter(([x, y]) => tileExists(tiles)(x, y) && tiles[y][x].unit === undefined)

export const getUnitBalance = (unit: UnitType): number => {
  switch (unit) {
    case 'house': return 10
    case 'villager': return -5
    case 'soldier': return -20
    case 'king': return -40
    case 'tree': return -1
    default: throw new Error(`unknown unit balance: ${unit}`)
  }
}

export const getUnitCost = (unit: UnitType): number => {
  switch (unit) {
    case 'house': return 10
    case 'villager': return 10
    case 'soldier': return 20
    case 'king': return 40
    default: throw new Error(`unknown unit cost: ${unit}`)
  }
}
