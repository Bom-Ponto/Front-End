const loginBtn = document.getElementById('btnLogin');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');

function login() {
  if (!emailInput.value || !passwordInput.value) {
    return Swal.fire({
      title: 'Oops!',
      text: 'Parece que você não preencheu todos os campos',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  const BASE_URL = 'https://bomponto.herokuapp.com/api/users/login';
  const requestOpt = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
    mode: 'cors',
  };
  fetch(BASE_URL, requestOpt)
    .then((res) => {
      console.log('repsonse:', res);
      if (res.status === 404) {
        return Swal.fire({
          title: 'Não Encontrado',
          text: 'Esta conta não existe.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      if (res.status === 400) {
        return Swal.fire({
          title: 'Oops!',
          text: 'Senha incorreta.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
      Swal.fire({
        title: 'Pronto!',
        text: 'Login concluído',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Oops!',
        text: 'Algo deu errado.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
}

loginBtn.addEventListener('click', login);
