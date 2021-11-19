const loginBtn = document.getElementById('btnLogin');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');

function login() {
  if (!emailInput.value || !passwordInput.value) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Parece que você não preencheu todos os campos',
      confirmButtonText: 'OK'
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
          icon: 'error',
          title: 'Não Encontrado',
          text: 'Esta conta não existe.',
          confirmButtonText: 'OK'
        });
      }
      if (res.status === 400) {
        return Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Senha incorreta.',
          confirmButtonText: 'OK'
        });
      }
     Swal.fire({
        title: 'Pronto!',
        text: 'Login concluído',
        icon: 'success',
        confirmButtonText: 'As compras!',
        confirmButtonColor: "#419488"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/View/Produtos.html';
        }
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
