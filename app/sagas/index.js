import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Types ------------- */

import { GameTypes } from '../redux/game';

/* ------------- Sagas ------------- */

import { startGame } from './game';

/* ------------- API ------------- */

/* ------------- Connect Types To Sagas ------------- */

export default function* root () {
  yield all([
    // some sagas only receive an action
    takeLatest(GameTypes.START_GAME, startGame),
  ])
}
