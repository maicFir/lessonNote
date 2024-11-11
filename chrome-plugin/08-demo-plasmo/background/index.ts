import windowChanger from "./helper"

console.log("background script running")

const inject = async (tabId: number) => {
  chrome.scripting.executeScript(
    {
      target: {
        tabId
      },
      world: "MAIN", // MAIN in order to access the window object
      func: windowChanger
    },
    () => {
      console.log("Background script got callback after injection")
    }
  )
}

// Simple example showing how to inject.
// You can inject however you'd like to, doesn't have
// to be with chrome.tabs.onActivated
chrome.tabs.onActivated.addListener((e) => {
  inject(e.tabId)
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openSidePanel") {
    console.log(sender)
    debugger
    chrome.sidePanel
      .setOptions({
        path: "sidepanel.html",
        enabled: true
      })
      .catch((error) => {
        debugger
        console.error("Failed to open side panel:", error)
      })
  }
})
