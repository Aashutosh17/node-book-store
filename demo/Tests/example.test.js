const { reverse, sum } = require("../example/example");

test("reverse of apple", () => {
  const output = reverse("apple");
  expect(output).toBe("elppa");
});

test("reverse of a", () => {
  expect(reverse("a").toBe("b"));
});

test("reverse of react", () => {
  expect(reverse("react").toBe("tcdshcv"));
});


