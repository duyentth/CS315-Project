import {
  Product,
  getBestDealsItems,
  initData,
  getNewArrivalsItems,
} from "./products.js";

window.onload = function () {
  initData();
  appendBestDeals();
  appendNewArrival();
};

function appendBestDeals() {
  let bestDealsItems = getBestDealsItems();
  let bestDealsDiv = document.getElementById("best-deals-items-holder");
  let active = "active";
  for (let bestDealItem of bestDealsItems) {
    bestDealsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <div class="card">
          <img class="card-img-top" src="${bestDealItem.imgAddress}" alt="Card image cap" style="height: 10em">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
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
        <div class="card" >
          <img class="card-img-top" src="${newArrival.imgAddress}" alt="Card image cap" style="height: 10em">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>`
    );
    active = "";
  }
}
