import { isValidEmail, isValidPassword, enableEditMode, disableEditMode } from "./utils.js";

// Utiliser .trim() pour nettoyer le champ de saisie

const loginForm = document.getElementById("loginForm");

// Fonction d'authentification de l'utilisateur
async function loginUser (email, password) {

    const fetchLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password})
    });
    
    if (fetchLogin.ok) {
        let loginResponse = await fetchLogin.json();

        localStorage.setItem("id", loginResponse.userId);
        localStorage.setItem("token", loginResponse.token);

        location.href="index.html";
        enableEditMode();
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

export function sendCredentialsForVerification () {
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        const userEmail = document.getElementById("loginEmail").value;
        const userPassword = document.getElementById("loginPassword").value;

        if (isValidEmail(userEmail) && isValidPassword(userPassword)) {
            loginUser(userEmail, userPassword);
        }
    })
};
sendCredentialsForVerification();