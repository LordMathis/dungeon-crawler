import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

const Settings = (props) => (
  <div className="settings">
    <div>
      HP: {props.hp}
    </div>
    <div>
      XP: {props.xp}
    </div>
    <div>
      Damage: {props.damage}
    </div>
    <div>
      Keys: {props.keys}/5
    </div>
  </div>
)

Settings.propTypes = {
  hp: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  damage: PropTypes.number.isRequired,
  keys: PropTypes.number.isRequired,
}

export default Settings;
