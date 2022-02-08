const cloneDeep = (item) => {
  // Handle null or undefined values
  if (!item) {
    return item;
  }

  var result;

  // Normalize primitives e.g. new String('abc') or new Number('42')
  let types = [Boolean, String, Number];
  types.forEach((type) => {
    if (item instanceof type) {
      result = type(item);
      return result;
    }
  });

  // Handle three simple types (number, string, boolean) and null or undefined
  if (item === null || typeof obj !== "object") {
    return item;
  }

  // Handle arrays
  if (item instanceof Array) {
    result = [];
    item.forEach((element, index) => {
      result[index] = cloneDeep(element);
    });
    return result;
  }

  // Handle dates
  if (item instanceof Date) {
    result = new Date();
    result.setTime(item.getTime());
    return result;
  }

  // Handle DOM nodes
  if (item.nodeType && typeof item.cloneNode === "function") {
    result = item.cloneNode(true);
    return result;
  }

  // Handle objects
  if (item instanceof Object) {
    result = {};
    for (let key in item) {
      if (item.hasOwnProperty(key)) result[key] = cloneDeep(item[key]);
    }
    return result;
  }
};

let cloned = cloneDeep({
  primitiveNumber: Number("42"),
  primitiveString: String("Hello world!"),
  stringItem: "foobar",
  numberItem: 420,
  booleanItem: false,
  dateItem: new Date(),
  nodeItem: document.createElement("div"),
  arrayItem: [1, 2, 3, 4, 5],
  objectItem: {
    first: 1,
    second: "2",
    third: [1, 2, { fourth: 4 }],
  },
});

console.log(cloned);
