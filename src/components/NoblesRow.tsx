import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Div from 'styled-kit/Div'

import { gameStore } from 'store'
import Noble from 'components/Noble'

export default observer(function NoblesRow() {
  const { nobles, purchasableNoblesIds, earnNoble } = useContext(gameStore)

  return (
    <Div listLeft selfCenter>
      {nobles.map(noble => {
        const isPurchasable = purchasableNoblesIds.includes(noble.id)

        return (
          <Noble
            key={noble.id}
            value={noble.value}
            cost={noble.cost}
            isPurchasable={isPurchasable}
            onClick={() => isPurchasable && earnNoble(noble.id)}
          />
        )
      })}
    </Div>
  )
})
