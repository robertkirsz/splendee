interface IObjectKeys {
  [key: string]: string
}

export const getColor = ({ color }: { color: string }) => {
  const colors: IObjectKeys = {
    white: '#ddd',
    blue: 'blue',
    green: 'green',
    red: 'red',
    black: 'black',
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
