import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../containers/Layout'

class LeaderboardScreen extends Component {
  render() {
    return (
      <Layout>
        <div className="start-screen-content">
          {"doesn't look like anything to me"}
        </div>
      </Layout>
    )
  }
}

export default connect()(LeaderboardScreen)
