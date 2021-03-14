import type { Server, Socket } from 'socket.io'

import type {
  RoomInterface,
  CardInterface,
  DataInterface,
  NobleInterface,
  PlayerDataForRoomInterface,
} from '../src/types'

console.log('Hello from server')

const io: Server = require('socket.io')(1987, { cors: { origin: '*' } })

const data: DataInterface = {
  rooms: [
    {
      id: 'Room 1',
      players: [],
      gameInProgress: false,
    },
    {
      id: 'Room 2',
      players: [],
      gameInProgress: false,
    },
    {
      id: 'Room 3',
      players: [],
      gameInProgress: false,
    },
    {
      id: 'Room 4',
      players: [],
      gameInProgress: false,
    },
  ],
  players: [],
}

const getIndexes = (
  data: DataInterface,
  roomId: RoomInterface['id'],
  playerId?: PlayerDataForRoomInterface['id']
) => {
  const roomIndex = data.rooms.findIndex(room => room.id === roomId)
  const playerIndex = data.rooms[roomIndex].players.findIndex(
    player => player.id === playerId
  )

  return { roomIndex, playerIndex }
}

io.on('connection', (socket: Socket) => {
  console.log(`${socket.id}: -- connected --`)
  socket.emit('receive data', data)

  socket.on(
    'join room',
    (roomId: RoomInterface['id'], player: PlayerDataForRoomInterface) => {
      socket.join(roomId)

      const { roomIndex } = getIndexes(data, roomId)

      data.rooms[roomIndex].players.push(player)
      data.players.push({ socketId: socket.id, roomId, playerId: player.id })

      io.emit('receive data', data)
    }
  )

  socket.on(
    'leave room',
    (
      roomId: RoomInterface['id'],
      playerId: PlayerDataForRoomInterface['id']
    ) => {
      const { roomIndex, playerIndex } = getIndexes(data, roomId, playerId)

      data.rooms[roomIndex].players.splice(playerIndex, 1)
      data.players.splice(playerIndex, 1)

      io.emit('receive data', data)
      socket.leave(roomId)
    }
  )

  socket.on(
    'update player',
    (roomId: RoomInterface['id'], player: PlayerDataForRoomInterface) => {
      const { roomIndex, playerIndex } = getIndexes(data, roomId, player.id)

      data.rooms[roomIndex].players[playerIndex] = player

      io.to(roomId).emit('receive data', data)
    }
  )

  socket.on(
    'send initial game data',
    (
      roomId: RoomInterface['id'],
      cardIds: CardInterface['id'][],
      noblesIds: NobleInterface['id'][]
    ) => {
      const { roomIndex } = getIndexes(data, roomId)

      io.to(roomId).emit(
        'initial game data',
        data.rooms[roomIndex].players,
        cardIds,
        noblesIds
      )
    }
  )

  socket.on('disconnect', () => {
    console.log(`${socket.id}: -- disconnected --`)

    const playerToDisconnect = data.players.find(
      player => player.socketId === socket.id
    )

    if (!playerToDisconnect) return

    const { roomIndex, playerIndex } = getIndexes(
      data,
      playerToDisconnect.roomId,
      playerToDisconnect.playerId
    )

    data.rooms[roomIndex].players.splice(playerIndex, 1)
    data.players.splice(playerIndex, 1)

    io.emit('receive data', data)
  })
})
