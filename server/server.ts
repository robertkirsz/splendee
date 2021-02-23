import type { Server, Socket } from 'socket.io'
import type { DataInterface, PlayerInterface } from '../src/types'

console.log('Hello from server')

const io: Server = require('socket.io')(1987, { cors: { origin: '*' } })

const data: DataInterface = {
  rooms: [
    {
      id: 'room_1',
      number: 1,
      players: [],
    },
    {
      id: 'room_2',
      number: 2,
      players: [],
    },
    {
      id: 'room_3',
      number: 3,
      players: [],
    },
    {
      id: 'room_4',
      number: 4,
      players: [],
    },
  ],
  players: [],
}

io.on('connection', (socket: Socket) => {
  console.log(`${socket.id}: -- connected --`)
  socket.emit('receive data', data)

  socket.on('join game', (id: string, player: PlayerInterface) => {
    const roomIndex = data.rooms.findIndex(room => room.id === id)
    data.rooms[roomIndex].players.push(player)
    data.players.push({ socketId: socket.id, roomId: id, playerId: player.id })
    io.emit('receive data', data)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id}: -- disconnected --`)

    const playerToDisconnect = data.players.find(
      player => player.socketId === socket.id
    )

    if (!playerToDisconnect) return

    const roomIndex = data.rooms.findIndex(
      room => room.id === playerToDisconnect.roomId
    )

    const playerIndex = data.rooms[roomIndex].players.findIndex(
      player => player.id === playerToDisconnect.playerId
    )

    data.rooms[roomIndex].players.splice(playerIndex, 1)
    data.players.splice(playerIndex, 1)

    socket.broadcast.emit('receive data', data)
  })
})
