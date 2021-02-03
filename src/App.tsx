import React from 'react'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import GameControls from 'components/GameControls'
import PlayersSection from 'components/PlayersSection'

export default function App() {
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

/* TODO */
// Allow to reserve a card from CardStack
// Allow to spend gold

/* LATER */
// Limit to three different gems or two same if there are four remaining
// Limit gem amount to 10
// When card row ends, it should stay in place (should have min height)
