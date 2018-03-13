import React from 'react'
import Actions, { reducer, INITIAL_STATE } from '../../app/redux/settings'
import images from '../../app/assets/images'

describe('Settings reducer', () => {

  it('unhandled action resets state', () => {
    const state = reducer(undefined, {})

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('RESET action resets state', () => {
    const state = reducer(undefined, Actions.reset())

    expect(state).toMatchObject(INITIAL_STATE)
  })

  it('ADD_MOVE action pushes a new move onto an existing weapon', () => {
    const weapon = 'rock'
    const move = {
      weapon: 'paper',
      label: 'tears'
    }

    const state = reducer(INITIAL_STATE, Actions.addMove({ weapon, move }))
    const expected = [{
      name: 'rock',
      image: images.rockIcon,
      kills: [
        {
          weapon: 'scissors',
          label: 'smashes',
        },
        {
          weapon: 'paper',
          label: 'tears'
        }
      ],
    }]

    expect(state.weapons).toHaveLength(3)
    expect(state.weapons).toEqual(expect.arrayContaining(expected));
  })

  it('ADD_WEAPON action pushes a new action', () => {
    const newWeapon = {
      name: "mountain",
      kills: [
        {
          weapon: 'viper',
          label: 'crushes'
        }
      ]
    }

    const state = reducer(INITIAL_STATE, Actions.addWeapon({ newWeapon }))
    const expected = [newWeapon]
    expect(state.weapons).toHaveLength(4)
    expect(state.weapons).toEqual(expect.arrayContaining(expected));
  })
})