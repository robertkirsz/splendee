// prettier-ignore
interface CostInterface {
  red:   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  green: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  blue:  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  white: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  black: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
}

interface CardInterface {
  id: number
  level: 1 | 2 | 3
  value: 0 | 1 | 2 | 3 | 4 | 5
  color: 'red' | 'green' | 'blue' | 'white' | 'black'
  cost: CostInterface
}

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
const cards = [
  new Card({ id: 0, level: 1, color: 'black', value: 0, cost: { white: 1, blue: 1, green: 1, red: 1, black: 0 } }),
  new Card({ id: 1, level: 1, color: 'black', value: 0, cost: { white: 1, blue: 2, green: 1, red: 1, black: 0 } }),
  new Card({ id: 2, level: 1, color: 'black', value: 0, cost: { white: 2, blue: 2, green: 0, red: 1, black: 0 } }),
  new Card({ id: 3, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 1, red: 3, black: 1 } }),
  new Card({ id: 4, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 2, red: 1, black: 0 } }),
  new Card({ id: 5, level: 1, color: 'black', value: 0, cost: { white: 2, blue: 0, green: 2, red: 0, black: 0 } }),
  new Card({ id: 6, level: 1, color: 'black', value: 0, cost: { white: 0, blue: 0, green: 3, red: 0, black: 0 } }),
  new Card({ id: 7, level: 1, color: 'black', value: 1, cost: { white: 0, blue: 4, green: 0, red: 0, black: 0 } })
]

export default cards
