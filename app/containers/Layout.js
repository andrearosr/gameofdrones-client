import React, { Component } from 'react'
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { RoutedTabs, NavTab } from 'react-router-tabs'
import { connect } from 'react-redux'

// This class is to be used as a 'wrapper' around normal screens
// It provides common layout, including the tab bar.
class Layout extends Component {
  redirect(gameRoute) {
    // Redirect to appropriate 'game' screen based on state.
    const { pathname } = this.props.location;
    if (pathname === gameRoute || !pathname.startsWith('/game')) {
      return null
    }

    return (
      <Route path={pathname} render={() => <Redirect replace to={gameRoute} />} exact />
    )
  }

  render() {
    const { children, game } = this.props
    let gameRoute = '/game'
    if (game.round > 0) gameRoute = '/game/play'
    if (game.winner) gameRoute = '/game/end'

    return (
      <div className="container">
        <header>
          <h1 className="title-font page-title">Game of Drones</h1>
        </header>
        <div className="content">
          <div className="box">
            <RoutedTabs className="tabbar" activeTabClassName="activeTab">
              {this.redirect(gameRoute)}
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

export default withRouter(connect(mapStateToProps)(Layout))
