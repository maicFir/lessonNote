console.log("hello");
// 创建一个 EventSource 对象
const eventSource = new EventSource("http://localhost:3000/api/sse");

// 监听服务器发送的消息
eventSource.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messagesDiv = document.getElementById("app").querySelector(".content");
  const newMessage = document.createElement("p");
  newMessage.textContent = `Message: ${message.message}, Timestamp: ${message.timestamp}`;
  messagesDiv.appendChild(newMessage);
};

// 监听连接打开事件
eventSource.onopen = () => {
  console.log("SSE connection opened");
};

// 监听错误事件
eventSource.onerror = (error) => {
  console.error("SSE error:", error);
  eventSource.close();
};
