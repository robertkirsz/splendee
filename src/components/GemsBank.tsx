import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'
import Div from 'styled-kit/Div'
import Color from 'color'

import { GemColorsType } from 'types'
import { gameStore } from 'store'
import { getGemColor, sc } from 'utils'

export default observer(function GemsBank() {
  const { gems, earnGem } = useContext(gameStore)

  const gemColors = Object.keys(gems) as GemColorsType[]

  return (
    <Div columnTop selfCenter>
      {gemColors.map(color => (
        <GemContainer
          key={color}
          color={Color(getGemColor({ color }))}
          onClick={() => earnGem(color)}
          disabled={!gems[color]}
        >
          {gems[color]}
        </GemContainer>
      ))}
    </Div>
  )
})

const GemContainer = styled.div<{ color: any; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  ${({ color }) => css`
    background: ${color};
    border: 8px solid ${color.darken(0.2)};
    box-shadow: 0 5px 0 0 ${color.darken(0.5)};
  `}

  border-radius: 50%;

  color: white;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 1px 0 black;

  cursor: pointer;

  ${sc('disabled')`
    opacity: 0.5;
    pointer-events: none;
  `}
`
