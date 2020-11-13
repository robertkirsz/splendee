import React from 'react'
import styled from 'styled-components'
import Div from 'styled-kit/Div'

import { GemColorsType } from 'types'
import gems from 'tokens/gems'

export default function GemsBank() {
  const gemColors = Object.keys(gems) as GemColorsType[]

  return (
    <Div columnTop selfCenter>
      {gemColors.map(color => (
        <GemContainer key={color} color={color}>
          {gems[color]}
        </GemContainer>
      ))}
    </Div>
  )
}

const GemContainer = styled.div<{ color: GemColorsType }>`
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
`
