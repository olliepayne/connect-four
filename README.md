# connect-four

## Wireframe
![alt text](./images/wireframe.png "Title")

### Visual / Style
- 7x6 CSS grid for the game 'pieces'
  - corresponding virtual grid to hold the values
- White and black default, player can choose themes ?
- dabble with animations *when playable build exists*
- display stats for each player
  - who's turn it is
  - how many pieces they have on the board
  - current score for the session
### Mechanics / Behavior
- Two players, no computer AI
- receive input from a mouse click as to which column to drop the piece in
- track a score for the session
- reset button (calls a reset method)
- tie condition
  - grids full, nobody one
- timer? for 'falling' animation/effect
- player objects (1 and 2)
- game object
- turn handler object