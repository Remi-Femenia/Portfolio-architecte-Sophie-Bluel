// Utiliser .trim() pour nettoyer le champ de saisie

const loginForm = document.getElementById("loginForm");

async function loginUser (email, password) {

    const fetchLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password})
    });
    
    if (fetchLogin.ok) {
        let loginResponse = await fetchLogin.json();

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

loginForm.addEventListener("submit", async event => {

    event.preventDefault();

    const userEmail = document.getElementById("loginEmail").value;
    const userPassword = document.getElementById("loginPassword").value;

    loginUser(userEmail, userPassword);
})