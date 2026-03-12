// Gestion du lien Login/Logout dans la navigation en fonction de l'état d'authentification de l'utilisateur
export function loginLogout() {
  const loginLink = document.getElementById('log-link');
  loginLink.innerHTML = ""
  
  if (sessionStorage.getItem('token')) {
    loginLink.innerHTML = "logout"
    loginLink.addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  } else {
    loginLink.innerHTML = "login"
  }
}


const loginButton = document.getElementById('connection-button');
const errorMessage = document.getElementById('error-message');
if (loginButton, errorMessage) {
errorMessage.innerText = "";
loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
  const usernEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const dataLogin = {
    email: usernEmail,
    password: userPassword,
  };
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify(dataLogin),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        window.location.href = "index.html";
        loginLogout()
      }
      else {
        console.log("erreur de connexion")
      }
    })
    .catch((error) => {
      error.preventDefault()
      console.log("Erreur d'identifiant ou de mot de passe", error);
      errorMessage.innerHTML = "Erreur dans l'identifiant ou le mot de passe.";
    });
  } catch (error) {
    error.preventDefault()
    console.log("Une erreur est survenue lors de la connexion", error);
    errorMessage.innerHTML = "Une erreur est survenue lors de la connexion.";
}});}


