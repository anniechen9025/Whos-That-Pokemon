document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginButton = document.getElementById('login-form-submit');
  const signupButton = document.getElementById('signup-form-submit');
  const loginErrorMsg = document.getElementById('login-error-msg');

  const loginFormHandler = async (event) => {
    event.preventDefault();

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
        alert('You have successfully logged in.');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = signupForm.username.value.trim();
    const password = signupForm.password.value.trim();

    if (name && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/menu');
      } else {
        const errmessage = await response.json();
        const errormessage = errmessage.errors[0].message;
        alert(errormessage);
      }
    }
  };

  loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username && password) {
      loginFormHandler(e);
    } else {
      loginErrorMsg.style.opacity = 1;
    }
  });

  signupButton.addEventListener('click', (e) => {
    e.preventDefault();

    const username = signupForm.username.value;
    const password = signupForm.password.value;

    if (username && password) {
      signupFormHandler(e);
    } else {
      loginErrorMsg.style.opacity = 1;
    }
  });


})

