function generateInitial(board, width, height, probability) {

  for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
          const cell = Math.random() < probability ? 1 : 0;
          row.push(cell);
      }
      board.push(row);
  }

  return board;
}

function simulate(board, width, height, steps, birthLimit, deathLimit) {
  while (steps > 0) {
    board = doSimulationStep(board, width, height, birthLimit, deathLimit);
    steps--;
  }
  return board;
}

function doSimulationStep(board, width, height, birthLimit, deathLimit) {
  let newBoard = JSON.parse(JSON.stringify(board));
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {

      const neighbours = countNeighbours(board, i, j, width, height)

      if (board[i][j] === 1) {
        if (neighbours < deathLimit) {
          newBoard[i][j] = 0;
        } else {
          newBoard[i][j] = 1;
        }
      } else {
        if (neighbours > birthLimit) {
          newBoard[i][j] = 1;
        } else {
          newBoard[i][j] = 0;
        }
      }
    }
  }

  return newBoard;
}

function checkCell(board, x, y, width, height) {
  if ((x >= height) || (x < 0) || (y >= width) || (y < 0)) {
    return 0;
  } else {
    return board[x][y];
  }
}

function countNeighbours(board, i, j, width, height) {
  let neighbours = 0;
  let x, y;

  x = i - 1;
  for (var k = 0; k < 3; k++) {
    y = j - 1;
    for (var l = 0; l < 3; l++) {
      if ((x !== i) || (y !== j)) {
        neighbours += checkCell(board, x, y, width, height);
      }
      y = y + 1;
    }
    x = x + 1;
  }

  return neighbours;
}

export function generate(width, height, probability, steps, birthLimit, deathLimit) {
  let board = generateInitial([], width, height, probability);
  board = simulate(board, width, height, steps, birthLimit, deathLimit);
  return board;
}
