const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

for (let i = 0; i < 300; i++) {
  particles.push({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 300 + 50,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.005,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  });
}

function drawPortal() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    const x = centerX + Math.cos(p.angle) * p.radius;
    const y = centerY + Math.sin(p.angle) * p.radius;
    ctx.beginPath();
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();
    p.angle += p.speed;
    p.radius *= 0.999; // slowly spiral inward
  });

  // Draw glowing rings
  ctx.beginPath();
  ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,0,255,0.7)";
  ctx.lineWidth = 5;
  ctx.shadowBlur = 20;
  ctx.stroke();

  requestAnimationFrame(drawPortal);
}
drawPortal();

function startPortalAnimation(room) {
  let animationDuration = 2000; // 2 seconds
  let startTime = Date.now();

  function animateWarp() {
    let elapsed = Date.now() - startTime;
    ctx.fillStyle = `rgba(0,0,0,${elapsed/animationDuration})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (elapsed < animationDuration) {
      requestAnimationFrame(animateWarp);
    } else {
      window.location.href = room;
    }
  }

  animateWarp();
}