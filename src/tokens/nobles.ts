import { NobleInterface } from 'types'

class Noble {
  id: NobleInterface['id']
  value: NobleInterface['value']
  cost: NobleInterface['cost']

  constructor({ id, value, cost }: NobleInterface) {
    this.id = id
    this.value = value
    this.cost = cost
  }
}

// prettier-ignore
const getNobles = () => [
  new Noble({ id: 0, value: 3, cost: { white: 3, blue: 3, green: 3, red: 0, black: 0 } }),
  new Noble({ id: 1, value: 3, cost: { white: 0, blue: 3, green: 3, red: 3, black: 0 } }),
  new Noble({ id: 2, value: 3, cost: { white: 0, blue: 0, green: 3, red: 3, black: 3 } }),
  new Noble({ id: 3, value: 3, cost: { white: 3, blue: 0, green: 0, red: 3, black: 3 } }),
  new Noble({ id: 4, value: 3, cost: { white: 3, blue: 3, green: 0, red: 0, black: 3 } }),
  new Noble({ id: 5, value: 3, cost: { white: 4, blue: 4, green: 0, red: 0, black: 0 } }),
  new Noble({ id: 6, value: 3, cost: { white: 0, blue: 4, green: 4, red: 0, black: 0 } }),
  new Noble({ id: 7, value: 3, cost: { white: 0, blue: 0, green: 4, red: 4, black: 0 } }),
  new Noble({ id: 8, value: 3, cost: { white: 0, blue: 0, green: 0, red: 4, black: 4 } }),
  new Noble({ id: 9, value: 3, cost: { white: 4, blue: 0, green: 0, red: 0, black: 4 } })
]

export default getNobles
