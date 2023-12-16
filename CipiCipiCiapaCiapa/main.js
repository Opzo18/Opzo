const changeText = [
  { text: "Cipi Cipi", color: "white", time: 1000 },
  { text: "Chapa Chapa", color: "orange", time: 800 },
  { text: "Dubi Dubi", color: "white", time: 800 },
  { text: "Daba Daba", color: "orange", time: 800 },
  { text: "Magico Mi", color: "white", time: 800 },
  { text: "Dubi Dubi", color: "orange", time: 800 },
  { text: "BOOM", color: "yellow", time: 400 },
  { text: "BOOM", color: "red", time: 400 },
  { text: "BOOM", color: "lime", time: 400 },
  { text: "BOOM", color: "magenta", time: 300 },
];

const textElement = document.getElementById("text");
let currentIndex = 0;

function updateText() {
  const currentText = changeText[currentIndex];
  textElement.textContent = currentText.text;
  textElement.style.color = currentText.color;

  console.log(`Text: ${currentText.text}`);

  currentIndex = currentIndex === changeText.length - 1 ? 0 : currentIndex + 1;

  setTimeout(updateText, currentText.time);

  const ok = document.getElementById("ok");
  ok.style.display = "none";
}

function start() {
  updateText();
}
