import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { DataInterface } from 'types'

import socket from 'socket'
import { gameStore } from 'store'

import IntroScreen from 'screens/IntroScreen'
import GameScreen from 'screens/GameScreen'
import LobbyScreen from 'screens/LobbyScreen'

export default observer(function App() {
  const game = useContext(gameStore)

  const [data, setData] = useState<DataInterface>()
  const [alreadyConnected, setAlreadyConnected] = useState(false)
  const [currentRoomId, setCurrentRoomId] = useState('')

  function handleJoinRoom(roomId: string) {
    setCurrentRoomId(roomId)
  }

  function handleLeaveRoom() {
    setCurrentRoomId('')
  }

  useEffect(() => {
    if (alreadyConnected) return

    socket.onReceiveData(setData)

    setAlreadyConnected(true)
  }, [alreadyConnected])

  if (typeof data === 'undefined') return null

  const chosenRoom = data.rooms.find(room => room.id === currentRoomId)

  return (
    <>
      {game.isRunning ? (
        <GameScreen />
      ) : chosenRoom ? (
        <LobbyScreen room={chosenRoom} onLeaveRoom={handleLeaveRoom} />
      ) : (
        <IntroScreen rooms={data.rooms} onJoinRoom={handleJoinRoom} />
      )}

      <pre id="data-preview">{JSON.stringify(data, null, 1)}</pre>
    </>
  )
})

/* TODO */
// Allow to reserve a card from CardStack
// Allow to spend gold
// Break game when someone leaves
// Don't allow joining game that already started

/* LATER */
// Limit to three different gems or two same if there are four remaining
// Limit gem amount to 10
// When card row ends, it should stay in place (should have min height)
// Different rules for two and three players
