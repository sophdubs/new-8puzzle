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
    if (pauseResume.innerHTML === 'PAUSE') {
        timer(Date.now(), true);
        pauseResume.innerHTML = 'RESUME';
    } else {
        pauseResume.innerHTML = 'PAUSE';
        timer(Date.now());
    }
    puzzleContainer.classList.toggle('paused');
}

//moves counter
let moveCounter = document.querySelector('.move-counter');
function updateMoveCounter() {
    moveCounter.innerHTML= gScore;
}

//leaderboards



