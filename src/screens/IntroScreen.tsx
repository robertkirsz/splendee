import { useContext } from 'react'

import type { Socket } from 'socket.io-client'
import type { RoomInterface } from 'types'

import { playerStore } from 'store'

type Props = {
  socket: Socket
  rooms: RoomInterface[]
  onJoinRoom: (id: string) => void
}

export default function GameCreationScreen({
  socket,
  rooms = [],
  onJoinRoom,
}: Props) {
  const player = useContext(playerStore)

  function handleJoinRoom(roomId: string) {
    onJoinRoom(roomId)
    socket.emit('join room', roomId, player)
  }

  return (
    <div className="flex flex-col items-center mt-20 m-x-auto space-y-10">
      <h1 className="text-6xl">Splendee</h1>

      <div id="rooms-grid">
        {rooms.map(room => (
          <button
            key={room.id}
            disabled={room.gameInProgress || room.players.length === 4}
            className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handleJoinRoom(room.id)}
          >
            {room.id}
            <br />
            {room.gameInProgress
              ? 'Game in progress'
              : `(${room.players.length}/4)`}
          </button>
        ))}
      </div>

      <a
        className="text-sm underline"
        href="https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_17984c1d5d0b45a6ae3cdc695c0a864e.pdf"
      >
        Game rules
      </a>
    </div>
  )
}
