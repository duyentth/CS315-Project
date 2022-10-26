import {
  getProductListByFilter,
  getProductsByPrice,
  addProductToCart,
  getNewArrivalsItems,
  getBestDealsItems
} from "./products.js";

window.onload = function () {
  let url_string = window.location.href;
  let url = new URL(url_string);
  let searchBoxValue = url.searchParams.get("searchBox");
  let category = url.searchParams.get("category");
  let tag = url.searchParams.get("tag");
  let products = getProductListByFilter({searchBoxValue, category});
  products = filterByTag(products, tag);
  appendProducts(products);
  setFilterOnClick({searchBoxValue, category, tag});
};

function filterByTag(products, tag){
  if(tag === 'newArrival'){
    return getNewArrivalsItems()
  }else if(tag === 'bestDeals'){
    return getBestDealsItems();
  }else 
    return products;
}

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
                   <a href="productDetails.html?id=${product.id}"> <h5 class="card-title">${product.name}</h5> </a>
                    <h6 class="card-text">$ ${product.price}</h6>
                    <p class="card-text">${product.description}</p>
                  
                </div>
                 <button class="btn btn-primary" id="${addToCartBtnId}">Add to Cart</button>
            </div>
        </div>`
    );
    setAddToCartOnClick(addToCartBtnId, product.id);
  }
}

function setFilterOnClick({searchBoxValue, category, tag}) {
  let applyButton = document.getElementById("apply-filter");
  applyButton.onclick = function () {
    let minPrice = document.getElementById("price-min").value;
    let maxPrice = document.getElementById("price-max").value;
    let products = getProductListByFilter({searchBoxValue, category});
    if(tag){
      products = filterByTag(products, tag);
    }
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
