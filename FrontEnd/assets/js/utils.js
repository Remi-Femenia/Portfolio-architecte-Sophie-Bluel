///////////////////////////////////////////////////////////////////////
//////////////////////////////// API //////////////////////////////////
///////////////////////////////////////////////////////////////////////


/////////////////////////////// CACHES ////////////////////////////////

// Données de l'API en cache
let worksCache = null;
let categoriesCache = null;


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