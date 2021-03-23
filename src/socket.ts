import { io } from 'socket.io-client'

import type {
  GameInterface,
  RoomInterface,
  CardInterface,
  DataInterface,
  NobleInterface,
  PlayerDataForRoomInterface,
  PlayerInterface,
  GemColorsType,
} from 'types'

import { Message } from 'types'

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
      gameId: string,
      roomId: RoomInterface['id'],
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
  emitJoinRoom(roomId: RoomInterface['id'], playerDataForRoom: PlayerDataForRoomInterface) {
    socketIo.emit('join room', roomId, playerDataForRoom)
  },
  emitUpdatePlayer(roomId: RoomInterface['id'], playerDataForRoom: PlayerDataForRoomInterface) {
    socketIo.emit('update player', roomId, playerDataForRoom)
  },
  emitLeaveRoom(roomId: RoomInterface['id'], playerId: PlayerDataForRoomInterface['id']) {
    socketIo.emit('leave room', roomId, playerId)
  },
  emitSendInitialGameData(
    roomId: RoomInterface['id'],
    cardIds: CardInterface['id'][],
    noblesIds: NobleInterface['id'][]
  ) {
    socketIo.emit('send initial game data', roomId, cardIds, noblesIds)
  },
  emitChangeActivePlayer(
    roomId: RoomInterface['id'],
    activePlayerId: PlayerInterface['id'],
    currentRound: GameInterface['currentRound']
  ) {
    socketIo.emit('change active player', roomId, activePlayerId, currentRound)
  },
  onChangeActivePlayer(
    callback: (
      activePlayerId: PlayerInterface['id'],
      currentRound: GameInterface['currentRound']
    ) => void
  ) {
    socketIo.on('change active player', callback)
  },
  offChangeActivePlayer() {
    socketIo.off('change active player')
  },
  emitSyncGems(
    roomId: RoomInterface['id'],
    playerId: PlayerInterface['id'],
    gems: GemColorsType[]
  ) {
    socketIo.emit('sync gems', roomId, playerId, gems)
  },
  onSyncGems(callback: (playerId: PlayerInterface['id'], gems: GemColorsType[]) => void) {
    socketIo.on('sync gems', callback)
  },
  offSyncGems() {
    socketIo.off('sync gems')
  },
  emitSyncCards(roomId: RoomInterface['id'], playerId: PlayerInterface['id'], card: CardInterface) {
    socketIo.emit('sync cards', roomId, playerId, card)
  },
  onSyncCards(callback: (playerId: PlayerInterface['id'], card: CardInterface) => void) {
    socketIo.on('sync cards', callback)
  },
  offSyncCards() {
    socketIo.off('sync cards')
  },
  emitSendMessage(roomId: RoomInterface['id'], message: Message) {
    socketIo.emit('send message', roomId, message)
  },
  onSendMessage(callback: (message: Message) => void) {
    socketIo.on('send message', callback)
  },
  offSendMessage() {
    socketIo.off('send message')
  },
}

export default socket
