import { User, users } from "./user.js";
//document.querySelector("#firstName").focus();
let userEmail = document.querySelector("#email");

userEmail.addEventListener("focusout",validateEmail );
userEmail.addEventListener("keydown",clearErrorMsg);

let passwordField = document.querySelector("#password");

passwordField.addEventListener("focusout",validatePassword );
passwordField.addEventListener("keydown",clearErrorMsg);


function validateEmail(){
    let email = userEmail.value;
    let aPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");
    if( aPos < 1 || dotPos - aPos < 2) {
        clearErrorMsg();
        let errMsg = document.createElement("p");
        document.querySelector(".btnSignUp").before(errMsg);
        errMsg.outerHTML = "<p class='errMsg'>Please enter a valid email.</p>";
        document.querySelector(".errMsg").style.color = "red";
        document.querySelector("#email").focus();
    }
}

function clearErrorMsg() {
    if( document.querySelector(".errMsg") != null) {
        document.querySelector(".errMsg").remove();
    }
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
    if( !isValid) {
        clearErrorMsg();
        let errMsg = document.createElement("p");
        document.querySelector(".btnSignUp").before(errMsg);
        errMsg.outerHTML = "<p class='errMsg'>Please enter a valid password.</p>";
        document.querySelector(".errMsg").style.color = "red";
        document.querySelector("#password").focus();
    }
}