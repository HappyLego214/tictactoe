// TODO: STOP GAMEBOARD EVENTLISTENER ONCE WIN CONDITION IS SET // FIXED

const gameboard = document.querySelector('.gameboard');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const cellblock = document.querySelectorAll('.cellblock');

const firstScore = document.querySelector('#player1Score');
const secondScore = document.querySelector('#player2Score');

const player1Title = document.querySelector('#player1Title');
const player2Title = document.querySelector('#player2Title');

const results = document.querySelector('.results');

const computerActive = document.querySelector('#comp');
const player1Input = document.querySelector('.player1');
const player2Input = document.querySelector('.player2');

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

    let human = 'O';
    let ai = 'X';

    function _startRound(player1, player2, gameBoard) {
        let playerTurn = true;

        let gameEnd = false;
        let markAvail = false;

        cellblock.forEach((cell => {
            cell.addEventListener('click', () => {
                if (gameEnd == false) {
                    if (playerTurn == true) {
                        markAvail = _checkAvail(playerTurn, gameBoard, cell);
                        gameEnd = _checkWinning(gameBoard);
                        console.log(gameEnd);

                        if (markAvail == true) {
                            cell.textContent = "X";
                            playerTurn = false;
                        }

                        if (gameEnd == 'X') {
                            inGame = false;
                            player1.playerScore++;
                            results.textContent = player1.name + " Won The Game!"
                            _updateScoreBoard(player1, player2)
                        }
                    
                        if (gameEnd == 'tie') {
                            inGame = false;
                            results.textContent = "It's a Tie!"
                        }

                    } else {
                        markAvail = _checkAvail(playerTurn, gameBoard, cell);
                        gameEnd = _checkWinning(gameBoard);

                        if (markAvail == true) {
                            cell.textContent = "O";
                            playerTurn = true;
                        }

                        if (gameEnd == 'O') {
                            inGame = false;
                            player2.playerScore++;
                            results.textContent = player2.name + " Won The Game!"
                            _updateScoreBoard(player1, player2)
                        }

                        if (gameEnd == 'tie') {
                            inGame = false;
                            results.textContent = "It's a Tie!"
                        }
                    }
                }
            }, {once: true});
        }));
    }

    function _startRoundAI(player1, computer, gameBoard) {
    
        let playerTurn = true;
        let gameEnd = false;
        let markAvail = false;

        cellblock.forEach((cell => {
            cell.addEventListener('click', () => {
                if (gameEnd == false) {
                    markAvail = _checkAvail(playerTurn, gameBoard, cell);
                    playerMarked = false;
                    gameEnd = _checkWinning(gameBoard);

                    if (markAvail == true) {
                        cell.textContent = human;
                        playerMarked = true;
                    }

                    if (gameEnd == human) {
                        inGame = false;
                        player1.playerScore++;
                        results.textContent = player1.name + " Won The Game!"
                        _updateScoreBoard(player1, player2)
                        return gameEnd = true;
                    }
                
                    if (gameEnd == 'tie') {
                        inGame = false;
                        results.textContent = "It's a Tie!"
                        return gameEnd = true;
                    }

                    // COMPUTER TURN
                    
                    if (playerMarked == true) {
                        _bestAIMove(gameBoard);
                        gameEnd = _checkWinning(gameBoard);
                    }

                    if (gameEnd == ai) {
                        inGame = false;
                        computer.playerScore++;
                        results.textContent = computer.name + " Won The Game!"
                        _updateScoreBoard(player1, computer)
                        return true;
                    }
                }
            }, {once: true});
        }));
    }

    function _bestAIMove(gameBoard) {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i ++) {
            for(let j = 0; j < 3; j++) {
                if(gameBoard[i][j] != 'X' && gameBoard[i][j] != 'O') { 
                    let temp = gameBoard[i][j];
                    gameBoard[i][j] = ai;
                    let score = _minimax(gameBoard, 0, false);
                    gameBoard[i][j] = temp
                    if (score > bestScore) {
                        bestScore = score;
                        move = [i,j];
                    }
                }
            }
        }

        cellblock.forEach((cell => {
            if (gameBoard[move[0]][move[1]] == cell.dataset.location) {
                cell.textContent = ai;
            }
        }));

        gameBoard[move[0]][move[1]] = ai;

        return;
    };

    function _minimax(gameBoard, depth, isMaximizing) {
        let winning = _checkWinning(gameBoard);
        if (winning != false) {
            let score = _scores(winning)
            return score;
        }
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(gameBoard[i][j] != 'X' && gameBoard[i][j] != 'O') { 
                        let temp = gameBoard[i][j];
                        gameBoard[i][j] = ai;
                        let score = _minimax(gameBoard, depth + 1, false);
                        gameBoard[i][j] = temp;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    if(gameBoard[i][j] != 'X' && gameBoard[i][j] != 'O') { 
                        let temp = gameBoard[i][j];
                        gameBoard[i][j] = human;
                        let score = _minimax(gameBoard, depth + 1, true);
                        gameBoard[i][j] = temp;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }

    function _scores(winner) {
        if (winner == human) {
            return -10;
        } else if (winner == ai) {
            return 10;
        } else {
            return 0;
        }
    }

    function _checkAvail(playerTurn, gameBoard, cell) {
        let check = 0;
        for (let i = 0; i < 3; i++) {
            check = gameBoard[i].findIndex(item => item == cell.dataset.location);
            if (check != -1) {
                if (playerTurn == true) {
                    gameBoard[i][check] = human;
                } else {
                    gameBoard[i][check] = ai;
                }
                return true;
            } 
        }
        console.log("cell not available!");
        return false;
    }

    function _checkWinning(gameBoard) {
        let winner = null;
        
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] == gameBoard[i][1] && gameBoard[i][1] == gameBoard[i][2]) {
                winner = gameBoard[i][0];
                return winner;
            } 
        }

        // Checking Vertical Columns
        for (let i = 0; i < 3; i++) {
            if (gameBoard[0][i] == gameBoard[1][i] && gameBoard[1][i] == gameBoard[2][i]) {
                winner = gameBoard[0][i];
                return winner;
            } 
        }

        // Checking Diagonal 
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) {
            winner = gameBoard[0][0];
            return winner;
        } 

        // Checking Diagonal Reverse
        if (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) {
            winner = gameBoard[0][2];
            return winner;
        }

        let availCell = 0

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++)
            {
                if(Number.isInteger(gameBoard[i][j])) {
                    availCell += gameBoard[i][j]
                }
            }
        }

        if (availCell == 0) {
            return 'tie'
        }

        return false;
    }

    function _updateScoreBoard(player1, player2) {
        firstScore.textContent = player1.playerScore;
        secondScore.textContent = player2.playerScore;
    }

    function _clearBoard() {
        results.textContent = "";
            cellblock.forEach((cell => {
                cell.textContent = "";
            }))
    }

    function _activePlayerSelect() {
        if (inGame == true) {
            computerActive.disabled = true;
            player1Input.disabled = true;
            player2Input.disabled = true;
        } else {
            computerActive.disabled = false;
            player1Input.disabled = false;
            player2Input.disabled = false;
        }
    }

    return {
        startGame: function() {
            _startRound(player1, player2, gameBoard.createBoard())
            _updateScoreBoard(player1, player2);
        },

        startGameAI: function() {
            _startRoundAI(player1, computer, gameBoard.createBoard())
            _updateScoreBoard(player1, computer);
        },

        clearBoard: function() {
            _clearBoard();
        },

        resetGame: function() {
            _updateScoreBoard(player1, player2)
            _clearBoard();
        },

        triggerPlayerSelect() {
            _activePlayerSelect();
        }
    };
})();


