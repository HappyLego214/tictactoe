const prompt = require('prompt-sync')();

// const askName = prompt('What Is Your Name? : ');
// console.log(`Hello There ${askName}!`);

const startGame = (() => {
    
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
            console.log('Error');
            return checkWin = false;
}
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
        let firstCheck = [2,2,2];
        let secondCheck = [0,2,4]
        let index = indStart;
        
                arr.forEach(element => {
                        seq.push(element.find(item => item == index));
                        index += indInc;

                });

        return seq.every(item => firstCheck.includes(item) || secondCheck.includes(item));

     }

    function _startRound(player1, player2) {
        let picker = true;
        let checkWin = false;
        let avail = true;
        let arrRound = gameboard.arr;

        for (let i = 0; i < 9; i++) {
            if (picker == true) {
                do {
                    let name = player1.getName();

                    const location = prompt(`${name} | Place Your Marker: `);
                    console.log(`${name} | Marker Placed At ${location}`);

                    avail = _markGrid(location, arrRound, player1, player2, avail);
                    checkWin = _winConditions(player1, checkWin);
                    console.log(player1.playerMark)
                    console.log(checkWin);

                        if (checkWin == true) {
                            i = 10;
                            console.log('You Won The Game!');
                            player1.playerScore = 1;
                            console.log(player1.playerScore)
                            checkWin = false;
                        } 

                } while (avail == true);
                picker = false;

            } else {
                do {                    
                    let name = player2.getName();

                    const location = prompt(`${name} | Place Your Marker: `);
                    console.log(`${name} | Marker Placed At ${location}`);

                    avail = _markGrid(location, arrRound, player2, player1, avail);

                    checkWin = _winConditions(player2, checkWin);
                    console.log(player2.playerMark)
                    console.log(checkWin);

                    if (checkWin == true) {
                        i = 10;
                        console.log('You Won The Game!');
                        player2.playerScore = 1;
                        console.log(player2.playerScore)
                    }

                } while (avail == true);
                picker = true;
            }
        }
    }

    return {
        displayBoard: function() {
            gameboard.arr = gameboard.createBoard(x,y);
        },

        checkFunction: function() {
            _startRound(player1, player2, gameboard.arr);
        }
    }

})();

const playerFactory = (name, score) => {
    const playerScore = 0;
    const playerMark = [[],[],[]];
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore, playerMark};
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2')

// player1.getName();
startGame.displayBoard();
startGame.checkFunction(player1, player2);