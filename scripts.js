const prompt = require('prompt-sync')();

// const askName = prompt('What Is Your Name? : ');
// console.log(`Hello There ${askName}!`);

const startGame = (() => {
    
    let x = 3;
    let y = 3;
    let gameboard = 
    {
        arr: [],
        createBoard: function(columns, rows) {
            arr = Array.from(Array(columns),() => new Array(rows));
            return arr;
        }
    }

    function _startRound(player1, player2) {
        let picker = true;
        for(let i = 0; i < 9; i++) {
            if (picker == true) {
                const location = prompt('P1 | Place Your Marker: ');
                console.log(`P1 | Marker Placed At ${location}`);
                picker = false;
            } else {
                const location = prompt('P2 | Place Your Marker: ');
                console.log(`P2 | Marker Placed At ${location}`);
                picker = true;
            }
            console.log(picker);
        }
    }

    return {
        displayBoard: function() {
            gameboard.arr = gameboard.createBoard(x,y);
            console.log(gameboard.arr);
        },

        checkFunction: function() {
            _startRound();
            console.log('check');
        }
    }



})();

const playerFactory = (name) => {
    const getName = () => name;

    const placeMarker = position => {

    }

    return {getName}
}

const player1 = playerFactory('player-1');
const player2 = playerFactory('player-2')

startGame.displayBoard();
startGame.checkFunction();
