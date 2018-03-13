import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { GameTypes } from '../redux/game'
import { SettingsTypes } from '../redux/settings'

/* ------------- Sagas ------------- */

import { computeRound } from './game'
import { fetch } from './settings'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield all([
    takeLatest(SettingsTypes.FETCH, fetch, api),
    takeLatest(GameTypes.MAKE_MOVE, computeRound),
  ])
}
