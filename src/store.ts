import { createContext } from 'react'
import { makeObservable, observable, action, computed } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { GemAmountInterface } from 'types'

interface Player {
  id: string
  name: string
  currentRound: number
  score: number
  gems: GemAmountInterface
}

class Game {
  id: string
  players: Player[]
  isRunning: boolean

  constructor() {
    makeObservable(this, {
      id: observable,
      players: observable,
      isRunning: observable,
      numberOfPlayers: computed,
      start: action,
      stop: action
    })

    this.id = uuidv4()
    this.players = []
    this.isRunning = false
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
