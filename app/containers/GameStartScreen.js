import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './Layout';

class StartScreen extends Component {
  render() {
    return (
      <Layout>
        <div className="start-screen-content">
          oh baby
        </div>
      </Layout>
    );
  }
}

export default connect()(StartScreen);
