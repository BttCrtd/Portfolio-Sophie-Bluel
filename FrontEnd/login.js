// Gestion du lien Login/Logout dans la navigation en fonction de l'état d'authentification de l'utilisateur
function loginLogout() {
  const loginButton = document.querySelector('nav a[href="login.html"]')
  loginButton.innerHTML = ""
  if (sessionStorage.getItem('authenticated') === 'true') {
    loginButton.innerHTML = "Logout"
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      sessionStorage.clear();
      loginLogout()
    });
  } else {
    loginButton.innerHTML = "Login"
  }
}

const loginButton = document.getElementById('connection-button');
loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  try {
  const usernEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const dataLogin = {
    email: usernEmail,
    password: userPassword,
  };
  console.log(dataLogin);
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify(dataLogin),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('authenticated', 'true');
        loginLogout()
        console.log("utilisateur conncté")
      }
      else {
        console.log("erreur de connexion")
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } catch (error) {
    console.error('Error:', error);
}});

loginLogout()
