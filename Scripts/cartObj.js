import { getProductList } from "./products.js";
import { getCurrentUser } from "./user.js";

export class Cart {
    constructor(userId, productId, quantity) {
        this.userId = userId,
        this.productId = productId,
        this.quantity = quantity
    }
}
export let getCurrentCart = (currentUserID) => {
    let currentUserCart= [];
    let cart_raw = JSON.parse(localStorage.getItem("myCart") );
    let carts = [];
    for(let i = 0; i<cart_raw.length; i++){ 
        let item = cart_raw[i];
        carts.push(new Cart(item.userId, item.productId, item.quantity));
    }
    for ( let cart of carts) {
        if ( cart.userId === currentUserID) {
            currentUserCart.push(cart);
        }
    }
    return currentUserCart;
}
export let getAllUserCarts = () => {
    let allUserCarts = [];
    let allUserCarts_raw = JSON.parse(localStorage.getItem("myCart"));
    for(let i = 0; i< allUserCarts_raw.length; i++){ 
        let item = allUserCarts_raw[i];
        allUserCarts.push(new Cart(item.userId, item.productId, item.quantity));
    }
    return allUserCarts;
}

export let addProductToCart = (productId, quantity) => {
    let currentUserId = getCurrentUser().email;
    let newCart = new Cart(currentUserId, productId, quantity);
    if (localStorage.getItem("myCart") != null) {
        let myCart = JSON.parse(localStorage.getItem("myCart"));
        for( let prod of myCart) {
            if ( prod.userId === currentUserId && prod.productId === productId) {
                prod.quantity += quantity;
            } else {
                myCart.push(newCart);
            }
        }
        localStorage.setItem("myCart",JSON.stringify(myCart));
    } else {
        let myCart = [];
        myCart.push(newCart);
        localStorage.setItem("myCart",JSON.stringify(myCart));
    }
}
export let removeProductOutOfCart = (currentUserId, productId) => {
    let allUserCarts = getAllUserCarts();
    for (let i = 0; i < allUserCarts.length; i ++) {
        if ( allUserCarts[i].userId === currentUserId && allUserCarts[i].productId === productId) {
            allUserCarts.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("myCart", JSON.stringify(allUserCarts));
};

export let updateQuantity = (currentUserId ,productId, quantity) => {
    let allUserCarts = getAllUserCarts();
    for (let i = 0; i < allUserCarts.length; i ++) {
        if ( allUserCarts[i].userId === currentUserId && allUserCarts[i].productId === productId) {
            allUserCarts[i].quantity = quantity;
            break;
        }
    }
    localStorage.setItem("myCart", JSON.stringify(allUserCarts));
};

