import React from 'react'
import Actions, { reducer, INITIAL_STATE } from '../../app/redux/game'

describe('Game reducer', () => {
  it('unhandled action resets state', () => {
    const state = reducer(undefined, {})

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('RESET action resets state', () => {
    const state = reducer(undefined, Actions.reset())

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('START_GAME action initializes a new game', () => {
    const payload = {
      champions: ['Jorah', 'Bronn']
    }

    const state = reducer(INITIAL_STATE, Actions.startGame({ ...payload }))

    expect(state).toHaveProperty('champions', ['Jorah', 'Bronn'])
    expect(state).toHaveProperty('round', 1)
  })

  describe('during an existing game', () => {
    let game

    beforeEach(() => {
      const payload = {
        champions: ['Jorah', 'Bronn']
      }

      game = reducer(INITIAL_STATE, Actions.startGame({ ...payload }))
    })

    it('YIELD action ends game in favor of opponent', () => {
      const payload = {
        champion: 'Jorah'
      }

      const state = reducer(game, Actions.playerYield({ ...payload }))

      expect(state).toHaveProperty('winner', 'Bronn')
    })
  })
})
