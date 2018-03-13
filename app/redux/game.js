import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startGame: {
    champions: [],
  },
  makeMove: {
    weapon: null,
  },
  continueRound: null,
  completeRound: {
    round: null,
    scores: [],
  },
  championYield: {
    champion: null,
  },
  reset: null,
})

export const GameTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Round 0 is reserved for 'unstarted' game. Round 4 is reserved for 'finished' game.
// Current move holds the current moves of each player
// Scores holds a 'log' of the winner of each previous round
export const INITIAL_STATE = {
  champions: null,
  isChampionOneTurn: null,
  round: 0,
  winner: null,
  currentMove: null,
  scores: [],
}

/* ------------- Selectors ------------- */

export const GameSelectors = {
  getRoundStatus: ({ game, settings }) => ({
    weapons: settings.weapons,
    champions: game.champions,
    round: game.round,
    currentMove: game.currentMove,
    scores: game.scores,
  }),
}

/* ------------- REDUCERS -------------------- */

export const initializeGame = (state, { champions }) => {
  return {
    ...state,
    champions,
    round: 1,
    isChampionOneTurn: true,
  }
}

export const makeNewMove = (state, { weapon }) => {
  const currentMove = state.currentMove || []
  const index = state.isChampionOneTurn ? 0 : 1

  currentMove[index] = weapon

  return {
    ...state,
    currentMove,
  }
}

export const continueCurrentRound = (state) => {
  return {
    ...state,
    isChampionOneTurn: false,
  }
}

export const completeCurrentRound = (state, { round, scores }) => {
  return {
    ...state,
    round,
    scores,
    currentMove: [],
    isChampionOneTurn: true,
  }
}

export const championYields = (state, { champion }) => {
  const otherPlayer = state.champions.find((i) => {
    return i !== champion
  })

  return {
    ...state,
    round: 4,
    winner: otherPlayer,
    isChampionOneTurn: null,
  }
}

export const resetGame = () => {
  return INITIAL_STATE
}

/* --------------------End Reducers ------------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_GAME]: initializeGame,
  [Types.MAKE_MOVE]: makeNewMove,
  [Types.CONTINUE_ROUND]: continueCurrentRound,
  [Types.COMPLETE_ROUND]: completeCurrentRound,
  [Types.CHAMPION_YIELD]: championYields,
  [Types.RESET]: resetGame,
})
