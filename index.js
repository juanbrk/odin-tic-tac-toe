//OBJECTS ------------------------------------------------
let game = {};


//DOM ELEMENTS
const gameboardDiv = document.getElementById('gameboard');
const turnIndicator = document.getElementById('who-plays');

//Factory functions

/**
 * 
 */
const squareFactory = () => {
    const square = document.createElement('div');
    square.classList.add("square", "text-center");
    square.addEventListener('click', element => selectSquare(element.currentTarget));
    return square;
}

const gameFactory = () => {
    const whosTurnItIs = () => movesLeft%2=== 0 ? 'Player 2' : 'Player 1';
    const updateMovesLeft = () => {
        movesLeft = movesLeft - 1 ;
    }
    const checkIfPlayerWon = (player) => {
        let playerWon = false;

        if (movesLeft <= 4) { // Only after 4 turns a game can be won
            const playerRowMoves = player.rowMoves;
            const playerColMoves = player.colMoves;
    
            const rowWin = playerRowMoves.indexOf(3) != -1;
            const colWin = playerColMoves.indexOf(3) != -1;
            const diagonalWin = playerRowMoves.every(rowValue => rowValue == 1) &&
                    playerColMoves.every(colValue => colValue == 1);

            playerWon = rowWin || colWin || diagonalWin ;
        } 

        return playerWon;
    }


    let board = [];
    let movesLeft = 9;

    return {board, whosTurnItIs, updateMovesLeft, checkIfPlayerWon}
}

const playerFactory = (mark) => {
    let rowMoves = [0,0,0]; 
    let colMoves = [0,0,0];
    const updateMoves = (rowCoordinate, columnCoordinate) =>{
        rowMoves[rowCoordinate]++;
        colMoves[columnCoordinate]++;
    } ; 
    return {mark, updateMoves, rowMoves, colMoves}
}


// FUNCTIONS ---------------------------------------------------------------------------

/**
 * Whenever a square is clicked, it should display a mark and update the gameboard
 * to reflect that it is selected
 * 
 * @param {Node} square where mark is going to appear
 */
function selectSquare(square){
    const squareIndex = square.dataset.gameboardIndex; // index to update gameboard array

    // This helps to determine a winner
    const squareColumnCoordinate = Number(square.dataset.column);
    const squareRowCoordinate = Number(square.dataset.row);

    let whoPlays = game.whosTurnItIs();
    let mark = whoPlays === 'Player 1' ? `${playerOne.mark}` : `${playerTwo.mark}`

    if (!game.board[squareIndex]){
        makeMove(square, mark, squareIndex);
        updatePlayerMoves(whoPlays, squareRowCoordinate, squareColumnCoordinate);
        // check if winner
        const playerWon = checkIfWinner(whoPlays);
        if(!playerWon){
            updateWhosNext();
        } else {
            //Player WON
            alert(`${whoPlays} WINS!`);
            //Finish game
        }
    }
}

/**
 * After every player move, check if player wins
 * 
 * @param {String} whoPlayed 
 */
function checkIfWinner(whoPlayed){
    let playerWon = false;
    if (whoPlayed === 'Player 1') {
        playerWon = game.checkIfPlayerWon(playerOne);
    } else {
        playerWon = game.checkIfPlayerWon(playerTwo);
    }

    return playerWon;
}


/**
 * every move a player makes needs to be logged into its personal moves array
 * 
 */
function updatePlayerMoves(whoPlayed, rowCoordinate, columnCoordinate){
    if (whoPlayed === 'Player 1') {
        playerOne.updateMoves(rowCoordinate, columnCoordinate);
    } else {
        playerTwo.updateMoves(rowCoordinate, columnCoordinate);
    }
}

/**
 * If a square is empty, print player's mark inside it, update gameboard
 * and update who will play next
 * 
 * @param {String} mark that will be go inside the selected square
 */
function makeMove(selectedSquare, mark, gameBoardIndex){
    game.board[gameBoardIndex] = mark;
    selectedSquare.textContent = mark ;
    game.updateMovesLeft() ;

}


/**
 * After each move, turn indicator should be updated to indicate who's next
 * and to allow proper marks to appear on board
 */
function updateWhosNext(){
    let whoPlays = game.whosTurnItIs();
    turnIndicator.textContent = whoPlays;
}



/**
 * Depending on the square position, different classes will be added 
 * to the element
 * @param {int} position of the square in the gameboard
 */
function determineClassesToAdd(position){
    let classNames = [];
    switch (position) {
        case 1:
        case 7:
            classNames = ["right", "left"];
            break;
        case 4:
            classNames = ["top", "bottom", "left", "right"];
            break;
        case 3: 
        case 5:
            classNames = ["top", "bottom"];
            break;
        default:
            break;
    }
    return classNames;
}


/**
 * The board is made up of 9 squares
 */
function renderBoard(){
    // create board squares
    for (let i = 0; i < 9; i++) {
        const square = squareFactory();
        const classesToAdd = determineClassesToAdd(i);
        addClassesToSquare(square, classesToAdd);
        setSquareDataAttributes(square, i);
        gameboardDiv.appendChild(square);
    }
}

/**
 * each square will have two  data- attributes with its row and column coordinates inside 
 * the gameboard that will be useful when player selects the square
 * @param {int} squarePosition in the gameboard
 */
function setSquareDataAttributes(square, squarePosition){
    
    square.dataset.gameboardIndex = `${squarePosition}`;
    square.dataset.row = setRowAttribute(squarePosition);
    square.dataset.column = setColAttribute(squarePosition);
}

/**
 * Every square will have a data-column attribute that refers to its column inside
 * the gameboard matrix
 * 
 * @param {*} markCoordinate 
 */
function setColAttribute(markCoordinate){
    let firstCol = [0,3,6];
    let secondCol = [1,4,7];
    let thirdCol = [2,5,8];
    let colAttribute = '';

    if (firstCol.indexOf(markCoordinate) != -1) {
        colAttribute = '0';
    }

    if (secondCol.indexOf(markCoordinate) != -1) {
        colAttribute = '1'
    };
    
    if (thirdCol.indexOf(markCoordinate) != -1) {
        colAttribute = '2'
    };

    return colAttribute;

}

/**
 * Every square will have a data-row attribute that refers to its row inside
 * the gameboard matrix
 * @param {*} markCoordinate 
 */
function setRowAttribute(markCoordinate){
    //set row
    let rowAttribute = '';

    if (markCoordinate < 3) { // First row
        rowAttribute = '0';
    } 
    
    if (markCoordinate >= 3 && markCoordinate < 6){
        rowAttribute = '1';
    }

    if (markCoordinate >= 6){
        rowAttribute = '2';
    }

    return rowAttribute;

}


/**
 * 
 * @param {Node} square 
 * @param {Array} classes to add to square
 */
function addClassesToSquare(square, classes){
    for (let i = 0; i < classes.length; i++) {
        square.classList.add(`${classes[i]}`);
    }
}

function initializeGame(){
    renderBoard();
    game = gameFactory();
    playerOne = playerFactory('X');
    playerTwo = playerFactory('O');

    turnIndicator.textContent = game.whosTurnItIs();

}

initializeGame();


