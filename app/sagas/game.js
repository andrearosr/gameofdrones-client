import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import GameActions from '../redux/game'

export function* startGame () {
  console.log('start game saga')
  yield put('/game/play')
}