startBtn.addEventListener('click', () => {
    if (inGame == false) {
        if (computerActive.checked) {
            inGame = true;
            playerNameChange(player1, player1Input, player1Title)
            player2Title.textContent = computer.name;
            gameLogic.startGameAI(player1, computer)
            gameLogic.triggerPlayerSelect();
            gameLogic.clearBoard();
        } else {
            inGame = true;
            playerNameChange(player1, player1Input, player1Title)
            playerNameChange(player2, player2Input, player2Title)
            gameLogic.startGame(player1, player2);
            gameLogic.triggerPlayerSelect();
            gameLogic.clearBoard();
        }
    } else {
        console.log("Game Is Ongoing");
    }
});

function playerNameChange(player, input, title) {
    if (input.value == "") {
        return player;
    } else {
        player.name = input.value;
        title.textContent = player.name;
        return player;
    }
}

resetBtn.addEventListener('click', () => {
    inGame = false;
    player1.playerScore = 0;
    player2.playerScore = 0;
    gameLogic.resetGame();
    gameLogic.triggerPlayerSelect();
});


const playerFactory = (name) => {
    const playerScore = 0;
    return {name, playerScore}
}

let player1 = playerFactory('Player 1');
let player2 = playerFactory('Player 2');
let computer = playerFactory('Computer');