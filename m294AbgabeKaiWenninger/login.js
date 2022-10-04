const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

function submitForm(event) {
    event.preventDefault();

    document.getElementById("response").innerHTML = "";

    const emailText = document.getElementById("email").value;
    const passwordText = document.getElementById("password").value;

    const loginData = {
        "email": emailText,
        "password": passwordText
    }

    fetch("http://127.0.0.1:3000/auth/cookie/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            window.location.href = "toDoList.html";
        }

        return response.json();

    }).then(function (json) {
        document.getElementById("response").innerHTML = json.message;
    })

}