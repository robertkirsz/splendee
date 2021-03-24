import { useContext, useEffect } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components/macro'
import Color from 'color'

import type { GemColorsType } from 'types'
import { MessageTypes } from 'types'

import { playerStore, gameStore } from 'store'
import { getGemColor, sc } from 'utils'
import socket from 'socket'

import Div from 'components/Div'

const Label = styled.span`
  height: 20px;
  padding: 4px;

  position: absolute;
  right: calc(100% + 16px);
  top: 50%;

  background: white;
  border-radius: 4px 0 0 4px;

  font-size: 11px;
  line-height: 1;
  white-space: nowrap;

  pointer-events: none;
  filter: drop-shadow(0 5px 3px rgba(0, 0, 0, 0.7));

  opacity: 0;
  transform: translate(-8px, -50%);
  transition-property: opacity, transform;
  transition-duration: 100ms;

  &::after {
    content: '';
    width: 16px;
    height: 16px;

    position: absolute;
    top: 50%;
    right: -8px;
    z-index: -1;

    background: inherit;
    border-radius: 3px;

    transform: rotate(46deg) translateY(-50%);
    transform-origin: top;
  }
`

export default observer(function GemsBank() {
  const player = useContext(playerStore)
  const { roomId, gems, earnGem, giveTurnToNextPlayer, activePlayerId } = useContext(gameStore)
  const { chosenGems, chooseGem, clearChoosenGems } = useContext(playerStore)
  const _chosenGems = toJS(chosenGems)

  function handleClick(color: GemColorsType) {
    return () => {
      chooseGem(color)
      earnGem(color, player)
    }
  }

  useEffect(() => {
    if (
      _chosenGems.length === 3 ||
      (_chosenGems.length === 2 && _chosenGems[0] === _chosenGems[1])
    ) {
      socket.emitSyncGems(roomId, player.id, _chosenGems)
      socket.emitSendMessage(roomId, {
        type: MessageTypes.Gems,
        text: `${player.name} took these gems`,
        gems: chosenGems,
      })
      clearChoosenGems()
      giveTurnToNextPlayer()
    }
  }, [_chosenGems, chosenGems, clearChoosenGems, giveTurnToNextPlayer, player.id, player.name, roomId])

  const gemColors = Object.keys(gems) as GemColorsType[]

  return (
    <Div
      columnTop
      selfCenter
      // @ts-ignore
      css={`
        &:hover ${Label} {
          opacity: 1;
          transform: translate(0, -50%);
        }
      `}
    >
      {gemColors.map(color => {
        const isDisabled =
          _chosenGems.includes(color) && (_chosenGems.length > 1 || gems[color] <= 2)
        const labelVisible =
          activePlayerId === player.id &&
          chosenGems.length === 0 &&
          gems[color] > 1 &&
          gems[color] < 4

        return (
          <Div
            key={color}
            relative
            // @ts-ignore
            css={`
              &:last-child {
                margin-top: 80px;
                pointer-events: none;
              }
            `}
          >
            <GemContainer
              color={color}
              onClick={handleClick(color)}
              hidden={!gems[color]}
              disabled={isDisabled}
              data-gem-container-color={color}
            >
              {gems[color]}
            </GemContainer>

            {labelVisible && <Label>Only one</Label>}
          </Div>
        )
      })}
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
