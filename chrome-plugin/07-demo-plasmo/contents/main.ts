import type { PlasmoCSConfig } from "plasmo"

import { sendToBackgroundViaRelay } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_start",
  world: "MAIN"
}
console.log("main")
const storage = new Storage()

storage.watch({
  "test-cache": (value) => {
    console.log(value, "new-value")
  }
})
// window.relay = {
//   description: "Message from content script in main world",
//   tryRelay: async () => {
//     let result = await sendToBackgroundViaRelay({
//       name: "open-extension"
//     })
//     return result
//   }
// }
