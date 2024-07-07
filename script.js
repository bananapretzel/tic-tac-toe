const gameBoard = (function () {
     const tiles = [[0, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
     const placedTiles = [["_", "_", "_"],
     ["_", "_", "_"],
     [" ", " ", " "]];
     const getTiles = () => tiles;
     const getPlacedTiles = () => placedTiles;
     const placeTile = (index, symbol) => placedTiles[index+1] = symbol;
     return { getTiles, getPlacedTiles, placeTile };
})();

function createPlayer(name) {
     this.name = name;
     let score = 0;
     let symbol = "";
     const giveScore = () => score++;
     const getScore = () => score;
     const setSymbol = (newSymbol) => symbol = newSymbol;
     const getSymbol = () => symbol;
     return { name, getScore, giveScore, setSymbol, getSymbol };

}

const playerOne = createPlayer("Jack");
const playerTwo = createPlayer("Jill");
console.log(playerOne);
console.log(playerTwo);

function consoleDisplayBoard() {
     for (let i = 0; i < gameBoard.getTiles().length; i++) {
          let result = "";
          for (let j = 0; j < gameBoard.getTiles()[i].length; j++) {
               result += gameBoard.getTiles()[i][j] + " ";

          }
          console.log(result + " " + i);

     }
     for (let i = 0; i < gameBoard.getPlacedTiles().length; i++) {
          let result = "";
          for (let j = 0; j < gameBoard.getPlacedTiles()[i].length; j++) {

               if (j !== 2) {
                    result += gameBoard.getPlacedTiles()[i][j] + "|";
               } else {
                    result += gameBoard.getPlacedTiles()[i][j];
               }


          }
          console.log(result + " " + i);

     }
}

playGame(playerOne, playerTwo);

function playGame(playerOne, playerTwo) {
     this.playerOne = playerOne;
     this.playerTwo = playerTwo;
     startingPlayer = null;
     const diceRoll = Math.floor(Math.random()) * 6;
     let gameWon = false;
     alert("Rolling a dice to see who goes first");
     if (diceRoll >= 3) {
          alert("Player one is the first to go! They have been designated with X");
          startingPlayer = playerOne;
          playerOne.setSymbol("X");
          playerTwo.setSymbol("O");
     } else {
          alert("Player two is the first to go! They have been designated with X");

          startingPlayer = playerTwo;
          playerOne.setSymbol("O");
          playerTwo.setSymbol("X");
     }
     consoleDisplayBoard();
     let choice = prompt(`${startingPlayer.name} choose where to place your X`);
     gameBoard.placeTile(choice, startingPlayer.getSymbol);
     consoleDisplayBoard();
     // while(!gameWon) {


     // }
          

}