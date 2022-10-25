import { Product, initData, getProductList, addProduct, removeProduct } from "./products.js";
console.log("username is ", document.cookie);
window.onload = () => {
    //localStorage.setItem("productList", "");
    //initData();
    let productList = getProductList();
    showProductList(productList);
    //document.querySelector("#productName").focus();

    //call clickhandler for data table function

    //add event listener to functionn buttons
    let addBtn = document.querySelector("#addProd");
    let editBtn = document.querySelector("#editProd");
    let deleteBtn = document.querySelector("#deleteProd");
    let clearBtn = document.querySelector("#clearbtn");
    addBtn.addEventListener("click", addNewProduct);
    editBtn.addEventListener("click", editProduct);
    deleteBtn.addEventListener("click", deleteProducts);
    clearBtn.addEventListener("click", clearInputData);

}



function showProductList(list) {
    let oldAddedRows = document.querySelectorAll(".myRow");
    if (oldAddedRows.length != 0) {
        for (let eachRow of oldAddedRows) {
            eachRow.remove();
        }
    }
    for (let i = 0; i < list.length; i++) {
        let myBody = document.getElementById("prod_content");
        let newRow = document.createElement("tr");
        myBody.append(newRow);
        newRow.outerHTML = "<tr class='myRow'><td><input type='checkbox' name='myCheck' id='myCheckbox-" + (i + 1) + "' disabled ></td>"
            + "<th scope='row'>" + (i + 1) + "</th>"
            + "<td>" + list[i].id + "</td>"
            + "<td>" + list[i].name + "</td>"
            + "<td>" + list[i].category + "</td>"
            + "<td>" + list[i].quantity + "</td>"
            + "<td>" + list[i].price + "</td>"
            + "<td>" + list[i].description + "</td>"
            + "<td>" + list[i].imgAddress + "</td></tr>"
    }
}



function addNewProduct() {
    let name = document.querySelector("#productName").value.trim();
    let categories = document.querySelectorAll("option");
    let selectedCatrgory;
    for (let option of categories) {
        if (option.selected === true) {
            selectedCatrgory = option.innerHTML;
            break;
        }
    }
    let quantity = document.querySelector("#quantity").value.trim();
    let price = document.querySelector("#price").value.trim() + "$";
    let imageAddress = document.querySelector("#imgAddress").value.trim();
    let description = document.querySelector("#productDes").value.trim();
    //create new Product
    let newProduct = new Product(name, selectedCatrgory, quantity, price, description,
        imageAddress,);
    //add new Product to ProductLst localStorage
    addProduct(newProduct);
    showProductList(getProductList());
    clearInputData();
    showAlert("success", "Added Successfully!");

}

//we have 3 types of alert: success, error, info
function showAlert(type, msg) {
    let myAlertDiv = document.querySelector("#alertDiv");
    let classAlert = (type === "success") ? "alert-success" : (type === "error") ? "alert-error" : "alert-info";
    myAlertDiv.classList.add(classAlert);
    myAlertDiv.innerHTML = msg;
    setTimeout(() => {
        myAlertDiv.classList.remove(classAlert);
        myAlertDiv.innerHTML = ""
    }, 2000);
}

function editProduct() {
    if (document.querySelector("#editProd").value === "Edit") {

        showAlert("info", "Please choose one product to edit!");

        //change the text button "Edit"  to "Save"
        let editbtn = document.querySelector("#editProd").value = "Save";

        //set Add. Delete and Filter button to disable
        document.querySelector("#addProd").disabled = true;
        document.querySelector("#deleteProd").disabled = true;
        document.querySelector("#filterProd").disabled = true;

        //add event listener click on each row and then load the info of product on the form
        let table = document.getElementById("product-tb");
        let rows = table.getElementsByClassName("myRow");
        for (let i = 0; i < rows.length; i++) {
            let currentRow = table.rows[i];
            let createClickHandler =
                function (row) {
                    return function () {
                        //debugger
                        let cell = row.getElementsByTagName("td")[1];
                        let id = cell.innerHTML;
                        //store id value into localStorage
                        localStorage.setItem("selectedProductId", id);
                        let name = row.getElementsByTagName("td")[2].innerHTML;
                        let category = row.getElementsByTagName("td")[3].innerHTML;
                        let quantity = parseInt(row.getElementsByTagName("td")[4].innerHTML);
                        let price = parseFloat(row.getElementsByTagName("td")[5].innerHTML);
                        let description = row.getElementsByTagName("td")[6].innerHTML;
                        let img = row.getElementsByTagName("td")[7].innerHTML;
                        fillInData(name, category, quantity, price, img, description);
                    };
                };

            currentRow.onclick = createClickHandler(currentRow);
        }


    } else {//eventlistener on Save button
        if (confirm("Your product will be updated immediately!")) {//debugger
            removeProduct(localStorage.getItem("selectedProductId"));
            //collect new info for product
            let name = document.querySelector("#productName").value.trim();
            let categories = document.querySelectorAll("option");
            let selectedCatrgory;
            for (let option of categories) {
                if (option.selected === true) {
                    selectedCatrgory = option.innerHTML;
                    break;
                }
            }
            let quantity = document.querySelector("#quantity").value.trim();
            let price = document.querySelector("#price").value.trim() + "$";
            let imageAddress = document.querySelector("#imgAddress").value.trim();
            let description = document.querySelector("#productDes").value.trim();
            //create new Product
            let newProduct = new Product(name, selectedCatrgory, quantity, price, description,
                imageAddress, localStorage.getItem("selectedProductId"));

            addProduct(newProduct);
            showProductList(getProductList());
            clearInputData();
            showAlert("success", "Updated Successfully!");
        } else {//cancel the change, clear fields
            clearInputData();
        }
        document.querySelector("#editProd").value = "Edit";
        document.querySelector("#addProd").disabled = false;
        document.querySelector("#deleteProd").disabled = false;
        document.querySelector("#filterProd").disabled = false;
    }


}

function deleteProducts() { 
    showAlert("info", "Please choose products to delete!");

}

function clearInputData() {
    document.querySelector("#productName").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#imgAddress").value = "";
    document.querySelector("#productDes").value = "";
    document.querySelector("#editProd").value = "Edit";
    document.querySelector("#addProd").disabled = false;
    document.querySelector("#deleteProd").disabled = false;
    document.querySelector("#filterProd").disabled = false;
}
function fillInData(name, category, quantity, price, image, description) {
    document.querySelector("#productName").value = name;
    document.querySelector("#quantity").value = quantity;
    document.querySelector("#price").value = price;
    document.querySelector("#imgAddress").value = image;
    document.querySelector("#productDes").value = description;
    let options = document.querySelectorAll("option");
    for (let opt of options) {
        if (opt.innerHTML === category) {
            opt.selected = true;
            break;
        }
    }
}

