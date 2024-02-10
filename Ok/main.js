document.addEventListener("DOMContentLoaded", () => {
  const no = document.querySelector(".btnNo");
  const yes = document.querySelector(".btnYes");
  const choose = document.querySelector(".choose");
  const love = document.querySelector(".love");

  let currentWidth = 380;
  let currentHeight = 50;
  let currentFont = 40;

  function marry() {
    choose.style.display = "none";
    love.style.display = "flex";
    document.body.style.background = "linear-gradient(to right, rgb(203, 218, 0), rgb(78, 235, 46), rgb(14, 184, 226))";
    document.body.style.backgroundSize = "120%";
  }

  no.addEventListener("click", () => {
    yes.style.width = currentWidth + 5 + "px";
    yes.style.height = currentHeight + 5 + "px";
    yes.style.fontSize = currentFont + 5 + "px";

    currentWidth += 5;
    currentHeight += 5;
    currentFont += 5;

    if (currentWidth === 400) {
      no.innerHTML = "TAK";
    } else if (currentWidth > 400) {
      marry();
    }
  });

  yes.addEventListener("click", marry);
});
