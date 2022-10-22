import { User, users } from "./user.js";
//page load
document.querySelector(".login").addEventListener("click", login);
document.querySelector("#userEmail").focus();
let userEmail = document.querySelector("#userEmail");
userEmail.addEventListener("focusout",validateEmail );
userEmail.addEventListener("keydown",clearErrorMsg);

function validateEmail(){
    let email = userEmail.value.trim();
    let aPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    console.log("apos and dotpos ", aPos,dotPos);
    if( aPos < 1 || (dotPos - aPos) < 2) {
        clearErrorMsg();
        let errMsg = document.createElement("p");
        document.querySelector("#userEmail").before(errMsg);
        errMsg.outerHTML = "<p class='errMsg'>Please enter a valid email.</p>";
        document.querySelector(".errMsg").style.color = "red";
        document.querySelector("#userEmail").focus();
    }
}

function clearErrorMsg() {
    if( document.querySelector(".errMsg") != null) {
        document.querySelector(".errMsg").remove();
    }
}
function login(event) {
    let email = document.querySelector("#userEmail").value.trim();
    let password = document.querySelector("#userPassword").value.trim();
    console.log("input email, password: ", email, password);
    let isMatched = false;
    let isManger = false;
    for (let user of users) {
        console.log(" user: ", user)
        if (user.email === email && user.password === password) {
            isMatched = true;
            isManger = user.isManager;
            break;
        }
    }
    if (!isMatched) {
        event.preventDefault();
        document.querySelector(".loginForm").setAttribute("action", "./login.html");
        clearErrorMsg();
        let errMsg = document.createElement("p");
        document.querySelector("#userEmail").before(errMsg);
        errMsg.outerHTML = "<p class='errMsg'>That email or password is incorrect.</p>";
        document.querySelector(".errMsg").style.color = "red";
        document.querySelector("#userEmail").focus();
        return;
    }
    if (isManger === true) {
        document.querySelector(".loginForm").setAttribute("action", "./inventory.html");
    } else {
        document.querySelector(".loginForm").setAttribute("action", "./main.html");
    }
}