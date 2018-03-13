import API from '../../app/services/api'
import { put, call } from 'redux-saga/effects'
import { computeRound } from '../../app/sagas/game'
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
      round: 1,
      weapons
    }

    additionalRoundStatus = {
      champions: ['jorah', 'bronn'],
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
    const firstMoveRoundStatus = {
      ...roundStatus,
      currentMove: ['rock'],
    }

    expect(step(firstMoveRoundStatus)).toEqual(put(GameActions.continueRound()))
  })

  it('players draw', () => {
    const secondMoveRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'rock'],
    }

    expect(step(secondMoveRoundStatus))
      .toEqual(put(GameActions.completeRound({
        round: 2,
        status: ['draw'],
      })))
  })

  it('first player wins', () => {
    const secondMoveRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'scissors'],
    }

    expect(step(secondMoveRoundStatus))
      .toEqual(put(GameActions.completeRound({
        round: 2,
        status: ['jorah'],
      })))
  })

  it('first player loses', () => {
    const secondMoveRoundStatus = {
      ...roundStatus,
      currentMove: ['rock', 'paper'],
    }

    expect(step(secondMoveRoundStatus))
      .toEqual(put(GameActions.completeRound({
        round: 2,
        status: ['bronn'],
      })))
  })

  it('players draw if they select unrelated weapons', () => {
    const secondMoveRoundStatus = {
      ...additionalRoundStatus,
      currentMove: ['rock', 'mountain'],
    }

    expect(step(secondMoveRoundStatus))
      .toEqual(put(GameActions.completeRound({
        round: 2,
        status: ['draw'],
      })))
  })
})
