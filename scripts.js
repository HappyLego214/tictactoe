// TODO: STOP GAMEBOARD EVENTLISTENER ONCE WIN CONDITION IS SET // FIXED

// const gameboard = document.querySelector('.gameboard');
// const startBtn = document.querySelector('#startBtn');
// const resetBtn = document.querySelector('#resetBtn');
// const cellblock = document.querySelectorAll('.cellblock');
// const firstScore = document.querySelector('#firstScore');
// const secondScore = document.querySelector('#secondScore');
// const results = document.querySelector('.results');

// let inGame = false;

const gameLogic = (() => {

    let gameBoard = {
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
        for(i = 0; i < 9; i++) {
            if (playerTurn == true)
            {
                console.log("check-1")
                playerTurn = false;
            } else {
                console.log("check-2")
                playerTurn = true;
            }
        }
        _checkWinning(gameBoard)
    }

    function _checkAvail(gameBoard) {
    }

    function _checkWinning(gameBoard) {
        // Checking Sequential Rows
        for (i = 0; i < 3; i++) {
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2]) {
                console.log("sequence check - horizontal");
            } else {
                console.log("sequence fail - horizontal");
            }
        }

        // Checking Vertical Columns
        for (i = 0; i < 3; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]) {
                console.log("sequence check - vertical")
            } else {
                console.log("sequence fail - vertical")
            }
        }

        // Checking Diagonal 
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            console.log("sequence check - diagonal")
        } else {
            console.log("sequence fail - diagonal")
        }

        // Checking Diagonal Reverse
        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            console.log("sequence check - diagonal reverse")
        } else {
            console.log("sequence fail - diagonal reverse")
        }
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
