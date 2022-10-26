import { removeProductFromCart } from "./products.js";
import { getCartProducts, addToCart, removeFromCart } from "./cart.js"
import { getCurrentUser } from "./user.js"

window.onload = function () {
  let currentUser = getCurrentUser();
  let cartProducts = getCartProducts();
  let cartProductsForCurrentUser = cartProducts[currentUser.email];
  if(cartProductsForCurrentUser){
    if(cartProductsForCurrentUser.cartProducts){
      let getCountAndPrice = appendProducts(cartProductsForCurrentUser.cartProducts);
      getCartDetails(getCountAndPrice)
    }
  }
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

function appendProducts(cartProducts) {
  let productListDiv = document.getElementById("product-list-cards");
  productListDiv.innerHTML = "";
  
  let totalPrice = 0;
  let totalItems = 0;
  console.log(cartProducts);
  for (let products in cartProducts) {
    let product = cartProducts[products]["products"];
    totalPrice = totalPrice + product.price * cartProducts[products].quantity;
    totalItems = totalItems + cartProducts[products].quantity;
    console.log(products);
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
                    Quantity: ${cartProducts[products].quantity}
                </div>
            </div>
        </div>`
    );
    setRemoveFromCartOnClick(removeFromCartBtnId, product.id);
  }

  return {totalPrice, countProduct: totalItems};
}

function setRemoveFromCartOnClick(removeFromCartBtnId, productId) {
  let addToCartBtn = document.getElementById(removeFromCartBtnId);
  addToCartBtn.onclick = function () {
    removeFromCart(productId);
    let currentUser = getCurrentUser();
    let productsInCart = getCartProducts();
    let cartItemsForCurrentUser = productsInCart[currentUser.email];
    if(cartItemsForCurrentUser && cartItemsForCurrentUser.cartProducts){
      let getPriceAndCount = appendProducts(cartItemsForCurrentUser.cartProducts);
      getCartDetails(getPriceAndCount);
    }
   
  };
}
