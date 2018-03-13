import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

import { SettingsTypes } from '../redux/settings'

/* ------------- Sagas ------------- */

import { fetch } from './settings'

/* ------------- API ------------- */
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield all([
    takeLatest(SettingsTypes.FETCH, fetch, api),
  ])
}
