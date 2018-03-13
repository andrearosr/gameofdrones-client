import React, { Component } from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'
import { RoutedTabs, NavTab } from 'react-router-tabs'
import { connect } from 'react-redux'

class Layout extends Component {
  redirect() {
    if (this.props.game.round > 0) {
      return (
        <Route path="/game" render={() => <Redirect replace to="/game/play" />} exact />
      )
    }

    return null;
  }

  render() {
    const { children, game } = this.props
    const gameRoute = game.round > 0 ? '/game/play' : '/game'

    return (
      <div className="container">
        <header>
          <h1 className="title-font page-title">Game of Drones</h1>
        </header>
        <div className="content">
          <div className="box">
            <RoutedTabs className="tabbar" activeTabClassName="activeTab">
              {this.redirect()}
              <NavTab to={gameRoute} className="tab tab-left">Game</NavTab>
              <NavTab to="/leaderboard" className="tab tab-right">Leaderboard</NavTab>
            </RoutedTabs>

            {children}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ game }) => {
  return {
    game,
  }
}

export default connect(mapStateToProps)(Layout)
