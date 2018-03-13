import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'
import UserActions from '../redux/user'
import Leaderboard from '../components/Leaderboard'

class LeaderboardScreen extends Component {
  componentWillMount() {
    this.props.fetchUsers()
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
    fetchUsers: () => {
      dispatch(UserActions.fetchUsers())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardScreen)
