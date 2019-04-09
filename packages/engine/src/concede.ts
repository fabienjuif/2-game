// TODO: tests
import next from './next'

export default (state: State) => {
  return next({
    ...state,
    tiles: state.tiles.map(line => line.map((tile) => {
      if (tile.player !== state.turn) return tile
      return {
        ...tile,
        player: undefined,
        unit: undefined,
        gold: 1,
      }
    })),
    players: state.players.map((player) => {
      if (player.name !== state.turn) return player
      return {
        ...player,
        gold: 0,
        concede: true,
      }
    })
  })
}
