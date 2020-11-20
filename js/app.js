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
          game.renderGameMessage(`${player2.color}'s turn`);
        } else if(game.turn === 2) {
          colorToFill = player2.color;
          game.turn = 1;
          game.renderGameMessage(`${player1.color}'s turn`);
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
        let winIterator = 1; // declare win iterator (need = 4 to win -- 4 pieces in any direction)

        // horiz logic
        for(let h = 0; h < 3; h++) {
          if(this.grid[i + (h + 1)] === color) {
            winIterator++;
          }

          if(winIterator === 4) {
            game.endGame(color);
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
            game.endGame(color);
            return;
          }
        }

        // diagonal negative logic
        winIterator = 1;  // reset for next logic
        for(let h = 0; h < 3; h++) {
          if(this.grid[i + (h + 1) + this.cellsX * (h + 1)] === color) {
            winIterator++;
          }

          if(winIterator === 4) {
            game.endGame(color);
            return;
          }
        }

        // diagonal positive logic
        winIterator = 1;  // reset for next logic
        for(let h = 0; h < 3; h++) {
          if(this.grid[i + (this.cellsX * (h + 1)) - (h + 1)] === color) {
            winIterator++;
          }

          if(winIterator === 4) {
            game.endGame(color);
            return;
          }
        }
      }
    }
  },
  resetBoard: function() {
    this.grid = []; // remove all the virtual values we were storing in the cells
    this.cellEls.forEach((item) => item.remove());  // remove all the cell divs from the dom (clean them)
    this.cellEls = [];  // empty array for new values
  },
}

class Player {
  name = '';
  color = '';
  stats = {piecesOnBoard: 0, gamesWon: 0,};
  constructor(name, color, stats) {
    this.name = name;
    this.color = color;
    this.stats = stats;
  }
}
const player1 = new Player();
player1.color = 'yellow';
const player2 = new Player();
player2.color = 'red';

const game = {
  over: false,
  turn: 0,
  renderGameMessage: function(str) {
    gameMessagesEl.innerHTML = str;
    console.log(str);
  },
  endGame: function(winningColor) {
    this.over = true;

    if(winningColor === player1.color) {
      this.renderGameMessage(`Player 1 (${player1.color}) wins!`);
    } else if(winningColor === player2.color) {
      this.renderGameMessage(`Player 2 (${player2.color}) wins!`);
    }
  },
  init: function() {
    this.over = false;

    board.resetBoard();
    board.drawGrid();  

    this.turn = 1;
    this.renderGameMessage(`${player1.color}'s turn!`);
  },
}

const gameMessagesEl = document.getElementById('game-messages');
const resetButtonEl = document.getElementById('reset-button');
resetButtonEl.addEventListener('click', () => game.init()); // UNDERSTAND THIS EVENT HANDLER CALLBACK, WHY ITS SET THIS WAY

game.init();