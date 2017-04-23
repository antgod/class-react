const sum = require('../../src/1.start/sum.es6').default;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});