import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import Div from 'styled-kit/Div'

import nobles, { NobleInterface } from '../nobles'

function NobleCard(props: NobleInterface) {
  return <Card>{props.value}</Card>
}

const Card = styled.div`
  padding: 8px;
  border: 1px solid;
`

export default function NoblesRow() {
  return (
    <Div listLeft>
      {nobles.map((noble) => (
        <NobleCard {...noble} />
      ))}
    </Div>
  )
}
