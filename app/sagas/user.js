import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import UserActions, { UserSelectors } from '../redux/user'

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

export function* saveWinner (api, action) {
  const { winner } = action
  const { championsUsers } = yield select(UserSelectors.getChampionsUsers)

  const { id } = _.find(championsUsers, ['name', winner])
  yield call(api.addWin, { id })

  yield put(UserActions.fetchUsers())
}
