function enterPortal() {
  document.getElementById("portalScene").classList.add("hidden");
  document.getElementById("voidContent").classList.remove("hidden");
  document.body.classList.add("entered");
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

// Particle stars effect
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    star.y -= star.speed;
    if (star.y < 0) star.y = canvas.height;
  }
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});