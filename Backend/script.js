

const projet = works[0];

// Création de la balise img avec récupération de l'élément
const imageProjet = document.createElement("img");
imageProjet.src = projet.imageURL;

// Création de la balise fig avec récupération de l'élément
const titreProjet = document.createElement("figcaption");
titreProjet.innerText = projet.title;

// 
const sectionProjet = document.querySelector(".gallery");
const ficheProjet = document.createElement("figure");
sectionProjet.appendChild(ficheProjet);

//Rattachement des éléments image et titre à une balise figure
ficheProjet.appendChild(imageProjet);
ficheProjet.appendChild(titreProjet);

