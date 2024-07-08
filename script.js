const tiles = document.querySelectorAll(".tile");

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

//playGame(playerOne, playerTwo);

const playerOne = createPlayer("Jack");
const playerTwo = createPlayer("Jill"); 
playerOne.setSymbol("X");
playerTwo.setSymbol("O"); 
let whosTurn = playerOne;

function playGame() {

     let startingPlayer = null;
     let playersTurn = null;
     const diceRoll = Math.floor(Math.random()) * 6;
     let gameWon = false;
     

}



for (let tile of tiles) {
     console.log("test");
     tile.addEventListener("click", function() {
          if (tile.textContent === "") {
               tile.textContent = `${whosTurn.getSymbol()}`;
               whosTurn = whosTurn === playerOne ? playerTwo : playerOne;
          }
          
          console.log("click");
     })
}

console.log(tiles);
