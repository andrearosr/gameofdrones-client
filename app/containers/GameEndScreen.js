import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import GameActions from '../redux/game'

class GameEndScreen extends Component {
  resetGame = () => {
    this.props.reset()
  }

  render() {
    const { game } = this.props
    return (
      <Layout>
        <div className="end-screen-content">
          <div className="end-screen-title">
            <h1>
              The Seven have chosen their champion.
            </h1>
            <h1>
              <b>Congratulations, {game.winner}</b>
            </h1>
          </div>

          <div className="end-screen-buttons">
            <button className="button-main" onClick={this.resetGame}>
              Start again
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

export default connect(mapStateToProps, mapDispatchToProps)(GameEndScreen)
