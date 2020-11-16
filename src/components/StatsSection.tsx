import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

import PlayerPanel from 'components/PlayerPanel'

export default observer(function StatsSection() {
  const { id, isRunning, players, stop, start } = useContext(gameStore)

  return (
    <Div columnTop>
      <Div columnTop selfStart>
        {players.map(player => (
          <PlayerPanel key={player.id} player={player} />
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
