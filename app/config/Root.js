import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore'
import GameStartScreen from '../containers/GameStartScreen'
import GameScreen from '../containers/GameScreen'
import LeaderboardScreen from '../containers/LeaderboardScreen'

const { store, persistor } = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <Switch>
          <Route path="/" render={() => <Redirect replace to="/game" />} exact />
          <Route path="/game" component={GameStartScreen} exact />
          <Route path="/game/play" component={GameScreen} exact />
          <Route path="/leaderboard" component={LeaderboardScreen} exact />
        </Switch>
      </Router>
      {/* </PersistGate> */}
    </Provider>
  )
}

export default Root
