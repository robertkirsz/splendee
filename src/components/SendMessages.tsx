import { useEffect, useContext, useState } from 'react'

import socket from 'socket'
import { gameStore, playerStore } from 'store'
import { MessageTypes } from 'types'

import { Message } from 'types'
import { getById } from 'utils'
import Div from 'components/Div'
import Modal from 'components/Modal'
import { GemContainer } from 'components/GemsBank'
import Card from 'components/Card'
import Noble from 'components/Noble'
import CardsStack from './CardsStack'

export default function SendMessages() {
  const { name } = useContext(playerStore)
  const { roomId, cards, nobles } = useContext(gameStore)
  const [messageToShow, setMessageToShow] = useState<Message | null>(null)

  useEffect(() => {
    socket.onSendMessage(setMessageToShow)
    return () => socket.offSendMessage()
  }, [])

  function clearMessage() {
    setMessageToShow(null)
  }

  function sendMessage(type: MessageTypes) {
    if (type === MessageTypes.Gems) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.Gems,
        text: `${name} took these gems`,
        gems: ['red', 'black', 'green'],
      })
    }

    if (type === MessageTypes.Card) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.Card,
        text: `${name} bought this card`,
        cardId: 3,
      })
    }

    if (type === MessageTypes.ReserveTable) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.ReserveTable,
        text: `${name} reserved this card`,
        cardId: 3,
      })
    }

    if (type === MessageTypes.ReserveStack) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.ReserveStack,
        text: `${name} reserved a card from the stack`,
        level: 2,
        gotGold: true,
      })
    }

    if (type === MessageTypes.Noble) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.Noble,
        text: `${name} got this noble`,
        nobleId: 3,
      })
    }
  }

  return (
    <>
      <Div listLeft padding={4} absolute bottom={10} right={10}>
        <button onClick={() => sendMessage(MessageTypes.Gems)}>Gems</button>
        <button onClick={() => sendMessage(MessageTypes.Card)}>Card</button>
        <button onClick={() => sendMessage(MessageTypes.ReserveTable)}>ReserveTable</button>
        <button onClick={() => sendMessage(MessageTypes.ReserveStack)}>ReserveStack</button>
        <button onClick={() => sendMessage(MessageTypes.Noble)}>Noble</button>
      </Div>

      <Modal show={Boolean(messageToShow)} onClose={clearMessage}>
        <Div columnTop={40}>
          <span className="text-center">{messageToShow?.text}</span>

          {messageToShow?.type === MessageTypes.Gems && (
            <Div listLeft>
              {messageToShow.gems.map((color, index) => (
                <GemContainer key={index} color={color} isStatic />
              ))}
            </Div>
          )}

          {(messageToShow?.type === MessageTypes.Card ||
            messageToShow?.type === MessageTypes.ReserveTable) && (
            <Div selfCenter>
              <Card card={cards[messageToShow.cardId]} isStatic />
            </Div>
          )}

          {messageToShow?.type === MessageTypes.ReserveStack && (
            <Div selfCenter listLeft itemsCenter>
              <CardsStack level={messageToShow.level} />
              {messageToShow.gotGold && <GemContainer color="gold" isStatic />}
            </Div>
          )}

          {messageToShow?.type === MessageTypes.Noble && (
            <Div selfCenter>
              <Noble noble={getById(nobles, messageToShow.nobleId)!} isStatic />
            </Div>
          )}

          <button
            className="inline-block self-center px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={clearMessage}
          >
            Okay
          </button>
        </Div>
      </Modal>
    </>
  )
}
