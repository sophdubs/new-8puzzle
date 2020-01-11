//Hacker mode 
const hackerButton = document.querySelector('.hacker-button');
hackerButton.addEventListener('click', activateHackerMode);

let title = document.querySelector('.title');
let movesDiv = document.querySelector('.move-count');
let timerBorder = document.querySelector(".timer");
let leaderboardEasy = document.querySelector('.leaderboard-easy');
let leaderboardMedium = document.querySelector('.leaderboard-medium');
let leaderboardHard = document.querySelector('.leaderboard-hard');
let leaderboardTitle = document.querySelector('.lb-h1');
let psSection = document.querySelector('.ps-section');
let bod = document.querySelector('body');
let tiles = document.querySelectorAll('.tile');

function activateHackerMode() {
    resetGame(3);
    let active;
    //Change a bunch of style
    if (hackerButton.classList.contains('clicked')) {
        hackerButton.classList.remove('clicked');
        hackerButton.innerHTML = "super secret hacker mode";
        pauseResume.classList.remove('click-here');
        active = false;
        hackerMode = false;
    } else {
        hackerButton.classList.add('clicked');
        hackerButton.innerHTML = "go back to normal"; 
        active = true;
        hackerMode = true;
    }
    hackerBackground(active);
    hackerTitle(active);
    hackerTiles(active);
    hackerBorders(active);
    hackerButtons(active);
}

function hackerBackground(active) {
    if (active) {
        page.classList.add('hacker-background-color');
        bod.style.background = "black";
    } else {
        page.classList.remove('hacker-background-color');
        bod.style.background = "#edb531";
    }
}

function hackerTitle(active) {
    if (active) {
        title.classList.add('hacker-title');
        leaderboardTitle.classList.add('hacker-title');
        psSection.classList.add('hacker-ps');
    } else {
        title.classList.remove('hacker-title');
        leaderboardTitle.classList.remove('hacker-title');
        psSection.classList.remove('hacker-ps');
    }
}

function hackerTiles(active) {
    let tiles = document.querySelectorAll('.tile');
    if (active) {
        console.log(tiles);
        tiles.forEach(tile => {
            tile.classList.add('hacker-tiles');
            
        });
    } else {
        tiles.forEach(tile => {
            tile.classList.remove('hacker-tiles');
           
        });
    }
}

function hackerBorders(active) {
    if (active) {
        page.classList.add('hacker-border-fuchsia');
        puzzleContainer.classList.add('hacker-outline-green');
        leaderboardEasy.classList.add('hacker-outline-green');
        leaderboardMedium.classList.add('hacker-outline-fuchsia');
        leaderboardHard.classList.add('hacker-outline-green');
    } else {
        page.classList.remove('hacker-border-fuchsia');
        puzzleContainer.classList.remove('hacker-border-green');
        leaderboardEasy.classList.remove('hacker-outline-green');
        leaderboardMedium.classList.remove('hacker-outline-fuchsia');
        leaderboardHard.classList.remove('hacker-outline-green');

    }
}

function hackerButtons(active) {
    if(active) {
        startEasyButton.classList.add('hacker-easy');
        startMediumButton.classList.add('hacker-medium');
        startHardButton.classList.add('hacker-hard');
        pauseResume.classList.add('hacker-solve');
        movesDiv.classList.add('hacker-count');
        timerBorder.classList.add('hacker-timer');
        sortButton.classList.add('hacker-sort-button');
    } else {
        startEasyButton.classList.remove('hacker-easy');
        startMediumButton.classList.remove('hacker-medium');
        startHardButton.classList.remove('hacker-hard');
        pauseResume.classList.remove('hacker-solve');
        movesDiv.classList.remove('hacker-count');
        timerBorder.classList.remove('hacker-timer');
        sortButton.classList.remove('hacker-sort-button');
    }
}

//This is not perfect.. try to fix it later. 
function clickHereButton() {
    pauseResume.classList.add('click-here');
    pauseResume.innerHTML = "click";
}




