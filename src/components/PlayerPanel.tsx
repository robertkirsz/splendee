import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
// @ts-ignore
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

function PlayerPanel() {
  const game = useContext(gameStore)

  return (
    <Div listLeft>
      <button onClick={() => (game.isRunning ? game.stop() : game.start())}>
        {game.isRunning ? 'Stop' : 'Start'} game
      </button>

      <span>Game ID: {game.id}</span>
    </Div>
  )
}

export default observer(PlayerPanel)
