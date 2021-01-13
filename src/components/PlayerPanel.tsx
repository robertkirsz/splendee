import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/macro'
import Div from 'styled-kit/Div'

import type { PlayerInterface } from 'types'
import { gameStore } from 'store'
import { getGemColor, sc } from 'utils'

import Card from 'components/Card'

type Props = {
  player: PlayerInterface
}

export default observer(function PlayerPanel({ player }: Props) {
  const { activePlayerId, changeActivePlayer } = useContext(gameStore)
  const {
    id,
    name,
    score,
    inventoryColors,
    cardAmount,
    gems,
    reservedCards,
    // totalColorPoints,
  } = player

  return (
    <Wrapper
      key={id}
      onClick={() => changeActivePlayer(id)}
      isActive={id === activePlayerId}
      data-player-id={id}
    >
      <Div column mRight={8}>
        <span>{name}</span>
        <span>({score}/15)</span>
        {/* <span>gemPoints: {JSON.stringify(gems)}</span> */}
        {/* <span>cardAmount: {JSON.stringify(cardAmount)}</span> */}
        {/* <span>totalColorPoints: {JSON.stringify(totalColorPoints)}</span> */}
      </Div>

      <Div listLeft itemsStart>
        {inventoryColors.map(color => (
          <Div
            key={color}
            columnTop
            border={`1px solid ${color}`}
            radius={4}
            padding={4}
          >
            <CardHolder color={color} amount={cardAmount[color]} />
            <GemHolder color={color} amount={gems[color]} />
          </Div>
        ))}

        <Div listLeft>
          {reservedCards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </Div>
      </Div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  ${sc('isActive')`box-shadow: 0 0 15px -3px green;`}
`

// TODO: make them vertical
// TODO: show only a few and show a number if more

function CardHolder({ color, amount = 0 }: { color: string; amount: number }) {
  if (!amount) return null

  return (
    <Div listLeft={-12}>
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          css={`
            display: block;
            background: ${getGemColor({ color })};
            width: 18px;
            height: 24px;
            border: 1px solid;
            border-radius: 4px;
          `}
        />
      ))}
    </Div>
  )
}

function GemHolder({ color, amount = 0 }: { color: string; amount: number }) {
  if (!amount) return null

  return (
    <Div listLeft={-12}>
      {[...Array(amount)].map((_, index) => (
        <GemIndicator key={index} color={color} />
      ))}
    </Div>
  )
}

export function GemIndicator({ color }: { color: string }) {
  return (
    <span
      css={`
        display: block;
        background: ${getGemColor({ color })};
        width: 18px;
        height: 18px;
        border: 1px solid;
        border-radius: 50%;
      `}
    />
  )
}
