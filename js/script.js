function enterPortal() {
  const portalGlow = document.getElementById("portalGlow");
  const portalText = document.getElementById("portalText");
  const portalSubtext = document.getElementById("portalSubtext");
  const enterButton = document.getElementById("enterButton");
  const ripple = document.getElementById("ripple");

  // Ripple effect
  ripple.style.width = "0px";
  ripple.style.height = "0px";
  ripple.style.opacity = "0.6";
  ripple.style.left = `${enterButton.offsetLeft + enterButton.offsetWidth / 2}px`;
  ripple.style.top = `${enterButton.offsetTop + enterButton.offsetHeight / 2}px`;
  ripple.style.animation = "rippleEffect 2s ease forwards";

  // Portal zoom animation
  portalGlow.classList.add("portal-zoom");
  portalText.style.transition = "opacity 1s ease";
  portalText.style.opacity = "0";
  portalSubtext.style.transition = "opacity 1s ease";
  portalSubtext.style.opacity = "0";
  enterButton.style.transition = "opacity 1s ease";
  enterButton.style.opacity = "0";

  startTunnelWarp();

  setTimeout(() => {
    document.getElementById("portalScene").classList.add("hidden");
    document.getElementById("voidContent").classList.remove("hidden");
    document.body.classList.add("entered");
    stopTunnelWarp();
  }, 2000);
}

function openPage(page) {
  const content = document.getElementById("pageContent");

  if (page === "about") {
    content.innerHTML = "<h2>About Larissa’s Void</h2><p>This is a magical, interactive experience where you explore hidden worlds without leaving your browser.</p>";
  }
  else if (page === "gallery") {
    content.innerHTML = "<h2>Gallery</h2><p>Discover art and hidden surprises!</p>";
  }
  else if (page === "games") {
    content.innerHTML = "<h2>Games</h2><p>Mini-games coming soon!</p>";
  }
  else if (page === "secret") {
    content.innerHTML = "<h2>Secret Room</h2><p>🎇 You’ve unlocked a hidden layer of Larissa’s Void!</p>";
  }
}

// Tunnel warp effect
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const starCount = 400;
let mouse = { x: null, y: null };
let tunnelWarpActive = false;

for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    baseRadius: Math.random() * 1.5 + 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let star of stars) {
    star.z -= tunnelWarpActive ? 5 : 0.5;
    if (star.z <= 0) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
      star.z = canvas.width;
    }

    let k = 128.0 / star.z;
    let px = (star.x - centerX) * k + centerX;
    let py = (star.y - centerY) * k + centerY;
    let radius = star.baseRadius * (1 - star.z / canvas.width);

    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    if (mouse.x && mouse.y) {
      let dx = px - mouse.x;
      let dy = py - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.fillStyle = "#ff00ff";
        ctx.beginPath();
        ctx.arc(px, py, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  requestAnimationFrame(animateStars);
}
animateStars();

function startTunnelWarp() { tunnelWarpActive = true; }
function stopTunnelWarp() { tunnelWarpActive = false; }

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});