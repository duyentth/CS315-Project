import {
  Product,
  getBestDealsItems,
  initData,
  getNewArrivalsItems,
  filterRating

} from "./products.js";

import {getCurrentUser} from './user.js'

window.onload = function () {
  initData();
  appendBestDeals();
  appendNewArrival();
  appendBestSeller();

  console.log('xx', localStorage.getItem('currentUserEmail'));
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
function appendBestSeller() {
  let topRated = filterRating();
  let topRatingHolder = document.getElementById(
    "Best-Seller-Holder"
  );
  let active = "active";
  for (let best of topRated) {
    topRatingHolder.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <a href="selectedProduct.html?id=${best.id}">
          <div class="card" style="height: 16rem; text-align:center;">
            <img class="card-img-top" src="${best.imgAddress}" alt="Card image cap" style="height: 100%; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">
                ${best.name}
              </h5>
              <p class="card-text">${best.description}</p>
            </div>
          </div>
        </a>
      </div>`
    );
    active = "";
  }
}
