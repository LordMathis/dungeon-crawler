import {flood} from './flood';
import {placeTreasures} from './treasures';
import config from '../config.json';

/**
 * Utility function for generating dungeons
 */
export function generate() {

  let board = null;

  while (!board) {
    board = generateInitial([]);
    board = simulate(board);
    board = flood(board);
  }

  let player = placeTreasures(board);

  return {
    player,
    board
  };
}

// Generates initial board
function generateInitial(board) {

  for (let i = 0; i < config.height; i++) {
      const row = [];
      for (let j = 0; j < config.width; j++) {
          // Cell starts alive with probability
          const cell = Math.random() < config.probability ? 1 : 0;
          row.push(cell);
      }
      board.push(row);
  }

  return board;
}

// Simulates cellular automaton
function simulate(board) {
  let steps = config.steps
  while (steps > 0) {
    board = doSimulationStep(board);
    steps--;
  }
  return board;
}

// One step of cellular automaton
function doSimulationStep(board) {

let newBoard = JSON.parse(JSON.stringify(board));

  for (var i = 0; i < config.height; i++) {
    for (var j = 0; j < config.width; j++) {

      // Count alive neighbours
      const neighbours = countNeighbours(board, i, j)

      if (board[i][j] === 1) {
        if (neighbours < config.deathLimit) {
          // if the cell is alive but doesn't have enough live neighbours it dies
          newBoard[i][j] = 0;
        } else {
          newBoard[i][j] = 1;
        }
      } else {
        if (neighbours > config.birthLimit) {
          // if the cell is dead but has enough live neighbours it becomes alive
          newBoard[i][j] = 1;
        } else {
          newBoard[i][j] = 0;
        }
      }
    }
  }

  return newBoard;
}

// Checks cell if it's alive
function checkCell(board, x, y) {
  if ((x >= config.height) || (x < 0) || (y >= config.width) || (y < 0)) {
    return 0;
  } else {
    return board[x][y];
  }
}

// Counts alive neighbours
function countNeighbours(board, i, j) {
  let neighbours = 0;
  let x, y;

  x = i - 1;
  for (var k = 0; k < 3; k++) {
    y = j - 1;
    for (var l = 0; l < 3; l++) {
      if ((x !== i) || (y !== j)) {
        neighbours += checkCell(board, x, y);
      }
      y = y + 1;
    }
    x = x + 1;
  }

  return neighbours;
}
