import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import type { CardInterface } from 'types'

import { gameStore } from 'store'
import { getCardColor, sc } from 'utils'

import { GemIndicator } from 'components/PlayerPanel'

type Props = {
  card: CardInterface
}

export default observer(function Card({ card }: Props) {
  const { activePlayer, buyCard, reserveCard } = useContext(gameStore)

  const { value, cost, color } = card

  function checkPurchasability() {
    let isPurchasable: boolean | undefined = undefined

    for (let color in cost) {
      if (isPurchasable === false) break

      if (
        // @ts-ignore
        !cost[color] ||
        // @ts-ignore
        cost[color] <=
          // @ts-ignore
          activePlayer?.totalColorPoints[color]
      ) {
        isPurchasable = true
      } else {
        isPurchasable = false
      }
    }

    return isPurchasable
  }

  const isPurchasable = checkPurchasability()
  const isNotAlreadyReserved = !activePlayer?.reservedCards.find(
    ({ id }) => id === card.id
  )
  const showButtonsOverlay = isPurchasable || activePlayer?.canReserveCards
  const colorCost: string[] = []

  Object.entries(cost).forEach(([color, amount]) => {
    // @ts-ignore
    const remaining = amount - activePlayer.cardAmount[color]

    if (remaining > 0) {
      for (let i = 0; i < remaining; i++) {
        colorCost.push(color)
      }
    }
  })

  return (
    <Wrapper color={color} isPurchasable={isPurchasable}>
      {/* TODO: get rid of ?. */}
      {showButtonsOverlay && (
        <ButtonsOverlay>
          {isPurchasable && (
            <BuyCardButton
              colorCost={colorCost}
              onClick={() => buyCard(card)}
            />
          )}

          {/* TODO: get rid of ?. */}
          {isNotAlreadyReserved && activePlayer?.canReserveCards && (
            <button onClick={() => reserveCard(card)}>RESERVE</button>
          )}
        </ButtonsOverlay>
      )}

      <Div height={40} padding={8} background="rgba(255, 255, 255, 0.5)">
        {value > 0 ? value : ''}
      </Div>

      <Div columnTop={4} padding={8}>
        {cost.white > 0 && <Cost color="white">{cost.white}</Cost>}
        {cost.blue > 0 && <Cost color="blue">{cost.blue}</Cost>}
        {cost.green > 0 && <Cost color="green">{cost.green}</Cost>}
        {cost.red > 0 && <Cost color="red">{cost.red}</Cost>}
        {cost.black > 0 && <Cost color="black">{cost.black}</Cost>}
      </Div>
    </Wrapper>
  )
})

function BuyCardButton({
  colorCost,
  onClick,
}: {
  colorCost: string[]
  onClick: () => void
}) {
  return (
    <button onClick={onClick}>
      GET FOR{' '}
      {colorCost.length > 0 ? (
        <Div listLeft={-8}>
          {colorCost.map((color, index) => (
            <GemIndicator key={index} color={color} />
          ))}
        </Div>
      ) : (
        'FREE'
      )}
    </button>
  )
}

const ButtonsOverlay = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.1);

  > button {
    margin: 8px;
    cursor: pointer;
  }
`

const Wrapper = styled.div<{
  color: CardInterface['color']
  isPurchasable?: boolean
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 120px;
  height: 170px;

  position: relative;

  background: ${getCardColor};

  box-shadow: 0 1px 0 0 gray;
  border: 1px solid gray;
  border-radius: 8px;

  overflow: hidden;

  ${sc('isPurchasable')`
    box-shadow: 0 0 15px 5px green;
    cursor: pointer;
  `}

  &:hover {
    ${ButtonsOverlay} {
      display: flex;
    }
  }
`

const Cost = styled.span<{ color: CardInterface['color'] }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 25px;
  height: 25px;

  background: ${getCardColor};
  box-shadow: 0 0 0 1px gray;
  border: 1px solid white;
  border-radius: 50%;

  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;
`
