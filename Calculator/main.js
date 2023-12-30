document.addEventListener("DOMContentLoaded", function () {
  const screen = document.querySelector(".screen");
  const buttons = document.querySelector(".buttons");

  // Update screen
  function updateScreen(value) {
    screen.textContent = value;
  }

  // Handle buttons
  function handleButton(value) {
    if (value === "=") {
      try {
        const result = eval(screen.textContent);
        updateScreen(result);
      } catch (error) {
        updateScreen("Error");
      }
    } else if (value === "C") {
      updateScreen("");
    } else if (value === "backspace") {
      const currentScreenValue = screen.textContent;
      updateScreen(currentScreenValue.slice(0, -1));
    } else if (value === "x") {
      screen.textContent += "*";
    } else {
      screen.textContent += value;
    }
  }

  buttons.addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "BUTTON") {
      handleButton(target.textContent);
    }
  });

  // Keyboard handle
  window.addEventListener("keydown", function (event) {
    const key = event.key;
    if ((key >= "0" && key <= "9") || key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
      handleButton(key);
    } else if (key === "Enter") {
      handleButton("=");
    } else if (key === "Backspace") {
      const currentScreenValue = screen.textContent;
      updateScreen(currentScreenValue.slice(0, -1));
    }
  });
});
