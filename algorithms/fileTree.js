function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function buildFileTree(paths) {
  let result = [];
  let level = { result };

  paths.forEach((path) => {
    path.split("/").reduce((accum, name) => {
      if (!accum[name]) {
        accum[name] = { result: [] };
        accum.result.push({ name, children: accum[name].result });
      }

      return accum[name];
    }, level);
  });

  return result;
}

const expected = [
  { name: "test.txt", children: [] },
  {
    name: "components",
    children: [
      { name: "a.jsx", children: [] },
      { name: "b.jsx", children: [] },
      { name: "c", children: [{ name: "c.jsx", children: [] }] },
    ],
  },
  {
    name: "pages",
    children: [
      { name: "index.jsx", children: [] },
      {
        name: "first",
        children: [
          { name: "tab.jsx", children: [] },
          { name: "tab.css", children: [] },
        ],
      },
      {
        name: "second",
        children: [
          { name: "content.jsx", children: [] },
          { name: "constants", children: [{ name: "index.js", children: [] }] },
          { name: "styles", children: [{ name: "style.css", children: [] }] },
        ],
      },
    ],
  },
];

let paths = [
  "test.txt",
  "components/a.jsx",
  "components/b.jsx",
  "pages/index.jsx",
  "pages/first/tab.jsx",
  "pages/first/tab.css",
  "pages/second/content.jsx",
  "pages/second/constants/index.js",
  "pages/second/styles/style.css",
  "components/c/c.jsx",
];

assert(
  JSON.stringify(buildFileTree(paths)) === JSON.stringify(expected),
  "File trees do not match!"
);
