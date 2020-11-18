# connect-four

## Wireframe
![alt text](./images/wireframe.png "Title")

### Visual / Style
- 7x6 CSS grid for the game 'pieces'
  - corresponding virtual grid to hold the values
- Classic connect 4 colors
- dabble with animations *when playable build exists*
- display stats for each player
  - who's turn it is
  - how many pieces they have on the board
  - current score for the session
- **BONUS** different themes can be set
### Mechanics / Behavior
- Two players, no computer AI
- receive input from a mouse click as to which column to drop the piece in
- track a score for the session
- reset button (calls a reset method)
- tie condition
  - grids full, nobody one
- timer? for 'falling' animation/effect
- player class (object)
  - refined way of handling two players
- game object
  - should handle the general interactions of the overall game state
- turn handler object
  - specific to controlling who gets to play and when 
### Gameplay
1. player's input their respective names
2. a number is rolled to see who goes first
3. play back and forth until an end game condition is met
   1. whether that be a win or a tie
4. when the end game condition is met, stop gameplay and the ability to play and display who won. Then, update the respective stats.