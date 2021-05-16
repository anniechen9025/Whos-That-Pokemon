document.addEventListener('DOMContentLoaded', () => {
const updateForm = document.getElementById('updatePw-form')
const updateButton = document.getElementById('updateBtn');

const updateFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#newPw').value.trim();
    const oldpassword = document.querySelector('#oldPw').value.trim();

    if (name && password && oldpassword) {
      const response = await fetch(`/api/users/pw`, {
        method: 'PUT',
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/menu');
        alert('You have successfully updating password.');
      } else {
        alert('Failed to log in.');
      }
      console.log(response);
      //document.location.replace('/menu');
    }
  };

  updateButton.addEventListener('click', (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = document.querySelector('#username').value;
    const newpassword = document.querySelector('#newPw').value;
    const oldpassword = document.querySelector('#oldPw').value;
    console.log("click buton");

    if (username && newpassword && oldpassword) {
      // If the credentials are valid, show an alert box and reload the page
      updateFormHandler(e);
    } else {
      // Otherwise, make the login error message show (change its oppacity)
      loginErrorMsg.style.opacity = 1;
    }
  });
});