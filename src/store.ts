import { createContext } from 'react'
import { makeObservable, observable, action, computed } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { PlayerInterface, CardInterface, NobleInterface } from 'types'
import getCards from 'tokens/cards'
import getNobles from 'tokens/nobles'

class Player {
  id: PlayerInterface['id'] = uuidv4()
  name: PlayerInterface['name']
  currentRound: PlayerInterface['currentRound'] = 0
  score: PlayerInterface['score'] = 0
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
    this.name = name
  }
}

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
      new Player({ name: 'Robert' }),
      new Player({ name: 'Marzenka' }),
      new Player({ name: 'Kasia' }),
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

  public start = () => {
    this.isRunning = true
  }

  public stop = () => {
    this.isRunning = false
  }
}

export const gameStore = createContext(new Game())
