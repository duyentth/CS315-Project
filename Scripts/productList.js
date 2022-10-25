import {
  getProductListByFilter,
  getProductsByPrice,
  addProductToCart,
} from "./products.js";

window.onload = function () {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let paramValue = url.searchParams.get("searchBox");
  console.log(paramValue);
  appendProducts(getProductListByFilter(paramValue));
  setFilterOnClick(paramValue);
};

function appendProducts(products) {
  let productListDiv = document.getElementById("product-list-cards");
  productListDiv.innerHTML = "";
  for (let product of products) {
    let addToCartBtnId = "addToCart-" + product.id;
    productListDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="col-4 mb-3">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" style="height: 12rem" src="${product.imgAddress}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-text">$ ${product.price}</h6>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-primary" id="${addToCartBtnId}">Add to Cart</button>
                </div>
            </div>
        </div>`
    );
    setAddToCartOnClick(addToCartBtnId, product.id);
  }
}

function setFilterOnClick(paramValue) {
  let applyButton = document.getElementById("apply-filter");
  applyButton.onclick = function () {
    let minPrice = document.getElementById("price-min").value;
    let maxPrice = document.getElementById("price-max").value;
    let products = getProductListByFilter(paramValue);
    let filteredProducts = getProductsByPrice(products, minPrice, maxPrice);
    appendProducts(filteredProducts);
  };
}

function setAddToCartOnClick(addToCartBtnId, productId) {
  let addToCartBtn = document.getElementById(addToCartBtnId);
  addToCartBtn.onclick = function () {
    addProductToCart(productId);
    alert("Product Added to Cart");
  };
}
