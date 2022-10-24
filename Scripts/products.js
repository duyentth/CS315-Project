const NEW_ARRIVAL = "NA";
const BEST_DEALS = "BD";
const NORMAL = "NM";

export class Product {
  constructor(
    name,
    category,
    quantity,
    price,
    description,
    imgAddress,
    id = "CS315-" + Date.now().toString(32)
  ) {
    (this.id = id.toUpperCase()),
      (this.name = name),
      (this.category = category),
      (this.quantity = quantity),
      (this.price = price),
      (this.description = description),
      (this.imgAddress = imgAddress);
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
      Math.floor(Math.random() * 2000 + 10) + "$",
      "Description " + i,
      "./images/image-" + i + ".webp",
      "CS315-" + now.toString(32)
    );
    products.push(product);
  }

  // init best deals products
  for (let i = 1; i <= 20; i++) {
    let now = Date.now() + i * 100;
    let product = new Product(
      "Name " + i,
      BEST_DEALS,
      Math.floor(Math.random() * 500 + 1),
      Math.floor(Math.random() * 2000 + 10) + "$",
      "Description " + i,
      "./images/best-deals/image-" + i + ".jpeg",
      "CS315-" + now.toString(32)
    );
    products.push(product);
  }

  // init new arrivals products
  for (let i = 1; i <= 5; i++) {
    let now = Date.now() + i * 100;
    let product = new Product(
      "Name " + i,
      NEW_ARRIVAL,
      Math.floor(Math.random() * 500 + 1),
      Math.floor(Math.random() * 2000 + 10) + "$",
      "Description " + i,
      "./images/new-arrivals/image-" + i + ".jpeg",
      "CS315-" + now.toString(32)
    );
    products.push(product);
  }
  let products_json = JSON.stringify(products);
  localStorage.setItem("productList", products_json);
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
        product.id
      )
    );
  }
  return productList;
};

export function getBestDealsItems() {
  return getProductList().filter((item) => item.category === BEST_DEALS);
}

export function getNewArrivalsItems() {
  return getProductList().filter((item) => item.category === NEW_ARRIVAL);
}
