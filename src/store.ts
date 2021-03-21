import { createContext } from 'react'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import type {
  PlayerInterface,
  PlayerDataForRoomInterface,
  CardInterface,
  NobleInterface,
  GemAmountInterface,
  GemColorsType,
  RoomInterface,
  GameInterface,
} from 'types'

import getCards from 'tokens/cards'
import getNobles from 'tokens/nobles'

import { flyCard, flyGem, removeByIdAndReturn, log } from 'utils'
import socket from 'socket'

// TODO: check if we need export here
export class Player implements PlayerInterface {
  id: PlayerInterface['id']
  name: PlayerInterface['name']
  isReady: PlayerInterface['isReady']
  gems: PlayerInterface['gems'] = {
    red: 0,
    green: 0,
    blue: 0,
    white: 0,
    black: 0,
    gold: 0,
  }
  chosenGems: GemColorsType[] = []
  // cards: PlayerInterface['cards'] = _.shuffle(getCards()).slice(0, 30)
  cards: PlayerInterface['cards'] = []
  reservedCards: PlayerInterface['cards'] = []
  nobles: PlayerInterface['nobles'] = []

  constructor({
    id,
    name = '',
    isReady = false,
  }: {
    id?: PlayerInterface['id']
    name?: PlayerInterface['name']
    isReady?: PlayerInterface['isReady']
  } = {}) {
    makeAutoObservable(this)

    this.id = id || uuidv4()
    this.name = name
    this.isReady = isReady
  }

  get score(): PlayerInterface['score'] {
    return (
      this.cards.reduce((score, card) => score + card.value, 0) +
      this.nobles.reduce((score, noble) => score + noble.value, 0)
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

  get dataForRoom(): PlayerDataForRoomInterface {
    return {
      id: this.id,
      name: this.name,
      isReady: this.isReady,
    }
  }

  public chooseGem = (gem: GemColorsType) => {
    this.chosenGems.push(gem)
  }

  public clearChoosenGems = () => {
    this.chosenGems = []
  }

  public setName = (name: string) => {
    this.name = name
  }

  public earnGem = (color: GemColorsType) => {
    this.gems[color]++
  }

  public setIsReady = (value: boolean) => {
    this.isReady = value
  }
}

class Game {
  id = ''
  roomId = ''
  isRunning = false
  actionInProgress = false
  currentRound = 0
  activePlayerId = ''
  players: PlayerInterface[] = []
  nobles: NobleInterface[] = []
  cards: CardInterface[] = []
  gems: GemAmountInterface = {
    red: 0,
    green: 0,
    blue: 0,
    white: 0,
    black: 0,
    gold: 0,
  }

  constructor() {
    makeAutoObservable(this)

    socket.onInitialGameData((gameId, roomId, players, cardIds, noblesIds) => {
      log('Starting game!')

      this.start(
        gameId,
        roomId,
        players.map(player => new Player(player)),
        cardIds,
        noblesIds
      )

      socket.offInitialGameData()
    })

    socket.onChangeActivePlayer((activePlayerId, currentRound) => {
      log('Change active player to', activePlayerId)
      this.changeActivePlayer(activePlayerId)
      this.changeCurrentRound(currentRound)
    })

    socket.onSyncGems(this.syncGems)
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

  public start = (
    gameId: string,
    roomId: RoomInterface['id'],
    players: PlayerInterface[],
    cardIds: CardInterface['id'][],
    noblesIds: NobleInterface['id'][]
  ) => {
    this.id = gameId
    this.roomId = roomId
    this.currentRound = 1
    this.players = players
    this.activePlayerId = players[0].id
    const allCards = getCards()
    this.cards = cardIds.map(cardId => allCards.find(card => card.id === cardId)!)
    const allNobles = getNobles()
    this.nobles = noblesIds.map(nobleId => allNobles.find(noble => noble.id === nobleId)!)
    this.prepareGems()
    this.isRunning = true
  }

  // TODO: check if used
  public stop = () => {
    this.isRunning = false
  }

  public drawCards = (numberOfPlayers: number) => ({
    cardIds: _.shuffle(getCards()).map(card => card.id),
    noblesIds: _.shuffle(getNobles())
      .slice(0, numberOfPlayers + 1)
      .map(card => card.id),
  })

  private prepareGems() {
    let numberOfGems = 7
    if (this.numberOfPlayers === 2) numberOfGems = 4
    if (this.numberOfPlayers === 3) numberOfGems = 5

    this.gems = {
      red: numberOfGems,
      green: numberOfGems,
      blue: numberOfGems,
      white: numberOfGems,
      black: numberOfGems,
      gold: 5,
    }
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

    const cardIsReservedByActivePlayer = card.isReservedBy === this.activePlayer.id

    return flyCard(
      // prettier-ignore
      cardIsReservedByActivePlayer
        ? document.querySelector(`[data-player-id="${this.activePlayer!.id}"] [data-card-id="${card.id}"]`)
        : document.querySelector(`#card-board [data-card-id="${card.id}"]`),
      document.querySelector(
        `[data-player-id="${this.activePlayer!.id}"] [data-indicator-color="${card.color}"]`
      )
    ).then(() => {
      runInAction(() => {
        // TODO: I want this to always exist
        if (typeof this.activePlayer === 'undefined') return

        let cardFound: CardInterface

        this.payCardCost(card)

        if (cardIsReservedByActivePlayer) {
          cardFound = removeByIdAndReturn(this.activePlayer.reservedCards, card.id)!
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
        `[data-player-id="${this.activePlayer!.id}"] [data-indicator-color="${color}"]`
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

  public giveTurnToNextPlayer = () => {
    const activePlayerIndex = this.players.findIndex(player => player.id === this.activePlayerId)
    let currentRound = this.currentRound
    let nextActivePlayerId = this.players[activePlayerIndex + 1]?.id

    if (!nextActivePlayerId) {
      nextActivePlayerId = this.players[0].id
      currentRound++
    }

    socket.emitChangeActivePlayer(this.roomId, nextActivePlayerId, currentRound)
  }

  private changeActivePlayer = (activePlayerId: PlayerInterface['id']) => {
    this.activePlayerId = activePlayerId
  }

  private changeCurrentRound = (currentRound: GameInterface['currentRound']) => {
    this.currentRound = currentRound
  }

  private syncGems = (playerId: PlayerInterface['id'], gems: GemColorsType[]) => {
    const player = this.players.find(player => player.id === playerId)
    console.log('🚀 ~ syncGems', gems)
    gems.forEach(gem => {
      player?.earnGem(gem)
      this.gems[gem]--
    })
  }
}

export const gameStore = createContext(new Game())

export const playerStore = createContext(new Player())
