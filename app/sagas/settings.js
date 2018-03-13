import { call, put } from 'redux-saga/effects'
import SettingsActions from '../redux/settings'

export function* fetch (api) {
  const response = yield call(api.getWeapons)
  console.log('response')

  if (response.ok) {
    const weapons = response.data
    yield put(SettingsActions.fetchSuccess({ weapons }))
  } else {
    yield put(SettingsActions.fetchFailure())
  }
}
