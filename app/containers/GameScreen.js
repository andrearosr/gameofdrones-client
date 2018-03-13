import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import Game from '../components/Game'
import Scores from '../components/Scores'

import GameActions from '../redux/game'
import SettingsActions from '../redux/settings'

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
    this.props.fetchWeapons()
    // this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.selected && nextProps.settings.weapons.length > 1) {
      this.setState({ selected: nextProps.settings.weapons[0].name })
    }
  }

  onWeaponSelect = ({ weapon }) => {
    this.setState({ selected: weapon.name })
  }

  onYieldPress = (champion, index) => {
    const current = this.state.yields
    current[index] = true
    this.setState({ yields: current })
  }

  onAcceptPress = () => {
    this.props.makeMove({ weapon: this.state.selected })
    this.setState({ selected: this.props.settings.weapons[0].name })
  }

  render() {
    const { game, user } = this.props
    const { champions, scores } = game
    const { champion, index } = game.isChampionOneTurn
      ? { champion: game.champions[0], index: 0 }
      : { champion: game.champions[1], index: 1 }

    return (
      <Layout>
        <div className="game-screen-content">
          <Game
            weapons={this.props.settings.weapons}
            selected={this.state.selected}
            game={game}
            champion={champion}
            index={index}
            yields={this.state.yields}
            onWeaponSelect={this.onWeaponSelect}
            onYieldPress={this.onYieldPress}
            onAcceptPress={this.onAcceptPress}
          />

          <Scores
            champions={champions}
            scores={scores}
          />
        </div>
      </Layout>
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
    fetchWeapons: () => {
      dispatch(SettingsActions.fetchWeapons())
    },
    makeMove: ({ weapon }) => {
      dispatch(GameActions.makeMove({ weapon }))
    },
    championYield: (champion) => {
      dispatch(GameActions.championYield({ champion }))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
