import React from 'react'
import Div from 'styled-kit/Div'

import GemsBank from 'components/GemsBank'
import NoblesRow from 'components/NoblesRow'
import CardsBoard from 'components/CardsBoard'
import StatsSection from 'components/StatsSection'

export default function App() {
  return (
    <Div columnTop itemsCenter>
      <NoblesRow />

      <Div itemsCenter listLeft>
        <CardsBoard />
        <GemsBank />
      </Div>

      <StatsSection />
    </Div>
  )
}
