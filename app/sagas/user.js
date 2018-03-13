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

export function* getChampionsUsers (api, action) {
  const { champions } = action
  const [championOne, championTwo] = champions

  // Champion 1
  const userOne = yield call(api.findOrCreateUser, { name: championOne })
  const userTwo = yield call(api.findOrCreateUser, { name: championTwo })

  if (!userOne.ok) {
    yield put(UserActions.getChampionsUsersFailure())
    return
  }

  if (!userTwo.ok) {
    yield put(UserActions.getChampionsUsersFailure())
    return
  }

  const championsUsers = [userOne.data, userTwo.data]
  yield put(UserActions.getChampionsUsersSuccess({ championsUsers }))
}
