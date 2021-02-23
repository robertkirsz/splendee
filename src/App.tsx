import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

import type { DataInterface } from 'types'

import IntroScreen from 'screens/IntroScreen'
import GameScreen from 'screens/GameScreen'
import LobbyScreen from 'screens/LobbyScreen'

const socket = io('ws://localhost:1987')

export default function App() {
  const [alreadyConnected, setAlreadyConnected] = useState(false)
  const [data, setData] = useState<DataInterface>()

  const gameExists = false
  const playerJoinedRoom = true

  useEffect(() => {
    if (alreadyConnected) return

    socket.on('receive data', setData)

    socket.on('connect', () => {
      console.log(`${socket.id}: -- connected --`)
    })

    setAlreadyConnected(true)
  }, [alreadyConnected])

  if (typeof data === 'undefined') return null

  if (playerJoinedRoom) return <LobbyScreen />

  if (gameExists) return <GameScreen />

  return <IntroScreen socket={socket} data={data} />
}

/* TODO */
// Allow to reserve a card from CardStack
// Allow to spend gold

/* LATER */
// Limit to three different gems or two same if there are four remaining
// Limit gem amount to 10
// When card row ends, it should stay in place (should have min height)
