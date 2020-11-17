import React from 'react'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { CardInterface, NobleInterface } from 'types'
import { sc } from 'utils'

type Props = {
  value: NobleInterface['value']
  cost: NobleInterface['cost']
  isPurchasable: boolean
  onClick(): void
}

export default function Noble({ value, cost, isPurchasable, onClick }: Props) {
  return (
    <Wrapper isPurchasable={isPurchasable} onClick={onClick}>
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
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isPurchasable: boolean }>`
  flex: none;
  display: flex;

  width: 110px;
  height: 130px;

  background: #ccc;
  box-shadow: 0 2px 0 0 gray;
  border: 1px solid gray;
  border-radius: 8px;

  overflow: hidden;

  ${sc('isPurchasable')`
    box-shadow: 0 0 15px 5px green;
    cursor: pointer;
  `}
`

const Cost = styled.span<{ color: CardInterface['color'] }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;

  background: ${sc('color')};
  border-radius: 4px;

  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;
`
