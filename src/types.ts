export interface PlayerInterface {
  id: string
  name: string
  currentRound: number
  score: number
  gems: GemAmountInterface
  cards: CardInterface[]
  cardColorPoints: { [key in CardInterface['color']]: number }
  nobles: NobleInterface[]
  earnGem(color: GemColorsType): void
}

export interface CardInterface {
  id: number
  level: 1 | 2 | 3
  value: 0 | 1 | 2 | 3 | 4 | 5
  color: 'red' | 'green' | 'blue' | 'white' | 'black'
  cost: {
    red: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    green: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    blue: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    white: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
    black: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  }
}

export type GemColorsType =
  | 'red'
  | 'green'
  | 'blue'
  | 'white'
  | 'black'
  | 'gold'

export interface GemAmountInterface {
  red: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  green: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  blue: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  white: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  black: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
  gold: 0 | 1 | 2 | 3 | 4 | 5
}

export interface NobleInterface {
  id: number
  value: 3
  cost: {
    red: 0 | 3 | 4
    green: 0 | 3 | 4
    blue: 0 | 3 | 4
    white: 0 | 3 | 4
    black: 0 | 3 | 4
  }
}
