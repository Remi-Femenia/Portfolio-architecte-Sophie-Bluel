let reponse = await fetch("http://localhost:5678/api/works");
console.log(reponse)

const project = works[0];

function createCardProject (index) {
    for (let i = 0; i < works.lenght; i++) {

        // Création de la balise <img> avec récupération de l'élément
        const imageProject = document.createElement("img");
        imageProject.src = i.imageURL;

        // Création de la balise <figcaption> avec récupération de l'élément
        const titleProject = document.createElement("figcaption");
        titleProject.innerText = numberProject.title;

        // 
        const sectionProject = document.querySelector(".gallery");
        const cardProject = document.createElement("figure");
        sectionProject.appendChild(cardProject);

        //Rattachement des balises <img> et <figcaption> à une balise <figure>
        cardProject.appendChild(imageProject);
        cardProject.appendChild(titleProject);

    }

}
createCardProject()
