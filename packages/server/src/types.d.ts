type PlayerStatus = 'CONNECTION' | 'ROOMS' | 'ROOM' | 'PLAY'
type RoomStatus = 'OPEN' | 'STARTED'

interface Player {
  id: string,
  name: string,
  status: PlayerStatus,
  roomId: string | undefined,
  player: string | undefined, // player name from game (player1, player2, etc)
  socket: any, // TODO: retrieve socket type (from SockJS)
}

interface Room {
  id: string,
  name: string,
  status: RoomStatus,
  full: boolean,
  players: string[],
  date: Date,
  bus: any, // TODO: retrieve events (node) bus type
}

interface Context {
  boards: Map<string, Object>, // TODO: import Board type from 'engine'
  players: Map<string, Player>,
  rooms: Map<string, Room>,
}
