import config from '../config.json';

/**
 * Utility function to check the quality of dungeons using flood fill algorithm
 */
export function flood(board) {

  let areas = [];
  let color = 2;

  // The algorithm floods each area and remembers it's size and color
  for (var i = 0; i < config.height; i++) {
    for (var j = 0; j < config.width; j++) {
      if (board[i][j] === 1) {
        let size = floodCave(board, i, j, color);
        if (size !== 0) {
          areas.push({
            size,
            color
          });
          color++;
        }
      }
    }
  }

  // Sort the ares by size
  areas.sort((a,b) => b.size - a.size);
  color = areas[0].color;

  let boardSize = config.width * config.height;
  let ratio = areas[0].size / boardSize;

  // If the area is at least some size we keep it
  if (ratio > config.ratio) {
    for (var i = 0; i < config.height; i++) {
      for (var j = 0; j < config.width; j++) {
        // Reset everything but the largest area as walls
        board[i][j] = board[i][j] === color ? 1 : 0;
      }
    }

    return board;
  } else {
    return null;
  }
}

// Fill one area
function floodCave(board, x, y, color) {
  if (x < 0 || x >= config.height || y < 0 || y >= config.width) {
    return 0;
  }

  if (board[x][y] !== 1) {
    return 0;
  }

  board[x][y] = color;

  let sizes = [0,0,0,0];

  sizes[0] = floodCave(board, x+1, y, color);
  sizes[1] = floodCave(board, x, y+1, color);
  sizes[2] = floodCave(board, x-1, y, color);
  sizes[3] = floodCave(board, x, y-1, color);

  return sizes.reduce((a,b) => a+b, 0) + 1;
}
