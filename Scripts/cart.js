import {getProductById} from "./products.js";
import {getCurrentUser} from "./user.js";

class CartProduct {
    constructor(products, quantity){
        this.products = products;
        this.quantity = quantity;
    }
}

export class Cart {
  constructor(user, cartProducts) {
      this.id = "CART-" + Date.now().toString(32).toUpperCase();
      this.user = user;
      this.cartProducts = cartProducts;
  }
}

export function totalItemsInCart(){
    let itemsInCart = getCartProducts();
    let currentUser = getCurrentUser();
    let cartItemsForCurrentUser = itemsInCart[currentUser.email];
    if(!cartItemsForCurrentUser) return 0;
    let cartProducts = cartItemsForCurrentUser["cartProducts"];
    let totalCount = 0;
    for(let product in cartProducts){
        totalCount = totalCount + cartProducts[product]["quantity"];
    }
    return totalCount;
}

export let getCartProducts = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

// {
//     [userId]: {
//         cartId:1,
//         user: user,
//         cartProducts: {
//             [productId]: {product: product, quantity: quantity},
//             [productId]: {product, quantity}
//         }
//     }
// }

// {"sharada.khatiwada@miu.edu":{"CS315-1GG9CAN35":{"products":{"products":{"id":"CS315-1GG9CAN35","name":"Name 1","category":"Category 1","quantity":242,"price":260,"description":"Description 1","imgAddress":"./images/image-1.webp","dateCreated":1666762224981,"rating":2},"quantity":1}}}}

export let addToCart = (productId, quantity = 1) => {
    // localStorage.removeItem("cart");
    let currentUser = getCurrentUser();
    if(currentUser === null)
        return "nouserfound";
    let productsInCart = getCartProducts();
    if(!productsInCart)
        productsInCart = {};
    let cartItemsForCurrentUser = productsInCart[currentUser.email];
    let product = getProductById(productId);

    // no items in cart for this user
    if(!cartItemsForCurrentUser){
        cartItemsForCurrentUser = {};
        let cartProduct = new CartProduct(product, quantity);
        cartItemsForCurrentUser = new Cart(currentUser, { [productId] : cartProduct} );
    }

    // no items in cart for the particular product
    else if(!cartItemsForCurrentUser["cartProducts"][productId]){
        cartItemsForCurrentUser["cartProducts"][productId] = new CartProduct(product, quantity);
    }

    // update the quantity
    else{
        let cartProduct = cartItemsForCurrentUser["cartProducts"][productId];
        cartProduct["quantity"] = cartProduct["quantity"] + quantity;
    }
    productsInCart[currentUser.email] = cartItemsForCurrentUser;
    localStorage.setItem("cart", JSON.stringify(productsInCart) );
}

export let removeFromCart = (productId) => {
    let currentUser = getCurrentUser();
    let productsInCart =  getCartProducts();
    let cartItemsForCurrentUser = productsInCart[currentUser.email]; 
    let cartItems = cartItemsForCurrentUser.cartProducts;

    if(!cartItems){
        return;
    }

    // if there is only 1 product, delete from cart
    if(cartItems[productId]["quantity"] === 1){
        delete cartItems[productId];
        cartItemsForCurrentUser.cartProducts = cartItems;
    }else{
        cartItems[productId]["quantity"] = cartItems[productId]["quantity"] - 1;
    }
    productsInCart[currentUser.email] = cartItemsForCurrentUser;
    console.log(productsInCart);
    localStorage.setItem("cart", JSON.stringify(productsInCart) );
}

