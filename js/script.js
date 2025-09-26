let cursorTrail = [];

function enterPortal() {
  document.getElementById("portalScene").classList.add("hidden");
  document.getElementById("mapScene").classList.remove("hidden");
  initMapScene();
}

function initMapScene() {
  const mapCanvas = document.getElementById("mapCanvas");
  const ctx = mapCanvas.getContext("2d");
  mapCanvas.width = window.innerWidth;
  mapCanvas.height = window.innerHeight;

  const portals = [
    {x: 300, y: 200, name: "Memory Island"},
    {x: 700, y: 300, name: "Dream Forest"},
    {x: 1100, y: 250, name: "Cosmic Stage"}
  ];

  document.addEventListener("mousemove", e => {
    cursorTrail.push({x: e.clientX, y: e.clientY, life: 1});
  });

  function drawMap() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

    // Draw cursor trails
    cursorTrail.forEach((trail, index) => {
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${trail.life})`;
      ctx.fill();
      trail.life -= 0.02;
      if (trail.life <= 0) cursorTrail.splice(index, 1);
    });

    // Draw portals
    portals.forEach(portal => {
      ctx.beginPath();
      ctx.arc(portal.x, portal.y, 50, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 255, 0.7)";
      ctx.shadowColor = "#ff00ff";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "20px Poppins";
      ctx.fillText(portal.name, portal.x - 60, portal.y + 80);
    });

    requestAnimationFrame(drawMap);
  }
  drawMap();

  mapCanvas.addEventListener("click", e => {
    portals.forEach(portal => {
      const dist = Math.hypot(e.clientX - portal.x, e.clientY - portal.y);
      if (dist < 50) openRoom(portal.name);
    });
  });
}

function openRoom(name) {
  document.querySelectorAll(".room").forEach(r => r.classList.remove("active"));
  if (name === "Memory Island") document.getElementById("memoryIsland").classList.add("active");
  if (name === "Dream Forest") document.getElementById("dreamForest").classList.add("active");
  if (name === "Cosmic Stage") document.getElementById("cosmicStage").classList.add("active");
}