import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

export default observer(function GameControls() {
  const { id, isRunning, stop, start } = useContext(gameStore)

  return (
    <Div listLeft>
      <button onClick={isRunning ? stop : start}>
        {isRunning ? 'Stop' : 'Start'} game
      </button>

      <span>Game ID: {id}</span>
    </Div>
  )
})
