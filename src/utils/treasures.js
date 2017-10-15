import config from '../config.json';

/**
 * Utility function for placing treasures
 */
export function placeTreasures(board) {
  placeThing(board, config.keys.count, config.keys.id); // Place keys
  placeThing(board, config.hp.count, config.hp.id); // Place healthpacks
  placeThing(board, config.weapons.count, config.weapons.id); // Place weapons

  placeThing(board, config.enemies_strong.count, config.enemies_strong.id); // Place enemies
  placeThing(board, config.enemies_medium.count, config.enemies_medium.id); // Place enemies
  placeThing(board, config.enemies_weak.count, config.enemies_weak.id); // Place enemies


  placeThing(board, 1, config.gate.id); // Place finish
  let player = placePlayer(board); // Place player starting position

  return player;
}

function placePlayer(board) {
  while (true) {
      // Generate random position
      let x = Math.floor(Math.random() * config.height);
      let y = Math.floor(Math.random() * config.width);

      // Check if position is unoccupied
      if (board[x][y] === 1) {
        return {
          x,
          y
        };
      }
    }
}

function placeThing(board, count, thingId) {
  while (count > 0) {
    while (true) {
      // Generate random position
      let x = Math.floor(Math.random() * config.height);
      let y = Math.floor(Math.random() * config.width);

      // Check if position is unoccupied
      if (board[x][y] === 1) {
        board[x][y] = thingId;
        count--;
        break;
      }
    }
  }
}
