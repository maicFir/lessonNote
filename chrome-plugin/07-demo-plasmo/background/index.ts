import "@plasmohq/messaging/background"

import { startHub } from "@plasmohq/messaging/pub-sub"
import { Storage } from "@plasmohq/storage"

console.log("background.js hello")

console.log(`BGSW - Starting Hub`)

const storage = new Storage()

storage.watch({
  "test-cache": (value) => {
    console.log(value, "new-value")
  }
})
startHub()
