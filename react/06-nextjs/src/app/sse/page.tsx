"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");
    eventSource.onmessage = function (event) {
      console.log("Received message:", event.data);
      setText((pre) => pre + event.data);
    };

    return () => {
      if (eventSource.readyState != 2) {
        eventSource.close();
      }
    };
  }, []);

  return <p>{text}</p>;
}
