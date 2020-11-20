const board = {
  cellsX: 7,
  cellsY: 6,
  grid: [],
  gameBoardEl: document.getElementById('game-board'),
  cellEls: [],
  drawGrid: function() {
    for(let i = 0; i < this.cellsX * this.cellsY; i++) {
      this.grid.push('');

      // DOM stuff
      const newCellEl = document.createElement('div');
      newCellEl.className = 'cell';
      newCellEl.id = `cell-${i}`;
      newCellEl.style.backgroundColor = 'white';
      newCellEl.addEventListener('click', (e) => this.clickCell(e.target));
      this.gameBoardEl.appendChild(newCellEl);
      this.cellEls.push(newCellEl);
    }
  },
  clickCell: function(clickedCell) {
    let i = this.cellEls.indexOf(clickedCell);
    let colorToFill = '';

    // placement conditions
    if(this.grid[i] === '' && !game.over) {
      if(i > (this.cellsX * this.cellsY - 1) - this.cellsX && i < this.cellsX * this.cellsY || this.grid[i + 7] !== '') {
        if(game.turn === 1) {
          colorToFill = player1.color;
          game.turn = 2;
        } else if(game.turn === 2) {
          colorToFill = player2.color;
          game.turn = 1;
        }

        this.fillCell(i, colorToFill);
        this.checkNeighbors(colorToFill);
      }
    }
  },
  fillCell: function(i, color) {
    this.grid[i] = color; 
    this.cellEls[i].style.backgroundColor = color;
  },
  checkNeighbors: function(color) {
    for(let i = 0; i < this.cellsX * this.cellsY; i++) {
      if(this.grid[i] === color) {
        let winIterator = 1; // declare win iterator

        // horiz logic
        for(let h = 0; h < 3; h++) {
          if(this.grid[i + (h + 1)] === color) {
            winIterator++;
          }

          if(winIterator === 4) {
            game.endGame();
            return;
          }
        }
        
        // vert logic
        winIterator = 1;  // reset for next logic
        for(let v = 0; v < 3; v++) {
          if(this.grid[i + (this.cellsX * (v + 1))] === color) {
            winIterator++;
          }

          if(winIterator === 4) {
            game.endGame();
          }
        }

        // diagonal logic
      }
    }
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
  over: false,
  turn: 0,
  endGame: function() {
    this.over = true;
    console.log('game over');
  },
}

board.drawGrid();
game.turn = 1;