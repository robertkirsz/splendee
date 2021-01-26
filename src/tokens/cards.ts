import { CardInterface } from 'types'

class Card {
  id: CardInterface['id']
  level: CardInterface['level']
  value: CardInterface['value']
  color: CardInterface['color']
  cost: CardInterface['cost']

  constructor({ id, level, color, value, cost }: CardInterface) {
    this.id = id
    this.level = level
    this.color = color
    this.value = value
    this.cost = cost
  }
}

// prettier-ignore
const getCards = () => [
  new Card({ id:  0, level: 1, color: 'black', value: 0, cost: { white: 1, blue: 1, green: 1, red: 1, black: 0 } }),
  new Card({ id:  1, level: 1, color: 'black', value: 0, cost: { white: 1, blue: 2, green: 1, red: 1, black: 0 } }),
  new Card({ id:  2, level: 1, color: 'black', value: 0, cost: { white: 2, blue: 2, green: 0, red: 1, black: 0 } }),
  new Card({ id:  3, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 1, red: 3, black: 1 } }),
  new Card({ id:  4, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 2, red: 1, black: 0 } }),
  /*
  new Card({ id:  5, level: 1, color: 'black', value: 0, cost: { white: 2, blue: 0, green: 2, red: 0, black: 0 } }),
  new Card({ id:  6, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 3, red: 0, black: 0 } }),
  new Card({ id:  7, level: 1, color: 'black', value: 1, cost: { white: 0, blue: 4, green: 0, red: 0, black: 0 } }),
  new Card({ id:  8, level: 1, color: 'blue',  value: 0, cost: { white: 1, blue: 0, green: 1, red: 1, black: 1 } }),
  new Card({ id:  9, level: 1, color: 'blue',  value: 0, cost: { white: 1, blue: 0, green: 1, red: 2, black: 1 } }),
  new Card({ id: 10, level: 1, color: 'blue',  value: 0, cost: { white: 1, blue: 0, green: 2, red: 2, black: 0 } }),
  new Card({ id: 11, level: 1, color: 'blue',  value: 0, cost: { white: 0, blue: 1, green: 3, red: 1, black: 0 } }),
  new Card({ id: 12, level: 1, color: 'blue',  value: 0, cost: { white: 1, blue: 0, green: 0, red: 0, black: 2 } }),
  new Card({ id: 13, level: 1, color: 'blue',  value: 0, cost: { white: 0, blue: 0, green: 2, red: 0, black: 2 } }),
  new Card({ id: 14, level: 1, color: 'blue',  value: 0, cost: { white: 0, blue: 0, green: 0, red: 0, black: 3 } }),
  new Card({ id: 15, level: 1, color: 'blue',  value: 1, cost: { white: 0, blue: 0, green: 0, red: 4, black: 0 } }),
  new Card({ id: 16, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 1, green: 1, red: 1, black: 1 } }),
  new Card({ id: 17, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 1, green: 2, red: 1, black: 1 } }),
  new Card({ id: 18, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 2, green: 2, red: 1, black: 1 } }),
  new Card({ id: 19, level: 1, color: 'white', value: 0, cost: { white: 3, blue: 1, green: 0, red: 0, black: 1 } }),
  new Card({ id: 20, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 0, green: 0, red: 2, black: 1 } }),
  new Card({ id: 21, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 2, green: 0, red: 0, black: 2 } }),
  new Card({ id: 22, level: 1, color: 'white', value: 0, cost: { white: 0, blue: 3, green: 0, red: 0, black: 0 } }),
  new Card({ id: 23, level: 1, color: 'white', value: 1, cost: { white: 0, blue: 0, green: 4, red: 0, black: 0 } }),
  new Card({ id: 24, level: 1, color: 'green', value: 0, cost: { white: 1, blue: 1, green: 0, red: 1, black: 1 } }),
  new Card({ id: 25, level: 1, color: 'green', value: 0, cost: { white: 1, blue: 1, green: 0, red: 1, black: 2 } }),
  new Card({ id: 26, level: 1, color: 'green', value: 0, cost: { white: 0, blue: 1, green: 0, red: 2, black: 2 } }),
  new Card({ id: 27, level: 1, color: 'green', value: 0, cost: { white: 1, blue: 3, green: 1, red: 0, black: 0 } }),
  new Card({ id: 28, level: 1, color: 'green', value: 0, cost: { white: 2, blue: 1, green: 0, red: 0, black: 0 } }),
  new Card({ id: 29, level: 1, color: 'green', value: 0, cost: { white: 0, blue: 2, green: 0, red: 2, black: 0 } }),
  new Card({ id: 30, level: 1, color: 'green', value: 0, cost: { white: 0, blue: 0, green: 0, red: 3, black: 0 } }),
  new Card({ id: 31, level: 1, color: 'green', value: 1, cost: { white: 0, blue: 0, green: 0, red: 0, black: 4 } }),
  new Card({ id: 32, level: 1, color: 'red',   value: 0, cost: { white: 1, blue: 1, green: 1, red: 0, black: 1 } }),
  new Card({ id: 33, level: 1, color: 'red',   value: 0, cost: { white: 2, blue: 1, green: 1, red: 0, black: 1 } }),
  new Card({ id: 34, level: 1, color: 'red',   value: 0, cost: { white: 2, blue: 0, green: 1, red: 0, black: 2 } }),
  new Card({ id: 35, level: 1, color: 'red',   value: 0, cost: { white: 1, blue: 0, green: 0, red: 1, black: 3 } }),
  new Card({ id: 36, level: 1, color: 'red',   value: 0, cost: { white: 0, blue: 2, green: 1, red: 0, black: 0 } }),
  new Card({ id: 37, level: 1, color: 'red',   value: 0, cost: { white: 2, blue: 0, green: 0, red: 2, black: 0 } }),
  new Card({ id: 38, level: 1, color: 'red',   value: 0, cost: { white: 3, blue: 0, green: 0, red: 0, black: 0 } }),
  new Card({ id: 39, level: 1, color: 'red',   value: 1, cost: { white: 4, blue: 0, green: 0, red: 0, black: 0 } }),
  */
  new Card({ id: 40, level: 2, color: 'black', value: 1, cost: { white: 3, blue: 2, green: 2, red: 0, black: 0 } }),
  new Card({ id: 41, level: 2, color: 'black', value: 1, cost: { white: 3, blue: 0, green: 3, red: 0, black: 2 } }),
  new Card({ id: 42, level: 2, color: 'black', value: 2, cost: { white: 0, blue: 1, green: 4, red: 2, black: 0 } }),
  new Card({ id: 43, level: 2, color: 'black', value: 2, cost: { white: 0, blue: 0, green: 5, red: 3, black: 0 } }),
  new Card({ id: 44, level: 2, color: 'black', value: 2, cost: { white: 5, blue: 0, green: 0, red: 0, black: 0 } }),
  /*
  new Card({ id: 45, level: 2, color: 'black', value: 3, cost: { white: 0, blue: 0, green: 0, red: 0, black: 6 } }),
  new Card({ id: 46, level: 2, color: 'blue',  value: 1, cost: { white: 0, blue: 2, green: 2, red: 3, black: 0 } }),
  new Card({ id: 47, level: 2, color: 'blue',  value: 1, cost: { white: 0, blue: 2, green: 3, red: 0, black: 3 } }),
  new Card({ id: 48, level: 2, color: 'blue',  value: 2, cost: { white: 5, blue: 3, green: 0, red: 0, black: 0 } }),
  new Card({ id: 49, level: 2, color: 'blue',  value: 2, cost: { white: 2, blue: 0, green: 0, red: 1, black: 4 } }),
  new Card({ id: 50, level: 2, color: 'blue',  value: 2, cost: { white: 0, blue: 5, green: 0, red: 0, black: 0 } }),
  new Card({ id: 51, level: 2, color: 'blue',  value: 3, cost: { white: 0, blue: 6, green: 0, red: 0, black: 0 } }),
  new Card({ id: 52, level: 2, color: 'white', value: 1, cost: { white: 0, blue: 0, green: 3, red: 2, black: 2 } }),
  new Card({ id: 53, level: 2, color: 'white', value: 1, cost: { white: 2, blue: 3, green: 0, red: 3, black: 0 } }),
  new Card({ id: 54, level: 2, color: 'white', value: 2, cost: { white: 0, blue: 0, green: 1, red: 4, black: 2 } }),
  new Card({ id: 55, level: 2, color: 'white', value: 2, cost: { white: 0, blue: 0, green: 0, red: 5, black: 3 } }),
  new Card({ id: 56, level: 2, color: 'white', value: 2, cost: { white: 0, blue: 0, green: 0, red: 5, black: 0 } }),
  new Card({ id: 57, level: 2, color: 'white', value: 3, cost: { white: 6, blue: 0, green: 0, red: 0, black: 0 } }),
  new Card({ id: 58, level: 2, color: 'green', value: 1, cost: { white: 3, blue: 0, green: 2, red: 3, black: 0 } }),
  new Card({ id: 59, level: 2, color: 'green', value: 1, cost: { white: 2, blue: 3, green: 0, red: 0, black: 2 } }),
  new Card({ id: 60, level: 2, color: 'green', value: 2, cost: { white: 4, blue: 2, green: 0, red: 0, black: 1 } }),
  new Card({ id: 61, level: 2, color: 'green', value: 2, cost: { white: 0, blue: 5, green: 3, red: 0, black: 0 } }),
  new Card({ id: 62, level: 2, color: 'green', value: 2, cost: { white: 0, blue: 0, green: 5, red: 0, black: 0 } }),
  new Card({ id: 63, level: 2, color: 'green', value: 3, cost: { white: 0, blue: 0, green: 6, red: 0, black: 0 } }),
  new Card({ id: 64, level: 2, color: 'red',   value: 1, cost: { white: 2, blue: 0, green: 0, red: 2, black: 3 } }),
  new Card({ id: 65, level: 2, color: 'red',   value: 1, cost: { white: 0, blue: 3, green: 0, red: 2, black: 3 } }),
  new Card({ id: 66, level: 2, color: 'red',   value: 2, cost: { white: 1, blue: 4, green: 2, red: 0, black: 0 } }),
  new Card({ id: 67, level: 2, color: 'red',   value: 2, cost: { white: 3, blue: 0, green: 0, red: 0, black: 5 } }),
  new Card({ id: 68, level: 2, color: 'red',   value: 2, cost: { white: 0, blue: 0, green: 0, red: 0, black: 5 } }),
  new Card({ id: 69, level: 2, color: 'red',   value: 3, cost: { white: 0, blue: 0, green: 0, red: 6, black: 0 } }),
  */
  new Card({ id: 70, level: 3, color: 'black', value: 3, cost: { white: 3, blue: 3, green: 5, red: 3, black: 0 } }),
  new Card({ id: 71, level: 3, color: 'black', value: 4, cost: { white: 0, blue: 0, green: 0, red: 7, black: 0 } }),
  new Card({ id: 72, level: 3, color: 'black', value: 4, cost: { white: 0, blue: 0, green: 3, red: 6, black: 3 } }),
  new Card({ id: 73, level: 3, color: 'black', value: 5, cost: { white: 0, blue: 0, green: 0, red: 7, black: 3 } }),
  new Card({ id: 74, level: 3, color: 'blue',  value: 3, cost: { white: 3, blue: 0, green: 3, red: 3, black: 5 } }),
  /*
  new Card({ id: 75, level: 3, color: 'blue',  value: 4, cost: { white: 7, blue: 0, green: 0, red: 0, black: 0 } }),
  new Card({ id: 76, level: 3, color: 'blue',  value: 4, cost: { white: 6, blue: 3, green: 0, red: 0, black: 3 } }),
  new Card({ id: 77, level: 3, color: 'blue',  value: 5, cost: { white: 7, blue: 3, green: 0, red: 0, black: 0 } }),
  new Card({ id: 78, level: 3, color: 'white', value: 3, cost: { white: 0, blue: 3, green: 3, red: 5, black: 3 } }),
  new Card({ id: 79, level: 3, color: 'white', value: 4, cost: { white: 0, blue: 0, green: 0, red: 0, black: 7 } }),
  new Card({ id: 80, level: 3, color: 'white', value: 4, cost: { white: 3, blue: 0, green: 0, red: 3, black: 6 } }),
  new Card({ id: 81, level: 3, color: 'white', value: 5, cost: { white: 3, blue: 0, green: 0, red: 0, black: 7 } }),
  new Card({ id: 82, level: 3, color: 'green', value: 3, cost: { white: 5, blue: 3, green: 0, red: 3, black: 3 } }),
  new Card({ id: 83, level: 3, color: 'green', value: 4, cost: { white: 0, blue: 7, green: 0, red: 0, black: 0 } }),
  new Card({ id: 84, level: 3, color: 'green', value: 4, cost: { white: 3, blue: 6, green: 3, red: 0, black: 0 } }),
  new Card({ id: 85, level: 3, color: 'green', value: 5, cost: { white: 0, blue: 7, green: 3, red: 0, black: 0 } }),
  new Card({ id: 86, level: 3, color: 'red',   value: 3, cost: { white: 3, blue: 5, green: 3, red: 0, black: 3 } }),
  new Card({ id: 87, level: 3, color: 'red',   value: 4, cost: { white: 0, blue: 0, green: 7, red: 0, black: 0 } }),
  new Card({ id: 88, level: 3, color: 'red',   value: 4, cost: { white: 0, blue: 3, green: 6, red: 3, black: 0 } }),
  new Card({ id: 89, level: 3, color: 'red',   value: 5, cost: { white: 0, blue: 0, green: 7, red: 3, black: 0 } })
  */
]

export default getCards
