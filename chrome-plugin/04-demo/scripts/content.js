

console.log('loader-content')

// var port = chrome.runtime.connect();

// popup与content之间的通信
// port.onMessage.addListener(function (msg) {
//     //   port.postMessage({counter: msg.counter+1});
//     console.log(msg, '111222')
// });

// 1. content向service worker发送信息
chrome.runtime.sendMessage('get-user-data', (response) => {
    // 2，接受service worker回调过来的信息
    console.log('received service worker data', response);
});

const render = ({ style, title }) => {
    const boxDom = document.querySelector('.box');
    const contentDom = document.querySelector('.content');
    const resultDom = document.querySelector('.result');
    boxDom.style.width = style.width;
    boxDom.style.height = style.height;
    boxDom.style.backgroundColor = style.backgroundColor;
    contentDom.innerText = title;
    resultDom.innerText = JSON.stringify({ ...style, title }, null, 2)
}
// 接收popup.js发送过来的信息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('content', request, sender);
    const {
        inputColorValue,
        titleValue,
        widthValue,
        heightValue } = request;
    const style = {
        width: `${widthValue}px`,
        height: `${heightValue}px`,
        backgroundColor: inputColorValue
    }
    const receivePopupInfo = {
        style,
        title: titleValue
    }
    // 向popup.js回传信息
    sendResponse(receivePopupInfo)
    render(receivePopupInfo)
});


// var port = chrome.runtime.connect({ name: "Maic" });
// port.postMessage({ joke: "A" });
// port.onMessage.addListener((msg) => {
//     console.log(msg)
// })
