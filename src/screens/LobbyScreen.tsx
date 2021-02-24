import { useState, useContext, FormEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import type { RoomInterface } from 'types'

import { playerStore } from 'store'

type Props = {
  room: RoomInterface
  onLeaveRoom: () => void
  onPlayerReady: (roomId: string, playerName: string) => void
}

export default observer(function LobbyScreen({
  room,
  onLeaveRoom,
  onPlayerReady,
}: Props) {
  const player = useContext(playerStore)

  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onPlayerReady(room.id, name)
  }

  const otherPlayers = room.players.filter(({ id }) => id !== player.id)
  const otherPlayersNames = otherPlayers.map(player => player.name)
  const nameIsValid = name !== '' && !otherPlayersNames.includes(name)

  useEffect(() => {
    if (
      room.players.length >= 2 &&
      room.players.length <= 4 &&
      !room.players.find(player => player.name === '')
    ) {
      console.log('All players ready!')
    }
  }, [room.players])

  return (
    <div className="flex flex-col items-center mt-20 m-x-auto space-y-10">
      <h1 className="text-5xl">{room.id}</h1>

      <form className="flex space-x-3" onSubmit={handleSubmit}>
        <input
          className="py-2 px-3 shadow appearance-none border rounded text-grey-darker"
          placeholder="Your name"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <button
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          disabled={!nameIsValid}
        >
          Ready!
        </button>
      </form>

      <div className="flex flex-col space-y-4">
        {room.players.map(({ id, name }) => (
          <div key={id}>
            {name
              ? `${name} is ready!`
              : `${id === player.id ? 'You are' : 'Someone is'} joining...`}
          </div>
        ))}
      </div>

      <button className="text-sm underline" onClick={onLeaveRoom}>
        Leave room
      </button>
    </div>
  )
})
