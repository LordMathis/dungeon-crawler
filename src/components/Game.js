import React from 'react';
import PropTypes from 'prop-types';
import {Settings, Canvas} from '.';
import './Game.css';


const Game = (props) => (
  <div className="game">
    <Settings
      hp={props.hp}
      xp={props.xp}
      damage={props.damage}
      keys={props.keys}
      lights={props.lights}
      onLightsToggle={props.onLightsToggle}/>
    <Canvas
      height={props.height}
      width={props.width}/>
  </div>
);

Game.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  damage: PropTypes.number.isRequired,
  keys: PropTypes.number.isRequired,
  lights: PropTypes.bool.isRequired,
  onLightsToggle: PropTypes.func.isRequired,
}

export default Game;
