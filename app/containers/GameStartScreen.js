import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'

import GameActions from '../redux/game'

class StartScreen extends Component {
  componentWillMount() {
    this.props.startGame()
  }

  render() {
    return (
      <Layout>
        <div className="start-screen-content">
          {/* Title */}
          <div className="start-screen-title">
            <p>I will let the gods decide my fate.</p>
            <p><b>I demand a trial by combat.</b></p>
          </div>

          {/* Inputs */}
          <form className="start-screen-form">
            <div className="row">
              <label htmlFor="champion1" className="label">
                Your Champion:
              </label>
              <input id="champion1" type="text" className="input" />
            </div>

            <div className="row">
              <label htmlFor="champion1" className="label">
                Opponent:
              </label>
              <input id="champion1" type="text" className="input" />
            </div>
          </form>

          {/* Button */}
          <div className="start-screen-buttons">
            <button className="button-main">
              Start
            </button>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => {
      dispatch(GameActions.startGame({}))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
