import React from 'react'
import Actions, { reducer, INITIAL_STATE } from '../../app/redux/game'

describe('Game reducer', () => {
  it('should respond to unhandled action with initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('should initialize a game with given champions', () => {
    const payload = {
      champion1: 'Jorah',
      champion2: 'Bronn'
    }

    const state = reducer(INITIAL_STATE, Actions.startGame({ ...payload }))

    expect(state).toHaveProperty('champion1', 'Jorah')
    expect(state).toHaveProperty('champion2', 'Bronn')
    expect(state).toHaveProperty('round', 1)
  })

  it('should be resettable', () => {
    const state = reducer(undefined, Actions.reset())

    expect(state).toMatchObject(INITIAL_STATE)
  })
})
