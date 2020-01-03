const EASY = 10;
const MEDIUM = 15;
const HARD = 20;
let gScore = 0;

let [gameBoard, blankTile] = generateBoard(3);

//Generates a board of size n^2
//Generates the board and stores it in Gameboard.
//Stores the coordinates of the blank tile in blankTile. 
function generateBoard(n) {
    let board = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(i * n + j);
        }
        board.push(row);
    }
    return [board, [n-1,n-1]];
}

//Finds all neighbors of the blank tile and returns an array of their indices
function findBlankNeighbors(board) {
    let neighbors = [];
    //Above
    if (blankTile[0] !== 0) {
        let coords = [blankTile[0] - 1, blankTile[1]];
        neighbors.push(coords);
    }
    //Left
    if (blankTile[1] !== 0) {
        let coords = [blankTile[0], blankTile[1] -1];
        neighbors.push(coords);
    }
    //Right
    if (blankTile[1] !== board.length -1) {
        let coords = [blankTile[0], blankTile[1] + 1];
        neighbors.push(coords);
    }
    //Below
    if (blankTile[0] !== board.length - 1) {
        let coords = [blankTile[0] + 1, blankTile[1]];
        neighbors.push(coords);
    }
    return neighbors;
}

//Swaps a given tile with the blank tile
//Updates the board
//Updates coordinates of the blank tile
function swap(tile, shuffling=false) {
    let tempText = gameBoard[tile[0]][tile[1]];
    let tempIndex = tile;
    let blankText = gameBoard[blankTile[0]][blankTile[1]];
    let blankIndex = blankTile;

    gameBoard[blankIndex[0]][blankIndex[1]] = tempText;
    gameBoard[tempIndex[0]][tempIndex[1]] = blankText;
    blankTile = tempIndex;
    
    if (!shuffling) {
        gScore += 1;
    }
}


//Calculates the sum of the heuristic scores of all the tiles on the board
function calculateH(board) {
    let totalH = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let hScore = calculateManhattenDistance(i, j, board);
            totalH += hScore;
        }
    }
    return totalH;
};

//Using manhatten distance (estimate of how many moves away each tile is from the solved state) as our heuristic function. 
function calculateManhattenDistance(row, column, board) {
    //Do not count manhatten distance for blank tiles position
    if (row === blankTile[0] && column === blankTile[1]) {
        return 0;
    }
    //Return 0 if tile is already in its solved position
    else if (board[row][column] === (row * board.length + column)) {
        return 0;
    } 
    //Return how many moves away tile is from its solved position
    //Tile can only move vertically or horizontally, not diagonally
    else {
        let tileText = gameBoard[row][column];
        let tileSolvedIndex = [Math.floor(tileText/gameBoard.length), tileText % gameBoard.length];
        let distance = Math.abs(row - tileSolvedIndex[0]) + Math.abs(column - tileSolvedIndex[1]);
        return distance;
    }
}

//This function will shuffle the board by moving tiles until a certain level of difficulty (hScore) is reached
function shuffle(board, difficulty) {
    let hScore = 0;

    while (hScore < difficulty) {
        let neighbors = findBlankNeighbors(gameBoard);
        let randomIndex = Math.floor(Math.random() * Math.floor(neighbors.length));
        swap(neighbors[randomIndex]);
        hScore = calculateH(gameBoard);
    }
    console.log(gameBoard);
};

// function solvePuzzle(gameBoard) {
//     let hScore = calculateH(gameBoard);
    
// }





//Kicks off the solve algo by initializing the starting node and passing it into the aStarSolver func
// function solve(board) {
//     let gScore = 0;
//     let hScore = calculateH(board);
//     let neighbors = findNeighbors(board);
//     let prev = null;
//     let state = board.slice();
    
//     let startNode = {
//         gScore,
//         hScore,
//         fscore: gScore + hScore,
//         neighbors,
//         state,
//         prev
//     }
    
//     return aStarSolver(startNode);
// }

// //Solver Logic in here
// function aStarSolver(startNode) {
//     let openSet = new PriorityQueue();
//     openSet.enqueue(startNode);
//     let closedSet = {};
//     let openSetStates = {};
//     openSetStates[startNode.state] = true;

//     while (openSet.items.length != 0) {
//         console.log('openSet',openSet);
//         let curr = openSet.dequeue();
//         console.log('curr', curr);
//         if (checkIfSolved(curr.state)) {
//             console.log('SOLVED');

//         }
//         let neighborNodes = processNeighbors(curr, closedSet, openSetStates);
//         console.log(neighborNodes);
//         for (let i=0; i< neighborNodes.length; i++){
//            openSet.enqueue(neighborNodes[i]);
//            openSetStates[neighborNodes[i]] = true;
//         }
//         console.log('openset after enqueue', openSet);
//         closedSet[curr.state] = true;
//     }

// }

// function processNeighbors(curr, closedSet, openSetStates){
//     let nodes = [];
//     curr.neighbors.forEach(neighbor => {
//         state = hypotheticalSwapState(neighbor, curr.state);
//         gScore = curr.gScore + 1;
//         hScore = calculateH(state);
//         neighbs = findNeighbors(state);

//         let node = {
//             state, 
//             gScore,
//             hScore,
//             fScore: gScore + hScore,
//             prev: curr,
//             neighbors: neighbs
//         }
//         if (!closedSet[state] && !openSetStates[state]) {
//             nodes.push(node);
//         }
//     })
//     return nodes;
// };















