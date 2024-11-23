const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // 允许跨域请求
app.get("/api/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  // 定义一个定时器，每 2 秒发送一次数据
  const intervalId = setInterval(() => {
    const timestamp = new Date().toISOString();
    res.write(
      `data: ${JSON.stringify({ message: "Hello SSE!", timestamp })}\n\n`
    );
  }, 2000);
  // 处理客户端断开连接的情况
  req.on("close", () => {
    clearInterval(intervalId);
    console.log("Client disconnected");
  });
});
// 启动3000端口服务
app.listen(3000, () => {
  console.log("SSE server running at http://localhost:3000");
});
