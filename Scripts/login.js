import { User, getUsers } from "./user.js";


//page load
document.querySelector(".login").addEventListener("click", login);
//document.querySelector("#userEmail").focus();
let userEmail = document.querySelector("#userEmail");
userEmail.addEventListener("focusout",validateEmail );
userEmail.addEventListener("keydown",clearErrorMsg);
//let params = (new URL(document.location)).searchParams;
//let em = params.get("email");

function validateEmail(){
    let email = userEmail.value.trim();
    let aPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    if( aPos < 1 || (dotPos - aPos) < 2) {
        clearErrorMsg();
        showErrorMsg("Please enter a valid email.");
        document.querySelector("#userEmail").focus();
    }
}

function showErrorMsg(msg) {
    let errMsg = document.createElement("p");
    document.querySelector("#userEmail").before(errMsg);
    errMsg.outerHTML = "<p class='errMsg'>" + msg + "</p>";
    document.querySelector(".errMsg").style.color = "red";
}

function clearErrorMsg() {
    if( document.querySelector(".errMsg") != null) {
        document.querySelector(".errMsg").remove();
    }
}
function login(event) {
    let email = document.querySelector("#userEmail").value.trim();
    let password = document.querySelector("#userPassword").value.trim();
    let isMatched = false;
    let isManger = false;
    //debugger
    let users = getUsers();
    for (let user of users) {
        if (user.email === email && user.password === password) {
            isMatched = true;
            isManger = user.isManager;
            break;
        }
    }
    if (!isMatched) {
        event.preventDefault();
        //document.querySelector(".loginForm").setAttribute("action", "./login.html");
        clearErrorMsg();
        showErrorMsg("Your email/password combination is wrong.");
        document.querySelector("#userEmail").focus();
        return;
    }
    if (isManger === true) {
        document.querySelector(".loginForm").setAttribute("action", "./inventory.html");
    } else {
        document.querySelector(".loginForm").setAttribute("action", "./main.html");
    }
}