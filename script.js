const tiles = document.querySelectorAll(".tile");
const whosTurnDisplay = document.querySelector("h2");
const restartBtn = document.querySelector("button");

const playerOne = createPlayer("Player One", "X", "green");
const playerTwo = createPlayer("Player Two", "O", "red");
let whosTurn = playerOne;
whosTurnDisplay.style.color = `${playerOne.getColor()}`;
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
     const resetBoard = () => {
          placedTiles[0].fill("_");
          placedTiles[1].fill("_");
          placedTiles[2].fill(" ");
          numTilesPlaced = 0;
     }
     const getNumTilesPlaced = () => numTilesPlaced;
     const incNumTilesPlaced = () => numTilesPlaced++;
     return { getTiles, getPlacedTiles, placeTile, setDisableClick, isClickDisabled: getDisableClick, resetBoard, getNumTilesPlaced, incNumTilesPlaced };
})();

function createPlayer(name, symbol, color) {
     this.name = name;
     let score = 0;
     this.symbol = "";
     this.color = null;
     const giveScore = () => score++;
     const getScore = () => score;
     const setSymbol = (newSymbol) => symbol = newSymbol;
     const getSymbol = () => symbol;
     const getColor = () => color;
     return { name, getScore, giveScore, setSymbol, getSymbol, getColor };

}

const displayController = (function () {

     const display = (tile) => {
          tile.textContent = `${whosTurn.getSymbol()}`;
          gameBoard.placeTile(translate(tile), whosTurn.getSymbol());
          whosTurn = whosTurn === playerOne ? playerTwo : playerOne;
     }

     const resetDisplay = () => {
          for (let tile of tiles) {
               tile.textContent = "";
               whosTurnDisplay.textContent = `${whosTurn.name}'s turn`;
          }
     }

     const updateWhosTurnDisplay = () => {
          if (whosTurn === playerTwo) {
               whosTurnDisplay.style.color = "red";
          } else {
               whosTurnDisplay.style.color = "green";
          }
          whosTurnDisplay.textContent = `${whosTurn.name}'s turn`;
     }

     /** Takes a tile as an input and corresponds that to the correct position in a two dimensional array, namely the placedTiles array in gameBoard. For example, if a user presses the bottom right tile in the browser then this function will output [2, 2]. */
     const translate = (tile) => {
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
     return { display, resetDisplay, updateWhosTurnDisplay }
})();

function createGame() {
     let winner = null;

     const playGame = () => {
          for (let tile of tiles) {
               tile.addEventListener("click", function () {
                    console.log("click");
                    if (gameBoard.isClickDisabled()) {
                         console.log("disabled");
                         return;
                    } else if (this.textContent === "") {
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
                         } else {
                              displayController.updateWhosTurnDisplay();
                         }
                    }
               });
          }
     }

     const checkGameState = () => {
          const tileArray = gameBoard.getPlacedTiles();
          let allDirectionsArr = [...tileArray];

          for (let i = 0; i < tileArray.length; i++) {
               let arr = [];
               arr.push(tileArray[0][i]);
               arr.push(tileArray[1][i]);
               arr.push(tileArray[2][i]);
               allDirectionsArr.push(arr);
          }
          /** / */
          let firstDiagArr = [];
          firstDiagArr.push(tileArray[2][0]);
          firstDiagArr.push(tileArray[1][1]);
          firstDiagArr.push(tileArray[0][2]);
          allDirectionsArr.push(firstDiagArr);

          /** \ */
          let secondDiagArr = [];
          secondDiagArr.push(tileArray[0][0]);
          secondDiagArr.push(tileArray[1][1]);
          secondDiagArr.push(tileArray[2][2]);
          allDirectionsArr.push(secondDiagArr);

          for (let i = 0; i < allDirectionsArr.length; i++) {
               const arrSet = new Set(allDirectionsArr[i]);
               if (allDirectionsArr[i].includes(" ") || allDirectionsArr[i].includes("_")) {
                    continue;
               } else if (arrSet.size === 1) {
                    return "win";
               }
          }
          return null;
     }
     return { playGame, checkGameState };
}

restartBtn.addEventListener("click", () => {
     gameBoard.resetBoard();
     gameBoard.setDisableClick(false);
     displayController.resetDisplay();
     displayController.updateWhosTurnDisplay();
});
