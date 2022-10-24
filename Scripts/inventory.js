import { Product, initData, getProductList, addProduct } from "./products.js";
window.onload = () => {
    //localStorage.setItem("productList", "");
    initData();
    let productList = getProductList();
    showProductList(productList);
};

function showProductList(list) {
    for (let i = 0; i < list.length; i ++) {
        let myBody = document.getElementById("prod_content");
        let newRow = document.createElement("tr");
        myBody.append(newRow);
        newRow.outerHTML = "<td><input type='checkbox' name='myCheck' id='myCheckbox'></td>"
            + "<th scope='row'>" + (i + 1) + "</th>"
            + "<td>" + list[i].id + "</td>"
            + "<td>" + list[i].name + "</td>"
            + "<td>" + list[i].category + "</td>"
            + "<td>" + list[i].quantity + "</td>"
            + "<td>" + list[i].price + "</td>"
            + "<td>" + list[i].description + "</td>"
    }



}