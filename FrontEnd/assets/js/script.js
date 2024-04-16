import {
    fetchWorks, fetchCategories, worksCache, categoriesCache, works, categories,
    editModeBanner, loginButton, logoutButton, openEditModalButton, categoryFilters,
    enableEditMode, disableEditMode, portfolioGallery, addPortfolioItem, initializePortfolio
} from "./utils.js";

///////////////////////////////////////////////////////////////////////
////////////////////////////// INDEX //////////////////////////////////
///////////////////////////////////////////////////////////////////////


///////////////////////// GALERIE PORTFOLIO ///////////////////////////

// Voir les fonctions et va


////////////////////////// FILTRES PORTFOLIO /////////////////////////////

// Fonction servant à créer les boutons de filtre
async function initializeCategoryFilters() {
    try {
        categories.forEach(createCategoryFilterButton);
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
    }
}

function createCategoryFilterButton (category) {
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

async function filterAndDisplayProjects (categoryName) {
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
    initializePortfolio();
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
