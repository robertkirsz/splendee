import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import type { RoomInterface } from 'types'

import { MINIMUM_PLAYERS, MAXIMUM_PLAYERS } from 'rules'
import { log } from 'utils'
import socket from 'socket'
import { gameStore, playerStore } from 'store'
import useDebounce from 'hooks/useDebounce'
import Div from 'components/Div'

type Props = {
  room: RoomInterface
}

export default observer(function LobbyScreen({ room }: Props) {
  const game = useContext(gameStore)
  const player = useContext(playerStore)

  const [playerName, setPlayerName] = useState('')
  const debouncedPlayerName = useDebounce(playerName)

  const host = room.players[0]
  const isHost = host.id === player.id
  const otherPlayers = room.players.filter(({ id }) => id !== player.id)
  const otherPlayersNames = otherPlayers.map(player => player.name)
  const nameIsValid = playerName !== '' && !otherPlayersNames.includes(playerName)
  const allPlayersReady = !room.players.find(player => !player.isReady)
  const properNumberOfPlayers =
    room.players.length >= MINIMUM_PLAYERS && room.players.length <= MAXIMUM_PLAYERS
  const gameCanBeStarted = allPlayersReady && properNumberOfPlayers

  function togglePlayerReady() {
    player.setIsReady(!player.isReady)
    socket.emitUpdatePlayer(room.id, player.dataForRoom)
  }

  function handleLeaveRoom() {
    player.setName('')
    player.setIsReady(false)
    socket.emitLeaveRoom(room.id, player.id)
  }

  function initializeGame() {
    log('Sending initial game data!')
    const { cardIds, noblesIds } = game.drawCards(room.players.length)
    socket.emitSendInitialGameData(room.id, cardIds, noblesIds)
  }

  useEffect(() => {
    if (debouncedPlayerName !== player.name && !otherPlayersNames.includes(debouncedPlayerName)) {
      player.setName(debouncedPlayerName)
      socket.emitUpdatePlayer(room.id, player.dataForRoom)
    }
  }, [debouncedPlayerName, player, room.id, otherPlayersNames])

  return (
    <div className="flex flex-col items-center mt-20 m-x-auto space-y-10">
      <h1 className="text-5xl">{room.id}</h1>

      <Div columnTop width={260}>
        <input
          className="py-2 px-3 shadow appearance-none border rounded text-grey-darker"
          placeholder="Your name"
          value={playerName}
          disabled={player.isReady}
          onChange={event => setPlayerName(event.target.value)}
        />

        <Div listLeft>
          <button
            className="flex-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            disabled={!nameIsValid}
            onClick={togglePlayerReady}
          >
            {player.isReady ? 'Not ready' : 'Ready'}
          </button>

          <button
            className="flex-1 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-gray-600 rounded shadow ripple hover:shadow-lg hover:bg-gray-700 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={handleLeaveRoom}
            disabled={player.isReady}
          >
            Leave room
          </button>
        </Div>
      </Div>

      <Div columnTop width={260}>
        <Div columnTop height={130} padding="4px 8px" radius={8} border="1px solid">
          {room.players.map(({ id, name, isReady }) => {
            const isYou = id === player.id
            const personName = isYou ? 'You' : name || 'Someone'
            const toBe = isYou ? 'are' : 'is'
            const isHost = host.id === id ? ' (host)' : ''
            const status = isReady ? 'ready!' : 'joining...'

            return (
              <div key={id}>
                {personName}
                {isHost} {toBe} {status}
              </div>
            )
          })}
        </Div>

        <span className="text-center">
          {gameCanBeStarted
            ? isHost
              ? 'You can start the game now'
              : 'Waiting for host to start the game'
            : 'Waiting for players to get ready'}
        </span>
      </Div>

      {isHost && (
        <button
          className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          disabled={!gameCanBeStarted}
          onClick={initializeGame}
        >
          Start the game
        </button>
      )}
    </div>
  )
})
