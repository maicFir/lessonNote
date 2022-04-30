console.log('没有定时器的async', 1);
setTimeout(() => {
  console.log('有定时器的async，异步加载不保证顺序', 1);
}, 1000);