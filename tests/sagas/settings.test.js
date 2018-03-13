import API from '../../app/services/api'
import { put, call } from 'redux-saga/effects'
import { fetchWeapons } from '../../app/sagas/settings'
import SettingsActions from '../../app/redux/settings'

const stepper = (fn) => (mock) => fn.next(mock).value
const api = API.create()

describe('Given the settings fetch saga', () => {
  it('fetches weapons from api', () => {
    const step = stepper(fetchWeapons(api))

    expect(step()).toEqual(call(api.getWeapons))
  })

  describe('after fetching data from api', () => {
    let step

    beforeEach(() => {
      step = stepper(fetchWeapons(api))
      // Fetch
      step()
    })

    it('success path', () => {
      api.getWeapons().then(response => {
        // Get users list from response
        const weapons = response.data

        expect(step(response)).toEqual(put(SettingsActions.fetchWeaponsSuccess({ weapons })))
      })
    })

    it('fail path', () => {
      const response = { ok: false }

      expect(step(response)).toEqual(put(SettingsActions.fetchWeaponsFailure()))
    })
  })
})
