import API from '../../app/services/api'
import { put, call } from 'redux-saga/effects'
import { computeRound, computeGame } from '../../app/sagas/game'
import GameActions from '../../app/redux/game'

const stepper = (fn) => (mock) => fn.next(mock).value
const api = API.create()

describe('Given the computeRound saga', () => {
  let weapons, step, roundStatus, additionalRoundStatus

  beforeAll(() => {
    return api.getWeapons().then(response => {
      weapons = response.data
    })
  })

  beforeEach(() => {
    const weapon = 'rock'
    step = stepper(computeRound({ weapon }))

    // Selector
    step()

    roundStatus = {
      champions: ['jorah', 'bronn'],
      scores: [],
      round: 1,
      weapons
    }

    additionalRoundStatus = {
      champions: ['jorah', 'bronn'],
      scores: [],
      round: 1,
      weapons: [
        ...weapons,
        {
          name: 'mountain',
          kills: {
            weapon: 'viper',
            label: 'crushes'
          }
        }
      ]
    }
  })

  it('continues round if first player moved', () => {
    const getRoundStatus = {
      ...roundStatus,
      currentMove: ['rock'],
    }

    expect(step(getRoundStatus)).toEqual(put(GameActions.continueRound()))
  })

  it('players draw', () => {
    const getRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'rock'],
    }

    const result = {
      round: 2,
      scores: ['draw'],
    }

    expect(step(getRoundStatus))
      .toEqual(put(GameActions.completeRound(result)))
  })

  it('first player wins', () => {
    const getRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'scissors'],
    }

    const result = {
      round: 2,
      scores: ['jorah'],
    }

    expect(step(getRoundStatus))
      .toEqual(put(GameActions.completeRound(result)))
  })

  it('first player loses', () => {
    const getRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'paper'],
    }

    const result = {
      round: 2,
      scores: ['bronn'],
    }

    expect(step(getRoundStatus))
      .toEqual(put(GameActions.completeRound(result)))
  })

  it('players draw if they select unrelated weapons', () => {
    const getRoundStatus = {
      ...additionalRoundStatus,
      currentMove: ['rock', 'mountain'],
    }

    const result = {
      round: 2,
      scores: ['draw'],
    }

    expect(step(getRoundStatus))
      .toEqual(put(GameActions.completeRound(result)))
  })
})

describe('Given the computeGame saga', () => {
  const getChampions = {
    champions: ['jorah', 'bronn']
  }

  it('continues if no player has three points', () => {
    const round = 4
    const scores = ['jorah', 'jorah', 'bronn']

    const step = stepper(computeGame({ round, scores }))

    // Selector
    step()

    expect(step(getChampions)).toEqual(put(GameActions.continueGame()))
  })

  it('first champion wins if they have 3 points', () => {
    const round = 4
    const scores = ['jorah', 'jorah', 'jorah']

    const step = stepper(computeGame({ round, scores }))

    const result = {
      winner: 'jorah'
    }

    // Selector
    step()

    expect(step(getChampions)).toEqual(put(GameActions.completeGame(result)))
  })

  it('second champion wins if they have 3 points', () => {
    const round = 4
    const scores = ['bronn', 'bronn', 'bronn']

    const step = stepper(computeGame({ round, scores }))

    const result = {
      winner: 'bronn'
    }

    // Selector
    step()

    expect(step(getChampions)).toEqual(put(GameActions.completeGame(result)))
  })
})
