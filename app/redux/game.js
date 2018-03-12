import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startGame: {
    champions: null,
  },
  playerYield: {
    champion: null,
  },
  reset: null,
})

export const GameTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Round 0 is reserved for 'unstarted' game. Round 4 is reserved for 'finished' game.
// Current move holds an object that defines the current moves of each player
// Moves holds the history of moves
export const INITIAL_STATE = {
  champions: null,
  readyPlayerOne: null,
  round: 0,
  winner: null,
  currentMove: null,
  moves: [],
}

/* ------------- REDUCERS -------------------- */

export const initializeGame = (state, { champions }) => {
  return {
    ...state,
    champions,
    round: 1,
    readyPlayerOne: true,
  }
}

export const playerYields = (state, { champion }) => {
  const otherPlayer = state.champions.find((i) => {
    return i !== champion
  })

  return {
    ...state,
    round: 4,
    winner: otherPlayer,
    readyPlayerOne: null,
  }
}

export const resetGame = () => {
  return INITIAL_STATE
}

/* --------------------End Reducers ------------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_GAME]: initializeGame,
  [Types.PLAYER_YIELD]: playerYields,
  [Types.RESET]: resetGame,
})
