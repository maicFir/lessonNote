function test(a, ...rest) {
  console.log('hello', a, ...rest);
}
test(1, 2, 3, 4);
