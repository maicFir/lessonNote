const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));

// 设置 HTML 文件目录
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./", "index.html"));
});
// 代理
app.use(
  "/api", // 需要代理的请求路径
  createProxyMiddleware({
    target: "http://localhost:3000", // 目标接口地址
    changeOrigin: true, // 修改请求的源头为目标地址
    pathRewrite: {
      "^/api": "/api",
    },
  })
);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
