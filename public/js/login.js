document.addEventListener('DOMContentLoaded', () => {

  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginButton = document.getElementById('login-form-submit');
  const signupButton = document.getElementById('signup-form-submit');
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
        alert('You have successfully logged in.');
      } else {
        alert('Failed to log in.');
      }
      console.log(response);
      //document.location.replace('/menu');
    }
  };

  //need to target the signup page
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

      console.log(response);

      if (response.ok) {
        document.location.replace('/menu');
      } else {
        const errmessage = await response.json();
        const errormessage = errmessage.errors[0].message;
        alert(errormessage);
      }
    }
  };


  // When the login button is clicked, the following code is executed

  loginButton.addEventListener('click', (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username && password) {
      // If the credentials are valid, show an alert box and reload the page
      loginFormHandler(e);
    } else {
      // Otherwise, make the login error message show (change its oppacity)
      loginErrorMsg.style.opacity = 1;
    }
  });

  signupButton.addEventListener('click', (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = signupForm.username.value;
    const password = signupForm.password.value;

    if (username && password) {
      // If the credentials are valid, show an alert box and reload the page
      signupFormHandler(e);
    } else {
      // Otherwise, make the login error message show (change its oppacity)
      loginErrorMsg.style.opacity = 1;
    }
  });


})

