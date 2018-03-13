import { createReducer, createActions } from 'reduxsauce'
import _ from 'lodash'
import images from '../assets/images'

const { Types, Creators } = createActions({
  addMove: {
    weapon: null,
    move: null,
  },
  addWeapon: {
    newWeapon: null,
  },
  reset: null,
})

export const GameTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Available moves
export const INITIAL_STATE = {
  weapons: [
    {
      name: 'rock',
      image: images.rockIcon,
      kills: [
        {
          weapon: 'scissors',
          label: 'smashes',
        },
      ],
    },
    {
      name: 'scissors',
      image: images.scissorsIcon,
      kills: [
        {
          weapon: 'paper',
          label: 'cuts',
        },
      ],
    },
    {
      name: 'paper',
      image: images.paperIcon,
      kills: [
        {
          weapon: 'rock',
          label: 'covers',
        },
      ],
    },
  ],
}

/* ------------- REDUCERS -------------------- */

export const addNewMove = (state, { weapon, move }) => {
  const selected = _.find(state.weapons, 'name', weapon)
  // this method mutates 'selected'
  _.set(selected, 'kills', [...selected.kills, move])

  return {
    ...state,
    selected,
  }
}

export const addNewWeapon = (state, { newWeapon }) => {
  const weapons = [...state.weapons, newWeapon]

  return {
    ...state,
    weapons,
  }
}

export const resetSettings = () => {
  return INITIAL_STATE
}

/* --------------------End Reducers ------------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MOVE]: addNewMove,
  [Types.ADD_WEAPON]: addNewWeapon,
  [Types.RESET]: resetSettings,
})
