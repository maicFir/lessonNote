console.log('popup...');

const btn = document.getElementById('mybutton');
const setText = (elemId, msg) => {
    document.getElementById(elemId).innerText = msg;
}
btn.addEventListener('click', () => {
    setText('mybutton', '向content.js通信，正在发送数据');
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     // 发送数据
    //     chrome.tabs.sendMessage(tab.id, { bgcolor: 'red' }, function (res) {
    //         console.log(res, 'res')
    //     })
    // })
})


