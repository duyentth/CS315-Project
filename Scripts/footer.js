window.addEventListener("load", function () {
  fetch("./footer.html")
    .then((response) => response.text())
    .then(
      (text) => (document.getElementById("footer-holder").innerHTML = text)
    );
});
