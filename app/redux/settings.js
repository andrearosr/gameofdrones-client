import { createReducer, createActions } from 'reduxsauce'
import _ from 'lodash'
import images from '../assets/images'

const { Types, Creators } = createActions({
  fetch: null,
  fetchSuccess: {
    weapons: [],
  },
  fetchFailure: null,
  addMove: {
    weapon: {},
    move: null,
  },
  addWeapon: {
    newWeapon: {},
  },
  reset: null,
})

export const SettingsTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Available moves
export const INITIAL_STATE = {
  weapons: [],
  error: null,
}

/* ------------- REDUCERS -------------------- */

export const get = (state) => {
  return state
}

export const getSuccess = (state, { weapons }) => {
  return {
    ...state,
    weapons,
  }
}

export const getFailure = (state) => {
  return {
    ...state,
    error: true,
  }
}

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
  [Types.FETCH]: get,
  [Types.FETCH_SUCCESS]: getSuccess,
  [Types.FETCH_FAILURE]: getFailure,
  [Types.ADD_MOVE]: addNewMove,
  [Types.ADD_WEAPON]: addNewWeapon,
  [Types.RESET]: resetSettings,
})
