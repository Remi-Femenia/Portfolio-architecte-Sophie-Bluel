// Récupérer chaque champ et les values (.value)

async function login (email, password) {
    let sendBtn = document.getElementById("send-button");
    sendBtn.addEventListener("click", function () {
        console.log(sendBtn);

    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email, "password": password}
        )  
});

let login = await reponse.json();

}
)}