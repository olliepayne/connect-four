const board = {
  cellsX: 7,
  cellsY: 6,
  grid: [],
  gameBoardEl: document.getElementById('game-board'),
  cellEls: [],
  drawGrid: function() {
    for(let i = 0; i < this.cellsX * this.cellsY; i++) {
      this.grid.push('');

      const newCellEl = document.createElement('div');
      newCellEl.id = `cell-${i}`;
      newCellEl.addEventListener('click', (e) => this.clickCell(e.target));
      this.gameBoardEl.appendChild(newCellEl);
      this.cellEls.push(newCellEl);
    }
  },
  clickCell: function(clickedCell) {
    let i = this.cellEls.indexOf(clickedCell);
  },
}

class Player {
  name = '';
  color = '';
  score = 0;
  constructor(name, color, score) {
    this.name = name;
    this.color = color;
    this.score = score;
  }
}
const player1 = new Player();
const player2 = new Player();

const game = {
  
}

board.drawGrid();