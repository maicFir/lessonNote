import { useEffect, useRef, useState } from "react"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

const storage = new Storage()

function IndexPopup() {
  const [storageData, setStorageData] = useStorage("test-cache")
  const [data, setData] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const handleToTab = () => {
    const runtimeId = chrome.runtime.id
    chrome.tabs.create({
      url: `chrome-extension://${runtimeId}/tabs/index.html`
    })
  }
  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("EVAL output: " + JSON.stringify(event.data))
    })
  }, [])
  const sandbox_html = `chrome-extension://${chrome.runtime.id}/sandboxes/index.html`

  const handleStorage = () => {
    const storageData = { name: "Maic", age: 18, number: Math.random() }
    storage.set("test-cache", storageData)
    setStorageData(storageData)
  }
  return (
    <div
      style={{
        padding: 16
      }}>
      <div onClick={handleToTab}>go to tab</div>
      <h2>
        Welcome to your{" "}
        <a href="https://www.plasmo.com" target="_blank">
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      <button
        onClick={() => {
          iframeRef.current.contentWindow.postMessage(
            { data: Math.random() },
            "*"
          )
        }}>
        Trigger iframe eval
      </button>
      <button onClick={handleStorage}>Set Storage</button>
      <div>{JSON.stringify(storageData)}</div>
      <iframe src={sandbox_html} ref={iframeRef} style={{ display: "none" }} />
    </div>
  )
}

export default IndexPopup
