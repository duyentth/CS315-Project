export class Product {
  constructor( name, category, quantity, price, description, imgAddress ,id="CS315-" + Date.now().toString(32)) {
      this.id = id.toUpperCase(),
      this.name = name,
      this.category = category,
      this.quantity = quantity,
      this.price = price,
      this.description = description,
      this.imgAddress = imgAddress
      this.dateCreated = Date.now();
  }
}
export let initData = () => {

  if (localStorage.getItem("productList") != null) return;


  let products = [];
  let desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam."
  + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam.";
  for (let i = 1; i <= 20; i++) {   
      let  now =  Date.now() + i * 10000; 
       let product = new Product("Name " + i, "Category " + i, Math.floor(Math.random() * 500 + 1),
          Math.floor(Math.random() * 2000 + 10), desc,"./images/image-" + i + ".webp","CS315-" + now.toString(32) );
     products.push(product);
  }
  let products_json = JSON.stringify(products);
  localStorage.setItem("productList", products_json);
}

export let addProduct = (product) => {
  let productList = getProductList();
  productList.push(product);
  let productList_json = JSON.stringify(productList);
  localStorage.setItem("productList", productList_json);
}

export let removeProduct = (productId) => {
  let productList = getProductList();
  for ( let i = 0; i < productList.length; i ++) {
      if ( productList[i].id === productId) {
          productList.splice(i,1);
          break;
      }
  }
  let productList_json = JSON.stringify(productList);
  localStorage.setItem("productList", productList_json);
}
export let getProductList = () => {
  let products_raw = JSON.parse(localStorage.getItem("productList"));
  let productList = [];
  for (let product of products_raw) {//name, category, quantity, price, description, id
      productList.push(new Product( product.name, product.category, product.quantity, product.price, product.description, product.imgAddress ,product.id, product.dateCreated));
  }
  return productList;
}

export let getProductListByFilter = ({ searchBoxValue, category }) => {
  let productList = getProductList();
  if (!searchBoxValue && !category) {
    return productList;
  }
  productList = productList.filter(function (product) {
    let find = false;
    if (searchBoxValue) {
      find =
        product.name.toLowerCase().indexOf(searchBoxValue.toLowerCase()) > -1 ||
        product.description
          .toLowerCase()
          .indexOf(searchBoxValue.toLowerCase()) > -1 ||
        product.category.toLowerCase().indexOf(searchBoxValue.toLowerCase()) >
          -1;
    }
    if (category) {
      find = find ||
        product.category.toLowerCase() === category.toLowerCase();
    }
    return find;
  });
  return productList;
};

export let getCartProducts = () => {
  let products_raw = JSON.parse(localStorage.getItem("cart"));
  if (!products_raw) return [];
  let productList = [];
  for (let product of products_raw) {
    //name, category, quantity, price, description, id
    productList.push(
      new Product(
        product.name,
        product.category,
        product.quantity,
        product.price,
        product.description,
        product.imgAddress,
        product.id,
        product.dateCreated
      )
    );
  }
  return productList;
};

export function getBestDealsItems() {
  return getProductList().filter((item) => item.price <= 500);
}

export function getNewArrivalsItems() {
  let productList = getProductList();
  sortByDateCreated(productList);
  return getProductList().slice(0, 10);
}

function sortByDateCreated(products) {
  products.sort(function (product1, product2) {
    if (product1.dateCreated < product2.dateCreated) {
      return -1;
    } else if (product1.dateCreated > product2.dateCreated) {
      return 1;
    } else return 0;
  });
}

export function getProductsByPrice(products, minPrice, maxPrice) {
  if (!minPrice) minPrice = 0;
  if (!maxPrice) maxPrice = 1000000;
  return products.filter((item) => {
    return item.price >= Number(minPrice) && item.price <= Number(maxPrice);
  });
}

export function getProductById(productId) {
  return getProductList().find(function (product) {
    return productId === product.id;
  });
}

export function addProductToCart(productId) {
  let productToAddInCart = getProductById(productId);
  let cartProducts = getCartProducts();
  cartProducts.push(productToAddInCart);
  let cartProducts_json = JSON.stringify(cartProducts);
  localStorage.setItem("cart", cartProducts_json);
}

export function getCartProductIndexById(productId) {
  return getCartProducts().findIndex(function (product) {
    return productId === product.id;
  });
}

export function removeProductFromCart(productId) {
  let productIndex = getCartProductIndexById(productId);
  console.log(productIndex);
  let cartProducts = getCartProducts();
  cartProducts.splice(productIndex, 1);
  let cartProducts_json = JSON.stringify(cartProducts);
  localStorage.setItem("cart", cartProducts_json);
}

