import styleText from "data-text:./index.module.scss"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import React, { memo } from "react"

import style from "./index.module.scss"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}
export const config: PlasmoCSConfig = {
  matches: ["https://www.baidu.com/*"],
  all_frames: true
}
interface Props {}

const Index: React.FC<Props> = (props) => {
  const {} = props
  // 在content中无法直接打开选项页面
  const handleToOptionsPage = () => {
    console.log(chrome.runtime)
    // chrome.runtime.openOptionsPage()
    // chrome.tabs.create({
    //   url: `chrome-extension://${chrome.runtime.id}/options.html`
    // })
  }
  const handleToAboutPage = () => {
    // chrome.tabs.create({
    //   url: `chrome-extension://${chrome.runtime.id}/tabs/about.html`
    // })
  }

  return (
    <div className={style["app"]}>
      <p>hello,欢迎关注公众号Web技术学苑</p>
      {/* <p onClick={handleToOptionsPage}> go to options page</p>
      <p onClick={handleToAboutPage}> go to about page</p> */}
    </div>
  )
}

export default memo(Index)
