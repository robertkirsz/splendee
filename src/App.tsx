import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { io } from 'socket.io-client'

import type { DataInterface } from 'types'

import { playerStore } from 'store'

import IntroScreen from 'screens/IntroScreen'
import GameScreen from 'screens/GameScreen'
import LobbyScreen from 'screens/LobbyScreen'

const socket = io('ws://localhost:1987')

export default observer(function App() {
  const player = useContext(playerStore)

  const [data, setData] = useState<DataInterface>()
  const [alreadyConnected, setAlreadyConnected] = useState(false)
  const [currentRoomId, setCurrentRoomId] = useState('')

  const gameExists = false

  function handleJoinRoom(roomId: string) {
    setCurrentRoomId(roomId)
    socket.emit('join room', roomId, player)
  }

  function handleLeaveRoom() {
    player.setName('')
    setCurrentRoomId('')
    socket.emit('leave room', currentRoomId, player.id)
  }

  function handlePlayerReady(roomId: string, playerName: string) {
    player.setName(playerName)
    socket.emit('player ready', roomId, player)
  }

  useEffect(() => {
    if (alreadyConnected) return

    socket.on('receive data', setData)

    setAlreadyConnected(true)
  }, [alreadyConnected])

  if (typeof data === 'undefined') return null

  const chosenRoom = data.rooms.find(room => room.id === currentRoomId)

  return (
    <>
      {chosenRoom ? (
        <LobbyScreen
          room={chosenRoom}
          onLeaveRoom={handleLeaveRoom}
          onPlayerReady={handlePlayerReady}
        />
      ) : gameExists ? (
        <GameScreen />
      ) : (
        <IntroScreen rooms={data.rooms} onJoinRoom={handleJoinRoom} />
      )}

      <pre id="data-preview">{JSON.stringify(data, null, 1)}</pre>
    </>
  )
})

/* TODO */
// Add separate Join and Ready buttons on LobbyScreen
// Allow to reserve a card from CardStack
// Allow to spend gold

/* LATER */
// Limit to three different gems or two same if there are four remaining
// Limit gem amount to 10
// When card row ends, it should stay in place (should have min height)
// Different rules for two and three players
