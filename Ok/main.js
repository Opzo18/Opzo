document.addEventListener("DOMContentLoaded", () => {
  let option = "";
  const choose = document.querySelector(".choose");
  const love = document.querySelector(".love");

  let currentWidth = 180;
  let currentHeight = 50;
  let currentFont = 40;

  // Marry
  function marry() {
    option = "yes";
    updateLocalStorage();
    choose.style.display = "none";
    love.style.display = "flex";
    document.body.style.background = "linear-gradient(to right, rgb(203, 218, 0), rgb(78, 235, 46), rgb(14, 184, 226))";
    document.body.style.backgroundSize = "120%";
  }

  // Load local storage
  // window.onload = () => {
  //   if (!localStorage.getItem("choosedOption")) return;

  //   option = localStorage.getItem("choosedOption");
  //   console.log(option);
  //   if (option == "yes") {
  //     marry();
  //   }
  // };

  const no = document.querySelector(".btnNo");
  const yes = document.querySelector(".btnYes");

  // no btn handle
  no.addEventListener("click", () => {
    yes.style.width = currentWidth + 5 + "px";
    yes.style.height = currentHeight + 5 + "px";
    yes.style.fontSize = currentFont + 5 + "px";

    currentWidth += 5;
    currentHeight += 5;
    currentFont += 5;
    option = "no";
    updateLocalStorage();

    if (currentWidth === 400) {
      no.innerHTML = "TAK";
    } else if (currentWidth > 400) {
      marry();
    }
  });

  // yes btn handle
  yes.addEventListener("click", marry);

  // Local storage
  function updateLocalStorage() {
    localStorage.setItem("choosedOption", option);
  }
});
