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
  nobles: NobleInterface[]
  cards: CardInterface[]
  players: PlayerInterface[]

  constructor() {
    makeObservable(this, {
      id: observable,
      isRunning: observable,
      nobles: observable,
      cards: observable,
      players: observable,
      numberOfPlayers: computed,
      start: action,
      stop: action,
    })

    this.id = uuidv4()
    this.players = []
    this.isRunning = false
    this.cards = _.shuffle(getCards())
    this.nobles = _.shuffle(getNobles())
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
