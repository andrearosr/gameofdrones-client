import { call, put } from 'redux-saga/effects'
import SettingsActions from '../redux/settings'

export function* fetchWeapons (api) {
  const response = yield call(api.getWeapons)

  if (response.ok) {
    const weapons = response.data
    yield put(SettingsActions.fetchWeaponsSuccess({ weapons }))
  } else {
    yield put(SettingsActions.fetchWeaponsFailure())
  }
}
