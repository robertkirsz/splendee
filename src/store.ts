import { createContext } from 'react'
import { makeObservable, observable, action, computed } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import {
  PlayerInterface,
  CardInterface,
  NobleInterface,
  GemAmountInterface,
  GemColorsType,
} from 'types'

import getCards from 'tokens/cards'
import getNobles from 'tokens/nobles'

class Player {
  id: PlayerInterface['id'] = uuidv4()
  name: PlayerInterface['name']
  currentRound: PlayerInterface['currentRound'] = 0
  gems: PlayerInterface['gems'] = {
    red: 0,
    green: 0,
    blue: 0,
    white: 0,
    black: 0,
    gold: 0,
  }
  cards: PlayerInterface['cards'] = []

  constructor({ name }: { name: PlayerInterface['name'] }) {
    makeObservable(this, {
      gems: observable,
      cards: observable,
      cardPoints: computed,
      earnGem: action,
    })

    this.name = name
  }

  get score(): PlayerInterface['score'] {
    return this.cards.reduce((score, card) => score + card.value, 0)
  }

  get cardPoints(): any {
    return this.cards.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.color]: (prev[curr.color] || 0) + curr.value,
      }),
      { red: 0, green: 0, blue: 0, white: 0, black: 0 }
    )
  }

  public earnGem = (color: GemColorsType) => {
    this.gems[color]++
  }
}

class Game {
  id: string
  isRunning: boolean
  currentRound: number
  activePlayerId: string
  nobles: NobleInterface[]
  cards: CardInterface[]
  gems: GemAmountInterface
  players: PlayerInterface[]
  cardLevels: CardInterface['level'][]

  constructor() {
    makeObservable(this, {
      id: observable,
      isRunning: observable,
      currentRound: observable,
      activePlayerId: observable,
      nobles: observable,
      cards: observable,
      players: observable,
      gems: observable,
      numberOfPlayers: computed,
      activePlayer: computed,
      start: action,
      stop: action,
      buyCard: action,
      earnGem: action,
      changeActivePlayer: action,
    })

    this.id = uuidv4()

    this.players = [
      new Player({ name: 'Robert' }),
      new Player({ name: 'Marzenka' }),
      new Player({ name: 'Kasia' }),
    ]

    this.isRunning = false
    this.currentRound = 1
    this.activePlayerId = this.players[0].id
    this.cards = _.shuffle(getCards())
    this.nobles = _.shuffle(getNobles()).slice(0, this.numberOfPlayers + 1)

    this.gems = {
      red: 7,
      green: 7,
      blue: 7,
      white: 7,
      black: 7,
      gold: 5,
    }

    this.cardLevels = this.cards
      .map(({ level }) => level)
      .filter((level, index, array) => array.indexOf(level) === index)
      .sort()
  }

  public get numberOfPlayers() {
    return this.players.length
  }

  public get activePlayer() {
    return this.players.find(({ id }) => id === this.activePlayerId)
  }

  public start = () => {
    this.isRunning = true
  }

  public stop = () => {
    this.isRunning = false
  }

  public buyCard = (card: CardInterface) => {
    const cardIndex = this.cards.findIndex(({ id }) => id === card.id)
    const cardFound = this.cards.splice(cardIndex, 1)[0]
    this.activePlayer?.cards.push(cardFound)
  }

  public earnGem = (color: GemColorsType) => {
    if (!this.gems[color]) return
    this.gems[color]--
    this.activePlayer?.earnGem(color)
  }

  public changeActivePlayer = (id: PlayerInterface['id']) => {
    this.activePlayerId = id
  }
}

export const gameStore = createContext(new Game())
