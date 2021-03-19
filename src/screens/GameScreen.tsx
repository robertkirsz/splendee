import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import GameControls from 'components/GameControls'
import PlayersSection from 'components/PlayersSection'

import { playerStore, gameStore } from 'store'

export default observer(function GameScreen() {
  const player = useContext(playerStore)
  const game = useContext(gameStore)

  const notYouTurn = game.activePlayerId !== player.id

  return (
    <div className="flex justify-between">
      <PlayersSection />

      <div
        className="flex flex-col space-y-4"
        style={notYouTurn ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
      >
        <NoblesRow />

        <div className="flex items-center space-x-4">
          <CardsBoard />
          <GemsBank />
        </div>

        <GameControls />
      </div>
    </div>
  )
})
