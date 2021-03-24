import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import type { CardInterface } from 'types'

import { gameStore, playerStore } from 'store'
import { getCardStackColor } from 'utils'

import Div from 'components/Div'
import { ButtonsOverlay } from 'components/Card'

type Props = {
  level: CardInterface['level']
  numberOfCards?: number
  topCard?: CardInterface
  onTakeCard?: () => void
}

export default observer(function CardsStack({ level, numberOfCards, topCard, onTakeCard }: Props) {
  const player = useContext(playerStore)
  // eslint-disable-next-line
  const { activePlayer, reserveCard } = useContext(gameStore)

  // const showButtonsOverlay = typeof topCard !== 'undefined' && activePlayer.canReserveCards
  const showButtonsOverlay = false

  function handleReserveCardButtonClick() {
    if (typeof topCard === 'undefined') return
    reserveCard(topCard, player, false)
    onTakeCard?.()
  }

  return (
    <Wrapper level={level}>
      {showButtonsOverlay && (
        <ButtonsOverlay>
          <button onClick={handleReserveCardButtonClick}>RESERVE</button>
        </ButtonsOverlay>
      )}

      {numberOfCards && (
        <Div margin="auto" pTop={8}>
          {numberOfCards}
        </Div>
      )}

      <Div listLeft>
        {[...Array(level)].map((_, index) => (
          <Div key={index} square={10} circle background="currentColor" />
        ))}
      </Div>
    </Wrapper>
  )
})

const Wrapper = styled.div<{ level: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 170px;
  padding: 8px;

  position: relative;

  background: ${getCardStackColor};
  border: 8px solid white;
  border-radius: 8px;
  box-shadow: 0 5px 0 0 gray;

  color: white;

  &:hover {
    ${ButtonsOverlay} {
      display: flex;
    }
  }
`
