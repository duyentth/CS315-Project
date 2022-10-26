import { getCartProducts, removeProductFromCart } from "./products.js";

window.onload = function () {
  let cartProducts = getCartProducts()
  let getCountAndPrice = appendProducts(cartProducts);
  getCartDetails(getCountAndPrice)


};
function getCartDetails(cartDetails){
  let cartDetailsDiv = document.getElementById("cart-details");
  cartDetailsDiv.innerHTML = "";
  
   cartDetailsDiv.insertAdjacentHTML(
      "beforeend",
      ` <div>Total Items: ${cartDetails.countProduct}</div>
        <div>Total Price: $${cartDetails.totalPrice}</div>`
    );

}

function appendProducts(products) {
  let productListDiv = document.getElementById("product-list-cards");
  productListDiv.innerHTML = "";
  
  let totalPrice = 0;
  
  for (let product of products) {
    totalPrice = totalPrice + product.price;
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

  return {totalPrice, countProduct: products.length};
}

function setRemoveFromCartOnClick(removeFromCartBtnId, productId) {
  let addToCartBtn = document.getElementById(removeFromCartBtnId);
  addToCartBtn.onclick = function () {
    removeProductFromCart(productId);
   let getPriceAndCount = appendProducts(getCartProducts());
    getCartDetails(getPriceAndCount);
   

  };
}
