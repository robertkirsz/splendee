export interface PlayerInterface {
  id: string
  name: string
  isReady: boolean
  currentRound: number
  score: number
  gems: GemAmountInterface
  cards: CardInterface[]
  reservedCards: CardInterface[]
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
  isReservedBy?: string
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

export interface RoomInterface {
  id: string
  players: PlayerInterface[]
  gameInProgress: boolean
}

export interface ConnectedPlayerMetadataInterface {
  socketId: string
  roomId: string
  playerId: PlayerInterface['id']
}

export interface DataInterface {
  rooms: RoomInterface[]
  players: ConnectedPlayerMetadataInterface[]
}
