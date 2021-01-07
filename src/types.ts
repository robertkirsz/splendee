export interface PlayerInterface {
  id: string
  name: string
  currentRound: number
  score: number
  gems: GemAmountInterface
  cards: CardInterface[]
  inventoryColors: CardInterface['color'][]
  cardPoints: { [key in CardInterface['color']]: number }
  cardAmount: { [key in CardInterface['color']]: number }
  totalColorPoints: { [key in CardInterface['color']]: number }
  nobles: NobleInterface[]
  earnGem(color: GemColorsType): void
  canReserveCards: boolean
}

export type CostType = {
  red: number
  green: number
  blue: number
  white: number
  black: number
}

export interface CardInterface {
  id: number
  level: number
  value: number
  color: 'red' | 'green' | 'blue' | 'white' | 'black'
  cost: CostType
}

export type GemColorsType =
  | 'red'
  | 'green'
  | 'blue'
  | 'white'
  | 'black'
  | 'gold'

export interface GemAmountInterface {
  red: number
  green: number
  blue: number
  white: number
  black: number
  gold: number
}

export interface NobleInterface {
  id: number
  value: 3
  cost: CostType
}
