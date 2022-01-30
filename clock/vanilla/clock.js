function getTime() {
  const date = new Date();
  const secondsRatio = date.getSeconds() / 60;
  const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + date.getHours()) / 12;

  return {
    secondsRatio,
    minutesRatio,
    hoursRatio,
  };
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

function updateClock() {
  const { secondsRatio, minutesRatio, hoursRatio } = getTime();
  const hoursHand = document.querySelector(".hand.hour");
  const minutesHand = document.querySelector(".hand.minute");
  const secondsHand = document.querySelector(".hand.second");

  setRotation(secondsHand, secondsRatio);
  setRotation(minutesHand, minutesRatio);
  setRotation(hoursHand, hoursRatio);
}

updateClock();
setInterval(updateClock, 1000);
