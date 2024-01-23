// Utiliser .trim() pour nettoyer le champ de saisie

const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email);
    console.log(password);


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

    login(email, password) ;
})


async function login (email, password) {

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password})
    });

    let loginResponse = await reponse.json();

    

}
