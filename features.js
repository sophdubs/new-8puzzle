//timer
let timerText = document.querySelector('.timer-text');
let t;
function timer(startTime, pause=false) {
    if (pause) {
        clearInterval(t);
    } else {
        let text = timerText.innerHTML.match(/(\d\d):(\d\d)/);
        let count = (parseInt(text[1]) * 60 + parseInt(text[2])) * 1000;
        t = setInterval(() => {
            let delta = (Date.now() - startTime) + count;
            let time = Math.floor(delta/1000);
            let minutes = Math.floor(time/60);
            let seconds = time % 60;
            let formattedMinutes = minutes >= 10 ? minutes.toString() : '0' + minutes.toString();
            let formattedSeconds = seconds >= 10 ? seconds.toString() : '0' + seconds.toString();
            timerText.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
        }, 1000); 
    }
}


//pause/resume
let pauseResume = document.querySelector('.pause-resume');
let puzzleContainer = document.querySelector('.container');
pauseResume.addEventListener('click', handlePauseResume);

function handlePauseResume() {
    if (hackerMode){
        solvePuzzle(gameBoard);
    }else if (pauseResume.innerHTML === 'PAUSE') {
        timer(Date.now(), true);
        pauseResume.innerHTML = 'RESUME';
        puzzleContainer.classList.toggle('paused');
    } else {
        pauseResume.innerHTML = 'PAUSE';
        timer(Date.now());
        puzzleContainer.classList.toggle('paused');
    }
}

//moves counter
let moveCounter = document.querySelector('.move-counter');
function updateMoveCounter() {
    moveCounter.innerHTML= gScore;
}


//DB STUFF
//leaderboards
let sortButton = document.querySelector('.sort-by-button');
sortButton.addEventListener('click', toggleSort);

firebase.initializeApp(fbConfig);
let db = firebase.firestore();

function fetchLeaderboard(diff) {
    let info = [];
    db.collection(diff).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            info.push(doc.data());
        })
    }).then(() => {
        updateLeaderboards(info, diff);
    }) 
}

function updateLeaderboards(arr, diff) {
    const lb = document.querySelector(`.${diff}-list`);
    lb.innerHTML = "";
    let sortedArr;
    if (sortButton.classList.contains('sbm')) {
        sortedArr = sortByMoves(arr);
        sortedArr.forEach(leader => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `${leader.name}<span class="right">${leader.moves}</span>`;
            lb.appendChild(listItem);
        })
    } else {
        sortedArr = sortByTime(arr);
        sortedArr.forEach(leader => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `${leader.name}<span class="right">${leader.time}</span>`;
            lb.appendChild(listItem);
        })
    }
}

function sortByMoves(arr) {
    sorted = arr.sort((a,b) => {
        return parseInt(a.moves) - parseInt(b.moves);
    });
    return sorted;
}

function sortByTime(arr) {
    sorted = arr.sort((a,b) =>{
        a = htmlToCount(a.time);
        b = htmlToCount(b.time);
        return a - b;
    });
    return sorted;
}



function toggleSort() {
    if (sortButton.classList.contains('sbm')) {
        sortButton.classList.remove('sbm');
        sortButton.classList.add('sbt');
        sortButton.innerHTML = "sort by time";
    } else {
        sortButton.classList.remove('sbt');
        sortButton.classList.add('sbm');
        sortButton.innerHTML = "sort by moves";
    }
    fetchLeaderboard('easy');
    fetchLeaderboard('medium');
    fetchLeaderboard('hard');
}

fetchLeaderboard('easy');
fetchLeaderboard('medium');
fetchLeaderboard('hard');



