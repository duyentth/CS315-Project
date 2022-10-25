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
});