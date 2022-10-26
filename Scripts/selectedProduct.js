import { Product, initData, getProductList, addProduct, removeProduct } from "./products.js";
import { addToCart, totalItemsInCart } from "./cart.js";

function setAddToCartOnClick(productId) {
    let addToCartBtn = document.getElementById("add-to-cart");
    addToCartBtn.onclick = function(){
        let quantity = Number(document.getElementById("quantity").value);
        let response = addToCart(productId, quantity);
        if(response === "nouserfound"){
            alert("You have not logged in yet. Please login and come back.")
            return;
        }
        //alert("Product Added to Cart");
        let totalCartItems = totalItemsInCart();
        document.getElementById("total-cart-items").innerHTML = totalCartItems;
        location.href="./main.html";
    }
}

function getSelectedProductId(){
    let params = (new URL(document.location)).searchParams;
    let pid = params.get("id");
    return pid;
}
function getProductDetail(productId) {
    let product;
    let productList = getProductList();
    for (let prod of productList) {
        if ( prod.id === productId){
            product = prod;
            break;
        }
    }
    return product;
}

window.onload = () => {

    let productId = getSelectedProductId();
    let product = getProductDetail(productId);
    setAddToCartOnClick(productId);
   
    //loading data for content 1
    document.querySelector(".note").innerHTML = product.category;
    let imageTag = document.querySelector(".prodImg");
    imageTag.setAttribute("src", product.imgAddress);

    //loading data for content 2
    document.querySelector(".prodName").innerHTML = product.name;
    document.querySelector(".description").innerHTML = product.description;
    let price = product.price.toString();
    price = price.includes('$') ? price : price + '$';
    let priceElements = document.querySelectorAll(".price");
    for ( let e of priceElements) {
        e.innerHTML = "Price: " + price;
    }

    //add event listener for "Add to cart" button
    document.querySelector(".addToCart").addEventListener("click", addProdToCart);
    
}

function addProdToCart() {
    let productId = getSelectedProductId();
    let quantity ;
    let options = document.querySelectorAll("option");
    for ( let opt of options) {
        if ( opt.selected === true) {
            quantity = parseInt(opt.innerHTML);
            break;
        }
    }
    addProductToCart(productId, quantity);
    location.href = "./main.html";
}

