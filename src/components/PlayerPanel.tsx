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

const colors = ['red', 'green', 'blue', 'white', 'black', 'gold']

export default observer(function PlayerPanel({ player }: Props) {
  const { activePlayerId, changeActivePlayer } = useContext(gameStore)
  const {
    id,
    name,
    score,
    cardAmount,
    gems,
    reservedCards,
    totalColorPoints,
  } = player

  return (
    <Wrapper
      key={id}
      onClick={() => changeActivePlayer(id)}
      isActive={id === activePlayerId}
      data-player-id={id}
    >
      <Div listLeft={4} border="1px solid black">
        <span>{name}</span>
        <span>({score}/15)</span>
      </Div>

      <Div listLeft mTop={4} border="1px solid black">
        {colors.map(color => (
          <Div
            key={color}
            listLeft={4}
            itemsCenter
            data-indicator-color={color}
          >
            <Div relative itemsCenter justifyCenter>
              <span
                css={`
                  color: white;
                  font-weight: bold;
                  text-shadow: 1px 1px 0 black;
                  position: absolute;
                `}
              >
                {/* @ts-ignore */}
                {cardAmount[color]}
              </span>
              {color !== 'gold' && <CardIndicator color={color} />}
            </Div>

            <Div relative itemsCenter justifyCenter>
              <span
                css={`
                  color: white;
                  font-weight: bold;
                  text-shadow: 1px 1px 0 black;
                  position: absolute;
                `}
              >
                {/* @ts-ignore */}
                {gems[color]}
              </span>
              <GemIndicator color={color} size={24} />
            </Div>

            {/* @ts-ignore */}
            <span>({totalColorPoints[color]})</span>
          </Div>
        ))}
      </Div>

      <Div listLeft>
        {reservedCards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  ${sc('isActive')`box-shadow: 0 0 15px -3px green;`}
`

export const GemIndicator = styled.span<{ color: string; size?: number }>`
  display: block;
  width: ${({ size = 18 }) => `${size}px`};
  height: ${({ size = 18 }) => `${size}px`};
  background: ${({ color }) => getGemColor({ color })};
  border: 1px solid;
  border-radius: 50%;
`

const CardIndicator = styled.span<{ color: string; size?: number }>`
  display: block;
  width: ${({ size = 24 }) => `${size}px`};
  height: ${({ size = 24 }) => `${size}px`};
  background: ${({ color }) => getGemColor({ color })};
  border-radius: 4px;
  border: 1px solid;
`
