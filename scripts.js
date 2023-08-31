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

    function _createBoard() {
        const _board = [3][3]

        const my2DArray = [
            [1,"X",1], 
            [1,1,2], 
            [1,2,1]
        ];
    }

    function _startGame() {
        
    }

    function _checkAvail() {

    }

    function _checkWinning() {
        // Checking Sequential Rows
        for (i = 0; i < 3; i++) {
            if (my2DArray[i][0] == my2DArray[i][1] && my2DArray[i][1] == my2DArray[i][2]) {
                console.log("sequence check - horizontal");
            } else {
                console.log("sequence fail - horizontal");
            }
        }

        // Checking Vertical Columns
        for (i = 0; i < 3; i++) {
            if (my2DArray[0][i] == my2DArray[1][i] && my2DArray[1][i] == my2DArray[2][i]) {
                console.log("sequence check - vertical")
            } else {
                console.log("sequence fail - vertical")
            }
        }

        // Checking Diagonal 
        if (my2DArray[0][0] == my2DArray[1][1] && my2DArray[1][1] == my2DArray[2][2]) {
            console.log("sequence check - diagonal")
        } else {
            console.log("sequence fail - diagonal")
        }

        // Checking Diagonal Reverse
        if (my2DArray[0][2] == my2DArray[1][1] && my2DArray[1][1] == my2DArray[2][0]) {
            console.log("sequence check - diagonal reverse")
        } else {
            console.log("sequence fail - diagonal reverse")
        }
    }

    return {
        createBoard: function() {
            _createBoard();
        },

        startGame: function() {

        }
    };
})();

gameLogic.createBoard();
gameLogic.startGame();


