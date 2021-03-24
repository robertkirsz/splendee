// import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/macro'

import type { PlayerInterface } from 'types'

// import { playerStore } from 'store'
import { getGemColor } from 'utils'

import Div from 'components/Div'
import Card from 'components/Card'

// TODO: take from an enum from types.ts
const colors = ['red', 'green', 'blue', 'white', 'black', 'gold']

type Props = {
  player: PlayerInterface
}

export default observer(function PlayerPanel({ player }: Props) {
  // const { name: playerName } = useContext(playerStore)
  const { id, name, score, cardAmount, gems, reservedCards, totalColorPoints } = player

  return (
    <Wrapper key={id} data-player-id={id}>
      <Div listLeft={4}>
        <span>{name}</span>
        {/* {playerName === name && <span>(you)</span>} */}
        <span>({score}/15)</span>
      </Div>

      {/* <p>{player.id.split('-')[0]}</p> */}

      <Div columnTop mTop={4}>
        {colors.map(color => (
          <Div
            key={color}
            listLeft={4}
            itemsCenter
            data-indicator-color={color}
            // @ts-ignore
            style={{ opacity: totalColorPoints[color] === 0 ? 0.2 : 1 }}
          >
            {color !== 'gold' && (
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
                <CardIndicator color={color} />
              </Div>
            )}

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
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
