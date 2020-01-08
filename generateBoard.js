//Generate board
let [gameBoard, blankTile] = generateBoard(3);
// adjustStyles(n);

//Generates a board of size n^2
//Generates the board and stores it in Gameboard.
//Stores the coordinates of the blank tile in blankTile. 
function generateBoard(n) {
    //Update style to generate board with n*n tiles
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

function adjustStyles(n) {
    document.documentElement.style.setProperty("--numRows", n);
    document.querySelector('.container').style.gridTemplateAreas = layouts[n];
}

let layouts = {
    1:'"1"',
    2:'"1" "2"',
    3:'"one two tree" "four five six" "seven eight nine"',
    4:'"0 1 2 3" "4 5 6 7" "8 9 10 11" "12 13 14 15"',
    5:'"0 1 2 3 4" "5 6 7 8 9" "10 11 12 13 14" "15 16 17 18 19" "20 21 22 23 24"'
}
// var template3 = '"0 1 2" "3 4 5" "6 7 8"';