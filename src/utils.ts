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
