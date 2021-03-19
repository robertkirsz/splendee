import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'

import PlayerPanel from 'components/PlayerPanel'

export default observer(function PlayersSection() {
  const { players } = useContext(gameStore)

  return (
    <Div listLeft>
      {players.map(player => (
        <PlayerPanel key={player.id} player={player} />
      ))}
    </Div>
  )
})
