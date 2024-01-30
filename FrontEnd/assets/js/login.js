// Utiliser .trim() pour nettoyer le champ de saisie

const form = document.querySelector('form');

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

    login(email, password);

})


async function login (email, password) {

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password})
    });
    
    if (response.ok) {
        let loginResponse = await response.json();

        window.localStorage.setItem("id", loginResponse.userId);
        window.localStorage.setItem("token", loginResponse.token);

        window.location.href="index.html";
    }
    else {
        const loginError = document.getElementById("login-error");
        
        const loginErrorMessage = 
                `<p>
                L'e-mail et/ou le mot de passe saisis sont incorrects.
                <br/>
                Veuillez saisir un e-mail et un mot de passe valides.
                </p>`;

        loginError.innerHTML = loginErrorMessage;
        loginError.classList.add("login-error");
    }
}
