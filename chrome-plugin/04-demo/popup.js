const $ = id => document.getElementById(id);

function setBadge() {
    const inputColorValue = $('color-input').value;
    const titleValue = $('title-input').value;
    const widthValue = $('width-input').value;
    const heightValue = $('height-input').value;
    const info = {
        inputColorValue,
        titleValue,
        widthValue,
        heightValue
    }
    chrome.action.setBadgeText({ text: inputColorValue });
    // 扩展脚本向content发出信息
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, info, function (response) {
            console.log(response, 'content.js回传过来的信息');
        });
    });
}
$('submit').addEventListener('click', setBadge);

['width', 'height'].forEach(dom => {
    const curent = $(`${dom}-input`);
    curent.addEventListener('change', (evt) => {
        $(`${dom}-result`).innerText = evt.target.value;
    })
});
// popup与content长连接对话
// chrome.runtime.onConnect.addListener(function (port) {
//     console.assert(port.name === "Maic");
//     port.onMessage.addListener(function (msg) {
//         if (msg.joke === "A") {
//             port.postMessage({ question: "你好吗?" });
//         } else if (msg.answer === "I'm B") {
//             port.postMessage({ question: "yes" });
//         }
//     });
// });
