import { User, users } from "./user.js";

//document.querySelector("#firstName").focus();


//Add eventlistener to Email field
let userEmail = document.querySelector("#email");
userEmail.addEventListener("focusout", validateEmail);
userEmail.addEventListener("keydown", clearErrorMsg);

//add eventlistener to Password field
let passwordField = document.querySelector("#password");
passwordField.addEventListener("focusout", validatePassword);
passwordField.addEventListener("keydown", clearErrorMsg);

//add evenListener to Repeat Password field
let repPasswordField = document.querySelector("#retypepassword");
repPasswordField.addEventListener("focusout", validateRepPassword);
repPasswordField.addEventListener("keydown", clearErrorMsg);

//add eventListener to signUp button
let signUpBtn = document.querySelector(".btnSignUp");
signUpBtn.addEventListener("click", signUp);

function validateEmail() {
    let email = userEmail.value;
    let aPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    if (aPos < 1 || dotPos - aPos < 2) {
        clearErrorMsg();
        showErrorMsg("Please enter a vaild email.");
        document.querySelector("#email").focus();
    }
}

function clearErrorMsg() {
    if (document.querySelector(".errMsg") != null) {
        document.querySelector(".errMsg").remove();
    }
}

function showErrorMsg(msg) {
    let errMsgP = document.createElement("p");
    document.querySelector(".btnSignUp").before(errMsgP);
    errMsgP.outerHTML = "<p class='errMsg'>" + msg + "</p>";
    document.querySelector(".errMsg").style.color = "red";
}
/**
 *a valid password is at least 6 characters long and at most 20 characters long

contains at least one digit.

contains at least one lowercase English character.

contains at least one uppercase English character.

contains at least one special character. The special characters are: !@#$%^&*()-+
 */
function validatePassword() {
    let password = passwordField.value;
    const length = password.length;
    const strArr = password.split('');
    let isValid = false;
    const specialCharacters = '!@#$%^&*()-+';
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const checkWith = (char, set) => set.includes(char);
    const containsSpecialCharacter = strArr.some(char => checkWith(char, specialCharacters));
    const containsLowercase = strArr.some(char => checkWith(char, alphabets));
    const containsUppercase = strArr.some(char => checkWith(char, alphabets.toUpperCase()));
    const containsNumber = strArr.some(char => checkWith(char, numbers));
    isValid = length >= 6 && length <= 20 && containsSpecialCharacter && containsLowercase && containsUppercase && containsNumber;
    if (!isValid) {
        clearErrorMsg();
        showErrorMsg("Please enter a vaild password.");
        document.querySelector("#password").focus();
    }
}

function validateRepPassword() {
    let password = passwordField.value.trim();
    let repPassword = repPasswordField.value.trim();
    console.log(password, repPassword);
    if (password != repPassword) {
        clearErrorMsg();
        showErrorMsg("Your password doesn't match.");
        //document.querySelector("#retypepassword").focus();
    }
}

//
//let newUserList = [];
function signUp(event) {
    
    let fName = document.querySelector("#firstName").value.trim();
    let lName = document.querySelector("#lastName").value.trim();
    let email = document.querySelector("#email").value.trim();
    let phone = document.querySelector("#phone").value.trim();
    phone != null ? phone : "";
    let password = document.querySelector("#password").value.trim();
    let repPassword = document.querySelector("#retypepassword").value.trim();
    let address = document.querySelector("#address").value.trim();
    address != null ? address : "";

    if (fName === "" || lName === "" || email === "" || password === "" 
            || repPassword === "" || password != repPassword) {
        //isAllValid = false;
        event.preventDefault();
    } else {
        let newUser = new User(fName,lName, email,phone, address,password); 
        console.log(newUser);
        users.push(newUser);
        //newUserList.concat(users)
        //console.log(users, newUserList);
       // event.preventDefault();

        document.querySelector(".signUpFrom").setAttribute("action", "./login.html");
    }

}
export let exportUserList = newUserList;
