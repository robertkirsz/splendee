import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { gameStore } from 'store'

import Div from 'components/Div'
import Noble from 'components/Noble'

export default observer(function NoblesRow() {
  const { nobles, purchasableNoblesIds, earnNoble } = useContext(gameStore)

  return (
    <Div listLeft selfCenter>
      {nobles.map(noble => {
        const isPurchasable = purchasableNoblesIds.includes(noble.id)

        function handleClick() {
          isPurchasable && earnNoble(noble.id)
        }

        return (
          <Noble key={noble.id} noble={noble} isPurchasable={isPurchasable} onClick={handleClick} />
        )
      })}
    </Div>
  )
})
