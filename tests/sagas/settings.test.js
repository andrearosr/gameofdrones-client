import API from '../../app/services/api'
import { put, call } from 'redux-saga/effects'
import { fetch } from '../../app/sagas/settings'

const stepper = (fn) => (mock) => fn.next(mock).value
const api = API.create()

describe('Given the fetch saga', () => {
  it('fetches weapons from api', () => {
    const step = stepper(fetch(api))

    expect(step()).toEqual(call(api.getWeapons))
  })
})
