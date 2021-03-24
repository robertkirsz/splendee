import { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { Message } from 'types'
import { MessageTypes } from 'types'

import getCards from 'tokens/cards'

import { getById } from 'utils'
import socket from 'socket'
import { gameStore, playerStore } from 'store'

import Div from 'components/Div'
import Modal from 'components/Modal'
import { GemContainer } from 'components/GemsBank'
import Card from 'components/Card'
import Noble from 'components/Noble'
import CardsStack from 'components/CardsStack'

const cards = getCards()

export default observer(function SendMessages() {
  const player = useContext(playerStore)
  const { roomId, nobles, activePlayerId } = useContext(gameStore)
  const [messageToShow, setMessageToShow] = useState<Message | null>(null)

  // TODO: maybe move it somewhere higher?
  const yourTurn = activePlayerId === player.id

  useEffect(() => {
    socket.onSendMessage(setMessageToShow)
    return () => socket.offSendMessage()
  }, [])

  function clearMessage() {
    setMessageToShow(null)
  }

  // eslint-disable-next-line
  function sendMessage(type: MessageTypes) {
    if (type === MessageTypes.ReservedCard) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.ReservedCard,
        text: `${player.name} bought this previously reserved card`,
        cardId: cards[2].id,
      })
    }

    if (type === MessageTypes.ReserveTable) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.ReserveTable,
        text: `${player.name} reserved this card`,
        cardId: cards[1].id,
      })
    }

    if (type === MessageTypes.ReserveStack) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.ReserveStack,
        text: `${player.name} reserved a card from the stack`,
        level: 2,
        gotGold: true,
      })
    }

    if (type === MessageTypes.Noble) {
      socket.emitSendMessage(roomId, {
        type: MessageTypes.Noble,
        text: `${player.name} got this noble`,
        nobleId: nobles[0].id,
      })
    }
  }

  return (
    <>
      {/* <Div listLeft padding={4} absolute bottom={10} right={10}>
        <button onClick={() => sendMessage(MessageTypes.ReservedCard)}>ReservedCard</button>
        <button onClick={() => sendMessage(MessageTypes.ReserveTable)}>ReserveTable</button>
        <button onClick={() => sendMessage(MessageTypes.ReserveStack)}>ReserveStack</button>
        <button onClick={() => sendMessage(MessageTypes.Noble)}>Noble</button>
      </Div> */}

      <Modal show={Boolean(messageToShow)} onClose={clearMessage}>
        <Div columnTop={40}>
          <span className="text-center">{messageToShow?.text}</span>

          {messageToShow?.type === MessageTypes.Gems && (
            <Div selfCenter listLeft>
              {messageToShow.gems.map((color, index) => (
                <GemContainer key={index} color={color} isStatic />
              ))}
            </Div>
          )}

          {(messageToShow?.type === MessageTypes.Card ||
            messageToShow?.type === MessageTypes.ReservedCard ||
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

          <Div columnTop itemsCenter selfCenter>
            {yourTurn && <span className="text-center">Now it's your turn</span>}

            <button
              className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              onClick={clearMessage}
            >
              Okay
            </button>
          </Div>
        </Div>
      </Modal>
    </>
  )
})
