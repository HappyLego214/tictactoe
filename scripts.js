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

    function _markGrid(location, arr, player, avail) {
        if (location <= 3) {
            let target = arr[1][location - 1];
            let hit = player.playerMark[0];
            if (hit.length >= 3) {
                console.log('Slot Already Marked')
               return avail = true;
            } else {
                console.log(target);

                hit.push(target);
    
                console.log(hit);
                return avail = false;
            }

        } else if (location <= 6 && location > 3) {
            let target = arr[1][location - 4];
            let hit = player.playerMark[1];
            if (hit.length >= 3) {
                console.log('Slot Already Marked')
                return avail = true;
            } else {
                console.log(target);

                hit.push(target);
    
                console.log(hit);
                return avail = false;
            }

        } else if (location <= 9 && location > 6) {
            let target = arr[1][location - 7];
            let hit = player.playerMark[2];
            if (hit.length >= 3) {
                console.log('Slot Already Marked')
                return avail = true;
            } else {
                console.log(target);

                hit.push(target);
    
                console.log(hit);
                return avail = false;
            }

        } else {
            console.log('Error!');
        }
    }


    function _startRound(player1, player2) {
        let picker = true;
        let avail = true;
        let arrRound = gameboard.arr;
        for(let i = 0; i < 9; i++) {
            if (picker == true) {
                do {
                    let name = player1.getName();
                    const location = prompt(`${name} | Place Your Marker: `);
                    console.log(`${name} | Marker Placed At ${location}`);
                    avail = _markGrid(location, arrRound, player1, avail);
                    console.log(avail);
                } while (avail == true);
                picker = false;
            } else {
                do {
                    let name = player2.getName();
                    const location = prompt(`${name} | Place Your Marker: `);
                    console.log(`${name} | Marker Placed At ${location}`);
                    _markGrid(location, arrRound, player2);
                    console.log(avail);
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