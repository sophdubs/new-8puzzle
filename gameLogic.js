const EASY = 10;
const MEDIUM = 15;
const HARD = 20;

//Find Neighbors
//Finds all neighbors of the blank tile and returns an array of their indices
function findBlankNeighbors(board, blank) {
    let neighbors = [];
    //Above
    if (blank[0] !== 0) {
        let coords = [blank[0] - 1, blank[1]];
        neighbors.push(coords);
    }
    //Left
    if (blank[1] !== 0) {
        let coords = [blank[0], blank[1] -1];
        neighbors.push(coords);
    }
    //Right
    if (blank[1] !== board.length -1) {
        let coords = [blank[0], blank[1] + 1];
        neighbors.push(coords);
    }
    //Below
    if (blank[0] !== board.length - 1) {
        let coords = [blank[0] + 1, blank[1]];
        neighbors.push(coords);
    }
    return neighbors;
}

//Shuffle
//This function will shuffle the board by moving tiles until a certain level of difficulty (hScore) is reached
function shuffle(board, difficulty) {
    let hScore = 0;
    while (hScore < difficulty) {
        let neighbors = findBlankNeighbors(gameBoard, blankTile);
        let randomIndex = Math.floor(Math.random() * Math.floor(neighbors.length));
        swap(neighbors[randomIndex], true);
        hScore = calculateH(gameBoard, blankTile);
    }
};

//Swap
//Swap given tile with blankTile
//Increase gScore
function swap(tile, ignoreGScore=false) {
    let tempText = gameBoard[tile[0]][tile[1]];
    let tempIndex = tile;
    let blankText = gameBoard[blankTile[0]][blankTile[1]];
    let blankIndex = JSON.parse(JSON.stringify(blankTile));

    gameBoard[blankIndex[0]][blankIndex[1]] = tempText;
    gameBoard[tempIndex[0]][tempIndex[1]] = blankText;
    blankTile = tempIndex;
    
    if (!ignoreGScore) {
        gScore += 1;
    }

    updateTilePositions();
    
}

function updateTilePositions() {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[0].length; j++) {
            let tile = document.getElementById(gameBoard[i][j]);
            let gridArea = String.fromCharCode(i * gameBoard.length + j + 97);
            if (tile.style.gridArea !== gridArea) {
                tile.style.gridArea = gridArea;
            }
        }
    }
}