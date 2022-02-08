const debounce = (callback, delay) => {
  let debounceTimer;

  return function (...args) {
    context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback.apply(context, args), delay);
  };
};

let button = document.createElement("button");
button.textContent = "Click me!";
document.body.appendChild(button);

button.addEventListener(
  "click",
  debounce(() => {
    console.log("The time is: ", new Date().toUTCString());
  }, 2000)
);
