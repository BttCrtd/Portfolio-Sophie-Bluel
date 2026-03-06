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
        localStorage.setItem('token', data.token);
        localStorage.setItem('authenticated', 'true');
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

    
