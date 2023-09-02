const closeDom = document.getElementById("close");
let port = chrome.runtime.connect({ name: "sample-connect" });
let flag = false;
closeDom.onclick = function () {
  console.log("close");
  flag = !flag;
  port.postMessage({
    command: "changeColor",
    color: flag ? "red" : "green",
  });
};
