import { useContext, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components/macro'
import Div from 'styled-kit/Div'
import Color from 'color'

import { GemColorsType } from 'types'
import { playerStore, gameStore } from 'store'
import { getGemColor, sc } from 'utils'
import socket from 'socket'

export default observer(function GemsBank() {
  const player = useContext(playerStore)
  const { roomId, gems, earnGem, giveTurnToNextPlayer } = useContext(gameStore)
  const { chosenGems, chooseGem, clearChoosenGems } = useContext(playerStore)
  const _gems = toJS(chosenGems)

  function handleClick(color: GemColorsType) {
    return () => {
      chooseGem(color)
      earnGem(color)
    }
  }

  useEffect(() => {
    if (_gems.length === 3 || (_gems.length === 2 && _gems[0] === _gems[1])) {
      clearChoosenGems()
      socket.emitSyncGems(roomId, player.id, _gems)
      giveTurnToNextPlayer()
    }
  }, [_gems, clearChoosenGems, giveTurnToNextPlayer, player.id, roomId])

  const gemColors = Object.keys(gems) as GemColorsType[]

  return (
    <Div columnTop selfCenter>
      {gemColors.map(color => (
        <GemContainer
          key={color}
          color={color}
          onClick={handleClick(color)}
          hidden={!gems[color]}
          disabled={_gems.includes(color) && (_gems.length > 1 || gems[color] <= 2)}
          data-gem-container-color={color}
          css={`
            &:last-child {
              margin-top: 80px;
              pointer-events: none;
            }
          `}
        >
          {gems[color]}
        </GemContainer>
      ))}
    </Div>
  )
})

export const GemContainer = styled.div<{
  color: GemColorsType
  disabled?: boolean
  hidden?: boolean
  isStatic?: boolean
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  ${props => {
    const color = Color(getGemColor({ color: props.color }))

    return css`
      background: ${color.hex()};
      border: 8px solid ${color.darken(0.2).hex()};
      box-shadow: 0 5px 0 0 ${color.darken(0.5).hex()};
    `
  }}

  border-radius: 50%;

  color: white;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;

  cursor: pointer;

  ${sc('isStatic')`pointer-events: none;`}

  ${sc('disabled')`
    opacity: 0.5;
    pointer-events: none;
  `}

  ${sc('hidden')`
    opacity: 0;
    pointer-events: none;
  `}
`
