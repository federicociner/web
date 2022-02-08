const throttle = (callback, delay) => {
  let isThrottled;

  return function (...args) {
    if (isThrottled) {
      return;
    }

    isThrottled = true;
    const context = this;
    setTimeout(() => {
      callback.apply(context, args);
      isThrottled = false;
    }, delay);
  };
};

let button = document.createElement("button");
button.textContent = "Click me!";
document.body.appendChild(button);

button.addEventListener(
  "click",
  throttle(() => {
    console.log("The time is: ", new Date().toISOString());
  }, 1000)
);
