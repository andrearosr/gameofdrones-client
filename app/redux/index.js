import { combineReducers } from 'redux'
import { resettableReducer } from 'reduxsauce'

import { reducer as game } from './game'

const resettable = resettableReducer('RESET')

export default combineReducers({
  game: resettable(game),
})
