import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components/macro'
import Div from 'styled-kit/Div'

import { PlayerInterface } from 'types'
import { gameStore } from 'store'
import { getGemColor, sc } from 'utils'

type Props = {
  player: PlayerInterface
}

export default observer(function PlayerPanel({ player }: Props) {
  const { activePlayerId, changeActivePlayer } = useContext(gameStore)

  return (
    <Wrapper
      key={player.id}
      onClick={() => changeActivePlayer(player.id)}
      isActive={player.id === activePlayerId}
    >
      <Div column mRight={8}>
        <span>{player.name}</span>
        <span>({player.score}/15)</span>
      </Div>

      <Div listLeft>
        {player.inventoryColors.map(color => (
          <Div
            key={color}
            columnTop
            border={`1px solid ${color}`}
            radius={4}
            padding={4}
          >
            <span>
              {/* @ts-ignore */}
              🃏 #{player.cardAmount[color]} 💲{player.cardPoints[color]}
            </span>
            <GemHolder color={color} amount={player.gems[color]} />
          </Div>
        ))}
      </Div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  ${sc('isActive')`box-shadow: '0 0 15px -3px green'`}
`

function GemHolder({ color, amount }: { color: string; amount: number }) {
  if (!amount) return null

  return (
    <Div listLeft={-11}>
      {[...Array(amount)].map((_, index) => (
        <span
          key={index}
          css={`
            display: block;
            background: ${getGemColor({ color })};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid;
          `}
        />
      ))}
    </Div>
  )
}
