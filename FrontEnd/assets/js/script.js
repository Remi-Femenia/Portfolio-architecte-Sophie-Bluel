let exemple = await fetch("http://localhost:5678/api/works");
let works = await exemple.json();

fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(categories => {
    for (let i = 0; i < categories.length; i++) {
        createCategorieProject(categories[i])
    }
})

const portfolioGallery = document.querySelector(".gallery");

for (let i = 0; i < works.length; i++) {
    createCardProject(works[i])
}

const btnTous = document.querySelector("#btn-tous");
btnTous.addEventListener("click", function (){
    
    portfolioGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        createCardProject(works[i]);
    }

})

// Fonction de création des éléments dans la galerie portfolio
function createCardProject (work) {

        // Création de la balise <img> avec récupération de l'élément
        const imageProject = document.createElement("img");
        imageProject.src = work.imageUrl;

        // Création de la balise <figcaption> avec récupération de l'élément
        const titleProject = document.createElement("figcaption");
        titleProject.innerText = work.title;

        // Éléments de la galerie
        const cardProject = document.createElement("figure");

        //Rattachement des balises <img> et <figcaption> à une balise <figure>
        cardProject.appendChild(imageProject);
        cardProject.appendChild(titleProject);
        portfolioGallery.appendChild(cardProject);

}

// Fonction servant à créer les boutons de filtre
function createCategorieProject (categorie) {

    // Création de chaque élément dans des balises <li>
    const titleCategorie = document.createElement("li");
    titleCategorie.innerText = categorie.name;
    titleCategorie.classList.add("categories--object");
    
    //
    const ListeTri = document.querySelector("#categories");

    ListeTri.appendChild(titleCategorie);
    
    // Intéraction au clic avec le bouton
    titleCategorie.addEventListener("click", function() {

        portfolioGallery.innerHTML = "";
        const projectsFiltered = filterProject(categorie.name);

        for (let i = 0; i < projectsFiltered.length; i++) {
            createCardProject(projectsFiltered[i])
        }
    
    })
 
}

/// Fonction de récupération des catégories pour les filtres
function filterProject (categorie) {

    return works.filter(function (work){
        return work.category.name == categorie;

    })

}

// Importation des images des travaux de l'API
let apiWorks = await fetch("http://localhost:5678/api/works");
let worksList = await apiWorks.json();

let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];


// ID de l'utilisateur
const userId = window.localStorage.getItem("userId");

// Fonction d'affichage des modales //
const openModal = function (event, element) {

    event.preventDefault();
    modal = document.querySelector(element.dataset.open);
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden');
    document.getElementById("modal1-works-gallery").innerHTML = "";

    for (let i = 0; i < worksList.length; i++) {
        createModalWorks(worksList[i]);
    }

    deleteEvent();

}


/////Fonction de suppression des projets
async function deleteWork (id) {

    const apiWorksDelete = await fetch("http://localhost:5678/api/works/" + id, {
        
        method: "DELETE",
        body: JSON.stringify({"userId": userId})

    },

)}
        


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

function deleteEvent () {

    const deleteBtn = document.querySelectorAll(".modal1-delete-icon");

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", () => {
        deleteWork (deleteBtn[i].dataset.id);
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
        createCardProject(worksList[i]);
    }
}

///// Ouverture de la modale 2 /////
const openModal2 = function (event, element) {


}

/// Fonctionnement de la flèche retour de la modale 2 ///
const arrowLeft = document.getElementById("modal2-arrow-left");

arrowLeft.addEventListener("click", (event, element) => {
    openModal(element.dataset.open);
    closeModal(element.dataset.close);
})

/*arrowLeft.addEventListener("click", function (event, element){

    event.preventDefault();

    const modal1 = document.querySelector(element.dataset.close);
    closeModal(modal1);
    console.log(element);

    const modal2 = document.querySelector(element.dataset.open);
    openModal(modal2);

    modal1.style.display = "none";

})
*/


// Fermeture des modales
const closeModal = function (event, element) {
    event.preventDefault();
    modal = document.querySelector(element.dataset.close);
    modal.style.display ="none";
}


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
