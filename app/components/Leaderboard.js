import React from 'react'
import LoadingIndicator from 'react-loading-indicator'

const renderTable = ({ users }) => {
  if (users.length < 1) {
    return <LoadingIndicator />
  }

  return users.map((user) => {
    return (
      <div className="leaderboard-row" key={user.id}>
        <div className="leaderboard-col">
          {user.name}
        </div>
        <div className="leaderboard-col">
          {user.score}
        </div>
      </div>
    )
  })
}

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard-content">
      <h1 className="leaderboard-title">
        Champions
      </h1>
      <div className="leaderboard-table">
        <div className="leaderboard-row">
          <div className="leaderboard-col">
            <p><b>Name</b></p>
          </div>
          <div className="leaderboard-col">
            <p><b>Score</b></p>
          </div>
        </div>
        {renderTable({ users })}
      </div>
    </div>
  )
}

export default Leaderboard
