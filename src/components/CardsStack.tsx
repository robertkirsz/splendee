import React from 'react'
import Div from 'styled-kit/Div'
import styled from 'styled-components'

import { CardInterface } from 'types'
import { getCardStackColor } from 'utils'

export default function CardsStack({
  level,
  numberOfCards,
}: {
  level: CardInterface['level']
  numberOfCards: number
}) {
  return (
    <Wrapper level={level}>
      <Div margin="auto" pTop={8}>
        {numberOfCards}
      </Div>

      <Div listLeft>
        {[...Array(level)].map((_, index) => (
          <Div key={index} square={10} circle background="currentColor" />
        ))}
      </Div>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ level: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 170px;
  padding: 8px;

  background: ${getCardStackColor};
  border: 8px solid white;
  border-radius: 8px;
  box-shadow: 0 5px 0 0 gray;

  color: white;
`
