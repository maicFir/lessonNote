import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetOverlayAnchor
} from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.baidu.com/*"],
  all_frames: true
}
export const getOverlayAnchor: PlasmoGetOverlayAnchor = () =>
  document.querySelector(".quickdelete-wrap")

const ContentForQuick = () => (
  <span
    style={{
      borderRadius: 4,
      background: "red",
      height: "44px",
      display: "flex",
      alignItems: "center"
    }}>
    公众号:Web技术学苑
  </span>
)

export default ContentForQuick
