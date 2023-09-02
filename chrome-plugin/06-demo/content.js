const body = document.getElementsByTagName("body")[0];
const pDom = document.createElement("div");

pDom.innerHTML = `<div id="app" style="position:absolute;bottom:60px;left:0;">
    <p id="text">hello word</p>
    <p id="tx">向background.js通信</p>
    <p id="set">设置<p>
</div>`;

body.appendChild(pDom);
if (pDom) {
  const setBtnDom = document.getElementById("set");
  const txBtnDom = document.getElementById("tx");
  setBtnDom.onclick = function () {
    chrome.runtime.sendMessage({
      type: "open_set_page",
    });
  };
  txBtnDom.onclick = function () {
    chrome.runtime.sendMessage({
      type: "content",
      data: {
        num: Math.random(),
      },
    });
  };
}
console.log("content is start");
const textDom = document.getElementById("text");
let port = chrome.runtime.connect({ name: "sample-connect" });
port.onMessage.addListener(function (message) {
  console.log(message);
  // if (message.command == "changeColor") {
  //   textDom.style.backgroundColor = message.color;
  // }
});

// 监听background传送过来的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { theme } = request;
  textDom.style.color = theme === "dark" ? "black" : "red";
});
chrome.storage.local.get("theme", function (result) {
  console.log(result, "result");
  const { theme = "" } = result || { theme: "" };
  if (theme === "dark") {
    textDom.style.color = "black";
  } else {
    textDom.style.color = "red";
  }
});
