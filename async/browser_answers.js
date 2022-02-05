// Callbacks quiz
async function doAsyncTask(cb) {
  return Promise.resolve(cb);
}

doAsyncTask().then((_) => console.log(message));

let message = "Callback Called";
