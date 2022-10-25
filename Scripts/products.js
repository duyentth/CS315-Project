export class Product {
  constructor(
    name,
    category,
    quantity,
    price,
    description,
    imgAddress,
    id = "CS315-" + Date.now().toString(32),
    dateCreated = Date.now()
  ) {
    (this.id = id.toUpperCase()),
      (this.name = name),
      (this.category = category),
      (this.quantity = quantity),
      (this.price = price),
      (this.description = description),
      (this.imgAddress = imgAddress);
    this.dateCreated = dateCreated;
  }
}
export let initData = () => {
  let products = [];
  for (let i = 1; i <= 20; i++) {
    let now = Date.now() + i * 100;
    let product = new Product(
      "Name " + i,
      "Category " + i,
      Math.floor(Math.random() * 500 + 1),
      Math.floor(Math.random() * 2000 + 10),
      "Description " + i,
      "./images/image-" + i + ".webp",
      "CS315-" + now.toString(32)
    );
    products.push(product);
  }
};

export let addProduct = (product) => {
  let productList = getProductList();
  productList.push(product);
  let productList_json = JSON.stringify(productList);
  localStorage.setItem("productList", productList_json);
};

export let getProductList = () => {
  let products_raw = JSON.parse(localStorage.getItem("productList"));
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

export let getProductListByFilter = (filterValue) => {
  let productList = getProductList();
  console.log(filterValue);
  console.log(productList);
  if (filterValue) {
    productList = productList.filter(function (product) {
      return (
        product.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
        product.description.toLowerCase().indexOf(filterValue.toLowerCase()) >
          -1 ||
        product.category.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
      );
    });
  }
  console.log(productList);
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
