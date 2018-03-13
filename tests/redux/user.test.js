import React from 'react'
import Actions, { reducer, INITIAL_STATE } from '../../app/redux/user'

describe('Game reducer', () => {
  it('unhandled action resets state', () => {
    const state = reducer(undefined, {})

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('RESET action resets state', () => {
    const state = reducer(undefined, Actions.reset())

    expect(state).toMatchObject(INITIAL_STATE)
  })
})
