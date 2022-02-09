function factorial(n) {
  if (n <= 1) {
    return n;
  }

  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

function mergeSort(arr) {
  function merge(left, right) {
    const result = [];

    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    return [...result, ...left, ...right];
  }

  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const firstHalf = arr.splice(0, mid);
  const left = mergeSort(firstHalf);
  const right = mergeSort(arr);

  return merge(left, right);
}

function towerOfHanoi(n, source = "A", auxiliary = "B", destination = "C") {
  if (n === 1) {
    console.log(`from ${source} to ${destination}`);
    return;
  }

  towerOfHanoi(n - 1, source, destination, auxiliary);
  console.log(`from ${source} to ${destination}`);
  towerOfHanoi(n - 1, auxiliary, source, destination);
}

function binarySearch(arr, target) {
  function _search(arr, target, left, right) {
    if (left > right) {
      return -1;
    }

    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] > target) {
      return _search(arr, target, left, mid - 1);
    } else {
      return _search(arr, target, mid + 1, right);
    }
  }

  return _search(arr, target, 0, arr.length - 1);
}

function printNumber(n) {
  if (n == 1) {
    console.log(n);
    return;
  }
  printNumber(n - 1);
  console.log(n);
  printNumber(n - 1);
}

function isPrime(n, i = 2) {
  if (i == n) {
    return true;
  }

  if (n % i === 0) {
    return false;
  }

  return isPrime(n, i + 1);
}

function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

console.log(gcd(120, 144));
