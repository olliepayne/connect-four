// tie condition
// render and add stats
// themes ?

const board = {
  cellsX: 7,
  cellsY: 6,
  grid: [], // nested array, setup y then x (access the row w/ the respective y index)
  gameBoardEl: document.getElementById('game-board'),
  cellEls: [],
  drawGrid: function() {
    let i = 0;
    for(let y = 0; y < this.cellsY; y++) {
      let newVirtualRow = [];
      let newCellElRow = [];
      for(let x = 0; x < this.cellsX; x++) {
        newVirtualRow.push('');

        // DOM stuff
        const newCellEl = document.createElement('div');
        newCellEl.className = 'cell';
        newCellEl.id = `cell-${i}`;

        newCellEl.style.backgroundColor = 'white';

        // event listeners
        newCellEl.addEventListener('click', (e) => this.clickCell(e.target));
        newCellEl.addEventListener('mouseover', function(e) {
          if(!game.over) {
            e.target.style.opacity = 0.8;
          }
        });
        newCellEl.addEventListener('mouseleave', function(e) {
          e.target.style.opacity = 1;
        });

        this.gameBoardEl.appendChild(newCellEl);

        newCellElRow.push(newCellEl);

        i++;
      }
      this.grid.push(newVirtualRow);
      this.cellEls.push(newCellElRow);
    }
  },
  clickCell: function(clickedCell) {
    if(!game.over) {
      // grab the index of the cell we clicked
      let gridCoords = {x: 0, y: 0};
      for(let y = 0; y < this.cellsY; y++) {
        for(let x = 0; x< this.cellsX; x++) {
          if(this.cellEls[y][x] === clickedCell) {
            gridCoords.x = x;
            gridCoords.y = y;
          }
        }
      }

      let colorToFill = '';

      // check if we can actually fill the cell
      if(this.grid[gridCoords.y][gridCoords.x] === '') {  // the cell we are clicking is empty
        if(gridCoords.y === this.cellsY - 1 || this.grid[gridCoords.y + 1][gridCoords.x] !== '') {
          // only flip the turn if a cell is filled
          if(game.turn === 1) {
            colorToFill = player1.color;
            game.turn = 2;
            game.renderGameMessage(`${player2.color}'s turn.`);
          } else if(game.turn === 2) {
            colorToFill = player2.color;
            game.turn = 1;
            game.renderGameMessage(`${player1.color}'s turn.`);
          } 

          this.fillCell(gridCoords, colorToFill);
          this.checkNeighbors(colorToFill);
        }
      }
    }
  },
  fillCell: function(gridCoords, color) {
    this.grid[gridCoords.y][gridCoords.x] = color;
    this.cellEls[gridCoords.y][gridCoords.x].style.backgroundColor = color;
  },
  checkNeighbors: function(color) {
    for(let y = 0; y < this.cellsY; y++) {
      for(let x = 0; x < this.cellsX; x++) {
        if(this.grid[y][x] === color) {
          let neighborCellCount = 1;

          // horiz logic
          if(x <= (this.cellsX - 1) - 3) {
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y][x + w] === color) {
                neighborCellCount++;
              }
            }
          }

          if(this.winCondition(neighborCellCount)) {
            game.endGame(color);
          } else {
            neighborCellCount = 1;
          }

          // vert logic
          if(y <= (this.cellsY - 1) - 3) {
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x] === color) {
                neighborCellCount++;
              }
            }
  
            if(this.winCondition(neighborCellCount)) {
              game.endGame(color);
            } else {
              neighborCellCount = 1;
            }
          }

          // diagonal positive logic
          if(y <= (this.cellsY - 1) - 3 && x >= 3) {
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x - w] === color) {
                neighborCellCount++;
              }
            }

            if(this.winCondition(neighborCellCount)) {
              game.endGame(color);
            } else {
              neighborCellCount = 1;
            }
          }
          
          // diagonal negative logic
          if(y <= (this.cellsY - 1) - 3 && x <= (this.cellsX - 1) - 3) {
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x + w] === color) {
                neighborCellCount++;
              }
            }

            if(this.winCondition(neighborCellCount)) {
              game.endGame(color);
            } else {
              neighborCellCount = 1;
            }
          }
        }
      }
    }
  },
  winCondition: function(neighborCellCount) {
    return (neighborCellCount === 4 ? true : false);
  },
  resetBoard: function() {
    // remove all the virtual values we were storing in the cells
    this.grid = []; 

    // DOM stuff
    this.cellEls.forEach(function(row) {
      row.forEach((item) => item.remove());
    });  
    this.cellEls = [];
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

// ---init after everything is defined---
game.init();