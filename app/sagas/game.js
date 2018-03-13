import { call, put, select } from 'redux-saga/effects'
import _ from 'lodash'
import GameActions, { GameSelectors } from '../redux/game'

export function* computeRound (action) {
  const currentRound = yield select(GameSelectors.getRoundStatus)

  if (currentRound.currentMove.length < 2) {
    yield put(GameActions.continueRound())
  } else {
    // Both players have made their move, now let's see who won
    const playerOne = currentRound.champions[0]
    const playerTwo = currentRound.champions[1]

    const playerOneMove = currentRound.currentMove[0]
    const playerTwoMove = currentRound.currentMove[1]

    const playerOneWeapon = _.find(currentRound.weapons, ['name', playerOneMove])
    const playerTwoWeapon = _.find(currentRound.weapons, ['name', playerTwoMove])

    // TODO account for rule changes!!!!!!
    // 1. Players may tie by selecting weapons that aren't related

    // Draw
    if (playerOneWeapon === playerTwoWeapon) {
      const currentStatus = currentRound.status || []
      const round = currentRound.round + 1
      const status = currentStatus.concat('draw')

      yield put(GameActions.completeRound({ round, status }))
      return
    }

    // Wins
    if (_.find(playerOneWeapon.kills, ['weapon', playerTwoMove])) {
      const currentStatus = currentRound.status || []
      const round = currentRound.round + 1
      const status = currentStatus.concat(playerOne)

      yield put(GameActions.completeRound({ round, status }))
      return
    }

    // Wins
    if (_.find(playerTwoWeapon.kills, ['weapon', playerOneMove])) {
      const currentStatus = currentRound.status || []
      const round = currentRound.round + 1
      const status = currentStatus.concat(playerTwo)

      yield put(GameActions.completeRound({ round, status }))
      return
    }

    // Players select weapons that aren't related
    const currentStatus = currentRound.status || []
    const round = currentRound.round + 1
    const status = currentStatus.concat('draw')

    yield put(GameActions.completeRound({ round, status }))
  }
}
