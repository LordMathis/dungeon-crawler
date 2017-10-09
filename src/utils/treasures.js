import config from '../config.json';

export function placeTreasures(board) {
  placeThing(board, config.keys.count, config.keys.id);
  placeThing(board, config.hp.count, config.hp.id);
  placeThing(board, config.weapons.count, config.weapons.id);
  placeThing(board, config.enemies.count, config.enemies.id);
  placeThing(board, 1, config.gate.id);
  placeThing(board, 1, 2);

}

function placeThing(board, count, thingId) {
  while (count > 0) {
    while (true)
    let x = Math.floor(Math.random() * config.height);
    let y = Math.floor(Math.random() * config.width);

    if (board[x][y] === 1) {
      board[x][y] = thingId;
      count--;
      break;
    }
  }
}
