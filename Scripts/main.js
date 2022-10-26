import {
  Product,
  getBestDealsItems,
  initData,
  getNewArrivalsItems,
} from "./products.js";

import {getCurrentUser} from './user.js'

window.onload = function () {
  initData();
  appendBestDeals();
  appendNewArrival();

  setTimeout(function(){
     if (getCurrentUser() != null){
        document.getElementById('login').innerHTML = 'Hello ' + getCurrentUser().fname;
        document.getElementById('login').href = '#';
     }
  }, 2000);
};

function appendBestDeals() {
  let bestDealsItems = getBestDealsItems();
  let bestDealsDiv = document.getElementById("best-deals-items-holder");
  let active = "active";
  for (let bestDealItem of bestDealsItems) {
    bestDealsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <a href="selectedProduct.html?id=${bestDealItem.id}">
          <div class="card" style="height: 16rem; text-align:center;">
            <img class="card-img-top" src="${bestDealItem.imgAddress}" alt="Card image cap" style="height: 100%; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">${bestDealItem.name}</h5>
              <p class="card-text">${bestDealItem.description}</p>
            </div>
          </div>
         </a>
      </div>`
    );
    active = "";
  }
}
function appendNewArrival() {
  let newArrivalsItems = getNewArrivalsItems();
  let newArrivalsItemsDiv = document.getElementById(
    "new-arrivals-items-holder"
  );
  let active = "active";
  for (let newArrival of newArrivalsItems) {
    newArrivalsItemsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <a href="selectedProduct.html?id=${newArrival.id}">
          <div class="card" style="height: 16rem; text-align:center;">
            <img class="card-img-top" src="${newArrival.imgAddress}" alt="Card image cap" style="height: 100%; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">
                ${newArrival.name}
              </h5>
              <p class="card-text">${newArrival.description}</p>
            </div>
          </div>
        </a>
      </div>`
    );
    active = "";
  }
}
