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

    function _startRound(player1, player2) {
        let picker = true;
        console.log(gameboard.arr);
        for(let i = 0; i < 9; i++) {
            if (picker == true) {
                let name = player1.getName();
                const location = prompt(`${name} | Place Your Marker: `);
                console.log(`${name} | Marker Placed At ${location}`);
                player1.markGrid(location);
                picker = false;
            } else {
                let name = player2.getName();
                const location = prompt(`${name} | Place Your Marker: `);
                console.log(`${name} | Marker Placed At ${location}`);
                player2.markGrid(location);
                picker = true;
            }
        }
    }

    function _winConditions(arr) {

    }   

    return {
        displayBoard: function() {
            gameboard.arr = gameboard.createBoard(x,y);
        },

        checkFunction: function() {
            _startRound(player1, player2);
        }
    }

})();

const playerFactory = (name, score, arr) => {
    let playerMark = [[],[],[]];
    const markGrid = location => {
        if (location <= 3) {
            console.log(playerMark[0])
        } else if (location <= 6) {
            console.log(playerMark[1])
        } else if (location <= 9) {
            console.log(playerMark[2])
        }
    }
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore, markGrid, playerMark};
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2')


// player1.getName();
startGame.displayBoard();
startGame.checkFunction(player1, player2);