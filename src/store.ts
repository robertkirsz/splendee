import { createContext } from 'react'
import { makeObservable, observable, action, computed } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { PlayerInterface, CardInterface, NobleInterface } from 'types'
import getCards from 'tokens/cards'
import getNobles from 'tokens/nobles'

class Game {
  id: string
  isRunning: boolean
  currentRound: number
  activePlayerId: string
  nobles: NobleInterface[]
  cards: CardInterface[]
  players: PlayerInterface[]

  constructor() {
    makeObservable(this, {
      id: observable,
      isRunning: observable,
      currentRound: observable,
      activePlayerId: observable,
      nobles: observable,
      cards: observable,
      players: observable,
      numberOfPlayers: computed,
      start: action,
      stop: action,
    })

    this.id = uuidv4()
    this.players = [
      {
        id: '0',
        name: 'Robert',
        currentRound: 0,
        score: 0,
        gems: { red: 0, green: 0, blue: 0, white: 0, black: 0, gold: 0 },
      },
      {
        id: '1',
        name: 'Marzenka',
        currentRound: 0,
        score: 0,
        gems: { red: 0, green: 0, blue: 0, white: 0, black: 0, gold: 0 },
      },
      {
        id: '2',
        name: 'Kasia',
        currentRound: 0,
        score: 0,
        gems: { red: 0, green: 0, blue: 0, white: 0, black: 0, gold: 0 },
      },
    ]
    this.isRunning = false
    this.currentRound = 1
    this.activePlayerId = this.players[0].id
    this.cards = _.shuffle(getCards())
    this.nobles = _.shuffle(getNobles()).slice(0, this.numberOfPlayers + 1)
  }

  get numberOfPlayers() {
    return this.players.length
  }

  start() {
    this.isRunning = true
  }

  stop() {
    this.isRunning = false
  }
}

export const gameStore = createContext(new Game())
