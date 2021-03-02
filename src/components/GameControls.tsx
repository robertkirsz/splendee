import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

export default observer(function GameControls() {
  const { id } = useContext(gameStore)

  return (
    <Div listLeft>
      <span>Game ID: {id}</span>
    </Div>
  )
})
