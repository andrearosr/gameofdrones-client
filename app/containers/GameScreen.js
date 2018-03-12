import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'

import GameActions from '../redux/game'

class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      yields: [
        false,
        false,
      ],
    }
  }

  // Use this to reset game
  // componentWillMount() {
  //   this.props.reset()
  // }

  onYieldPress = (champion, index) => {
    const current = this.state.yields
    current[index] = true
    this.setState({ yields: current })
  }

  render() {
    const { game } = this.props
    const { champion, index } = game.readyChampionOne
      ? { champion: game.champions[0], index: 0 }
      : { champion: game.champions[1], index: 1 }

    const yieldDisabled = this.state.yields[index]
    const yieldButtonLabel = yieldDisabled ? 'Not today' : 'Yield'

    return (
      <Layout>
        <div className="game-screen-content">
          {/* Title */}
          <div className="game-screen-title">
            Round: {game.round}

            {/* Player */}
            <div className="game-screen-player">
              Champion: {champion}
            </div>
          </div>

          {/* Buttons */}
          <div className="game-screen-buttons">
            <button className="button-main">
              Accept
            </button>
            <button
              className="button-danger"
              onClick={() => this.onYieldPress(champion, index)}
              disabled={yieldDisabled}
            >
              {yieldButtonLabel}
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
    championYield: (champion) => {
      dispatch(GameActions.championYield({ champion }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
