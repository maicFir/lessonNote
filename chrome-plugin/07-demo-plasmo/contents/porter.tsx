import Icon64 from "data-base64:~/assets/icon.png"
import type { PlasmoCSConfig } from "plasmo"
import Icon from "raw:~/assets/icon.png"
import { useEffect, useState } from "react"
import B2 from "react:~/assets/B.svg"
import Icon2 from "url:~/assets/icon.png"

import {
  relayMessage,
  sendToBackground,
  sendToBackgroundViaRelay
} from "@plasmohq/messaging"
import { usePort } from "@plasmohq/messaging/hook"
import { useStorage } from "@plasmohq/storage/hook"

import "./porter.scss"

export const config: PlasmoCSConfig = {
  matches: ["https://www.baidu.com/*"]
}

export default function Porter() {
  const [storageData] = useStorage("test-cache")
  const port = usePort<any>("mail")
  const [password, setPassword] = useState("")

  const handlePort = () => {
    port.send({
      password
    })
  }

  useEffect(() => {
    if (port.data) {
      console.log(port.data)
    }
  }, [port.data])

  const handleSendMessage = async () => {
    // const res = await sendToBackground({
    //   name: "open-extension",
    //   body: {
    //     id: 123
    //   },
    //   extensionId: chrome.runtime.id
    // })
    // console.log(res);
    // relayMessage({
    //   name: "open-extension"
    // });

    sendToBackgroundViaRelay({
      name: "open-extension"
    })
  }
  console.log(Icon)

  return (
    <div
      style={{
        position: "fixed",
        padding: "8px",
        right: 0,
        top: 10
      }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePort}>Test Password</button>
      <button onClick={handleSendMessage}>open message</button>
      <p>HELLO {port.data}</p>
      <p>{JSON.stringify(storageData)}</p>
      <img src={Icon} alt="" width={256} height={256} />
      <img src={Icon2} alt="" width={256} height={256} />
      <img src={Icon64} alt="" width={256} height={256} />
      <B2 />
      <div className={"img"}></div>
    </div>
  )
}
