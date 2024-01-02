let exemple = await fetch("http://localhost:5678/api/works");
let works = await exemple.json();

for (let i = 0; i < works.length; i++) {
    createCardProject(works[i])
}

function createCardProject (work) {

        // Création de la balise <img> avec récupération de l'élément
        const imageProject = document.createElement("img");
        imageProject.src = work.imageUrl;

        // Création de la balise <figcaption> avec récupération de l'élément
        const titleProject = document.createElement("figcaption");
        titleProject.innerText = work.title;

        // 
        const sectionProject = document.querySelector(".gallery");
        const cardProject = document.createElement("figure");

        //Rattachement des balises <img> et <figcaption> à une balise <figure>
        cardProject.appendChild(imageProject);
        cardProject.appendChild(titleProject);
        sectionProject.appendChild(cardProject);

}


fetch("http://localhost:5678/api/categories")
.then(response => response.json())
.then(categories => {

    for (let i = 0; i < categories.length; i++) {
        createCategorieProject(categories[i])
    }

    }
    
)

function createCategorieProject (categorie) {
    const titleCategorie = document.createElement("li");
    titleCategorie.innerText = categorie.name;
    titleCategorie.classList.add("categories--object");
    const ListeTri = document.querySelector("#categories");

    ListeTri.appendChild(titleCategorie);
    titleCategorie.addEventListener("click", function() {
    console.log(filterProject(categorie.name))

    
    })

    // Vider la gallery

    // À retravailler pour générer la nouvelle liste dans le HTML
    for (let i = 0; i < works.length; i++) {
        createCardProject(categorie)
    }

}

function filterProject (categorie) {
    console.log(categorie)
    return works.filter(function (work){
        return work.category.name == categorie;
    })

}