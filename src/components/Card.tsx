import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import type { CardInterface } from 'types'

import { getCardColor, sc } from 'utils'
import { gameStore, playerStore } from 'store'

import Div from 'components/Div'
import { GemIndicator } from 'components/PlayerPanel'

type Props = {
  card: CardInterface
  isStatic?: boolean
  onTakeCard?: Function
}

export default observer(function Card({ card, isStatic, onTakeCard }: Props) {
  const { value, cost, color, isReservedBy } = card
  const player = useContext(playerStore)
  const { buyCard, reserveCard, actionInProgress, activePlayerId } = useContext(gameStore)

  // TODO: move to computed property?
  const notYourTurn = activePlayerId !== player.id
  // TODO: move to computed property?
  const chosenSomeGemsAlready = player.chosenGems.length > 0

  function checkPurchasability() {
    let isPurchasable: boolean | undefined = undefined

    if (notYourTurn || chosenSomeGemsAlready || (isReservedBy && isReservedBy !== player.id)) {
      return false
    }

    for (let color in cost) {
      if (isPurchasable === false) break

      if (
        // @ts-ignore
        !cost[color] ||
        // @ts-ignore
        cost[color] <=
          // @ts-ignore
          player.totalColorPoints[color]
      ) {
        isPurchasable = true
      } else {
        isPurchasable = false
      }
    }

    return isPurchasable
  }

  const isPurchasable = checkPurchasability()
  const colorCost: string[] = []
  const showButtonsOverlay = !actionInProgress && (isPurchasable || player.canReserveCards)
  // eslint-disable-next-line
  const cardCanBeReserved = player.canReserveCards && !isReservedBy

  Object.entries(cost).forEach(([color, amount]) => {
    // @ts-ignore
    const remaining = amount - player.cardAmount[color]

    if (remaining > 0) {
      for (let i = 0; i < remaining; i++) {
        colorCost.push(color)
      }
    }
  })

  function handleBuyCardButtonClick() {
    buyCard(card, player)
  }

  // eslint-disable-next-line
  function handleReserveCardButtonClick() {
    reserveCard(card, player).then(() => onTakeCard?.(card.id))
  }

  return (
    <Wrapper
      color={color}
      isPurchasable={!isStatic && isPurchasable}
      isStatic={isStatic}
      data-card-id={card.id}
    >
      {showButtonsOverlay && (
        <ButtonsOverlay>
          {isPurchasable && (
            <BuyCardButton colorCost={colorCost} onClick={handleBuyCardButtonClick} />
          )}

          {/* {cardCanBeReserved && <button onClick={handleReserveCardButtonClick}>RESERVE</button>} */}
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

function BuyCardButton({ colorCost, onClick }: { colorCost: string[]; onClick: () => void }) {
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

export const ButtonsOverlay = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  > button {
    margin: 8px;
    cursor: pointer;
    background: white;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 8px 10px 0 rgba(0, 0, 0, 0.7);
  }
`

const Wrapper = styled.div<{
  color: CardInterface['color']
  isPurchasable?: boolean
  isStatic?: boolean
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

  transition: box-shadow 0.3s;

  ${sc('isStatic')`pointer-events: none;`}

  ${sc('isPurchasable')`
    box-shadow: 0 0 15px 5px green;
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
