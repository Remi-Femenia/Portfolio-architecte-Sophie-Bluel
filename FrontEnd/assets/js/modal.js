import { fetchWorks } from './script.js';
import { fetchCategories } from './script.js';

///////////////////////////////////////////////////////////////////////
/////////////////////////////// MODALES ///////////////////////////////
///////////////////////////////////////////////////////////////////////


/////////////////////////////// GENERAL ///////////////////////////////

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];


// ID de l'utilisateur
const userId = window.localStorage.getItem("userId");


/////////////////////////////// MODALE 1 ///////////////////////////////

// Importation des images des travaux de l'API
/*let apiWorks = await fetch("http://localhost:5678/api/works");
let worksList = await apiWorks.json();*/


// Fonction d'affichage des modales //
const openModal = async function (event, element) {

    event.preventDefault();
    modal = document.querySelector(element.dataset.open);
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden');
    document.getElementById("modal1-works-gallery").innerHTML = "";

    /*for (let i = 0; i < worksList.length; i++) {
        createModalWorks(worksList[i]);
    }*/

    if (modal.id === "modal1") {
        const works = await fetchWorks();
        works.forEach(createModalWorks);
    }

    deleteEvent();

}

////// Création des images des travaux dans la fenêtre modale 1 //////
async function createModalWorks (work) {

    // Images des travaux
    const imgWorks = work.imageUrl;
    const modalWorkImage = document.createElement("img");
    modalWorkImage.src = imgWorks;
    modalWorkImage.classList.add("modal1-img-work");

    // Icône de suppression des travaux
    const modalDeleteIcon = document.createElement("i");
    modalDeleteIcon.classList.add("fa-solid", "fa-trash-can", "fa-xs", "modal1-delete-icon");
    modalDeleteIcon.dataset.id = work.id;

    // Gestion des conteneurs //
    const modalWorksGalleryContainer = document.getElementById("modal1-works-gallery");
    const modalWorkElement = document.createElement("div");
    modalWorkElement.classList.add("modal1-work-element")

    modalWorkElement.appendChild(modalWorkImage); 
    modalWorkElement.appendChild(modalDeleteIcon);
    modalWorksGalleryContainer.appendChild(modalWorkElement);

}

// Fonction de suppression des projets
async function deleteWork (id) {

    const apiWorksDelete = await fetch("http://localhost:5678/api/works/" + id, {
        
        method: "DELETE",
        body: JSON.stringify({"userId": userId})

    },

)}

// Fonction de suppression des travaux dans l'API
function deleteEvent () {

    const deleteBtn = document.querySelectorAll(".modal1-delete-icon");

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", () => {
        deleteWork(deleteBtn[i].dataset.id);
         })
    }

    const modalWorksGallery = document.getElementById("modal1-works-gallery");
    modalWorksGallery.innerHTML = "";

    for (let i = 0; i < worksList.length; i++) { 

        createModalWorks(worksList[i]);

    }

    // Rechargement de la gallery du portfolio
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    for (let i = 0; i < worksList.length; i++) {  
        createPortfolioItems(worksList[i]);
    }
}

/////////////////////////////// MODALE 2 ///////////////////////////////

// Fonctionnement de la flèche retour de la modale 2

const uploadedImg = document.getElementById("uploaded-photo");
const uploadingImgDiv = document.querySelector(".modal2--upload-photo-div");
const titleInput = document.getElementById("add-photo-form-title");
const selectCategory = document.getElementById("add-photo-form-categories");
const errorMessage = document.getElementById("fileSizeError");
const uploadInstructions = document.querySelector(".modal2--upload-conditions-txt");
const arrowLeft = document.getElementById("modal2-arrow-left");

arrowLeft.addEventListener("click", event => {
    event.preventDefault();
    openModal(event, arrowLeft);
    closeModal(event, arrowLeft);
})

// Validation du fichier utilisateur

function validateImageUpload () {
    const fileInput = document.getElementById("input-add-photos");
    
    fileInput.addEventListener("change", event => {
        const file = event.target.files[0];
        const imgUploaded = document.getElementById("uploaded-photo");
        const maxSize = 4 * 1024 * 1024;

        if (file.size <= maxSize) {
            imgUploaded.src = URL.createObjectURL(file);
            uploadingImgDiv.style.display = "none";
            console.log("Le fichier répond aux critères.")
        } else {
            uploadInstructions.style.display = "none";
            errorMessage.style.display = "block";
            console.log("Le fichier ne répond pas aux critères.")
        }

    })
}
validateImageUpload();


// Importation des catégories en tant que <option> du <select>

const categorySelect = document.getElementById("add-photo-form-categories");

// Fonction de vérification que tous les champs du formaulaire sont remplis

function areAllFormFieldsFilled () {

    const fields = document.querySelectorAll(".modal2__form-element");

    const allFilled = Array.from(fields).every(field => {

        if (field.type === "file") {

            return field.files.length > 0; // Remplacer les isValid par return une fois le débogage terminé

        } else if (field.tagName === "SELECT" || field.type === "text") {
            
            return field.value.trim() !== "";

        }

        return true

    });

    return allFilled;

}

const submitButton = document.getElementById("modal2--send-form-btn");

// Écouteurs d'événements pour vérifier les champs lors de la modification

const formFields = document.querySelectorAll(".modal2__form-element");
formFields.forEach(field => {

    field.addEventListener("change", toggleSubmitButton);
    field.addEventListener("keyup", toggleSubmitButton);
    
})

// Fonction pour activer ou désactiver le bouton d'envoi

function toggleSubmitButton() {

    submitButton.disabled = !areAllFormFieldsFilled();

}

submitButton.addEventListener("submit", event => {
    
    event.preventDefault();
    if (areAllFormFieldsFilled()) {
      
      // Ici, vous pouvez procéder à la soumission du formulaire ou à d'autres actions
    } else {

    }
});

  // Initialisation lors du chargement de la page
  document.addEventListener('DOMContentLoaded', toggleSubmitButton);


// Fermeture des modales
const closeModal = function (event, element) {
    event.preventDefault();
    modal = document.querySelector(element.dataset.close);
    modal.style.display = "none";

    if (modal.id === "modal2") {
        uploadingImgDiv.removeAttribute("style");
        uploadedImg.src = "";
        titleInput.value = "";
        selectCategory.selectedIndex = 0;
        errorMessage.removeAttribute("style");
        uploadInstructions.removeAttribute("style");

        if (submitButton) {
            submitButton.disabled = true;
        }
    }

}

// Stop propagation
const stopPropagation = function (element) {
    element.stopPropagation();
}

//// Élément d'ouverture de la modale
document.querySelectorAll('.js-modal').forEach(element => {
    element.addEventListener("click", event => openModal (event, element));
});

document.querySelectorAll('.js-modal-close').forEach(a => {
    a.addEventListener("click", e => closeModal (e, a));
});

document.querySelectorAll(".modal").forEach(a => {
    a.addEventListener("click", e => closeModal (e, a));
})

document.querySelectorAll(".js-modal-stop").forEach(element => {
    element.addEventListener("click", stopPropagation);
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
