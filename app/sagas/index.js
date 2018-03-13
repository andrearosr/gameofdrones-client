import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { GameTypes } from '../redux/game'
import { SettingsTypes } from '../redux/settings'
import { UserTypes } from '../redux/user'

/* ------------- Sagas ------------- */

import { computeRound, computeGame } from './game'
import { fetchWeapons } from './settings'
import { fetchUsers } from './user'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield all([
    takeLatest(SettingsTypes.FETCH_WEAPONS, fetchWeapons, api),
    takeLatest(GameTypes.MAKE_MOVE, computeRound),
    takeLatest(GameTypes.COMPLETE_ROUND, computeGame),
    takeLatest(UserTypes.FETCH_USERS, fetchUsers, api),
  ])
}
