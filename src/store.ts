import { createContext } from 'react'
import { makeObservable, observable, action, computed, runInAction } from 'mobx'
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

import { flyCard, flyGem, removeByIdAndReturn } from 'utils'

class Player implements PlayerInterface {
  id: PlayerInterface['id'] = uuidv4()
  name: PlayerInterface['name'] = ''
  currentRound: PlayerInterface['currentRound'] = 0
  // gems: PlayerInterface['gems'] = {
  //   red: 0,
  //   green: 0,
  //   blue: 0,
  //   white: 0,
  //   black: 0,
  //   gold: 0,
  // }
  gems: PlayerInterface['gems'] = {
    red: 7,
    green: 7,
    blue: 7,
    white: 7,
    black: 7,
    gold: 1,
  }
  cards: PlayerInterface['cards'] = _.shuffle(getCards()).slice(0, 30)
  // cards: PlayerInterface['cards'] = []
  reservedCards: PlayerInterface['cards'] = []
  nobles: PlayerInterface['nobles'] = []

  constructor({ name }: { name: PlayerInterface['name'] }) {
    makeObservable(this, {
      gems: observable,
      cards: observable,
      reservedCards: observable,
      nobles: observable,
      cardAmount: computed,
      cardPoints: computed,
      totalColorPoints: computed,
      inventoryColors: computed,
      score: computed,
      canReserveCards: computed,
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

  // TODO: not sure I need this anymore
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

  get canReserveCards() {
    return this.reservedCards.length < 3
  }

  public earnGem = (color: GemColorsType) => {
    this.gems[color]++
  }
}

class Game {
  id: string = uuidv4()
  isRunning: boolean = false
  actionInProgress: boolean = false
  currentRound: number = 1
  activePlayerId: string
  nobles: NobleInterface[]
  cards: CardInterface[]
  gems: GemAmountInterface
  players: PlayerInterface[]

  constructor() {
    makeObservable(this, {
      id: observable,
      isRunning: observable,
      actionInProgress: observable,
      currentRound: observable,
      activePlayerId: observable,
      nobles: observable,
      cards: observable,
      players: observable,
      gems: observable,
      numberOfPlayers: computed,
      activePlayer: computed,
      purchasableNoblesIds: computed,
      start: action,
      stop: action,
      buyCard: action,
      reserveCard: action,
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
  }

  public get numberOfPlayers() {
    return this.players.length
  }

  public get activePlayer() {
    return this.players.find(({ id }) => id === this.activePlayerId)
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

  private payCardCost(card: CardInterface) {
    for (let color in card.cost) {
      const remainingGemCost =
        // @ts-ignore
        card.cost[color] - this.activePlayer.cardAmount[color]

      if (remainingGemCost > 0) {
        // @ts-ignore
        this.activePlayer.gems[color] -= remainingGemCost
        // @ts-ignore
        this.gems[color] += remainingGemCost
      }
    }
  }

  // TODO: change to cardId, like in earnNoble?
  public buyCard = (card: CardInterface) => {
    // TODO: I want this to always exist
    if (typeof this.activePlayer === 'undefined') return Promise.resolve()

    this.actionInProgress = true

    const cardIsReservedByActivePlayer =
      card.isReservedBy === this.activePlayer.id

    return flyCard(
      // prettier-ignore
      cardIsReservedByActivePlayer
        ? document.querySelector(`[data-player-id="${this.activePlayer!.id}"] [data-card-id="${card.id}"]`)
        : document.querySelector(`#card-board [data-card-id="${card.id}"]`),
      document.querySelector(
        `[data-player-id="${this.activePlayer!.id}"] [data-indicator-color="${
          card.color
        }"]`
      )
    ).then(() => {
      runInAction(() => {
        // TODO: I want this to always exist
        if (typeof this.activePlayer === 'undefined') return

        let cardFound: CardInterface

        this.payCardCost(card)

        if (cardIsReservedByActivePlayer) {
          cardFound = removeByIdAndReturn(
            this.activePlayer.reservedCards,
            card.id
          )!
          delete cardFound.isReservedBy
        } else {
          cardFound = removeByIdAndReturn(this.cards, card.id)!
        }

        this.activePlayer.cards.push(cardFound)
        this.actionInProgress = false
      })
    })
  }

  public reserveCard = (card: CardInterface, animate = true) => {
    // TODO: Don't show card reserved from stack
    // TODO: I want activePlayer this to always exist
    if (!this.activePlayer?.canReserveCards) return Promise.resolve()

    if (this.gems.gold) this.earnGem('gold')

    const doLogic = () => {
      // TODO: I want activePlayer this to always exist
      if (typeof this.activePlayer === 'undefined') return
      const cardFound = removeByIdAndReturn(this.cards, card.id)!
      cardFound.isReservedBy = this.activePlayer.id
      this.activePlayer.reservedCards.push(cardFound)
    }

    if (!animate) {
      doLogic()
      return Promise.resolve()
    }

    return flyCard(
      document.querySelector(`#card-board [data-card-id="${card.id}"]`),
      document.querySelector(`[data-player-id="${this.activePlayer!.id}"]`)
    ).then(() => {
      runInAction(doLogic)
    })
  }

  public earnGem = (color: GemColorsType) => {
    if (!this.gems[color]) return

    this.gems[color]--

    const doLogic = () => {
      // TODO: I want activePlayer this to always exist
      this.activePlayer?.earnGem(color)
    }

    flyGem(
      document.querySelector(`[data-gem-container-color="${color}"]`),
      document.querySelector(
        `[data-player-id="${
          this.activePlayer!.id
        }"] [data-indicator-color="${color}"]`
      )
    ).then(() => {
      runInAction(doLogic)
    })
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
