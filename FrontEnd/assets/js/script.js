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
