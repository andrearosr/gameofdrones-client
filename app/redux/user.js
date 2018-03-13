import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchUsers: null,
  fetchUsersSuccess: {
    users: [],
  },
  fetchUsersFailure: null,
  reset: null,
})

export const UserTypes = Types;
export default Creators;

/* ------------- Initial state ------------- */

// Available moves
export const INITIAL_STATE = {
  users: [],
}

/* ------------- REDUCERS -------------------- */

export const get = (state) => {
  return state
}

export const getSuccess = (state, { users }) => {
  return {
    ...state,
    users,
  }
}

export const getFailure = (state) => {
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
  [Types.RESET]: resetUsers,
})
