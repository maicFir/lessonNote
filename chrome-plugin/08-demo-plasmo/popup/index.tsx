import { useState } from "react"

import style from "./index.module.scss"

function IndexPopup() {
  const [data, setData] = useState("")
  const handleToOptionsPage = () => {
    // chrome.tabs.create({
    //   url: `chrome-extension://${chrome.runtime.id}/set.html`
    // })
    chrome.runtime.openOptionsPage()
  }
  const handleToNewTabPage = () => {
    chrome.tabs.create({
      url: `chrome-extension://${chrome.runtime.id}/newtab.html`
    })
  }
  const handleToAboutPage = () => {
    chrome.tabs.create({
      url: `chrome-extension://${chrome.runtime.id}/tabs/about.html`
    })
  }
  const handleOpenSlidePanel = () => {
    chrome.runtime.sendMessage({ action: "openSidePanel" })
  }
  return (
    <div className={style["app"]}>
      <h1>公众号：Web技术学苑</h1>
      <div onClick={handleToOptionsPage}>go to option page</div>
      <div onClick={handleToNewTabPage}>go to tab page</div>
      <div onClick={handleToAboutPage}>go to about page</div>
      <div onClick={handleOpenSlidePanel} className="openSidePanel">
        open side panel
      </div>
    </div>
  )
}

export default IndexPopup
