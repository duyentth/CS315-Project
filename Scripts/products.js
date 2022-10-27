export class Product {
  constructor( name, category, quantity, price, description, imgAddress ,id="CS315-" + Date.now().toString(32), dateCreated = Date.now(), rating = getRatingInteger(1,5)) {
      this.id = id.toUpperCase(),
      this.name = name,
      this.category = category,
      this.quantity = quantity,
      this.price = price,
      this.description = description,
      this.imgAddress = imgAddress
      this.dateCreated = dateCreated;
      this.rating = rating;
  }
}
export let initData = () => {

  if (localStorage.getItem("productList") != null) return;


  let products = [];
  let desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam."
  + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod "
  + "tempor incididunt ut labore et dolore magna aliqua. Quis lectus nulla at volutpat diam.";
  for (let i = 1; i <= 10; i++) {   
      let  now =  Date.now() + i * 10000; 
       let product = new Product("Name " + i, "Category " + i, Math.floor(Math.random() * 500 + 1),
          Math.floor(Math.random() * 2000 + 10), desc,"./images/image-" + i + ".webp","CS315-" + now.toString(32) );
     products.push(product);
  }
  let products_json = JSON.stringify(products);
  localStorage.setItem("productList", products_json);
}

function getRatingInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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
      productList.push(new Product( product.name, product.category, product.quantity, product.price, product.description, product.imgAddress ,product.id, product.dateCreated, product.rating));
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
      find = product.category.toLowerCase() === category.toLowerCase();
    }
    return find;
  });
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
      return 1;
    } else if (product1.dateCreated > product2.dateCreated) {
      return -1;
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

export function filterRating(){
  let products = getProductList();
  return products.filter((item) => item.rating >= 4);
}