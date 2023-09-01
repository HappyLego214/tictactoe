// TODO: STOP GAMEBOARD EVENTLISTENER ONCE WIN CONDITION IS SET // FIXED

const gameboard = document.querySelector('.gameboard');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const cellblock = document.querySelectorAll('.cellblock');
const firstScore = document.querySelector('#firstScore');
const secondScore = document.querySelector('#secondScore');
const results = document.querySelector('.results');

let inGame = false;

const gameLogic = (() => {

    const gameBoard = {
        createBoard: function() {
            let arr = [
                [0,1,2], 
                [3,4,5], 
                [6,7,8]
            ];
            return arr;
        }
    }

    function _startRound(player1, player2, gameBoard) {
        let playerTurn = true;
        let totalTurns = 0;

        let gameEnd = false;
        let markAvail = false;

        cellblock.forEach((cell => {
            cell.addEventListener('click', () => {
                if (gameEnd == false) {
                    if (playerTurn == true) {
                            markAvail = _checkAvail(playerTurn, gameBoard, cell);
                            gameEnd = _checkWinning(gameBoard);
                            totalTurns++;

                        if (markAvail == true) {
                            cell.textContent = "X";
                            playerTurn = false;
                        }


                        if (gameEnd == true) {
                            console.log("Player 1 - Won The Game!");
                            inGame = false;
                            return player1.playerScore++;

                        }
                    
                        if (totalTurns == 9 && gameEnd == false) {
                            console.log("It's a Tie!");
                            inGame = false;
                            return;
                        }
                    } else {
                        markAvail = _checkAvail(playerTurn, gameBoard, cell);
                        gameEnd = _checkWinning(gameBoard);
                        totalTurns++;

                        if (markAvail == true) {
                            cell.textContent = "O";
                            playerTurn = true;
                        }

                        if (gameEnd == true) {
                            console.log("Player 2 - Won The Game!");
                            inGame = false;
                            return player2.playerScore++;

                        }

                        if (totalTurns == 9 && gameEnd == false) {
                            console.log("It's a Tie!");
                            inGame = false;
                            return;
                        }
                    }
                }
            }, {once: true});
        }));
    } 

    function _checkAvail(playerTurn, gameBoard, cell) {
        let check = 0;
        for (i = 0; i < 3; i++) {
            check = gameBoard[i].findIndex(item => item == cell.dataset.location);
            if (check != -1) {
                if (playerTurn == true) {
                    gameBoard[i][check] = "X";
                } else {
                    gameBoard[i][check] = "O";
                }
                return true;
            } 
        }

        return false;
    }

    function _checkWinning(gameBoard) {
        // Checking Sequential Rows
        for (i = 0; i < 3; i++) {
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2]) {
                return true;
            } 
        }

        // Checking Vertical Columns
        for (i = 0; i < 3; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]) {
                return true;
            } 
        }

        // Checking Diagonal 
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            return true;
        } 

        // Checking Diagonal Reverse
        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            return true;
        } 

        return false;
    }

    return {
        startGame: function() {
            _startRound(player1, player2, gameBoard.createBoard())
        },

        resetBoard: function() {
            cellblock.forEach((cell => {
                cell.textContent = "";
            }))
        }
    };
})();


startBtn.addEventListener('click', () => {
    if (inGame == false) {
        gameLogic.startGame(player1, player2);
        gameLogic.resetBoard();
    } else {
        console.log("Game Is Ongoing");
    }
    inGame = true;
})

const playerFactory = (name, score) => {
    const playerScore = 0;
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore, playerScore}
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2');
