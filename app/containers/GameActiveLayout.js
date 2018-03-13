import React, { Component } from 'react'
import { connect } from 'react-redux'

const GameActiveLayout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <h1 className="title-font page-title">Game of Drones</h1>
      </header>
      <div className="content">
        <div className="box">
          {children}
        </div>
      </div>
    </div>
  )
}

export default GameActiveLayout
