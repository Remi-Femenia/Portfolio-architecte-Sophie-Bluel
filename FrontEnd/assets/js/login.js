const reponse = await fetch("http://localhost:5678/api/users/login"), {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: '{"email": "emailEntered"}'
};

let login = await reponse.json();
