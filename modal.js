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