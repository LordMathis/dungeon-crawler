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

    let hp = 100;
    let xp = 0;
    let damage = 10;
    let keys = 0;

    this.state = {
      hp,
      xp,
      damage,
      keys
    }
  }

  componentDidMount() {

    const board = generate();
    this.setState({
      board,
    }, this.redraw);
  }

  redraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < config.height; i++) {
        for (var j = 0; j < config.width; j++) {
          let cell = this.state.board[i][j];

          switch(cell) {
            case 0:
              ctx.fillStyle = 'rgb(0, 0, 0)';
              break;
            case 1:
              ctx.fillStyle = 'rgb(179, 209, 255)';
              break;
            case 2:
              ctx.fillStyle = 'rgb(225, 225, 234)';
              break;
            case 3:
              ctx.fillStyle = 'rgb(230, 230, 0)';
              break;
            case 4:
              ctx.fillStyle = 'rgb(0, 153, 0)';
              break;
            case 5:
              ctx.fillStyle = 'rgb(51, 102, 255)';
              break;
            case 6:
              ctx.fillStyle = 'rgb(255, 0, 0)';
              break;
            case 7:
              ctx.fillStyle = 'rgb(102, 0, 255)';
              break;

          }

          ctx.fillRect(j*10, i*10, 10, 10);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Game
          height={config.height}
          width={config.width}
          hp={this.state.hp}
          xp={this.state.xp}
          damage={this.state.damage}
          keys={this.state.keys}/>
      </div>
    );
  }
}

export default GameContainer;
