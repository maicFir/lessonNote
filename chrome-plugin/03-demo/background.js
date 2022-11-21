// 只会第一次加载安装插件时触发
chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL("index.html");
    let tab = await chrome.tabs.create({ url });
    console.log(tab)
})