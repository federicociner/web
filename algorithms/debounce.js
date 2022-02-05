const debounce = (callback, wait) => {
  let debounceTimer;

  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => callback.apply(this, args), wait);
  };
};

function sayHello(firstName, lastName) {
  console.log(`Hi, my name is ${firstName} ${lastName}!`);
}

function sayHelloMethod() {
  console.log(`Hi, my name is ${this.name}!`);
}

const Fed = {
  name: "Fed",
  speak: debounce(sayHello, 1000),
  speakMethod: debounce(sayHelloMethod, 2000),
};

Fed.speak("Billy", "Bob");
Fed.speakMethod();
