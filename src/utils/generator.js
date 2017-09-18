generate() {
  let board = [];
  let updated = [];

  for (let i = 0; i < this.state.height; i++) {
      const row = [];
      const updateRow = [];
      for (let j = 0; j < this.state.width; j++) {
          const cell = Math.random() > 0.85 ? 1 : 0;
          row.push(cell);
          updateRow.push(1);
      }
      board.push(row);
      updated.push(updateRow);
  }

  this.setState({
    "board": board,
    "updated": updated,
    "generation": 0,
  }, this.redraw);
}
