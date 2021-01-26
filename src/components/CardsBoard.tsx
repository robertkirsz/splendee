import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import type { CardInterface } from 'types'
import { gameStore } from 'store'

import CardsStack from 'components/CardsStack'
import Card from 'components/Card'

export default observer(function CardsBoard() {
  return (
    <Div columnTop id="card-board">
      <CardsRow level={3} />
      <CardsRow level={2} />
      <CardsRow level={1} />
    </Div>
  )
})

const CardsRow = observer(function CardsRow({
  level,
}: {
  level: CardInterface['level']
}) {
  const { cards } = useContext(gameStore)

  const currentLevelCards = cards.filter(card => card.level === level)

  const numberOfCards = currentLevelCards.length

  const [cardsToDisplay, setCardsToDisplay] = useState(
    currentLevelCards.slice(0, 4)
  )

  const [currentCardIndex, setCurrentCardIndex] = useState(3)

  function handleTakeCard(id: CardInterface['id']) {
    setTimeout(() => {
      setCardsToDisplay(state => {
        const nextCard = currentLevelCards[currentCardIndex + 1]
        return state.map(card => (card?.id === id ? nextCard : card))
      })

      setCurrentCardIndex(state => state + 1)
    })
  }

  return (
    <Div key={level} itemsCenter listLeft>
      <CardHolder>
        {numberOfCards > 0 && (
          <CardsStack level={level} numberOfCards={currentLevelCards.length} />
        )}
      </CardHolder>

      <CardHolder>
        {cardsToDisplay[0] && (
          <Card card={cardsToDisplay[0]} onTakeCard={handleTakeCard} />
        )}
      </CardHolder>

      <CardHolder>
        {cardsToDisplay[1] && (
          <Card card={cardsToDisplay[1]} onTakeCard={handleTakeCard} />
        )}
      </CardHolder>

      <CardHolder>
        {cardsToDisplay[2] && (
          <Card card={cardsToDisplay[2]} onTakeCard={handleTakeCard} />
        )}
      </CardHolder>

      <CardHolder>
        {cardsToDisplay[3] && (
          <Card card={cardsToDisplay[3]} onTakeCard={handleTakeCard} />
        )}
      </CardHolder>
    </Div>
  )
})

const CardHolder = styled.div`
  width: 120px;
  height: 170px;
`
