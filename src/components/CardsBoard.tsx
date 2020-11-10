import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import Div from 'styled-kit/Div'

import { CardColorsType } from '../types'
import cards, { CardInterface } from '../cards'

function Card({ value, cost }: CardInterface) {
  return (
    <StyledCard>
      <Div
        column
        itemsCenter
        justifyBetween
        padding={8}
        background="rgba(255, 255, 255, 0.5)"
      >
        <span>{value > 0 ? value : ''}</span>
        <Div columnTop={4}>
          {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
          {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
          {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
          {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
          {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        </Div>
      </Div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  flex: none;
  border-radius: 8px;
  width: 120px;
  height: 150px;
  border: 1px solid;
  background: #ccc;
`

const Cost = styled.span<{ color: CardColorsType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ color }) => color};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
`

export default function CardsBoard() {
  return (
    <Div listLeft overflow="auto">
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </Div>
  )
}
