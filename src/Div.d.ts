declare module 'styled-kit/Div' {
  import React from 'react'

  interface DivProps {
    // flex-direction
    row?: boolean
    rowReverse?: boolean
    column?: boolean
    columnReverse?: boolean
    wraps?: boolean
    // justify-content
    justifyStart?: boolean
    justifyEnd?: boolean
    justifyCenter?: boolean
    justifyBetween?: boolean
    justifyAround?: boolean
    justifyEvenly?: boolean
    // align-items
    itemsStart?: boolean
    itemsEnd?: boolean
    itemsCenter?: boolean
    itemsBaseline?: boolean
    itemsStretch?: boolean
    // align-content
    contentStart?: boolean
    contentEnd?: boolean
    contentCenter?: boolean
    contentBetween?: boolean
    contentAround?: boolean
    contentStretch?: boolean
    // Self-positioning
    flex?: number | string
    flexNone?: boolean
    selfAuto?: boolean
    selfStart?: boolean
    selfEnd?: boolean
    selfCenter?: boolean
    selfBaseline?: boolean
    selfStretch?: boolean
    // Size
    width?: number | string
    height?: number | string
    minWidth?: number | string
    minHeight?: number | string
    maxWidth?: number | string
    maxHeight?: number | string
    // Margin
    margin?: number | string
    marginTop?: number | string
    marginRight?: number | string
    marginBottom?: number | string
    marginLeft?: number | string
    mTop?: number | string
    mRight?: number | string
    mBottom?: number | string
    mLeft?: number | string
    // Padding
    padding?: number | string
    paddingTop?: number | string
    paddingRight?: number | string
    paddingBottom?: number | string
    paddingLeft?: number | string
    pTop?: number | string
    pRight?: number | string
    pBottom?: number | string
    pLeft?: number | string
    // Background
    background?: string
    backgroundImage?: string
    cover?: boolean
    contain?: boolean
    // Border
    border?: string
    radius?: number | string
    // Position
    relative?: boolean
    absolute?: boolean
    fixed?: boolean
    sticky?: boolean
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
    z?: number | string
    // Text
    font?: string
    fontFamily?: string
    fontSize?: number | string
    fontWeight?: number | string
    lineHeight?: number | string
    letterSpacing?: number | string
    textAlign?: string
    color?: string
    // Lists
    listLeft?: boolean | number | string
    listRight?: boolean | number | string
    listTop?: boolean | number | string
    listBottom?: boolean | number | string
    columnTop?: boolean | number | string
    columnBottom?: boolean | number | string
    // Other
    overflow?: string
    // Helpers
    layer?: boolean
    square?: number | string
    fullHeight?: boolean
    hide?: boolean
    circle?: boolean
    clickable?: boolean
    noPointerEvents?: boolean
    overlay?: string
    // TODO: I don't want this here
    id?: string
  }

  declare const Div: React.FunctionComponent<DivProps>

  export default Div
}
