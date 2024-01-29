/*let openModifyModal = document.getElementById("modify-btn");

openModifyModal.addEventListener("click", () => {
    dialog.showModal();
})*/
let modal = null;

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = null;
    target.removeAttribute('aria-hidden', false);
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    target.style.display = none;
    target.setAttribute('aria-hidden', 'true');
    target.removeAttribute('aria-modal');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

const linkOpenModal = document.querySelector("open-modal")(a => {
    a.addEventListener("click", openModal);
});

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape") {
        closeModal(e);
    }
})