// scripts.js
const canvas = document.getElementById("redPacketRain");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let modal = document.getElementById("modal");
let closeButton = document.querySelector(".close");
let continueButton = document.getElementById("continueButton");

// 加载红包图片
const redPacketImage = new Image();
redPacketImage.src = "./red-packet.png"; // 替换为你的图片路径
let isPaused = false;
redPacketImage.onload = () => {
  let redPackets = [];

  class RedPacket {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 70;
      this.speed = Math.random() * 5 + 1; // 红包下落速度
    }

    draw() {
      ctx.drawImage(redPacketImage, this.x, this.y, this.width, this.height);
    }

    update() {
      if (!isPaused) {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.height;
          this.x = Math.random() * (canvas.width - this.width);
        }
      }
      this.draw();
    }
  }

  for (let i = 0; i < 30; i++) {
    const x = Math.random() * (canvas.width - 50);
    const y = Math.random() * (canvas.height - 70);
    redPackets.push(new RedPacket(x, y));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    redPackets.forEach((packet) => packet.update());
  }

  animate();

  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    redPackets = redPackets.filter((packet) => {
      if (
        mouseX > packet.x &&
        mouseX < packet.x + packet.width &&
        mouseY > packet.y &&
        mouseY < packet.y + packet.height
      ) {
        isPaused = true; // 点击红包时暂停所有红包的掉落
        modal.style.display = "block"; // 显示弹框
        return false;
      }
      return true;
    });
  });

  // 添加一个按钮或事件来恢复动画
  document.addEventListener("keydown", function (event) {
    if (event.key === "r") {
      // 按R键恢复动画
      isPaused = false;
    }
  });

  // 关闭弹框
  closeButton.onclick = function () {
    modal.style.display = "none";
    isPaused = false; // 恢复动画
  };

  // 继续按钮
  continueButton.onclick = function () {
    modal.style.display = "none";
    isPaused = false; // 恢复动画
  };
};
