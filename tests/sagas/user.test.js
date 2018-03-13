import API from '../../app/services/api'
import { put, call } from 'redux-saga/effects'
import { fetchUsers } from '../../app/sagas/user'
import UserActions from '../../app/redux/user'

const stepper = (fn) => (mock) => fn.next(mock).value
const api = API.create()

describe('Given the user fetch saga', () => {
  it('fetches users from api', () => {
    const step = stepper(fetchUsers(api))

    expect(step()).toEqual(call(api.getUsers))
  })

  describe('after fetching data from api', () => {
    let step

    beforeEach(() => {
      step = stepper(fetchUsers(api))
      // Fetch
      step()
    })

    it('success path', () => {
      return api.getUsers().then(response => {
        // Get users list from response
        const users = response.data

        expect(step(response)).toEqual(put(UserActions.fetchUsersSuccess({ users })))
      })
    })

    it('fail path', () => {
      const response = { ok: false }

      expect(step(response)).toEqual(put(UserActions.fetchUsersFailure()))
    })
  })
})
