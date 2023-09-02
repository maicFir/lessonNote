window.onload = function () {
  document.getElementById("light").onclick = function () {
    console.log("light");
    // changeTheme,向background发送消息
    chrome.runtime.sendMessage(
      { type: "changeTheme", theme: "light" },
      (res) => {
        console.log(res);
      }
    );
  };
  let flag = true;
  document.getElementById("dark").onclick = function () {
    flag = !flag;
    // port.postMessage({ type: "changeTheme", theme: "dark" });
    const theme = flag ? "dark" : "light";
    sendMessageToActiveTab({
      action: "buttonClicked",
      theme,
    });
    chrome.storage.local.set({ theme });
  };

  function sendMessageToActiveTab(message) {
    // 获取当前活动标签
    // chrome.tabs.query({}, function (tabs) {
    //   console.log(tabs, "tabs");
    //   tabs
    //     .filter((v) => v.active)
    //     .forEach((v) => {
    //       chrome.tabs.sendMessage(v.id, message);
    //     });
    // });
    chrome.tabs.query({}, function (tabs) {
      console.log(tabs, "tabs");
      tabs.forEach((v) => {
        chrome.tabs.sendMessage(v.id, message);
      });
    });
  }
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request, "set");
  });
};
