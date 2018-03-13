import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Layout from './Layout'

import GameActions from '../redux/game'

class GameStart extends Component {
  renderButton() {
    const { invalid } = this.props

    return (
      <button className="button-main" type="submit" disabled={invalid}>
        Start
      </button>
    )
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
            {this.renderButton()}
          </div>
        </form>
      </Layout>
    )
  }
}

// Connect to Redux Form
const validate = (values) => {
  const errors = []

  if (!values.champion1) {
    errors.champion1 = 'You must select a champion'
  }

  if (!values.champion2) {
    errors.champion2 = 'You must select a champion'
  }

  return errors
}

const GameStartScreen = reduxForm({
  validate,
  form: 'startGame',
  onSubmit: (values, dispatch) => {
    const champions = Object.values(values)
    // Navigation will happen automagically on state change
    dispatch(GameActions.startGame({ champions }))
  },
})(GameStart)

// Connect to Redux

const mapStateToProps = ({ game }) => {
  return {
    game,
  }
}

export default connect(mapStateToProps)(GameStartScreen)
