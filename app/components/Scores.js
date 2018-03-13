import React from 'react'
import _ from 'lodash'

const renderPoints = ({ champions, scores }) => {
  return champions.map((champion) => {
    const points = _.filter(scores, i => i === champion).length

    return (
      <div className="scores-row" key={champion}>
        <div className="scores-col">
          {champion}
        </div>
        <div className="scores-col">
          {points}
        </div>
      </div>
    )
  })
}

const renderScores = ({ scores }) => {
  return scores.map((score, index) => {
    // Wouldn't normally use index as key but on this case we can guarantee there'll be no reorder
    return (
      <div className="scores-row" key={index}>
        <div className="scores-col">
          {index + 1}
        </div>
        <div className="scores-col">
          {score}
        </div>
      </div>
    )
  })
}

const Scores = ({ champions, scores }) => {
  return (
    <div className="scores-content">
      {/* Title */}
      <h5 className="scores-title">
        Scores
      </h5>

      {/* List of scores */}
      <div className="scores">
        <div className="scores-section">
          <h6 className="scores-subtitle">
            Champions
          </h6>
          <div className="scores-row">
            <p className="scores-col">
              <b>Champion</b>
            </p>
            <p className="scores-col">
              <b>Points</b>
            </p>
          </div>
          {renderPoints({ champions, scores })}
        </div>

        <div className="scores-section">
          <h6 className="scores-subtitle">
            Rounds
          </h6>
          <div className="scores-row">
            <p className="scores-col">
              <b>Round</b>
            </p>
            <p className="scores-col">
              <b>Winner</b>
            </p>
          </div>
          {renderScores({ scores })}
        </div>
      </div>
    </div>
  )
}

export default Scores
