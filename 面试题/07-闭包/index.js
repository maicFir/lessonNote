/**
 *
 *创建私有变量，延长变量生命周期
 */
function setSize(size) {
  // debugger;
  return function () {
    this.style.fontSize = `${size}px`;
  };
}

const size20 = setSize(20);
const size30 = setSize(30);
const size40 = setSize(40);

document.getElementById("h1").onclick = size20;
document.getElementById("h2").onclick = size30;
document.getElementById("h3").onclick = size40;
