// scripts.js
const canvas = document.getElementById("redPacketRain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class RedPacket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 70;
    this.speed = Math.random() * 5 + 1; // 红包下落速度
    this.color = "red";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.height;
      this.x = Math.random() * (canvas.width - this.width);
    }
    this.draw();
  }
}

let redPackets = [];
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
    return !(
      mouseX > packet.x &&
      mouseX < packet.x + packet.width &&
      mouseY > packet.y &&
      mouseY < packet.y + packet.height
    );
  });
});
