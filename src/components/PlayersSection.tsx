import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { gameStore, playerStore } from 'store'

import Div from 'components/Div'
import PlayerPanel from 'components/PlayerPanel'

export default observer(function PlayersSection() {
  const player = useContext(playerStore)
  const { players } = useContext(gameStore)

  const otherPlayers = players.filter(({ id }) => id !== player.id)

  return (
    <Div listLeft>
      <PlayerPanel player={player} />
      {otherPlayers.map(player => (
        <PlayerPanel key={player.id} player={player} />
      ))}
    </Div>
  )
})
