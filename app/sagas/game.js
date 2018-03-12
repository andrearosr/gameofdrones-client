import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import GameActions from '../redux/game'

export function* startGame () {
  yield put('/game/play')
}
