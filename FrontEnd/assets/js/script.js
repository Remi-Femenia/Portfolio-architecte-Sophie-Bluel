import {
    fetchWorks, fetchCategories, worksCache, categoriesCache,
    editModeBanner, loginButton, logoutButton, openEditModalButton, categoryFilters,
    enableEditMode, disableEditMode,
} from "./utils.js";

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
    initializeCategoryFilters();
    // Autres initialisations nécessaires...

    const allCategoriesButton = document.getElementById("all-categories-btn");
    allCategoriesButton.focus();
    allCategoriesButton.addEventListener("click", function() {
        portfolioGallery.innerHTML = ""; // Nettoie la galerie
        initializePortfolio(); // Ré-affiche tous les projets
    });

}

// 4. Configuration des Écouteurs d'Événements
document.addEventListener('DOMContentLoaded', initializeWebsite());
