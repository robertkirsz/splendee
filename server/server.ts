import type { Server, Socket } from 'socket.io'

import type {
  CardInterface,
  DataInterface,
  NobleInterface,
  PlayerInterface,
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

const getIndexes = (data: DataInterface, roomId: string, playerId?: string) => {
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
    (roomId: string, player: PlayerDataForRoomInterface) => {
      const { roomIndex } = getIndexes(data, roomId)

      data.rooms[roomIndex].players.push(player)
      data.players.push({ socketId: socket.id, roomId, playerId: player.id })

      io.emit('receive data', data)
    }
  )

  socket.on('leave room', (roomId: string, playerId: string) => {
    const { roomIndex, playerIndex } = getIndexes(data, roomId, playerId)

    data.rooms[roomIndex].players.splice(playerIndex, 1)
    data.players.splice(playerIndex, 1)

    io.emit('receive data', data)
  })

  socket.on('update player', (roomId: string, player: PlayerInterface) => {
    const { roomIndex, playerIndex } = getIndexes(data, roomId, player.id)

    data.rooms[roomIndex].players[playerIndex] = player

    io.emit('receive data', data)
  })

  socket.on(
    'send initial game data',
    (
      roomId: string,
      cardIds: CardInterface['id'][],
      noblesIds: NobleInterface['id'][]
    ) => {
      const { roomIndex } = getIndexes(data, roomId)
      io.emit(
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
