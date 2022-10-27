import { getCurrentUser } from "./user.js" 
import { totalItemsInCart } from "./cart.js"

window.addEventListener("load", function () {
  fetch("./nav.html")
    .then((response) => response.text())
    .then((text) => (document.getElementById("nav-holder").innerHTML = text));
  let script = document.createElement("script");
  script.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
  );
  script.setAttribute(
    "integrity",
    "sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
  );
  script.setAttribute("crossorigin", "anonymous");
  document.body.append(script);
  setTimeout(function(){
     if (getCurrentUser() != null){
        if (getCurrentUser().isManager) 
          window.location.href = './inventory.html';
        document.getElementById('login').innerHTML = 'Hello ' + getCurrentUser().fname;
        document.getElementById('login').href = '#';
        let totalCartItems = totalItemsInCart();
      document.getElementById("total-cart-items").innerHTML = totalCartItems;
      document.getElementById('logout').style.display = '';
     }
  }, 1000);
});


