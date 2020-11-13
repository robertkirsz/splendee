import React from 'react'
import Div from 'styled-kit/Div'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import PlayerPanel from 'components/PlayerPanel'

export default function App() {
  return (
    <Div columnTop>
      <NoblesRow />

      <Div listLeft>
        <Div columnTop>
          <CardsBoard />
          <PlayerPanel />
        </Div>

        <GemsBank />
      </Div>
    </Div>
  )
}
