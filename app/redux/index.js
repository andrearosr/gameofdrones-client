import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'
import { reducer as game } from './game'
import { reducer as settings } from './settings'

export default combineReducers({
  game,
  settings,
  form: formReducer,
})
