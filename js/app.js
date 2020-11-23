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
      let clickedCellCoords = {x: 0, y: 0};
      for(let y = 0; y < this.cellsY; y++) {
        for(let x = 0; x < this.cellsX; x++) {
          if(this.cellEls[y][x] === clickedCell) {
            clickedCellCoords.x = x;
            clickedCellCoords.y = y;
          }
        }
      }

      let colorToFill = '';
      let placementCoords = {x: 0, y: 0};

      if(this.grid[clickedCellCoords.y][clickedCellCoords.x] === '') {
        for(let y = clickedCellCoords.y; y < this.cellsY; y++) {
          if(this.grid[y][clickedCellCoords.x] === '') {
            if(y !== this.cellsY - 1) {
              if(this.grid[y + 1][clickedCellCoords.x] !== '') {
                placementCoords = {x: clickedCellCoords.x, y: y};
              }
            } else {
              placementCoords = {x: clickedCellCoords.x, y: y};
            }
          }
        }

        if(game.turn === 1) {
          colorToFill = player1.color;

          game.turn = 2;
          game.renderGameMessage(`${player2.color}'s turn`);
        } else if(game.turn === 2) {
          colorToFill = player2.color;

          game.turn = 1;
          game.renderGameMessage(`${player1.color}'s turn`);
        }

        this.fillCell(placementCoords, colorToFill);
        this.checkNeighbors(colorToFill);
      }
    }
  },
  fillCell: function(gridCoords, color) {
    this.grid[gridCoords.y][gridCoords.x] = color;
    this.cellEls[gridCoords.y][gridCoords.x].style.backgroundColor = color;

    if(this.allCellsFilled()) {
      console.log('test');
      game.tieGame();
    }
  },
  allCellsFilled: function() {
    for(let y = 0; y < this.cellsY; y++) {
      for(let x = 0; x < this.cellsX; x++) {
        if(this.grid[y][x] === '') {
          return false;
        }
      }
    }
    return true;
  },
  checkNeighbors: function(color) {
    for(let y = 0; y < this.cellsY; y++) {
      for(let x = 0; x < this.cellsX; x++) {
        if(this.grid[y][x] === color) {
          let neighborCellCount = 1;
          let winningCelEls = [];

          // horiz logic
          if(x <= (this.cellsX - 1) - 3) {
            winningCelEls.push(this.cellEls[y][x]);
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y][x + w] === color) {
                neighborCellCount++;
                winningCelEls.push(this.cellEls[y][x+w]);
              }
            }
          }

          if(this.winCondition(neighborCellCount)) {
            game.endGame(color, winningCelEls);
            return;
          } else {
            neighborCellCount = 1;
            winningCelEls = [];
          }

          // vert logic
          if(y <= (this.cellsY - 1) - 3) {
            winningCelEls.push(this.cellEls[y][x]);
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x] === color) {
                neighborCellCount++;
                winningCelEls.push(this.cellEls[y + w][x]);
              }
            }
  
            if(this.winCondition(neighborCellCount)) {
              game.endGame(color, winningCelEls);
              return;
            } else {
              neighborCellCount = 1;
              winningCelEls = [];
            }
          }

          // diagonal positive logic
          if(y <= (this.cellsY - 1) - 3 && x >= 3) {
            winningCelEls.push(this.cellEls[y][x]);
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x - w] === color) {
                neighborCellCount++;
                winningCelEls.push(this.cellEls[y + w][x - w]);
              }
            }

            if(this.winCondition(neighborCellCount)) {
              game.endGame(color, winningCelEls);
              return;
            } else {
              neighborCellCount = 1;
              winningCelEls = [];
            }
          }
          
          // diagonal negative logic
          if(y <= (this.cellsY - 1) - 3 && x <= (this.cellsX - 1) - 3) {
            winningCelEls.push(this.cellEls[y][x]);
            for(let w = 1; w <= 3; w++) {
              if(this.grid[y + w][x + w] === color) {
                neighborCellCount++;
                winningCelEls.push(this.cellEls[y + w][x + w]);
              }
            }

            if(this.winCondition(neighborCellCount)) {
              game.endGame(color, winningCelEls);
              return;
            } else {
              neighborCellCount = 1;
              winningCelEls = [];
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
  color = '';
  score = 0;
  constructor(color, score) {
    this.name = name;
    this.color = color;
    this.score = score;
  }
}
const player1 = new Player();
player1.color = 'yellow';
player1.score = 0;
const player2 = new Player();
player2.color = 'red';
player2.score = 0;

const game = {
  over: false,
  turn: 0,
  renderGameMessage: function(str) {
    gameMessagesEl.innerHTML = str;
  },
  endGame: function(winningColor, winningCellEls) {
    this.over = true;

    // animate
    winningCellEls.forEach((item) => item.className = 'winning-cell');

    if(winningColor === player1.color) {
      player1.score++;
      player1ScoreEl.innerHTML = player1.score;
      this.renderGameMessage(`Player 1 (${player1.color}) wins!`);
    } else if(winningColor === player2.color) {
      player2.score++;
      this.renderGameMessage(`Player 2 (${player2.color}) wins!`);
    }
  },
  tieGame: function() {
    this.over = true;
    this.renderGameMessage(`It's a tie!`);
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
resetButtonEl.addEventListener('click', () => game.init()); // UNDERSTAND THIS EVENT HANDLER CALLBACK, WHY ITS SET THIS WAY (this keyword troubles)
const player1ScoreEl = document.getElementById('player1-score');
const player2ScoreEl = document.getElementById('player2-score');

// ---init after everything is defined---
game.init();