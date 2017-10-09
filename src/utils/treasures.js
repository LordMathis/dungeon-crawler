import config from '../config.json';

export function placeTreasures(board) {
  placeThing(board, config.config.width, config.height, keyCount, 2);
  placeThing(board, config.width, config.height, hpCount, 3);
  placeThing(board, config.width, config.height, weaponCount, 4);
  placeThing(board, config.width, config.height, enemyCount, 5);
  placeThing(board, config.width, config.height, 1, 6);

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
