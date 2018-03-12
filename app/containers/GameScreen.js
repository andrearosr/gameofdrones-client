import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from './Layout'

class GameScreen extends Component {
  render() {
    return (
      <Layout>
        <div>
          golf
        </div>
      </Layout>
    )
  }
}

export default connect()(GameScreen)
