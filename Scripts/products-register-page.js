const btnSaveProduct = document.getElementById('btnSalvarProduto');
const inputProdName = document.getElementById('nomeProduto');
const inputProdPrice = document.getElementById('valorProduto');
const inputProdBarCode = document.getElementById('codigoProduto');
const inputProdValidUnitl = document.getElementById('validade');
const inputProdImgUrl = document.getElementById('urlImg');

$('document').ready(function() {
  $("#valorProduto").mask('R$ 0.00.00.00.00,00', {reverse: false});
});


function register() {
  if (
    !inputProdName.value ||
    !inputProdPrice.value ||
    !inputProdBarCode.value ||
    !inputProdValidUnitl.value
  ) {
    return Swal.fire({
      title: 'Oops!',
      text: 'Parece que você não preencheu todos os campos',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  const URL = 'https://bomponto.herokuapp.com/api/products';
  const requestOpt = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: inputProdName.value,
      price: inputProdPrice.value.replace(/\D+/g, ''),
      barCode: inputProdBarCode.value,
      validUntil: inputProdValidUnitl.value,
      pictureServerPath: inputProdImgUrl.value,
    }),
    mode: 'cors',
  };

  fetch(URL, requestOpt)
    .then(() => {
      Swal.fire({
        title: 'Pronto!',
        text: 'Produto cadastrado.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    })
    .catch(() => {
      Swal.fire({
        title: 'Oops!',
        text: 'Algo deu errado...',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
}

btnSaveProduct.addEventListener('click', register);
