/*let exemple = await fetch("http://localhost:5678/api/works");
let works = await exemple.json();*/


///////////////////////////////////////////////////////////////////////
//////////////////////////////// API //////////////////////////////////
///////////////////////////////////////////////////////////////////////


/////////////////////////////// CACHES ////////////////////////////////

// Données de l'API en cache
let worksCache = null;
let categoriesCache = null;


/////////////////////////////// FETCH /////////////////////////////////

// Fetch de récupération des travaux
async function fetchWorks() {
    if (worksCache !== null) {
        return worksCache;
    }

    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    worksCache = data;
    return data;
}

// Fetch de récupération des catégories
async function fetchCategories() {
    if (categoriesCache !== null) {
        return categoriesCache;
    }
  
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json(); // Convertit les données JSON en objets/arrays JavaScript
    categoriesCache = data; // Cache les données converties
    return data;
}



///////////////////////////////////////////////////////////////////////
////////////////////////////// INDEX //////////////////////////////////
///////////////////////////////////////////////////////////////////////


///////////////////////// GALERIE PORTFOLIO ///////////////////////////

const portfolioGallery = document.querySelector(".gallery");

// Fonction pour initialiser la galerie portfolio avec les travaux récupérés
async function initializePortfolio() {
    try {
        const works = await fetchWorks(); // Récupère les travaux de l'API
        works.forEach(addPortfolioItem); // Ajoute chaque projet au DOM
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}

// Assurez-vous que `initializePortfolio` est appelée lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Fonction pour ajouter un élément au portfolio
const addPortfolioItem = item => {
  const imageElement = document.createElement("img");
  imageElement.src = item.imageUrl;

  const titleElement = document.createElement("figcaption");
  titleElement.innerText = item.title;

  const cardElement = document.createElement("figure");
  cardElement.append(imageElement, titleElement); // Utilise append pour ajouter plusieurs éléments
  portfolioGallery.appendChild(cardElement);
}

/*// Itération sur le tableau works et ajout des éléments dans le DOM
const works = await fetchWorks();
works.forEach(addPortfolioItem);*/

/*const portfolioGallery = document.querySelector(".gallery");

// Fonction de création des éléments dans la galerie portfolio
function createPortfolioItems (work) {

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

for (let i = 0; i < works.length; i++) {
    createPortfolioItems(works[i])
}*/

////////////////////////// FILTRES PORTFOLIO /////////////////////////////

// Fonction servant à créer les boutons de filtre
async function initializeCategoryFilters() {
    try {
        const categories = await fetchCategories();
        categories.forEach(createCategoryFilterButton);
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
    }
}

function createCategoryFilterButton(category) {
    // Création de chaque élément dans des balises <li>
    const filterTitle = document.createElement("button");
    filterTitle.innerText = category.name;
    filterTitle.classList.add("categories__button");

    const buttonListContainer = document.createElement("li");
    const filterSection = document.querySelector("#categories");
    buttonListContainer.appendChild(filterTitle)
    filterSection.appendChild(buttonListContainer);

    // Interaction au clic avec le bouton
    filterTitle.addEventListener("click", function() {
        filterAndDisplayProjects(category.name);
    });
}

async function filterAndDisplayProjects(categoryName) {
    const works = await fetchWorks();
    const projectsFiltered = works.filter(work => work.category.name === categoryName);

    const portfolioGallery = document.querySelector(".gallery");
    portfolioGallery.innerHTML = ""; // Vide la galerie avant de la remplir avec les projets filtrés

    projectsFiltered.forEach(addPortfolioItem);
}

///////////////////////// Ancienne version

/**fetchCategories().then(categories => {
    categories.forEach(category => {
        createCategorieProject(category);
    });
}).catch(error => {
    console.error("Erreur lors de la récupération des catégories:", error);
});

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

}**/


///////////////////////////////////////////////////////////////////////
/////////////////////////////// MODALES ///////////////////////////////
///////////////////////////////////////////////////////////////////////


/////////////////////////////// MODALE 1 ///////////////////////////////

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


///////////////////////////////////////////////////////////////////////
//////////////////////////// INITIALISATION ///////////////////////////
///////////////////////////////////////////////////////////////////////

/*const allCategoriesButton = document.querySelector("#all-categories-btn");
allCategoriesButton.addEventListener("click", function (){
    
    portfolioGallery.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        addPortfolioItem(works[i]);
    }

})*/

function initializeWebsite() {
    initializePortfolio();
    initializeCategoryFilters();
    // Autres initialisations nécessaires...

    const allCategoriesButton = document.getElementById("all-categories-btn");
    allCategoriesButton.focus();
    console.log(allCategoriesButton);
    allCategoriesButton.addEventListener("click", function() {
        portfolioGallery.innerHTML = ""; // Nettoie la galerie
        initializePortfolio(); // Ré-affiche tous les projets
    });

}

// 4. Configuration des Écouteurs d'Événements
document.addEventListener('DOMContentLoaded', initializeWebsite());
