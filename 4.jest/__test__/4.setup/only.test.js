

test('this will be the only test that runs', () => {
  expect(true).toBe(false);
});

xit('this test will not run', () => {
  console.log(it.skip)
  expect('A').toBe('A');
});
