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

class Player implements PlayerInterface {
  id: PlayerInterface['id'] = uuidv4()
  name: PlayerInterface['name'] = ''
  currentRound: PlayerInterface['currentRound'] = 0
  gems: PlayerInterface['gems'] = {
    red: 0,
    green: 0,
    blue: 0,
    white: 0,
    black: 0,
    gold: 0,
  }
  // cards: PlayerInterface['cards'] = _.shuffle(getCards()).slice(0, 30)
  cards: PlayerInterface['cards'] = []
  nobles: PlayerInterface['nobles'] = []

  constructor({ name }: { name: PlayerInterface['name'] }) {
    makeObservable(this, {
      nobles: observable,
      gems: observable,
      cards: observable,
      cardAmount: computed,
      cardPoints: computed,
      totalColorPoints: computed,
      inventoryColors: computed,
      score: computed,
      earnGem: action,
    })

    this.name = name
  }

  get score(): PlayerInterface['score'] {
    return (
      this.cards.reduce((score, card) => score + card.value, 0) +
      this.nobles.reduce((score, noble) => score + noble.value, 0)
    )
  }

  get inventoryColors(): CardInterface['color'][] {
    const result = {
      red: false,
      green: false,
      blue: false,
      white: false,
      black: false,
    }

    this.cards.forEach(card => (result[card.color] = true))

    Object.entries(this.gems).forEach(([color, amount]) => {
      // @ts-ignore
      if (amount > 0) result[color] = true
    })

    // @ts-ignore
    return (
      Object.entries(result)
        .filter(([color, exists]) => exists)
        .map(([color]) => color)
        .sort() || []
    )
  }

  get cardPoints(): PlayerInterface['cardPoints'] {
    return this.cards.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.color]: (prev[curr.color] || 0) + curr.value,
      }),
      { red: 0, green: 0, blue: 0, white: 0, black: 0 }
    )
  }

  get cardAmount(): PlayerInterface['cardAmount'] {
    return this.cards.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.color]: (prev[curr.color] || 0) + 1,
      }),
      { red: 0, green: 0, blue: 0, white: 0, black: 0 }
    )
  }

  get totalColorPoints(): PlayerInterface['gems'] {
    return {
      red: this.gems.red + this.cardAmount.red,
      green: this.gems.green + this.cardAmount.green,
      blue: this.gems.blue + this.cardAmount.blue,
      white: this.gems.white + this.cardAmount.white,
      black: this.gems.black + this.cardAmount.black,
      gold: this.gems.gold,
    }
  }

  public earnGem = (color: GemColorsType) => {
    this.gems[color]++
  }
}

class Game {
  id: string = uuidv4()
  isRunning: boolean = false
  currentRound: number = 1
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
      purchasableCardsIds: computed,
      purchasableNoblesIds: computed,
      start: action,
      stop: action,
      buyCard: action,
      earnGem: action,
      earnNoble: action,
      changeActivePlayer: action,
    })

    this.players = [
      new Player({ name: 'Robert' }),
      new Player({ name: 'Marzenka' }),
      new Player({ name: 'Kasia' }),
    ]

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
      .reverse()
  }

  public get numberOfPlayers() {
    return this.players.length
  }

  public get activePlayer() {
    return this.players.find(({ id }) => id === this.activePlayerId)
  }

  public get purchasableCardsIds() {
    return this.cards
      .filter(card => {
        let isPurchasable: boolean | undefined = undefined

        for (let color in card.cost) {
          if (isPurchasable === false) break

          if (
            // @ts-ignore
            !card.cost[color] ||
            // @ts-ignore
            card.cost[color] <=
              // @ts-ignore
              this.activePlayer?.totalColorPoints[color]
          ) {
            isPurchasable = true
          } else {
            isPurchasable = false
          }
        }

        return isPurchasable
      })
      .map(card => card.id)
  }

  public get purchasableNoblesIds() {
    return this.nobles
      .filter(noble => {
        let isPurchasable: boolean | undefined = undefined

        for (let color in noble.cost) {
          if (isPurchasable === false) break

          if (
            // @ts-ignore
            noble.cost[color] <= this.activePlayer?.cardAmount[color]
          ) {
            isPurchasable = true
          } else {
            isPurchasable = false
          }
        }

        return isPurchasable
      })
      .map(noble => noble.id)
  }

  public start = () => {
    this.isRunning = true
  }

  public stop = () => {
    this.isRunning = false
  }

  // TODO: change to cardId, like in earnNoble?
  public buyCard = (card: CardInterface) => {
    const cardIndex = this.cards.findIndex(({ id }) => id === card.id)
    const cardFound = this.cards.splice(cardIndex, 1)[0]

    // TODO: I want this to always exist
    if (this.activePlayer) {
      // Pay the cost
      for (let color in card.cost) {
        const remainingGemCost =
          // @ts-ignore
          card.cost[color] - this.activePlayer.cardPoints[color]

        if (remainingGemCost > 0) {
          // @ts-ignore
          this.activePlayer.gems[color] -= remainingGemCost
          // @ts-ignore
          this.gems[color] += remainingGemCost
        }
      }

      this.activePlayer.cards.push(cardFound)
    }
  }

  public earnGem = (color: GemColorsType) => {
    if (!this.gems[color]) return
    this.gems[color]--
    this.activePlayer?.earnGem(color)
  }

  public earnNoble = (nobleId: NobleInterface['id']) => {
    const nobleIndex = this.nobles.findIndex(({ id }) => id === nobleId)
    const nobleFound = this.nobles.splice(nobleIndex, 1)[0]
    this.activePlayer?.nobles.push(nobleFound)
  }

  public changeActivePlayer = (id: PlayerInterface['id']) => {
    this.activePlayerId = id
  }
}

export const gameStore = createContext(new Game())
