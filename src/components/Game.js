import React from 'react';
import {Settings, Canvas} from '.';
import './Game.css';


const Game = (props) => (
  <div className="game">
    <Settings />
    <Canvas
      height={props.height}
      width={props.width}/>
  </div>
);

export default Game;
