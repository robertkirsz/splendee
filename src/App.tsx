import React from 'react'
import Div from 'styled-kit/Div'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import GameControls from 'components/GameControls'
import PlayersSection from 'components/PlayersSection'

export default function App() {
  return (
    <Div justifyBetween>
      <PlayersSection />

      <Div columnTop itemsCenter>
        <NoblesRow />

        <Div itemsCenter listLeft>
          <CardsBoard />
          <GemsBank />
        </Div>

        <GameControls />
      </Div>
    </Div>
  )
}

/* TODO */
// Allow to reserve a card from CardStack
// Allow to spend gold

/* LATER */
// Limit to three different gems or two same if there are four remaining
// Limit gem amount to 10
// When card row ends, it should stay in place (should have min height)
