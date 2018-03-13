import { put, select } from 'redux-saga/effects'
import _ from 'lodash'
import GameActions, { GameSelectors } from '../redux/game'

export function* computeRound () {
  const {
    champions,
    weapons,
    currentMove,
    round: currentRound,
    scores: currentScores,
  } = yield select(GameSelectors.getRoundStatus)

  if (currentMove.length < 2) {
    yield put(GameActions.continueRound())
  } else {
    // Both players have made their move, now let's see who won
    const [playerOne, playerTwo] = champions
    const [playerOneMove, playerTwoMove] = currentMove

    const playerOneWeapon = _.find(weapons, ['name', playerOneMove])
    const playerTwoWeapon = _.find(weapons, ['name', playerTwoMove])

    // TODO account for rule changes!!!!!!
    // 1. Players may tie by selecting weapons that aren't related

    // Draw
    if (playerOneWeapon === playerTwoWeapon) {
      const round = currentRound + 1
      const scores = currentScores.concat('draw')

      yield put(GameActions.completeRound({ round, scores }))
      return
    }

    // Wins
    if (_.find(playerOneWeapon.kills, ['weapon', playerTwoMove])) {
      const round = currentRound + 1
      const scores = currentScores.concat(playerOne)

      yield put(GameActions.completeRound({ round, scores }))
      return
    }

    // Wins
    if (_.find(playerTwoWeapon.kills, ['weapon', playerOneMove])) {
      const round = currentRound + 1
      const scores = currentScores.concat(playerTwo)

      yield put(GameActions.completeRound({ round, scores }))
      return
    }

    // Players select weapons that aren't related
    const round = currentRound + 1
    const scores = currentScores.concat('draw')

    yield put(GameActions.completeRound({ round, scores }))
  }
}

export function* computeGame (action) {
  const { scores } = action
  const { champions } = yield select(GameSelectors.getChampions)

  const [playerOne, playerTwo] = champions

  const playerOnePoints = _.filter(scores, i => i === playerOne).length

  if (playerOnePoints === 3) {
    const winner = playerOne
    yield put(GameActions.completeGame({ winner }))
    return
  }

  const playerTwoPoints = _.filter(scores, i => i === playerTwo).length

  if (playerTwoPoints === 3) {
    const winner = playerTwo
    yield put(GameActions.completeGame({ winner }))
    return
  }

  // No one has won yet
  yield put(GameActions.continueGame())
}
