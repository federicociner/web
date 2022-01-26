function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function flattenArray() {
  var result = [];

  for (let i = 0; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      result.push.apply(result, flattenArray.apply(this, arguments[i]));
    } else {
      result.push(arguments[i]);
    }
  }

  return result;
}

function flattenRecursive(array, result) {
  if (array.length === 0) {
    return result;
  }

  head = array[0];
  rest = array.slice(1);
  if (Array.isArray(head)) {
    return flattenRecursive(head.concat(rest), result);
  }
  result.push(head);

  return flattenRecursive(rest, result);
}

function flattenModern(array) {
  var result = [];

  array.forEach((element) => {
    if (Array.isArray(element)) {
      result.push(...flattenModern(element));
    } else {
      result.push(element);
    }
  });

  return result;
}

const array = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
assert(
  JSON.stringify(flattenArray(array)) === JSON.stringify(expected),
  "Arrays do not match!"
);
assert(
  JSON.stringify(flattenModern(array)) === JSON.stringify(expected),
  "Arrays do not match!"
);
assert(
  JSON.stringify(flattenRecursive(array, [])) === JSON.stringify(expected),
  "Arrays do not match!"
);
