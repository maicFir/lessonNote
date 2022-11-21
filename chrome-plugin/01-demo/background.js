

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        matches: ["<all_urls>"],
        files: ['content.js']
    });
});