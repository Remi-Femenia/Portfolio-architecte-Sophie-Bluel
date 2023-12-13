

const project = works[0];

function createCardProject (index) {
    for (let i = 0; i < works.lenght; i++) {

        // Création de la balise img avec récupération de l'élément
        const imageProject = document.createElement("img");
        imageProject.src = i.imageURL;

        // Création de la balise fig avec récupération de l'élément
        const titleProject = document.createElement("figcaption");
        titleProject.innerText = numberProject.title;

        // 
        const sectionProject = document.querySelector(".gallery");
        const cardProject = document.createElement("figure");
        sectionProject.appendChild(cardProject);

        //Rattachement des éléments image et titre à une balise figure
        cardProject.appendChild(imageProject);
        cardProject.appendChild(titleProject);

    }

}

