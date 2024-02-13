/*let openModifyModal = document.getElementById("modify-btn");

openModifyModal.addEventListener("click", () => {
    dialog.showModal();
})*/

// Importation des images des travaux de l'API
let apiWorks = await fetch("http://localhost:5678/api/works");
let worksList = await apiWorks.json();

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];

// Fonction d'ouverture de la modale 1
const openModal = function (e, a) {
    e.preventDefault();
    modal = document.querySelector(a.getAttribute('href'));
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden');

    for (let i = 0; i < worksList.length; i++) {
        
        createModalWorks(worksList[i]);
        
    }
}

/////Fonction de suppression des projets
async function deleteWork (id) {
    
    const apiWorksDelete = await fetch("http://localhost:5678/api/works/{id}", {
        method: "DELETE",
        headers: {},
        body: JSON.stringify({"id": workId})
        },
    )}

    for (let i = 0; i < worksList.length; i++) {
        const deleteBtn = document.querySelector("modal1-delete-icon");
        deleteBtn.addEventListener("click", (id) {
            vdfgdg
        })
    }


////// Création des travaux dans la fenêtre modale 1 //////
async function createModalWorks (work) {

    // Images des travaux
    const imgWorks = work.imageUrl;
    const modalWorkImage = document.createElement("img");
    modalWorkImage.src = imgWorks;
    modalWorkImage.classList.add("modal1-img-work");

    // Icône de suppression des travaux
    const modalDeleteIcon = document.createElement("i");
    modalDeleteIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs", "modal1-delete-icon");

    // Gestion des conteneurs //
    const modalWorksGalleryContainer = document.getElementById("modal1-works-gallery");
    const modalWorkElement = document.createElement("div");
    modalWorkElement.classList.add("modal1-work-element")

    modalWorkElement.appendChild(modalWorkImage); 
    modalWorkElement.appendChild(modalDeleteIcon);
    modalWorksGalleryContainer.appendChild(modalWorkElement);

    // Grâce aux DataSet identifier les icônes correspondants aux travaux pour les supprimer
}




const openModal2 = function (e,a) {


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

// Gestion des touches clavier pour la navigation
window.addEventListener('keydown', function (e) {
    //Gestion de la touche Echap dans la navigation de la modale
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    // Gestion des Tab dans la navigation dans la modale
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})
