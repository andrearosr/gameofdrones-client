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
    const champions = ['Jorah', 'Bronn']

    const state = reducer(INITIAL_STATE, Actions.startGame({ champions }))

    expect(state).toHaveProperty('champions', ['Jorah', 'Bronn'])
    expect(state).toHaveProperty('round', 1)
  })

  describe('during an existing game', () => {
    let game

    beforeEach(() => {
      const champions = ['Jorah', 'Bronn']

      game = reducer(INITIAL_STATE, Actions.startGame({ champions }))
    })

    it('YIELD action ends game in favor of opponent', () => {
      const champion = 'Jorah'

      const state = reducer(game, Actions.championYield({ champion }))

      expect(state).toHaveProperty('winner', 'Bronn')
    })

    it('MAKE_MOVE action performs a new move for player 1', () => {
      const weapon = 'rock'

      const state = reducer(game, Actions.makeMove({ weapon }))
      const expected = ['rock']

      expect(state.currentMove).toEqual(expected)
    })

    describe('after player one has made a move', () => {
      let firstMove

      beforeEach(() => {
        // Mock state resulting after 'compute round' executes
        firstMove = {
          champions: [ 'Jorah', 'Bronn' ],
          isChampionOneTurn: false,
          round: 1,
          winner: null,
          currentMove: [ 'rock' ],
          scores: null
        }
      })

      it('MAKE_MOVE action performs a new move for player 2', () => {
        const weapon = 'scissors'

        const state = reducer(firstMove, Actions.makeMove({ weapon }))
        const expected = ['rock', 'scissors']

        expect(state.currentMove).toEqual(expected)
      })
    })
  })
})
