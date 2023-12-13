

const project = works[0];

function creationFicheProjet (index) {
    for (let numberProject = 0; numberProject < slides.lenght; numberProject++) {

        // Création de la balise img avec récupération de l'élément
        const imageProject = document.createElement("img");
        imageProject.src = numberProject.imageURL;

        // Création de la balise fig avec récupération de l'élément
        const titleProject = document.createElement("figcaption");
        titleProject.innerText = numberProject.title;

        // 
        const sectionProject = document.querySelector(".gallery");
        const indexCardProject = document.createElement("figure");
        sectionProject.appendChild(indexCardProject);

        //Rattachement des éléments image et titre à une balise figure
        indexCardProject.appendChild(imageProject);
        indexCardProject.appendChild(titleProject);

    }

}

