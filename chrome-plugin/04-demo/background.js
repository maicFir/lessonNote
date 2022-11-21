
const user = {
    username: 'Maic'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('background.js', message, sender)
    if (message === 'get-user-data') {
        sendResponse(user);
    }
});
