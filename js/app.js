const board = {
  cellsX: 7,
  cellsY: 6,
  grid: [],
  gameBoardEl: document.getElementById('game-board'),
  cellEls: [],
  drawGrid: function() {
    for(let i = 0; i < this.cellsX * this.cellsY; i++) {
      this.grid.push('');

      // html side
      const newCellEl = document.createElement('div');
      newCellEl.className = 'cell';
      newCellEl.id = `cell-${i}`;
      newCellEl.addEventListener('click', (e) => this.clickCell(e.target));
      this.gameBoardEl.appendChild(newCellEl);
      this.cellEls.push(newCellEl);
    }
  },
  clickCell: function(clickedCell) {
    let i = this.cellEls.indexOf(clickedCell);
    let colorToFill = '';

    // placement conditions
    if(this.grid[i] === '') {
      if(i >= (this.cellsX * this.cellsY - 1) - (this.cellsX + 1) && i < this.cellsX * this.cellsY || this.grid[i + 7] !== '') {
        if(game.turn === 1) {
          colorToFill = player1.color;
          game.turn = 2;
        } else if(game.turn === 2) {
          colorToFill = player2.color;
          game.turn = 1;
        }

        this.fillCell(i, colorToFill);
      }
    }
  },
  fillCell: function(i, color) {
    this.grid[i] = color; 
    this.cellEls[i].style.backgroundColor = color;
  }
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
player1.color = 'yellow';
const player2 = new Player();
player2.color = 'red';

const game = {
  turn: 0,
}

board.drawGrid();
game.turn = 1;