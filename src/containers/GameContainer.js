import React, {Component} from 'react';
import EventListener from 'react-event-listener';
import Game from '../components/Game';
import {generate} from '../utils/generator';
import {flood} from '../utils/flood';

class GameContainer extends Component {

  constructor() {
    super();

    this.redraw = this.redraw.bind(this);
    this.floodFill = this.floodFill.bind(this);

    const height = 75;
    const width = 150;
    const probability = 0.45;
    const steps = 3;
    const birthLimit = 4;
    const deathLimit = 3;
    this.state = {
      height,
      width,
      probability,
      steps,
      birthLimit,
      deathLimit
    }
  }

  floodFill() {
    const board = flood(this.state.board, this.state.width, this.state.height);
    this.setState({
      board
    }, this.redraw);
  }

  componentDidMount() {
    const board = generate(this.state.width, this.state.height, this.state.probability, this.state.steps, this.state.birthLimit, this.state.deathLimit);
    this.setState({
      "board": board
    }, this.redraw);
  }

  redraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < this.state.height; i++) {
        for (var j = 0; j < this.state.width; j++) {
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
          height={this.state.height}
          width={this.state.width}/>
        <button onClick={this.floodFill}>
          Flood
        </button>
      </div>
    );
  }
}

export default GameContainer;
