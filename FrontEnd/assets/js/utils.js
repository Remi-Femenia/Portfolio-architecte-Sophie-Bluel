///////////////////////////////////////////////////////////////////////
//////////////////////////////// API //////////////////////////////////
///////////////////////////////////////////////////////////////////////

/////////////////////////////// CACHES ////////////////////////////////

// Données de l'API en cache
export let worksCache = null;
export let categoriesCache = null;


/////////////////////////////// FETCH /////////////////////////////////

// Fetch de récupération des travaux
export async function fetchWorks() {
    if (worksCache !== null) {
        return worksCache;
    }

    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    worksCache = data;
    return data;
}

// Fetch de récupération des catégories
export async function fetchCategories() {
    if (categoriesCache !== null) {
        return categoriesCache;
    }

    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json(); // Convertit les données JSON en objets/arrays JavaScript
    categoriesCache = data; // Cache les données converties
    return data;
}


///////////////////////////////////////////////////////////////////////
//////////////////////////// VARIABLES ////////////////////////////////
///////////////////////////////////////////////////////////////////////


//////////////////////////// GLOBALES /////////////////////////////////


///////////////////////////// INDEX ///////////////////////////////////

export const portfolioGallery = document.querySelector(".gallery");


///////////////////////////////////////////////////////////////////////
//////////////////////////// FONCTIONS ////////////////////////////////
///////////////////////////////////////////////////////////////////////

// Fonction pour ajouter un élément au portfolio
export function addPortfolioItem (item) {
    const imageElement = document.createElement("img");
    imageElement.src = item.imageUrl;
  
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = item.title;
  
    const cardElement = document.createElement("figure");
    cardElement.append(imageElement, titleElement); // Utilise append pour ajouter plusieurs éléments
    portfolioGallery.appendChild(cardElement);
}

export function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password) {
    return password.length > 0;
}


///////////////////////////////////////////////////////////////////////
/////////////////////////// MODE EDITION //////////////////////////////
///////////////////////////////////////////////////////////////////////


export const editModeBanner = document.getElementById("editModeBanner");
export const loginButton = document.getElementById("loginButton");
export const logoutButton = document.getElementById("logoutButton");
export const openEditModalButton = document.getElementById("openEditModalButton");
export const categoryFilters = document.getElementById("categories");

//Fonction de masquage du mode édition
export function disableEditMode () {
    editModeBanner.removeAttribute("style");
    loginButton.removeAttribute("style");
    logoutButton.removeAttribute("style");
    openEditModalButton.removeAttribute("style");
    categoryFilters.removeAttribute("style");
}

function initializeLogoutProcess () {
    logoutButton.addEventListener("click", event => {
        disableEditMode();
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
    })
}

// Fonction d'affichage du mode édition
export function enableEditMode () {
    editModeBanner.style.display = "flex";
    loginButton.style.display = "none";
    openEditModalButton.style.display = "block";
    categoryFilters.style.display = "none";
    logoutButton.style.display = "list-item";
    initializeLogoutProcess();
}

///////////////////////////////////////////////////////////////////////
////////////////////////// INITIALISATIONS ////////////////////////////
///////////////////////////////////////////////////////////////////////


// Fonction pour initialiser la galerie portfolio avec les travaux récupérés
export async function initializePortfolio() {
    try {
        const works = await fetchWorks(); // Récupère les travaux de l'API
        works.forEach(addPortfolioItem); // Ajoute chaque projet au DOM
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
    }
}