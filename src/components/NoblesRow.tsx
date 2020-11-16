import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { CardInterface, NobleInterface } from 'types'
import { gameStore } from 'store'

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

function Noble({
  value,
  cost,
  isPurchasable,
  onClick,
}: {
  value: NobleInterface['value']
  cost: NobleInterface['cost']
  isPurchasable: boolean
  onClick(): void
}) {
  return (
    <StyledNoble isPurchasable={isPurchasable} onClick={onClick}>
      <Div
        column
        itemsCenter
        justifyBetween
        padding={8}
        background="rgba(255, 255, 255, 0.5)"
      >
        <span>{value}</span>

        <Div columnTop={4}>
          {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
          {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
          {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
          {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
          {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        </Div>
      </Div>
    </StyledNoble>
  )
}

const StyledNoble = styled.div<{ isPurchasable: boolean }>`
  flex: none;
  display: flex;

  width: 110px;
  height: 130px;

  background: #ccc;
  border: 1px solid;
  border-radius: 8px;

  ${props =>
    props.isPurchasable && 'box-shadow: 0 0 15px 5px green; cursor: pointer;'}
`

const Cost = styled.span<{ color: CardInterface['color'] }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 18px;

  background: ${({ color }) => color};
  border-radius: 4px;

  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;
`
