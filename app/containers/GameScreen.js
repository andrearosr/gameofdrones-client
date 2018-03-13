import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from 'react-loading-indicator'
import GameActiveLayout from './Layout'

import GameActions from '../redux/game'
import SettingsActions from '../redux/settings'

import images from '../assets/images'

class GameScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      yields: [
        false,
        false,
      ],
      selected: null,
    }
  }

  componentWillMount() {
    this.props.fetch();
    // this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selected && nextProps.settings.weapons.length > 1) {
      this.setState({ selected: nextProps.settings.weapons[0].name })
    }
  }

  onYieldPress = (champion, index) => {
    const current = this.state.yields
    current[index] = true
    this.setState({ yields: current })
  }

  onWeaponSelect = ({ weapon }) => {
    this.setState({ selected: weapon.name })
  }

  renderWeapons = () => {
    if (this.props.settings.weapons.length < 1) {
      return (
        <LoadingIndicator />
      )
    }

    return this.props.settings.weapons.map((weapon) => {
      const className = this.state.selected === weapon.name ? 'button-weapon selected' : 'button-weapon'

      return (
        <button
          className={className}
          key={weapon.name}
          onClick={() => this.onWeaponSelect({ weapon })}
        >
          <img
            src={weapon.image}
            title={weapon.name}
            alt={weapon.name}
            className="weapon-icon"
          />
        </button>
      )
    })
  }

  render() {
    const { game, settings } = this.props
    const { champion, index } = game.readyChampionOne
      ? { champion: game.champions[0], index: 0 }
      : { champion: game.champions[1], index: 1 }

    const yieldDisabled = this.state.yields[index]
    const yieldButtonLabel = yieldDisabled ? 'Not today' : 'Yield'

    return (
      <GameActiveLayout>
        <div className="game-screen-content">
          {/* Title */}
          <div className="game-screen-title">
            Round: {game.round}

            {/* Player */}
            <div className="game-screen-player">
              Champion: {champion}
            </div>
          </div>

          {/* Weapons */}
          <div className="game-screen-weapons">
            Choose your weapon
            <div className="game-weapons">
              {this.renderWeapons()}
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
      </GameActiveLayout>
    )
  }
}

const mapStateToProps = ({ game, settings }) => {
  return {
    game,
    settings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => {
      dispatch(GameActions.reset())
    },
    fetch: () => {
      dispatch(SettingsActions.fetch())
    },
    championYield: (champion) => {
      dispatch(GameActions.championYield({ champion }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
