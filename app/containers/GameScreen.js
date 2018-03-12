import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'

import GameActions from '../redux/game'

class GameScreen extends Component {
  render() {
    const { game } = this.props
    const player = game.readyPlayerOne ? game.champions[0] : game.champions[1]

    return (
      <Layout>
        <div className="game-screen-content">
          {/* Title */}
          <div className="game-screen-title">
            Round: {game.round}
          </div>

          {/* Player */}
          <div className="game-screen-player">
            Player: {player}
          </div>

          {/* Buttons */}
          <div className="game-screen-buttons">
            <button className="button-main">
              Accept
            </button>
            <button className="button-danger">
              Yield
            </button>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ game }) => {
  return {
    game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(GameActions.reset())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
