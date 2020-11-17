import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

import CardsStack from 'components/CardsStack'
import Card from 'components/Card'

export default observer(function CardsBoard() {
  const { cards, cardLevels, purchasableCardsIds, buyCard } = useContext(
    gameStore
  )

  return (
    <Div columnTop>
      {cardLevels.map(level => {
        const currentLevelCards = cards.filter(card => card.level === level)

        return (
          <Div key={level} itemsCenter listLeft>
            <CardsStack
              level={level}
              numberOfCards={currentLevelCards.length}
            />

            {currentLevelCards.slice(0, 4).map(card => {
              const isPurchasable = purchasableCardsIds.includes(card.id)

              return (
                <Card
                  key={card.id}
                  isPurchasable={isPurchasable}
                  onClick={() => isPurchasable && buyCard(card)}
                  {...card}
                />
              )
            })}
          </Div>
        )
      })}
    </Div>
  )
})
