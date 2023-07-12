// Loader

window.addEventListener("load", function () {
  var loader = document.querySelector(".loader");
  loader.style.display = "none";
});


// Big img
function loadLargeImage(src) {
  var largeImage = document.createElement("img");
  largeImage.src = src;
  largeImage.style.maxWidth = "70%";
  largeImage.style.maxHeight = "70%";

  var modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";

  modal.appendChild(largeImage);
  document.body.appendChild(modal);
}
