document.addEventListener('DOMContentLoaded', () => {
const updateForm = document.getElementById('updatePw-form')
const updateButton = document.getElementById('updateBtn');

const updateFormHandler = async (event) => {
    event.preventDefault();

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
    }
  };

  updateButton.addEventListener('click', (e) => {

    e.preventDefault();

    const username = document.querySelector('#username').value;
    const newpassword = document.querySelector('#newPw').value;
    const oldpassword = document.querySelector('#oldPw').value;
    console.log("click buton");

    if (username && newpassword && oldpassword) {
      updateFormHandler(e);
    } else {
      loginErrorMsg.style.opacity = 1;
    }
  });
});