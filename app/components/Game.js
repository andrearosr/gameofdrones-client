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
        Round: {game.round}

        {/* Player */}
        <div className="game-player">
          Champion: {champion}
        </div>
      </div>

      {/* Weapons */}
      <div className="game-weapons">
        Choose your weapon
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
