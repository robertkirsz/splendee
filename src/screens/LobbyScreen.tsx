import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import type { Socket } from 'socket.io-client'
import type { RoomInterface } from 'types'

import { playerStore } from 'store'
import useDebounce from 'hooks/useDebounce'

type Props = {
  socket: Socket
  room: RoomInterface
  onLeaveRoom: () => void
}

export default observer(function LobbyScreen({
  socket,
  room,
  onLeaveRoom,
}: Props) {
  const player = useContext(playerStore)

  const [playerName, setPlayerName] = useState('')
  const debouncedPlayerName = useDebounce(playerName)

  const otherPlayers = room.players.filter(({ id }) => id !== player.id)
  const otherPlayersNames = otherPlayers.map(player => player.name)
  const nameIsValid =
    playerName !== '' && !otherPlayersNames.includes(playerName)

  function handlePlayerReady() {
    player.setIsReady(!player.isReady)
    socket.emit('update player', room.id, player)
  }

  function handleLeaveRoom() {
    player.setName('')
    player.setIsReady(false)
    socket.emit('leave room', room.id, player.id)
    onLeaveRoom()
  }

  useEffect(() => {
    if (
      debouncedPlayerName !== player.name &&
      !otherPlayersNames.includes(debouncedPlayerName)
    ) {
      player.setName(debouncedPlayerName)
      socket.emit('update player', room.id, player)
    }
  }, [debouncedPlayerName, player, room.id, socket, otherPlayersNames])

  useEffect(() => {
    if (
      room.players.length >= 2 &&
      room.players.length <= 4 &&
      !room.players.find(player => !player.isReady)
    ) {
      console.log('All players ready!')
    }
  }, [room.players])

  return (
    <div className="flex flex-col items-center mt-20 m-x-auto space-y-10">
      <h1 className="text-5xl">{room.id}</h1>

      <div className="flex flex-col space-y-3">
        <input
          className="py-2 px-3 shadow appearance-none border rounded text-grey-darker"
          placeholder="Your name"
          value={playerName}
          onChange={event => setPlayerName(event.target.value)}
        />

        <button
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          disabled={!nameIsValid}
          onClick={handlePlayerReady}
        >
          {player.isReady ? 'Not ready' : 'Ready'}
        </button>
      </div>

      <div className="flex flex-col space-y-4 text-center">
        {room.players.map(({ id, name, isReady }) => (
          <div key={id}>
            {isReady
              ? `${name} is ready!`
              : name
              ? `${name} joined`
              : `${id === player.id ? 'You are' : 'Someone is'} joining...`}
          </div>
        ))}
      </div>

      <button className="text-sm underline" onClick={handleLeaveRoom}>
        Leave room
      </button>
    </div>
  )
})
