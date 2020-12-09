//DOM ELEMENTS
const gameboardDiv = document.getElementById('gameboard');

//Factory functions

/**
 * 
 */
const squareFactory = () => {
    const square = document.createElement('div');
    square.classList.add("square", "text-center");
    return square;
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
        gameboardDiv.appendChild(square);
    }
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

renderBoard();

