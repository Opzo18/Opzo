document.addEventListener("DOMContentLoaded", function () {
  const countInput = document.getElementById("countInput");
  const startBtn = document.getElementById("startBtn");
  const screen = document.getElementById("screen");
  let update;

  startBtn.addEventListener("click", start);

  window.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Enter") {
      start();
    }
  });

  function start() {
    var number = countInput.value;

    if (number <= 9) {
      window.alert("Number has to be bigger than 10");
      return;
    }

    if (number > 9999) {
      window.alert("Number has to be smaller than 9999");
      return;
    }

    countInput.style.display = "none";
    startBtn.style.display = "none";
    screen.style.display = "block";

    screen.style.color = "red";
    screen.textContent = "Starting!";

    update = setInterval(function () {
      screen.style.color = "lime";
      screen.textContent = number;
      if (number === 0) {
        screen.style.color = "red";
        screen.textContent = "Finish!";

        setTimeout(function () {
          reset();
        }, 2000);
      } else {
        number--;
      }
    }, 1000);
  }

  function reset() {
    countInput.style.display = "block";
    startBtn.style.display = "block";
    screen.style.display = "none";
    countInput.value = "";
    clearInterval(update);
  }
});
