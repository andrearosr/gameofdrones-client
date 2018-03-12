import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import { reducer as game } from './game'

export default combineReducers({
  game,
  form: formReducer,
})
