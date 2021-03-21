import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import Div from 'components/Div'
import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import PlayersSection from 'components/PlayersSection'

import { playerStore, gameStore } from 'store'

export default observer(function GameScreen() {
  const player = useContext(playerStore)
  const game = useContext(gameStore)

  const notYouTurn = game.activePlayerId !== player.id

  return (
    <Div justifyBetween itemsStart>
      <PlayersSection />

      <Div
        columnTop
        itemsCenter
        style={notYouTurn ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
      >
        <Div listLeft>
          <span>ID: {game.id}</span>
          <span>ROUND: {game.currentRound}</span>
        </Div>

        <NoblesRow />

        <Div itemsCenter listLeft>
          <CardsBoard />
          <GemsBank />
        </Div>
      </Div>
    </Div>
  )
})
