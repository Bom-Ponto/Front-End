const nameInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');
const confirmPasswordInput = document.getElementById('confirmaSenha');
const registerBtn = document.getElementById('btnCadastroUsuario');
const displayPasswordCheckbox = document.getElementById('displayPassword');

const BASE_URL = 'https://bomponto.herokuapp.com/api/users';

registerBtn.addEventListener('click', () => {
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  console.log(user);
  if (user.email && user.name && user.password) {
    if (checkPassword(passwordInput.value, confirmPasswordInput.value)) {
      return register(user);
    } else {
      Swal.fire({
        title: 'Oops!',
        text: 'Parece que as senhas não condizem',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  } else
    Swal.fire({
      title: 'Oops!',
      text: 'Parece que você não preencheu todos os campos',
      icon: 'error',
      confirmButtonText: 'OK',
    });
});

function checkPassword(password, confirmPassword) {
  return password === confirmPassword ? true : false;
}

function register(payload) {
  console.log(payload);
  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'applction/json',
    },
    body: JSON.stringify(payload),
    mode: 'cors',
  })
    .then(() => {
      clearForm();
      Swal.fire({
        title: 'Pronto!',
        text: 'Cadastro realizado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK.',
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Oops!',
        text: 'Não foi possível cadastrar o usuário',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
}

function clearForm() {
  nameInput.value = '';
  passwordInput.value = '';
  emailInput.value = '';
  confirmPasswordInput.value = '';
}

displayPasswordCheckbox.addEventListener('click', () => {
  const field = document.getElementById('senha');
  if (field.type === 'password') field.type = 'text';
  else field.type = 'password';
});
