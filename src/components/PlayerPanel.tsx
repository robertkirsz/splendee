import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

export default observer(function PlayerPanel() {
  const {
    id,
    isRunning,
    players,
    activePlayerId,
    changeActivePlayer,
    stop,
    start,
  } = useContext(gameStore)

  return (
    <Div columnTop>
      <Div columnTop selfStart>
        {players.map(player => (
          <Div
            key={player.id}
            listLeft
            padding={8}
            radius={4}
            border={`2px solid ${
              player.id === activePlayerId ? 'green' : 'black'
            }`}
            clickable
            // @ts-ignore
            onClick={() => changeActivePlayer(player.id)}
          >
            <span title="Score">
              {player.name} ({player.score}/15)
            </span>

            <Div column>
              <span># cards: {player.cards.length}</span>
              <span># nobles: {player.nobles.length}</span>
            </Div>

            <Div listLeft>
              {Object.entries(player.cardColorPoints).map(([color, value]) => (
                <Div
                  key={color}
                  columnTop
                  border={`1px solid ${color}`}
                  radius={4}
                  padding={4}
                >
                  <span>
                    {/* @ts-ignore */}
                    🃏 #{player.cardsAmount[color]} 💲{value}
                  </span>
                  {/* @ts-ignore */}
                  <span>💎 {player.gems[color]}</span>
                </Div>
              ))}
            </Div>
          </Div>
        ))}
      </Div>

      <Div listLeft>
        <button onClick={isRunning ? stop : start}>
          {isRunning ? 'Stop' : 'Start'} game
        </button>

        <span>Game ID: {id}</span>
      </Div>
    </Div>
  )
})
