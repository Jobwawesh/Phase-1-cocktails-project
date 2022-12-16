function hideLoginForm() {
    document.getElementById('login-form').style.display = 'none';
  }
  document.getElementById('login-button').addEventListener('click', hideLoginForm);
