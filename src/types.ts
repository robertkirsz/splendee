export interface PlayerInterface {
  id: string
  name: string
  currentRound: number
  score: number
  gems: GemAmountInterface
}

export type CardColorsType = 'red' | 'green' | 'blue' | 'white' | 'black'

// prettier-ignore
export interface CardCostInterface {
  red:   0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  green: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  blue:  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  white: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  black: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
}

export interface CardInterface {
  id: number
  level: 1 | 2 | 3
  value: 0 | 1 | 2 | 3 | 4 | 5
  color: CardColorsType
  cost: CardCostInterface
}

export type GemColorsType = CardColorsType | 'gold'

export interface GemAmountInterface extends CardCostInterface {
  gold: 0 | 1 | 2 | 3 | 4 | 5
}
