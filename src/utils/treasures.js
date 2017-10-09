export function placeTreasures(board, width, height) {
  placeThing(board, width, height, keyCount, 2);
  placeThing(board, width, height, hpCount, 3);
  placeThing(board, width, height, weaponCount, 4);
  placeThing(board, width, height, enemyCount, 5);
  placeThing(board, width, height, 1, 6);

}

function placeThing(board, width, height, count, thingId) {
  while (count > 0) {
    while (true)
    let x = Math.floor(Math.random() * height);
    let y = Math.floor(Math.random() * width);

    if (board[x][y] === 1) {
      board[x][y] = thingId;
      count--;
      break;
    }
  }
}
