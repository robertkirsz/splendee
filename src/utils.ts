interface IObjectKeys {
  [key: string]: string
}

export const getCardColor = ({ color }: { color: string }) => {
  const colors: IObjectKeys = {
    green: '#026f43',
    red: '#d31b23',
    black: '#36302f',
    blue: '#0a64d1',
    white: '#efece6',
  }

  return colors[color]
}

export const getCardStackColor = ({ level }: { level: number }) => {
  const colors: IObjectKeys = {
    1: '#839e3c',
    2: '#cc9749',
    3: '#0995c7',
  }

  return colors[level]
}

export const getGemColor = ({ color }: { color: string }) => {
  const colors: IObjectKeys = {
    green: '#026f43',
    red: '#d31b23',
    black: '#36302f',
    blue: '#0a64d1',
    white: '#efece6',
    gold: '#dacd39',
  }

  return colors[color]
}

export const sc = (propName: string) => (css: TemplateStringsArray | any) =>
  css.length
    ? (props: any) => (props[propName] ? css : undefined)
    : css[propName]

export const removeByIdAndReturn = <
  Item extends {
    id: number
  }
>(
  array: Item[],
  id: number
): Item | undefined => {
  let item
  const itemIndex = array.findIndex(item => item.id === id)

  if (itemIndex !== -1) item = array.splice(itemIndex, 1)[0]

  return item
}
