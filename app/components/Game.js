import React from 'react'
import LoadingIndicator from 'react-loading-indicator'

const renderWeapons = ({ weapons, selected, onWeaponSelect }) => {
  if (weapons.length < 1) {
    return (
      <LoadingIndicator />
    )
  }

  return weapons.map((weapon) => {
    const className = selected === weapon.name ? 'button-weapon selected' : 'button-weapon'

    return (
      <button
        className={className}
        key={weapon.name}
        onClick={() => onWeaponSelect({ weapon })}
      >
        <img
          src={weapon.image}
          title={weapon.name}
          alt={weapon.name}
          className="weapon-icon"
        />
      </button>
    )
  })
}

const Game = ({
  weapons,
  selected,
  game,
  champion,
  index,
  yields,
  onWeaponSelect,
  onYieldPress,
  onAcceptPress,
}) => {
  const yieldDisabled = yields[index]
  const yieldButtonLabel = yieldDisabled ? 'Not today' : 'Yield'

  return (
    <div className="game-content">
      {/* Title */}
      <div className="game-title">
        <h2>
          Round: {game.round}
        </h2>

        {/* Player */}
        <h4 className="game-player">
          Champion: {champion}
        </h4>
      </div>

      {/* Weapons */}
      <div className="game-weapons">
        <h4>
          Choose your weapon
        </h4>
        <div className="weapons">
          {renderWeapons({ weapons, selected, onWeaponSelect })}
        </div>
      </div>

      {/* Buttons */}
      <div className="game-buttons">
        <button className="button-main" onClick={onAcceptPress}>
          Accept
        </button>
        <button
          className="button-danger"
          onClick={() => onYieldPress(champion, index)}
          disabled={yieldDisabled}
        >
          {yieldButtonLabel}
        </button>
      </div>
    </div>
  )
}

export default Game
