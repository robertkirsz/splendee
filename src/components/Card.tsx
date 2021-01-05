import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import type { CardInterface } from 'types'

import { gameStore } from 'store'
import { getCardColor, sc } from 'utils'

type Props = {
  card: CardInterface
}

export default observer(function Card({ card }: Props) {
  const { purchasableCardsIds, buyCard } = useContext(gameStore)
  const { id, level, value, cost, color } = card

  const isPurchasable = purchasableCardsIds.includes(id)

  function handleClick() {
    if (isPurchasable) buyCard({ id, level, value, color, cost })
  }

  return (
    <Wrapper color={color} isPurchasable={isPurchasable} onClick={handleClick}>
      <Div height={40} padding={8} background="rgba(255, 255, 255, 0.5)">
        {value > 0 ? value : ''}
      </Div>

      <Div columnTop={4} padding={8}>
        {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
        {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
        {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
        {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
      </Div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{
  color: CardInterface['color']
  isPurchasable?: boolean
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 120px;
  height: 170px;

  background: ${getCardColor};

  box-shadow: 0 1px 0 0 gray;
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

  width: 25px;
  height: 25px;

  background: ${getCardColor};
  box-shadow: 0 0 0 1px gray;
  border: 1px solid white;
  border-radius: 50%;

  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;
`
