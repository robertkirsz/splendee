import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

function PlayerPanel() {
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
            <span>
              {player.name} ({player.score}/15)
            </span>

            <span>No of cards: {player.cards.length}</span>

            <Div listLeft>
              {Object.entries(player.cardPoints).map(([color, value]) => (
                <Div
                  key={color}
                  columnTop
                  border={`1px solid ${color}`}
                  radius={4}
                  padding={4}
                >
                  <span>Cards {value}</span>
                  {/* @ts-ignore */}
                  <span>Gems {player.gems[color]}</span>
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
}

export default observer(PlayerPanel)
