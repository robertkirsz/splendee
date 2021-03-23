import { useEffect, useContext } from 'react'
import Div from 'components/Div'

import socket from 'socket'
import { gameStore } from 'store'
import { MessageTypes } from 'types'

export default function SendMessages() {
  const { roomId } = useContext(gameStore)

  useEffect(() => {
    socket.onSendMessage(message => {
      console.log('Got message!', message)
    })

    return () => {
      socket.offSendMessage()
    }
  }, [])

  function sendMessage(type: MessageTypes) {
    if (type === MessageTypes.Gems) {
      socket.emitSendMessage(roomId, { type: MessageTypes.Gems, payload: '1' })
    }

    if (type === MessageTypes.Card) {
      socket.emitSendMessage(roomId, { type: MessageTypes.Card, payload: '1' })
    }

    if (type === MessageTypes.ReserveTable) {
      socket.emitSendMessage(roomId, { type: MessageTypes.ReserveTable, payload: '1' })
    }

    if (type === MessageTypes.ReserveStack) {
      socket.emitSendMessage(roomId, { type: MessageTypes.ReserveStack, payload: '1' })
    }

    if (type === MessageTypes.Noble) {
      socket.emitSendMessage(roomId, { type: MessageTypes.Noble, payload: '1' })
    }
  }

  return (
    <Div listLeft padding={4} absolute bottom={10} right={10}>
      <button onClick={() => sendMessage(MessageTypes.Gems)}>Gems</button>
      <button onClick={() => sendMessage(MessageTypes.Card)}>Card</button>
      <button onClick={() => sendMessage(MessageTypes.ReserveTable)}>ReserveTable</button>
      <button onClick={() => sendMessage(MessageTypes.ReserveStack)}>ReserveStack</button>
      <button onClick={() => sendMessage(MessageTypes.Noble)}>Noble</button>
    </Div>
  )
}
