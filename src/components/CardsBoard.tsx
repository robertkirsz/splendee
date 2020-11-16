import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { CardInterface } from 'types'
import { gameStore } from 'store'

export default observer(function CardsBoard() {
  const { cards, cardLevels, activePlayer, buyCard } = useContext(gameStore)

  return (
    <Div columnTop>
      {cardLevels.map(level => {
        const currentLevelCards = cards.filter(card => card.level === level)

        return (
          <Div key={level} itemsCenter listLeft>
            <span>{currentLevelCards.length}</span>

            <CardsStack level={level} />

            {currentLevelCards.slice(0, 4).map(card => {
              let isPurchasable: boolean | undefined = undefined

              // TODO: maybe this can happen in the store?
              for (let color in card.cost) {
                if (isPurchasable === false) break

                if (
                  // @ts-ignore
                  !card.cost[color] ||
                  // @ts-ignore
                  card.cost[color] <=
                    // @ts-ignore
                    activePlayer?.cardColorPoints[color] +
                      // @ts-ignore
                      activePlayer?.gems[color]
                ) {
                  isPurchasable = true
                } else {
                  isPurchasable = false
                }
              }

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
      background={color}
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

  background: ${({ color }) => color};
  border: 1px solid white;
  border-radius: 50%;

  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
`

function CardsStack({ level }: { level: CardInterface['level'] }) {
  return (
    <Div
      flexNone
      itemsCenter
      justifyCenter
      width={120}
      height={170}
      background="gray"
      radius={8}
      listLeft
    >
      {[...Array(level)].map((_, index) => (
        <Div key={index} square={16} circle background="white" />
      ))}
    </Div>
  )
}
