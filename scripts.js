// TODO: STOP GAMEBOARD EVENTLISTENER ONCE WIN CONDITION IS SET // FIXED

const gameboard = document.querySelector('.gameboard');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const cellblock = document.querySelectorAll('.cellblock');
const firstScore = document.querySelector('#firstScore');
const secondScore = document.querySelector('#secondScore');
const results = document.querySelector('.results');

// let inGame = false;

const gameLogic = (() => {

    let gameBoard = {
        createBoard: function() {
            let arr = [
                ["X",1,2], 
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
                if (playerTurn == true) {
                        markAvail = _checkAvail(gameBoard, cell);
                        gameEnd = _checkWinning(gameBoard);
                        playerTurn = false;
                        totalTurns++;
    
                        console.log(markAvail);
                        console.log(gameEnd);
                        console.log("Player 1");
                        console.log(totalTurns);
                } else {
                        gameEnd = _checkWinning(gameBoard, cell)
                        playerTurn = true;
                        totalTurns++;
    
                        console.log(gameEnd);
                        console.log("Player 2");
                        console.log(totalTurns);
                }
            })
        }));
    }

    function _checkAvail(gameBoard, cell) {
        let check = 0;
        console.log(cell.dataset.location);
        for (i = 0; i < 3; i++) {
            check = gameBoard[i].findIndex(item => item == cell.dataset.location);
            console.log(check);
            if (check != -1) {
                return true;
            }
        }

        return false;
    }

    function _checkWinning(gameBoard) {
        // Checking Sequential Rows
        for (i = 0; i < 3; i++) {
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2]) {
                console.log("sequence check - horizontal");
                return true;
            } else {
                console.log("sequence fail - horizontal");
            }
        }

        // Checking Vertical Columns
        for (i = 0; i < 3; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]) {
                console.log("sequence check - vertical")
                return true;
            } else {
                console.log("sequence fail - vertical")
            }
        }

        // Checking Diagonal 
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            console.log("sequence check - diagonal")
            return true;
        } else {
            console.log("sequence fail - diagonal")
        }

        // Checking Diagonal Reverse
        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            console.log("sequence check - diagonal reverse")
            return true;
        } else {
            console.log("sequence fail - diagonal reverse")
        }

        return false;
    }

    return {
        createBoard: function() {
        },

        startGame: function() {
            _startRound(player1, player2, gameBoard.createBoard())
        }
    };
})();

const playerFactory = (name, score) => {
    const playerScore = 0;
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore}
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2');

gameLogic.createBoard();
gameLogic.startGame(player1, player2);
