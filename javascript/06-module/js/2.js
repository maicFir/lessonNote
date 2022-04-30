console.log('没有定时器的defer加载', 2);
setTimeout(() => {
  console.log('有定时器的defer加载', 2);
}, 1000);