import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import GameControls from 'components/GameControls'
import PlayersSection from 'components/PlayersSection'

export default function GameScreen() {
  return (
    <div className="flex justify-between">
      <PlayersSection />

      <div className="flex flex-col space-y-4">
        <NoblesRow />

        <div className="flex items-center space-x-4">
          <CardsBoard />
          <GemsBank />
        </div>

        <GameControls />
      </div>
    </div>
  )
}
