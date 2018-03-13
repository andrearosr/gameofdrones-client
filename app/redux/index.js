import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import { reducer as game } from './game'
import { reducer as settings } from './settings'
import { reducer as user } from './user'

export default combineReducers({
  game,
  settings,
  user,
  form: formReducer,
})
