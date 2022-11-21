
console.log('loader-content')

var port = chrome.runtime.connect();
// 接收web页面发送过来的信息
window.addEventListener("message", (event) => {
    console.log(port, 'port');
    console.log(`来自${event.data.type}页面的数据`)
    // We only accept messages from ourselves
    if (event.source != window) {
        return;
    }
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: " + event.data.text);
        port.postMessage(event.data.text);
    }
}, false);


// popup与content之间的通信
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        //   port.postMessage({counter: msg.counter+1});
        console.log(msg)
    });
});
