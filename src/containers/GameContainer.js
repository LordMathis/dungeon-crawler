import React, {Component} from 'react';
import EventListener from 'react-event-listener';
import Game from '../components/Game';
import {generate} from '../utils/generator';
import {flood} from '../utils/flood';
import config from '../config.json';

class GameContainer extends Component {

  constructor() {
    super();
    this.redraw = this.redraw.bind(this);
  }

  componentDidMount() {
    const board = generate();
    this.setState({
      "board": board
    }, this.redraw);
  }

  redraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < config.height; i++) {
        for (var j = 0; j < config.width; j++) {
          let cell = this.state.board[i][j];
          if (cell === 0) {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(j*10, i*10, 10, 10);
          } else if (cell === 1){
            ctx.fillStyle = 'rgb(48,113,169)';
            ctx.fillRect(j*10, i*10, 10, 10);
          } else {
            ctx.fillStyle = 'rgb(0,128,0)';
            ctx.fillRect(j*10, i*10, 10, 10);
          }
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Game
          height={config.height}
          width={config.width}/>
      </div>
    );
  }
}

export default GameContainer;
