import React, { useContext } from 'react'
import styled from 'styled-components'
// @ts-ignore
import Div from 'styled-kit/Div'

import { CardColorsType, CardInterface } from 'types'
import { gameStore } from 'store'

function Card({ value, cost, color }: CardInterface) {
  return (
    <StyledCard column justifyBetween cardColor={color}>
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
    </StyledCard>
  )
}

const StyledCard = styled(Div)<{ cardColor: CardColorsType }>`
  flex: none;

  width: 120px;
  height: 170px;

  background: ${({ cardColor }) => cardColor};
  border: 1px solid;
  border-radius: 8px;
`

const Cost = styled.span<{ color: CardColorsType }>`
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

export default function CardsBoard() {
  const { cards } = useContext(gameStore)
  const levels = [1, 2, 3] as CardInterface['level'][]

  return (
    <Div columnTop>
      {levels.map(level => (
        <Div listLeft overflow="auto">
          <CardsStack level={level} />

          {cards
            .filter(card => card.level === level)
            .map(card => (
              <Card key={card.id} {...card} />
            ))}
        </Div>
      ))}
    </Div>
  )
}
