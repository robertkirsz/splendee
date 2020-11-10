import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import Div from 'styled-kit/Div'

import { CardColorsType } from '../types'
import nobles, { NobleInterface } from '../tokens/nobles'

function NobleCard({ value, cost }: NobleInterface) {
  return (
    <Card>
      <Div
        column
        itemsCenter
        justifyBetween
        padding={8}
        background="rgba(255, 255, 255, 0.5)"
      >
        <span>{value}</span>

        <Div columnTop={4}>
          {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
          {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
          {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
          {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
          {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        </Div>
      </Div>
    </Card>
  )
}

const Card = styled.div`
  flex: none;

  display: flex;

  width: 110px;
  height: 130px;

  background: #ccc;
  border: 1px solid;
  border-radius: 8px;
`

const Cost = styled.span<{ color: CardColorsType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;

  background: ${({ color }) => color};
  border-radius: 4px;

  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
`

export default function NoblesRow() {
  return (
    <Div listLeft>
      {nobles.map((noble) => (
        <NobleCard key={noble.id} {...noble} />
      ))}
    </Div>
  )
}
