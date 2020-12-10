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
    const updateWhosNext = () => {
        movesLeft = movesLeft - 1 ;
    }
    let board = [];
    let movesLeft = 9;

    return {board, whosTurnItIs, updateWhosNext}
}

const playerFactory = (mark) => {
    let moves = []; // will store gameboard indexes where its mark is placed
    const updateMoves = (markIndex) => moves.push(markIndex); //MIGHT NEED TO SORT IT IN ORDER TO MATCH WINNING CONDITIONS
    return {mark, updateMoves}
}


// FUNCTIONS ---------------------------------------------------------------------------

/**
 * Whenever a square is clicked, it should display a mark and update the gameboard
 * to reflect that it is selected
 * 
 * @param {Node} square where mark is going to appear
 */
function selectSquare(square){
    const squareIndex = square.dataset.gameboardIndex;
    let whoPlays = game.whosTurnItIs();
    let mark = whoPlays === 'Player 1' ? `${playerOne.mark}` : `${playerTwo.mark}`

    if (!game.board[squareIndex]){
        makeMove(square, mark, squareIndex);
        updatePlayerMoves(whoPlays, squareIndex);
        // check if winner
        updateWhosNext();


    }
}


/**
 * every move a player makes needs to be logged into its personal moves array
 * 
 */
function updatePlayerMoves(whoPlayed, markIndex){
    if (whoPlayed === 'Player 1') {
        playerOne.updateMoves(markIndex);
    } else {
        playerTwo.updateMoves(markIndex);
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
}


/**
 * After each move, turn indicator should be updated to indicate who's next
 * and to allow proper marks to appear on board
 */
function updateWhosNext(){
    game.updateWhosNext() ;
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
 * each square will have a data- attribute with its position within the gameboard
 * that will bind it with its corresponding gameboard index, in order to update that
 * value when clicked
 * @param {int} squarePosition in the gameboard
 */
function setSquareDataAttributes(square, squarePosition){
    square.dataset.gameboardIndex = `${squarePosition}`;
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


