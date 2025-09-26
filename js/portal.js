function enterPortal(room) {
  startPortalAnimation(room);
}

const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 150; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1
  });
}

function animatePortal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,0,255,0.8)`;
    ctx.fill();

    // Move particles towards center
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    p.x += (centerX - p.x) * 0.01 + p.dx;
    p.y += (centerY - p.y) * 0.01 + p.dy;
  });

  requestAnimationFrame(animatePortal);
}
animatePortal();

function startPortalAnimation(room) {
  let animationTime = 2000; // 2 seconds
  document.getElementById("portalScene").style.display = "none";

  let start = Date.now();
  function animationLoop() {
    let elapsed = Date.now() - start;
    if (elapsed < animationTime) {
      // Portal effect — could expand glow, zoom, etc.
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animationLoop);
    } else {
      window.location.href = room; // Redirect to the chosen room
    }
  }
  animationLoop();
}