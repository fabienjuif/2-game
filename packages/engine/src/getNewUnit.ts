const getNewUnit = (base: UnitType | undefined, next: UnitType): UnitType => {
  if (base === undefined || base === 'house') return next
  if (base === 'villager' && next === 'villager') return 'soldier'
  if (base === 'villager' && next === 'soldier') return 'king'
  return getNewUnit(next, base)
}

export default getNewUnit
