

function reddenPage() {
    console.log(document.body)

    document.body.style.backgroundColor = 'red';
}
chrome.action.onClicked.addListener((tab) => {
    console.log(tab)
    // chrome.tabs.create({ url: 'index.html' });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reddenPage
    });
});