/*let openModifyModal = document.getElementById("modify-btn");

openModifyModal.addEventListener("click", () => {
    dialog.showModal();
})*/

/// Importation des images des travaux de l'API
let apiWorks = await fetch("http://localhost:5678/api/works");
let works = await apiWorks.json();

let modal = null;


const openModal = function (e, a) {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    console.log(target);
    console.log(e.target);
    target.style.display = "flex";
    target.removeAttribute('aria-hidden');
}

const closeModal = function (e, a) {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    target.style.display = "none";
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

//// Élément d'ouverture de la modale
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", e => openModal (e, a));
});

document.querySelectorAll('.js-modal-close').forEach(a => {
    a.addEventListener("click", e => closeModal (e, a));
});

document.querySelectorAll(".modal").forEach(a => {
    a.addEventListener("click", e => closeModal (e, a));
})

document.querySelectorAll(".js-modal-stop").forEach(a => {
    a.addEventListener("click", stopPropagation);
})

//// Fermer la modale avec le bouton Esc
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})

//// Afficher les images des travaux à supprimer
