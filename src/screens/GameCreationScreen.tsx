import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import type { DataInterface } from 'types'

import { Player } from 'store'

const socket = io('ws://localhost:1987')

export default function GameCreationScreen() {
  const [data, setData] = useState<DataInterface>()
  const [name, setName] = useState('')
  const [alreadyConnected, setAlreadyConnected] = useState(false)

  function joinRoom(id: string) {
    const player = new Player({ name })
    socket.emit('join game', id, player)
  }

  function updateData(data: DataInterface) {
    setData(data)
  }

  useEffect(() => {
    if (alreadyConnected) return

    socket.on('receive data', updateData)

    socket.on('connect', () => {
      console.log(`${socket.id}: -- connected --`)
    })

    setAlreadyConnected(true)
  }, [alreadyConnected])

  if (typeof data === 'undefined') return null

  return (
    <>
      <div className="flex flex-col items-center m-auto">
        <h1 className="text-6xl">Splendee</h1>

        <input
          className="mt-10 py-2 px-3 shadow appearance-none border rounded text-grey-darker"
          placeholder="Your name"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <div className="flex flex-col items-center mt-10 space-y-4">
          {data.rooms.map(room => (
            <button
              key={room.number}
              disabled={name === '' || room.players.length === 4}
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => joinRoom(room.id)}
            >
              Join room {room.number} ({room.players.length}/4)
            </button>
          ))}
        </div>

        <a
          className="text-sm underline mt-2"
          href="https://017aae6e-7d2b-4a50-9dfc-d78eced3774e.filesusr.com/ugd/59baa2_17984c1d5d0b45a6ae3cdc695c0a864e.pdf"
        >
          Game rules
        </a>
      </div>

      <pre id="pre" className="text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}
