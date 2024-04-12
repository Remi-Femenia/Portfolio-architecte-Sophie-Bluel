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


/////////////////////////// MODE EDITION //////////////////////////////

// Fonction d'affichage du mode édition
export function enableEditMode () {
    const editModeBanner = document.getElementById("editModeBanner");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const openEditModalButton = document.getElementById("openEditModalButton");
    const categoryFilters = document.getElementById("categories");

    editModeBanner.style.display = "flex";
    loginButton.style.display = "none";
    logoutButton.style.display = "list-item";
    openEditModalButton.style.display = "block";
    categoryFilters.style.display = "none";
}