type PlayerStatus = 'CONNECTION' | 'ROOMS' | 'ROOM' | 'PLAY'
type RoomStatus = 'OPEN' | 'STARTED'

interface Player {
  id: string,
  name: string,
  status: PlayerStatus,
  roomId: string | undefined,
  player: string | undefined,
  socket: any, // TODO: retrieve socket type (from SockJS)
}

interface Room {
  id: string,
  status: RoomStatus,
  full: boolean,
  players: string[],
  date: Date,
}
