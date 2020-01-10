const page = document.querySelector('#page');
let modal = document.querySelector('.modal');

function showModal(){
    modal.classList.remove('modal-no-show');
    modal.classList.add('modal-show');
    page.classList.add('modal-open');
}

let modalCloseButton = document.querySelector('.modal-close');
modalCloseButton.addEventListener('click', closeModal);

function closeModal() {
    if (hackerMode) {
        activateHackerMode()
    }
    resetGame(3);
    modal.classList.add('modal-no-show');
    modal.classList.remove('modal-show');
    page.classList.remove('modal-open');
}

const modalForm = document.querySelector('.modal-form');
modalForm.addEventListener('submit', handleModalSubmit);

function handleModalSubmit(e) {
    e.preventDefault();
    let name = e.target.name.value;
    let time = timerText.innerHTML;
    let moves = moveCounter.innerHTML;

    db.collection(difficulty).add({
        name: name,
        moves: moves,
        time: time
    })
    .then(() => {
        fetchLeaderboard(difficulty);
        closeModal()
    });
}

