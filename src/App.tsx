import React from 'react'
// @ts-ignore
import Div from 'styled-kit/Div'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import PlayerPanel from 'components/PlayerPanel'

export default function App() {
  return (
    <Div listLeft>
      <Div columnTop>
        <NoblesRow />
        <CardsBoard />
        <PlayerPanel />
      </Div>
      <GemsBank />
    </Div>
  )
}
