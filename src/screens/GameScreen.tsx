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

  const notYourTurn = game.activePlayerId !== player.id

  return (
    <Div justifyBetween itemsStart>
      <PlayersSection />

      <Div
        columnTop
        itemsCenter
        style={notYourTurn ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
      >
        <Div listLeft>
          {/* <span>ID: {game.id.split('-')[0]}</span> */}
          <span>Round: {game.currentRound}</span>
        </Div>

        <h3>
          {game.activePlayer.id === player.id ? 'Your turn' : `${game.activePlayer.name}'s turn`}
        </h3>

        <NoblesRow />

        <Div itemsCenter listLeft>
          <CardsBoard />
          <GemsBank />
        </Div>
      </Div>
    </Div>
  )
})
