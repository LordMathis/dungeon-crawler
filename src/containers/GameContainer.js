import React, {Component} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import Game from '../components/Game';
import {generate} from '../utils/generator';
import {flood} from '../utils/flood';
import config from '../config.json';

const initialState = {
  hp: 100,
  xp: 0,
  damage: 10,
  keys: 0,
  showModal: false,
  lights: false
};

class GameContainer extends Component {

  constructor() {
    super();

    this.redraw = this.redraw.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleAttack = this.handleAttack.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleLightsToggle = this.handleLightsToggle.bind(this);

    this.state = initialState;
  }

  componentDidMount() {
    const generated = generate();
    this.setState(generated, this.redraw);
    document.addEventListener('keydown', this.handleMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleMove);
  }

  gameOver(result) {
    this.setState({
      victory: result,
      showModal: true,
    });
  }

  handleAttack(x, y) {
    let board = this.state.board.slice();
    let cell = board[x][y];

    let hpLoss;
    if (cell < 10 || cell > 25) {
      return;
    } else if (cell < 15) {
      hpLoss = 10;
    } else if (cell < 20) {
      hpLoss = 15;
    } else {
      hpLoss = 20;
    }

    board[x][y] -= Math.floor(this.state.damage / 10);

    let xpGain = 0;

    if ((cell >= 20 && board[x][y] < 20) || (cell >= 15 && board[x][y] < 15)) {
      xpGain = 10;
    }

    if (board[x][y] <= 10) {
      xpGain = 10;
      board[x][y] = 1;
    }

    let newState = {
      hp: this.state.hp - hpLoss,
      xp: this.state.xp + xpGain,
      board
    };

    if (newState.hp < 0) {
      this.gameOver(false);
    }

    this.setState(newState, this.redraw);
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

    const cell = this.state.board[playerX][playerY];
    let newState;
    let board = this.state.board.slice();

    switch(cell) {
      case 0:
        break;
      case 1:
        newState = {
          player: {
            x: playerX,
            y: playerY
          }
        };
        break;
      case 3:
        board[playerX][playerY] = 1;
        newState = {
          player: {
            x: playerX,
            y: playerY
          },
          keys: this.state.keys + 1,
          board
        };
        break;
      case 4:
        board[playerX][playerY] = 1;
        newState = {
          player: {
            x: playerX,
            y: playerY
          },
          hp: this.state.hp + 25,
          board
        };
        break;
      case 5:
        board[playerX][playerY] = 1;
        newState = {
          player: {
            x: playerX,
            y: playerY
          },
          damage: this.state.damage + 10,
          board
        };
        break;
      case 7:
        if (this.state.keys === 5 && this.state.xp >= 500) {
          this.gameOver(true);
          break;
        }
        break;
      default:
        this.handleAttack(playerX, playerY);
        break;

    }

    if (newState) {
      this.setState(newState, this.redraw);
    }
  }

  handleRestart() {

    const generated = generate();

    this.setState(initialState);
    this.setState(generated, this.redraw);
  }

  handleLightsToggle(event) {
    this.setState({
      lights: !this.state.lights,
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

          if (!this.state.lights) {
            let distX = Math.abs(this.state.player.x - i);
            let distY = Math.abs(this.state.player.y - j);
            let radius = 8;
            if (distX*distX + distY*distY > radius*radius) {
              cell = 0;
            }
          }

          switch(cell) {
            case 0:
              ctx.fillStyle = 'rgb(0, 0, 0)';
              break;
            case 1:
              ctx.fillStyle = 'rgb(179, 209, 255)';
              break;
            case 2:
              ctx.fillStyle = 'rgb(128,128,128)';
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
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
              ctx.fillStyle = 'rgb(255, 153, 153)';
              break;
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
              ctx.fillStyle = 'rgb(255, 77, 77)';
              break;
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
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
          keys={this.state.keys}
          lights={this.state.lights}
          onLightsToggle={this.handleLightsToggle}/>
        {
          this.state.showModal &&
          <ModalContainer>
            <ModalDialog>
              <h1>{this.state.victory ? "You won!" : "You lost!" }</h1>
              <p>
                <button onClick={this.handleRestart}>
                  Play again?
                </button>
              </p>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}

export default GameContainer;
