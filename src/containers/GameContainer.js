import React, {Component} from 'react';
import EventListener from 'react-event-listener';
import Game from '../components/Game';

class GameContainer extends Component {

  constructor() {
    super();

    this.redraw = this.redraw.bind(this);

    const height = 900;
    const width = 1600;
    this.state = {
      "height": height,
      "width": width
    }
  }

  componentDidMount() {
    this.redraw();
  }

  redraw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  render() {
    return (
      <div>
        <Game
          height={this.state.height}
          width={this.state.width}/>
      </div>
    );
  }
}

export default GameContainer;
