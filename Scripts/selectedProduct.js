import { Product, initData, getProductList, addProduct, removeProduct } from "./products.js";

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
    
}

