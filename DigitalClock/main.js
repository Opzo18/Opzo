const digits = document.querySelector(".digits");

function updateTime() {
  var CurrentData = new Date();
  var hour = CurrentData.getHours();
  var minutes = CurrentData.getMinutes();
  var seconds = CurrentData.getSeconds();

  if (hour <= 9) {
    hour = "0" + hour;
  }

  if (minutes <= 9) {
    minutes = "0" + minutes;
  }

  if (seconds <= 9) {
    seconds = "0" + seconds;
  }

  digits.textContent = hour + ":" + minutes + ":" + seconds;
  requestAnimationFrame(updateTime);
}

updateTime();
