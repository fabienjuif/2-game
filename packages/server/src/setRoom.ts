export default (context: Context) => (room: Room) => {
  return {
    type: 'SET_ROOM',
    payload: room,
  }
}
