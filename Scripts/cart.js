import { getCartProducts, removeProductFromCart } from "./products.js";

window.onload = function () {
  console.log(getCartProducts());
  appendProducts(getCartProducts());
};

function appendProducts(products) {
  let productListDiv = document.getElementById("product-list-cards");
  productListDiv.innerHTML = "";
  for (let product of products) {
    let removeFromCartBtnId = "removeFromCart-" + product.id;
    productListDiv.insertAdjacentHTML(
      "beforeend",
      `<div class="col-4 mb-3">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" style="height: 12rem" src="${product.imgAddress}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h6 class="card-text">$ ${product.price}</h6>
                    <p class="card-text">${product.description}</p>
                    <button class="btn btn-danger" id="${removeFromCartBtnId}">Remove From Cart</button>
                </div>
            </div>
        </div>`
    );
    setRemoveFromCartOnClick(removeFromCartBtnId, product.id);
  }
}

function setRemoveFromCartOnClick(removeFromCartBtnId, productId) {
  let addToCartBtn = document.getElementById(removeFromCartBtnId);
  addToCartBtn.onclick = function () {
    removeProductFromCart(productId);
    appendProducts(getCartProducts());
  };
}
