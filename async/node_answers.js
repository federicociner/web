// Callbacks quiz #1
function doAsyncTask(cb) {
  // Solution 1
  setImmediate(cb);

  // Solution 2
  process.nextTick(() => {
    cb();
  });
}

doAsyncTask((_) => console.log(message));

let message = "Callback Called";

// Callbacks quiz #2
const fs = require("fs");

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    next(err, data);
  });
}

readFileThenDo((err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// Callbacks quiz #3
const fs = require("fs");

function readFileThenDo(next) {
  fs.readFile("./blah.nofile", (err, data) => {
    if (err) throw err;
    return data;
  });
}

try {
  readFileThenDo((data) => {
    console.log(data);
  });
} catch (err) {
  console.log("caught!");
  console.error(err);
}

// Promises quiz #1
const fs = require("fs");

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

readFile("./async-javascript-workshop/node/files/demofile.txt", "utf-8").then(
  (data) => {
    console.log("Success: ", data);
  },
  (err) => {
    console.log("Failed: ", err);
  }
);

// Promises quiz #2
const fs = require("fs");
const zlib = require("zlib");

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./async-javascript-workshop/node/files/demofile.txt", "utf-8").then(
  (file) =>
    gzip(file).then(
      (zippedFile) => console.log("Zipped file: ", zippedFile),
      (err) => console.log("Couldn't zip file: ", err)
    ),
  (err) => console.error("Couldn't read file: ", err)
);

// Promises quiz #3
const fs = require("fs");
const zlib = require("zlib");

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./async-javascript-workshop/node/files/demofile.txt", "utf-8")
  .then(
    (file) => gzip(file),
    (err) => console.error("Couldn't read file: ", err)
  )
  .then(
    (zippedFile) => console.log("Zipped file: ", zippedFile),
    (err) => console.log("Couldn't zip file: ", err)
  );

// Promises quiz #4
const fs = require("fs");
const zlib = require("zlib");

function gzip(data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(data, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

readFile("./async-javascript-workshop/node/files/demofile.txt", "utf-8")
  .then((file) => gzip(file))
  .then((zippedFile) => console.log("Zipped file: ", zippedFile))
  .catch((err) => console.log("Error caught: ", err))
  .finally((_) => console.log("Finished job!"));

// Promise.all()
const files = [
  "./async-javascript-workshop/node/files/demofile.txt",
  "./async-javascript-workshop/node/files/demofile.other.txt",
];
let promises = files.map((file) => readFile(file, "utf-8"));
Promise.all(promises).then((values) => console.log(values));

// Promises quiz #5
function readFileFake(fileName, sleep) {
  return new Promise((resolve, reject) => setTimeout(resolve, sleep, fileName));
}

function timeout(fileName, sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, fileName));
}

Promise.race([readFileFake("file1", 1000), timeout("file2", 2000)])
  .then((value) => {
    console.log("value: ", value);
  })
  .catch((err) => console.log("error: ", err));

// Promise quiz #6
function authenticate() {
  console.log("Authenticating");
  return new Promise((resolve) => setTimeout(resolve, 2000, { status: 200 }));
}

function publish() {
  console.log("Publishing");
  return new Promise((resolve) => setTimeout(resolve, 2000, { status: 403 }));
}

function safePublish() {
  return publish().then((res) => {
    if (res.status === 403) {
      return authenticate();
    }
    return res;
  });
}

function timeout(sleep) {
  return new Promise((resolve, reject) => setTimeout(reject, sleep, "timeout"));
}

Promise.race([safePublish(), timeout(3000)])
  .then((res) => console.log(res))
  .catch((err) => {
    if (err === "timeout") {
      console.error("Request timed out");
    } else {
      console.error(err);
    }
  });

// Async/await quiz #1
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const files = [
  "./async-javascript-workshop/node/files/demofile.txt",
  "./async-javascript-workshop/node/files/demofile.other.txt",
];

(async () => {
  const promises = files.map((name) => readFile(name, "utf8"));
  for await (let file of promises) {
    console.log(file);
  }
})();

// Async/await quiz #2
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);

const fileIterator = (files) => ({
  [Symbol.asyncIterator]: () => ({
    x: 0,
    next() {
      if (this.x >= files.length) {
        return Promise.resolve({
          done: true,
        });
      }

      return readFile(files[this.x++], "utf8").then((data) => {
        return { done: false, value: data };
      });
    },
  }),
});

(async () => {
  for await (let x of fileIterator([
    "./async-javascript-workshop/node/files/demofile.txt",
    "./async-javascript-workshop/node/files/demofile.other.txt",
  ])) {
    console.log(x);
  }
})();
