import config from '../config.json';

/**
 * Utility function for placing treasures
 */
export function placeTreasures(board) {
  placeThing(board, config.keys.count, config.keys.id); // Place keys
  placeThing(board, config.hp.count, config.hp.id); // Place healthpacks
  placeThing(board, config.weapons.count, config.weapons.id); // Place weapons
  placeThing(board, config.enemies.count, config.enemies.id); // Place enemies
  placeThing(board, 1, config.gate.id); // Place finish
  let player = placeThing(board, 1, 2); // Place player starting position

  return player;
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

        if (thingId === 2) {
          return {
            x,
            y
          };
        }

        count--;
        break;
      }
    }
  }
}
