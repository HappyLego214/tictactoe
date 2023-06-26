const gameboard = document.querySelector('.gameboard');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const cellblock = document.querySelectorAll('.cellblock');

let inGame = false;

const gameLogic = (() => {
    
    let x = [0,1,2];
    let y = [0,1,2];
    let gameboard = 
    {
        createBoard: function() {
        let arr = []; 
           let ex = x.forEach(x => {
                let re = y.forEach(y => {
                     arr.push(x + y);
                });
           }); 
        for(let i = 0; i < 3; i++) {
            arr.push(arr.splice(0, 3));
        }

        return arr;

        }
    }

    function _markGrid(location, arr, player, comp, avail) {
        if (location <= 3) {                
            let target = arr[0][location - 1];
            let hit = player.playerMark[0];
            let check = comp.playerMark[0];

            if (hit.length >= 3 || check.includes(target) || hit.includes(target)) {
                console.log('Slot Already Marked')
               return avail = true;

            } else {
                hit.push(target);
                hit.sort(function(a,b){return a - b})
                return avail = false;
            }

        } else if (location <= 6 && location > 3) {
            let target = arr[1][location - 4];
            let hit = player.playerMark[1];
            let check = comp.playerMark[1];

            if (hit.length >= 3 || check.includes(target) || hit.includes(target)) {
                console.log('Slot Already Marked')
                return avail = true;

            } else {
                hit.push(target);
                hit.sort(function(a,b){return a - b})
                return avail = false;
            }

        } else if (location <= 9 && location > 6) {
            let target = arr[2][location - 7];
            let hit = player.playerMark[2];
            let check = comp.playerMark[2];
            
            if (hit.length >= 3 || check.includes(target) || hit.includes(target)) {
                console.log('Slot Already Marked')
                return avail = true;

            } else {
                hit.push(target);
                hit.sort(function(a,b){return a - b})
                return avail = false;
            }
    
        } else {
            console.log('Error!');
            return avail = true;
        }
    }

    function _winConditions(player, checkWin) {
       let curr = player.playerMark;
       let test = [];
        if (curr[0].length == 3  || curr[1].length == 3 || curr[2].length == 3) {
            console.log('Sequential Row')
            return checkWin = true;

        } else if (_checkSeq(curr, 0) == true || _checkSeq(curr, 1) == true || _checkSeq(curr, 2) == true) {
            console.log('Sequential Column')
            return checkWin = true;

        } else if (_checkDgSeq(curr, 2, 0) == true || _checkDgSeq(curr, 0, 2) == true) {
            console.log('Divisible Diagonal')
            return checkWin = true;

        } else {
            console.log('No Winner');
            return checkWin = false;
        }
    }

    function _checkTie() {
        let count = 0;
        cellblock.forEach(cell => {
            if (cell.textContent) {
                count += 1;
            }
        });

        console.log(count);
        return count;

    }

    function _checkSeq(arr, loc) {
        let sequence = [];
        arr.forEach(element => {
            sequence.push(element[loc]);
        });
        
        for(let i = 1; i < sequence.length; i++)
            if(sequence[i] != sequence[i-1] + 1) {
                return false;
            }

        return true;
    }

    function _checkDgSeq(arr, indStart, indInc) {

        let seq = [];
        let index = indStart;
        
                arr.forEach(element => {
                        seq.push(element.find(item => item == index));
                        index += indInc;

                });

        return seq.every(item => [2,2,2].includes(item) || [0,2,4].includes(item));

     }

    function _startRound(player1, player2) {
        let picker = true;
        let checkWin = false;
        let avail = true;
        let arrRound = gameboard.arr;

                cellblock.forEach((cell => {
                    cell.addEventListener('click', () => {

                        if (picker == true) {
                            let name = player1.getName();
                            let location = cell.dataset.location;
                            avail = _markGrid(location, arrRound, player1, player2, avail);
                            console.log(avail);
                            checkWin = _winConditions(player1, checkWin);

                            if (avail == false) {
                                cell.textContent = "X";
                                picker = false;
                            }

                            if (checkWin == true) {
                                console.log('You Won The Game!');
                                inGame = false;
                                return player1.playerScore = 1;
                            } else if (_checkTie() == 8) {
                                console.log('Tie!');
                                inGame = false;
                                return;
                            }

                        } else {

                            let name = player1.getName();
                            let location = cell.dataset.location;
                            avail = _markGrid(location, arrRound, player2, player1, avail);
                            checkWin = _winConditions(player2, checkWin);

                            if (avail == false) {
                                cell.textContent = "O";
                                picker = true;
                            }

                            if (checkWin == true) {
                                console.log('You Won The Game!');
                                inGame = false;
                                return player2.playerScore = 1;
                            } else if (_checkTie() == 8) {
                                console.log('Tie!');
                                inGame = false;
                                return;
                            }

                        }
                    }, {once: true});
                }));
        }

    return {

        displayBoard: function() {
            gameboard.arr = gameboard.createBoard(x,y);
        },

        startGame: function() {
                _startRound(player1, player2, gameboard.arr);
        },

        resetBoard: function() {
            player1.playerMark = [[],[],[]];
            player2.playerMark = [[],[],[]];

            cellblock.forEach((cell => {
                cell.textContent = "";
            }));
        }
    }

})();

startBtn.addEventListener('click', () => {
    if (inGame == false ) {
        gameLogic.displayBoard();
        gameLogic.startGame(player1, player2);
        gameLogic.resetBoard();
    } else {
        console.log('Game Is Ongoing');
    }
    inGame = true;
    console.log(inGame);
});

const playerFactory = (name, score) => {
    const playerScore = 0;
    const playerMark = [[],[],[]];
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore, playerMark};
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2')


// const g = cellblock.find(cell => cell.dataset.location == 5);
console.log(cellblock);