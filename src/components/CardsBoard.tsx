import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import type { CardInterface } from 'types'

import { getById } from 'utils'
import { gameStore, playerStore } from 'store'

import Div from 'components/Div'
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

const CardsRow = observer(function CardsRow({ level }: { level: CardInterface['level'] }) {
  const { chosenGems } = useContext(playerStore)
  const { cards, lastCardTakenId } = useContext(gameStore)

  const currentLevelCards = cards.filter(card => card.level === level)

  const [cardsToDisplay, setCardsToDisplay] = useState(currentLevelCards.slice(0, 4))
  const [currentCardIndex, setCurrentCardIndex] = useState(3)

  useEffect(() => {
    if (lastCardTakenId === null) return

    const card = getById(cards, lastCardTakenId)

    if (card && card.level === level) {
      setCardsToDisplay(state => {
        const nextCard = currentLevelCards[currentCardIndex + 1]
        return state.map(card => (card?.id === lastCardTakenId ? nextCard : card))
      })

      setCurrentCardIndex(state => state + 1)
    }
  }, [lastCardTakenId]) // eslint-disable-line

  function handleReserveCardFromStack() {
    setCurrentCardIndex(state => state + 1)
  }

  const numberOfCards = currentLevelCards.length - cardsToDisplay.filter(card => card).length
  // TODO: move to computed property?
  const chosenSomeGemsAlready = chosenGems.length > 0

  return (
    <Div
      key={level}
      itemsCenter
      listLeft
      opacity={chosenSomeGemsAlready ? 0.5 : 1}
      noPointerEvents={chosenSomeGemsAlready}
    >
      <CardHolder>
        {numberOfCards > 0 && (
          <CardsStack
            level={level}
            numberOfCards={numberOfCards}
            topCard={currentLevelCards[currentCardIndex + 1]}
            onTakeCard={handleReserveCardFromStack}
          />
        )}
      </CardHolder>

      <CardHolder>{cardsToDisplay[0] && <Card card={cardsToDisplay[0]} />}</CardHolder>

      <CardHolder>{cardsToDisplay[1] && <Card card={cardsToDisplay[1]} />}</CardHolder>

      <CardHolder>{cardsToDisplay[2] && <Card card={cardsToDisplay[2]} />}</CardHolder>

      <CardHolder>{cardsToDisplay[3] && <Card card={cardsToDisplay[3]} />}</CardHolder>
    </Div>
  )
})

const CardHolder = styled.div`
  width: 120px;
  height: 170px;
`
