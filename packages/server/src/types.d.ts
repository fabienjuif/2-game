type PlayerStatus = 'CONNECTION' | 'ROOMS' | 'ROOM' | 'PLAY'
type RoomStatus = 'OPEN' | 'STARTED'

interface Socket {
  id: string,
  on: (...args: any[]) => any,
  send: (message: object | any[]) => void,
  close: () => void,
  isConnected: () => boolean,
}

interface Player {
  id: string,
  name: string,
  status: PlayerStatus,
  roomId: string | undefined,
  player: string | undefined, // player name from game (player1, player2, etc)
  socket: Socket,
  disconnected: Date,
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
