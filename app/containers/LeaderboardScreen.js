import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import Leaderboard from '../components/Leaderboard'

import UserActions from '../redux/user'

class LeaderboardScreen extends Component {
  componentWillMount() {
    this.props.fetch()
  }

  render() {
    return (
      <Layout>
        <div className="start-screen-content">
          <Leaderboard users={this.props.user.users} />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: () => {
      dispatch(UserActions.fetchUsers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen)
