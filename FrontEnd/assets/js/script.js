fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then(works => {
console.log(works)

for (let i = 0; i < works.length; i++) {
    createCardProject(works[i])
}

}
)

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
