import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { CardInterface } from 'types'
import { gameStore } from 'store'
import { getColor } from 'utils'

import CardsStack from 'components/CardsStack'

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

interface CardElementInterface extends CardInterface {
  // TODO: maybe I can do it without undefined?
  isPurchasable: boolean | undefined
  onClick(): void
}

function Card({
  value,
  cost,
  color,
  isPurchasable,
  onClick,
}: CardElementInterface) {
  return (
    <Div
      column
      justifyBetween
      width={120}
      height={170}
      background={getColor({ color })}
      border="1px solid"
      radius={8}
      clickable={isPurchasable}
      // @ts-ignore
      style={isPurchasable ? { boxShadow: '0 0 15px 5px green' } : null}
      onClick={onClick}
    >
      <Div height={40} padding={8} background="rgba(255, 255, 255, 0.5)">
        {value > 0 ? value : ''}
      </Div>

      <Div columnTop={2} padding={8}>
        {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
        {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
        {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
        {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
      </Div>
    </Div>
  )
}

const Cost = styled.span<{ color: CardInterface['color'] }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;

  background: ${getColor};
  border: 1px solid white;
  border-radius: 50%;

  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;
`
