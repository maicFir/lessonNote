console.log("background.js");

function sendMessageToContent(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}
let data = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type } = request;
  // 打开设置页面
  if (type == "open_set_page") {
    chrome.runtime.openOptionsPage();
  }
  if (type === "changeTheme") {
    console.log("=sender", sender);
    sendResponse(data);
    // 向content.js传入数据
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   console.log(tabs[0].id, "=====");
    //   //   sendMessageToContent(tabs[0].id, {
    //   //     type: "changeTheme",
    //   //     data: request.theme,
    //   //   });
    //   chrome.tabs.sendMessage(tabs[0].id, {
    //     type: "changeTheme",
    //     data: request.theme,
    //   });
    // });
  }
  if (type === "content") {
    data = request.data;
    console.log(request, "=content-request");
  }
});
// 监听连接
chrome.runtime.onConnect.addListener(function (port) {
  // 在连接上添加消息监听器
  console.assert(port.name === "sample-connect");
  port.onMessage.addListener(function (message) {
    console.log(message, "=content-message");
    // 当前激活的tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { changeColor: msg.changeColor });
    });
  });
});
