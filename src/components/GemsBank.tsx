import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { GemColorsType } from 'types'
import { gameStore } from 'store'

function GemsBank() {
  const { gems, earnGem } = useContext(gameStore)

  const gemColors = Object.keys(gems) as GemColorsType[]

  return (
    <Div columnTop selfCenter>
      {gemColors.map(color => (
        <GemContainer
          key={color}
          color={color}
          onClick={() => earnGem(color)}
          disabled={!gems[color]}
        >
          {gems[color]}
        </GemContainer>
      ))}
    </Div>
  )
}

export default observer(GemsBank)

const GemContainer = styled.div<{ color: GemColorsType; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;

  background: ${({ color }) => color};
  border-radius: 50%;
  border: 1px solid black;

  color: white;
  font-weight: bold;
  -webkit-text-stroke: 1px black;

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`
