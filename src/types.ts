export interface PlayerInterface {
  id: string
  name: string
  currentRound: number
  score: number
  gems: GemAmountInterface
  cards: CardInterface[]
  earnGem(color: GemColorsType): void
}

export type CardColorsType = 'red' | 'green' | 'blue' | 'white' | 'black'

export type CardCostType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface CardCostInterface {
  red: CardCostType
  green: CardCostType
  blue: CardCostType
  white: CardCostType
  black: CardCostType
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

export type NobleCostType = 0 | 3 | 4

export interface NobleCostInterface {
  red: NobleCostType
  green: NobleCostType
  blue: NobleCostType
  white: NobleCostType
  black: NobleCostType
}

export interface NobleInterface {
  id: number
  value: 3
  cost: NobleCostInterface
}
