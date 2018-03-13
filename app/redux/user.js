import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchUsers: null,
  fetchUsersSuccess: {
    users: [],
  },
  fetchUsersFailure: null,
  getChampionsUsers: {
    champions: [],
  },
  getChampionsUsersSuccess: {
    championsUsers: [],
  },
  getChampionsUsersFailure: null,
  reset: null,
})

export const UserTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Available moves
export const INITIAL_STATE = {
  users: [],
  championsUsers: [],
  finished: false,
}

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getChampionsUsers: ({ user }) => ({
    championsUsers: user.championsUsers,
  }),
}

/* ------------- REDUCERS -------------------- */

export const get = (state) => {
  return state
}

export const getSuccess = (state, { users }) => {
  return {
    ...state,
    users,
    finished: true,
  }
}

export const getFailure = (state) => {
  return {
    ...state,
    error: true,
    finished: true,
  }
}

export const getChampions = (state, { champions }) => {
  return state
}

export const getChampionsSuccess = (state, { championsUsers }) => {
  return {
    ...state,
    championsUsers,
  }
}

export const getChampionsFailure = (state) => {
  return {
    ...state,
    error: true,
  }
}

export const resetUsers = () => {
  return INITIAL_STATE
}

/* --------------------End Reducers ------------------- */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_USERS]: get,
  [Types.FETCH_USERS_SUCCESS]: getSuccess,
  [Types.FETCH_USERS_FAILURE]: getFailure,
  [Types.GET_CHAMPIONS_USERS]: getChampions,
  [Types.GET_CHAMPIONS_USERS_SUCCESS]: getChampionsSuccess,
  [Types.GET_CHAMPIONS_USERS_FAILURE]: getChampionsFailure,
  [Types.RESET]: resetUsers,
})
