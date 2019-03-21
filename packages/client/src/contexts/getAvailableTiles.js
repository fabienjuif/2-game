const getAvailableTiles = (tiles, player) => {
  const isSamePlayer = (tx, ty) => tiles[tx] && tiles[tx][ty] && tiles[tx][ty].player === player

  const availableTiles = []

  tiles.forEach(line => line.forEach(({ x, y }) => {
    if (tiles[x][y].empty) return
    if (
      tiles[x][y].player === player
      || (
        isSamePlayer(x - 1, y)
        || isSamePlayer(x + 1, y)
        || isSamePlayer(y % 2 ? x : x - 1, y - 1)
        || isSamePlayer(y % 2 ? x + 1 : x, y - 1)
        || isSamePlayer(y % 2 ? x : x - 1, y + 1)
        || isSamePlayer(y % 2 ? x + 1 : x, y + 1)
      )
    ) {
      availableTiles.push(tiles[x][y])
    }
  }))

  return availableTiles
}

export default getAvailableTiles
