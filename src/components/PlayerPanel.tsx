import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'
import { PlayerInterface } from 'types'

export default observer(function PlayerPanel({
  player,
}: {
  player: PlayerInterface
}) {
  const { activePlayerId, changeActivePlayer } = useContext(gameStore)

  return (
    <Div
      key={player.id}
      listLeft
      padding={8}
      radius={4}
      border="1px solid"
      clickable
      // @ts-ignore
      onClick={() => changeActivePlayer(player.id)}
      style={
        player.id === activePlayerId
          ? { boxShadow: '0 0 15px -3px green' }
          : null
      }
    >
      <span title="Score">
        {player.name} ({player.score}/15)
      </span>

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
            {/* @ts-ignore */}
            <span>💎 {player.gems[color]}</span>
          </Div>
        ))}
      </Div>
    </Div>
  )
})
