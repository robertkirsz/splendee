import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

function PlayerPanel() {
  const { id, isRunning, players, activePlayerId, stop, start } = useContext(
    gameStore
  )

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
          >
            <span>
              {player.name} ({player.score}/15)
            </span>

            <Div listLeft>
              {Object.entries(player.gems).map(([color, value]) => (
                <span key={color}>
                  {color}: {value}
                </span>
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
