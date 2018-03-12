import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import Layout from './Layout'

import GameActions from '../redux/game'

class GameStart extends Component {
  componentWillMount() {
    this.props.reset()
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Layout>
        <form className="start-screen-content" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="start-screen-title">
            <p>I will let the gods decide my fate.</p>
            <p><b>I demand a trial by combat.</b></p>
          </div>

          {/* Inputs */}
          <div className="start-screen-form">
            <div className="row">
              <label htmlFor="champion1" className="label">
                Your Champion:
              </label>
              <Field
                name="champion1"
                component="input"
                id="champion1"
                type="text"
                placeholder="Name"
                className="input"
              />
            </div>

            <div className="row">
              <label htmlFor="champion2" className="label">
                Opponent:
              </label>
              <Field
                name="champion2"
                component="input"
                id="champion2"
                type="text"
                placeholder="Name"
                className="input"
              />
            </div>
          </div>

          {/* Button */}
          <div className="start-screen-buttons">
            <Link to="/game/play">
              <button className="button-main" type="submit">
                Start
              </button>
            </Link>
          </div>
        </form>
      </Layout>
    )
  }
}

// Connect to Redux Form
const validate = () => {
  const errors = []

  return errors
}

const GameStartScreen = reduxForm({
  validate,
  form: 'startGame',
  onSubmit: (values, dispatch) => {
    dispatch(GameActions.startGame({ ...values }))
  },
})(GameStart)

// Connect to Redux

const mapStateToProps = (state) => {
  return {
    game: state.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(GameActions.reset())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStartScreen)
