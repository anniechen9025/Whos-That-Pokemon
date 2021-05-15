const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-form-submit');
const loginErrorMsg = document.getElementById('login-error-msg');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();

  if (name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/menu');
    } else {
      alert(response.statusText);
    }
    console.log(response);
    //document.location.replace('/menu');
  }
};

//need to target the signup page
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      //document.location.replace('/homepage');
    } else {
      alert(response.statusText);
    }
  }
};

// When the login button is clicked, the following code is executed
loginButton.addEventListener('click', loginFormHandler);
