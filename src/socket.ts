import { io } from 'socket.io-client'

import type {
  RoomInterface,
  CardInterface,
  DataInterface,
  NobleInterface,
  PlayerDataForRoomInterface,
} from 'types'

const socketIo = io('ws://localhost:1987')

const socket = {
  onReceiveData(callback: (data: DataInterface) => void) {
    socketIo.on('receive data', callback)
  },
  offReceiveData() {
    socketIo.off('receive data')
  },
  onInitialGameData(
    callback: (
      players: PlayerDataForRoomInterface[],
      cardIds: CardInterface['id'][],
      noblesIds: NobleInterface['id'][]
    ) => void
  ) {
    socketIo.on('initial game data', callback)
  },
  offInitialGameData() {
    socketIo.off('initial game data')
  },
  emitJoinRoom(
    roomId: RoomInterface['id'],
    playerDataForRoom: PlayerDataForRoomInterface
  ) {
    socketIo.emit('join room', roomId, playerDataForRoom)
  },
  emitUpdatePlayer(
    roomId: RoomInterface['id'],
    playerDataForRoom: PlayerDataForRoomInterface
  ) {
    socketIo.emit('update player', roomId, playerDataForRoom)
  },
  emitLeaveRoom(
    roomId: RoomInterface['id'],
    playerId: PlayerDataForRoomInterface['id']
  ) {
    socketIo.emit('leave room', roomId, playerId)
  },
  emitSendInitialGameData(
    roomId: RoomInterface['id'],
    cardIds: CardInterface['id'][],
    noblesIds: NobleInterface['id'][]
  ) {
    socketIo.emit('send initial game data', roomId, cardIds, noblesIds)
  },
}

export default socket
