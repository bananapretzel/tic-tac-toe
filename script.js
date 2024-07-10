const tiles = document.querySelectorAll(".tile");
const whosTurnDisplay = document.querySelector("h2");
const restartBtn = document.querySelector("button");

const playerOne = createPlayer("Player One");
const playerTwo = createPlayer("Player Two");
playerOne.setSymbol("X");
playerTwo.setSymbol("O");
let whosTurn = playerOne;
const game = createGame();
game.playGame();

const gameBoard = (function () {
     let numTilesPlaced = 0;
     const tiles = [[0, 1, 2],
     [3, 4, 5],
     [6, 7, 8]];
     const placedTiles = [["_", "_", "_"],
     ["_", "_", "_"],
     [" ", " ", " "]];
     let disableClick = false;
     const getTiles = () => tiles;
     const getPlacedTiles = () => placedTiles;
     const placeTile = (position, symbol) => placedTiles[position[0]][position[1]] = `${symbol}`;
     const getDisableClick = () => disableClick;
     const setDisableClick = (bool) => disableClick = bool;
     const resetBoard = function () {
          placedTiles[0].fill("_");
          placedTiles[1].fill("_");
          placedTiles[2].fill(" ");
     }
     const getNumTilesPlaced = () => numTilesPlaced;
     const incNumTilesPlaced = () => numTilesPlaced++;
     return { getTiles, getPlacedTiles, placeTile, setDisableClick, getDisableClick, resetBoard, getNumTilesPlaced, incNumTilesPlaced };
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



const displayController = (function () {

     function display(tile) {
          tile.textContent = `${whosTurn.getSymbol()}`;
          whosTurn = whosTurn === playerOne ? playerTwo : playerOne;
          whosTurnDisplay.textContent = `${whosTurn.name}'s turn`;
          gameBoard.placeTile(translate(tile), whosTurn.getSymbol());
     }

     function resetDisplay() {
          for (let tile of tiles) {
               tile.textContent = "";
               whosTurnDisplay.textContent = `${whosTurn.name}'s turn`;
          }
     }

     /** Takes a tile as an input and corresponds that to the correct position in a two dimensional array, namely the placedTiles array in gameBoard. For example, if a user presses the bottom right tile in the browser then this function will output [2, 2]. */
     function translate(tile) {
          let arrayPosition = [];
          const classNames = tile.className;

          if (classNames.includes("row-one")) {
               arrayPosition.push(0);
          } else if (classNames.includes("row-two")) {
               arrayPosition.push(1);
          } else if (classNames.includes("row-three")) {
               arrayPosition.push([2]);
          }

          if (classNames.includes("col-one")) {
               arrayPosition.push(0);
          } else if (classNames.includes("col-two")) {
               arrayPosition.push(1);
          } else if (classNames.includes("col-three")) {
               arrayPosition.push(2);
          }
          return arrayPosition;
     }
     return { display, resetDisplay }
})();

function createGame() {
     let winner = null;

     function playGame() {
          for (let tile of tiles) {
               tile.addEventListener("click", function () {
                    console.log("click");
                    if (gameBoard.getDisableClick()) {
                         console.log("disabled");
                         return;
                    } else if (tile.textContent === "") {
                         gameBoard.incNumTilesPlaced();
                         displayController.display(this);
                         if (checkGameState() === "win") {

                              winner = whosTurn === playerOne ? playerTwo : playerOne;
                              console.log(`${winner.name} has won!`);
                              whosTurnDisplay.textContent = `${winner.name} has won!`;
                              gameBoard.setDisableClick(true);
                         } else if (gameBoard.getNumTilesPlaced() === 9) {
                              whosTurnDisplay.textContent = "Draw!";
                              gameBoard.setDisableClick(true);
                         }
                    }
               });
          }
     }

     function checkGameState() {
          const tileArray = gameBoard.getPlacedTiles();
          const firstRowSet = new Set(tileArray[0]);
          const secondRowSet = new Set(tileArray[1]);
          const thirdRowSet = new Set(tileArray[2]);

          let firstCol = [tileArray[0][0]];
          firstCol.push(tileArray[1][0]);
          firstCol.push(tileArray[2][0]);
          let secondCol = [tileArray[0][1]];
          secondCol.push(tileArray[1][1]);
          secondCol.push(tileArray[2][1]);
          let thirdCol = [tileArray[0][2]];
          thirdCol.push(tileArray[1][2]);
          thirdCol.push(tileArray[2][2]);

          const firstColSet = new Set(firstCol);
          const secondColSet = new Set(secondCol);
          const thirdColSet = new Set(thirdCol);

          /** / */
          let firstDiagonal = [tileArray[2][0]];
          firstDiagonal.push(tileArray[1][1]);
          firstDiagonal.push(tileArray[0][2]);
          const firstDiagonalSet = new Set(firstDiagonal);

          /** \ */
          let secondDiagonal = [tileArray[0][0]];
          secondDiagonal.push(tileArray[1][1]);
          secondDiagonal.push(tileArray[2][2]);
          const secondDiagonalSet = new Set(secondDiagonal);

          /* checking... */

          /* top row */
          if (firstRowSet.size === 1 && !(firstRowSet.has(" ") || firstRowSet.has("_"))) {
               return "win";
          }
          /* middle row */
          if (secondRowSet.size === 1 && !(secondRowSet.has(" ") || secondRowSet.has("_"))) {
               return "win";
          }
          /* bottom row */
          if (thirdRowSet.size === 1 && !(thirdRowSet.has(" ") || thirdRowSet.has("_"))) {
               return "win";
          }
          /* top column */
          if (firstColSet.size === 1 && !(firstColSet.has(" ") || firstColSet.has("_"))) {
               return "win";
          }
          /* middle column */
          if (secondColSet.size === 1 && !(secondColSet.has(" ") || secondColSet.has("_"))) {
               return "win";
          }
          /* bottom column */
          if (thirdColSet.size === 1 && !(thirdColSet.has(" ") || thirdColSet.has("_"))) {
               return "win";
          }

          /* first diagonal */
          if (firstDiagonalSet.size === 1 && !(firstDiagonalSet.has(" ") || firstDiagonalSet.has("_"))) {
               return "win";
          }

          /* second diagonal */
          if (secondDiagonalSet.size === 1 && !(secondDiagonalSet.has(" ") || secondDiagonalSet.has("_"))) {
               return "win";
          }
     }
     return { playGame, checkGameState };
}

restartBtn.addEventListener("click", () => {
     gameBoard.resetBoard();
     gameBoard.setDisableClick(false);
     displayController.resetDisplay();
});
