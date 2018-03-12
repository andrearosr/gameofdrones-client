import Immutable from 'seamless-immutable'
import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startGame: {
    champion1: null,
    champion2: null,
  },
})

export const GameTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

export const INITIAL_STATE = Immutable({
  champion1: null,
  champion2: null,
  round: 0,
  winner: null,
  moves: [],
})

/* ------------- REDUCERS -------------------- */

export const initializeGame = (state, action) => {
  const { champion1, champion2 } = action
  return INITIAL_STATE.merge({
    champion1,
    champion2,
    round: 1,
  })
}

/* --------------------End Reducers ------------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_GAME]: initializeGame,
})
