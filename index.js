//OBJECTS ------------------------------------------------
let game = {};


//DOM ELEMENTS
const gameboardDiv = document.getElementById('gameboard');

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
    let board = [];

    return {board}
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
    
    if (!game.board[squareIndex]){
        game.board[squareIndex] = 'X';
        square.textContent = 'X';
    }
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

}

initializeGame();

