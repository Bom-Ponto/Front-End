const cardsArea = document.getElementById('sectionCards');

/* requesting data from the api */
const getProducts = async () => {
  try {
    return (
      await (await fetch('https://bomponto.herokuapp.com/api/products')).json()
    ).data;
  } catch (err) {
    console.log(err);
  }
};

/* displaying the required data */
const displayCards = async () => {
  const productsList = await getProducts();
  productsList.forEach((prod) => {
    cardsArea.insertAdjacentHTML(
      'beforeend',
      `
      <div class="col-sm-3 mx-5 my-5">
        <div class="card">
          <img src="${prod.pictureServerPath}" class="card-img-top imgHeight">
          <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <h6 class="card-subtitle my-2 text-muted">Codigo:  ${prod.barCode}</h6>
            <b class="card-subtitle my-2">${formatMoneyValuePipe(prod.price)}</b>
            <h6 class="card-subtitle my-2">Validade: ${formatDatePipe(new Date(prod.validUntil))}</h6>
          </div>
        </div>
      </div>`
      
    );
  });
};

/* PIPES */
function formatDatePipe(date) {
  return Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(date);
}

function formatMoneyValuePipe(value) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

window.onload = () => {
  displayCards();
};
