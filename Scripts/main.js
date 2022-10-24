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
  if (bestDealsItems.length === 0) {
    bestDealsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="./images/content1.jpeg" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>`
    );
  }
  for (let bestDealItem of getBestDeals) {
    bestDealsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="./images/${bestDealItem.imgAddress}" alt="Card image cap">
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
  if (newArrivalsItems.length === 0) {
    newArrivalsItemsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="./images/content2.jpeg" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>`
    );
  }
  for (let newArrival of getNewArrivals) {
    newArrivalsItemsDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${active}">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="./images/${newArrival.imgAddress}" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>`
    );
    active = "";
  }
}
