export interface GameInterface {
  id: string
  currentRound: number
}

export interface PlayerInterface {
  id: string
  name: string
  isReady: boolean
  score: number
  gems: GemAmountInterface
  cards: CardInterface[]
  reservedCards: CardInterface[]
  cardPoints: { [key in CardInterface['color']]: number }
  cardAmount: { [key in CardInterface['color']]: number }
  totalColorPoints: { [key in CardInterface['color']]: number }
  nobles: NobleInterface[]
  earnGem(color: GemColorsType): void
  canReserveCards: boolean
}

export interface PlayerDataForRoomInterface {
  id: string
  name: string
  isReady: boolean
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

export type GemColorsType = 'red' | 'green' | 'blue' | 'white' | 'black' | 'gold'

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
  players: PlayerDataForRoomInterface[]
  gameInProgress: boolean
}

export interface ConnectedPlayerMetadataInterface {
  socketId: string
  roomId: RoomInterface['id']
  playerId: PlayerInterface['id']
}

export interface DataInterface {
  rooms: RoomInterface[]
  players: ConnectedPlayerMetadataInterface[]
}

export enum MessageTypes {
  Gems = 'Gems',
  Card = 'Card',
  ReserveTable = 'ReserveTable',
  ReserveStack = 'ReserveStack',
  Noble = 'Noble',
}

export type Message =
  | { type: MessageTypes.Gems; text: string; gems: GemColorsType[] }
  | { type: MessageTypes.Card; text: string; cardId: CardInterface['id'] }
  | { type: MessageTypes.ReserveTable; text: string; cardId: CardInterface['id'] }
  | {
      type: MessageTypes.ReserveStack
      text: string
      level: CardInterface['level']
      gotGold: boolean
    }
  | { type: MessageTypes.Noble; text: string; nobleId: NobleInterface['id'] }
