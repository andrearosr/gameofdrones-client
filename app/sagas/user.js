import { call, put } from 'redux-saga/effects'
import UserActions from '../redux/user'

export function* fetchUsers (api) {
  const response = yield call(api.getUsers)

  if (response.ok) {
    const users = response.data
    yield put(UserActions.fetchUsersSuccess({ users }))
  } else {
    yield put(UserActions.fetchUsersFailure())
  }
}
