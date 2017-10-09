import config from '../config.json';

function floodCave(board, width, height, x, y, color) {
  if (x < 0 || x >= height || y < 0 || y >= width) {
    return 0;
  }

  if (board[x][y] !== 1) {
    return 0;
  }

  board[x][y] = color;

  let sizes = [0,0,0,0];

  sizes[0] = floodCave(board, width, height, x+1, y, color);
  sizes[1] = floodCave(board, width, height, x, y+1, color);
  sizes[2] = floodCave(board, width, height, x-1, y, color);
  sizes[3] = floodCave(board, width, height, x, y-1, color);

  return sizes.reduce((a,b) => a+b, 0) + 1;
}

export function flood(board, width, height) {

  let areas = [];
  let color = 2;

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (board[i][j] === 1) {
        let size = floodCave(board, width, height, i, j, color);
        if (size !== 0) {
          areas.push({
            size,
            color,
            i,
            j
          });
          color++;
        }
      }
    }
  }

  areas.sort((a,b) => b.size - a.size);
  color = areas[0].color;

  let boardSize = width * height;
  let ratio = areas[0].size / boardSize;
  console.log(ratio);

  if (ratio > 0.4) {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        board[i][j] = board[i][j] === color ? 1 : 0;
      }
    }

    return board;
  } else {
    return null;
  }
}
