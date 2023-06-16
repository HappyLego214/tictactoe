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
                })
           }); 
        for(let i = 0; i < 3; i++) {
            arr.push(arr.splice(0, 3));
        }
        console.log(arr);
        }
    }

    function _startRound(player1, player2) {
        let picker = true;
        for(let i = 0; i < 9; i++) {
            if (picker == true) {
                const location = prompt(`${player1} | Place Your Marker: `);
                console.log(`${player1} | Marker Placed At ${location}`);
                picker = false;
            } else {
                const location = prompt(`${player2} | Place Your Marker: `);
                console.log(`${player2} | Marker Placed At ${location}`);
                picker = true;
            }
            console.log(picker);
        }
    }

    // function _checkEach(arr) {
    //     arr.forEach(item => {
    //         console.log(item);
    //     });
    // }

    return {
        displayBoard: function() {
            gameboard.arr = gameboard.createBoard(x,y);
        },

        checkFunction: function() {
            _startRound(player1.getName(), player2.getName());
        }
    }

})();

const playerFactory = (name, score) => {
    const getName = () => name;
    const getScore = () => score;
    return {getName, getScore};
}

const player1 = playerFactory('Player-1');
const player2 = playerFactory('Player-2')


startGame.displayBoard();
// startGame.checkFunction();
