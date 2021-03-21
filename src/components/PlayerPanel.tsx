import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/macro'
import Div from 'styled-kit/Div'

import type { PlayerInterface } from 'types'
import { gameStore, playerStore } from 'store'
import { getGemColor, sc } from 'utils'

import Card from 'components/Card'

const colors = ['red', 'green', 'blue', 'white', 'black', 'gold']

type Props = {
  player: PlayerInterface
}

export default observer(function PlayerPanel({ player }: Props) {
  const { name: playerName } = useContext(playerStore)
  const { activePlayerId } = useContext(gameStore)
  const { id, name, score, cardAmount, gems, reservedCards, totalColorPoints } = player

  return (
    <Wrapper key={id} isActive={id === activePlayerId} data-player-id={id}>
      <Div listLeft={4}>
        <span>{name}</span>
        {playerName === name && <span>(you)</span>}
        <span>({score}/15)</span>
      </Div>

      <Div columnTop mTop={4} border="1px solid black">
        {colors.map(color => (
          <Div key={color} listLeft={4} itemsCenter data-indicator-color={color}>
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
