// Utiliser .trim() pour nettoyer

const form = document.querySelector('form');
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;


form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (email === "") {
        console.log("Le champ est vide");
    } else {
        console.log("Le champ est rempli.")
    }

    if (password === "") {
        console.log("Insérez un mot de passe.");
    } else {
        console.log("Le mot de passe est saisi.")
    }

})

async function login (email, password) {

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password})
    });

    let loginResponse = await reponse.json();

}
