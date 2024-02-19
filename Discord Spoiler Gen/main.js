console.log("Hello World!");

const normalTextInput = document.querySelector(".normal-text");
const spoilerTextInput = document.querySelector(".spoiler-text");

function normalText() {
  const normalTextValue = normalTextInput.value;

  let normalResult = "";

  for (let i = 0; i < normalTextValue.length; i++) {
    normalResult += `||${normalTextValue[i]}||`;
  }

  spoilerTextInput.value = normalResult;
}

function spoilerText() {
  const spoilerTextValue = spoilerTextInput.value;

  let spoilerResult = spoilerTextValue.replace(/\|\|/g, "");

  normalTextInput.value = spoilerResult;
}

normalTextInput.addEventListener("input", normalText);
spoilerTextInput.addEventListener("input", spoilerText);
