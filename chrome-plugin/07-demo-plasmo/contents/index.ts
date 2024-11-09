import type { PlasmoCSConfig } from "plasmo"

document.body.style.backgroundColor = "red"
console.log("hello world")
export const config: PlasmoCSConfig = {
  matches: ["https://www.baidu.com/*"],
  all_frames: true,
  world: "MAIN"
}
