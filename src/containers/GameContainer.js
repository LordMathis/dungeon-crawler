import React, {Component} from 'react';
import Game from '../components/Game';
import {generate} from '../utils/generator';
import {flood} from '../utils/flood';
import config from '../config.json';

class GameContainer extends Component {

  constructor() {
    super();

    this.redraw = this.redraw.bind(this);
    this.handleMove = this.handleMove.bind(this);

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

    const generated = generate();
    this.setState(generated, this.redraw);
    document.addEventListener('keydown', this.handleMove);
  }

  handleMove(event) {
    const keyCode = event.which;
    let playerX = this.state.player.x;
    let playerY = this.state.player.y;

    switch(keyCode) {
      case 37:
        playerY -= 1;
        break;
      case 38:
        playerX -= 1;
        break;
      case 39:
        playerY += 1;
        break;
      case 40:
        playerX += 1;
        break;
    }

    console.log(JSON.stringify(this.state.player));

    this.setState({
      player: {
        x: playerX,
        y: playerY
      }
    }, this.redraw);

  }

  redraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < config.height; i++) {
        for (var j = 0; j < config.width; j++) {
          let cell = this.state.board[i][j];

          if((i === this.state.player.x) && (j === this.state.player.y)) {
            cell = 2;
          }

          switch(cell) {
            case 0:
              ctx.fillStyle = 'rgb(0, 0, 0)';
              break;
            case 1:
              ctx.fillStyle = 'rgb(179, 209, 255)';
              break;
            case 2:
              //ctx.fillStyle = 'rgb(225, 225, 234)';
              ctx.fillStyle = 'rgb(66, 244, 72)';
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
