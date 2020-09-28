const $pizzaList = document.querySelector('#pizza-list');


const getAllPizzas = async () => {
  // event.preventDefault();
  //console.log("DOM CONTENT LOADED!");
  try {
    const pizzas = await fetch('/api/pizzas', {method: 'GET'});
    const json = await pizzas.json();
    console.log(json);
    json.map(pizza => printPizza(pizza));
    // for (let i = 0; i < json.length; i++) {
    //   printPizza(json[i]);
    // }
  } catch (error) {
    console.log(error);
  }
};

const printPizza = ({ _id, pizzaName, toppings, size, commentCount, createdBy, createdAt }) => {
  const pizzaCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${pizzaName}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Suggested Size: ${size}
          <h5 class="text-dark">Toppings</h5>
          <ul>
            ${toppings
              .map(topping => {
                return `<li>${topping}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/pizza?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $pizzaList.innerHTML += pizzaCard;
};

getAllPizzas();

// window.addEventListener('DOMContentLoaded', getAllPizzas);
