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

  function drawMap() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

    for (let portal of portals) {
      ctx.beginPath();
      ctx.arc(portal.x, portal.y, 40, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 255, 0.7)";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "16px Poppins";
      ctx.fillText(portal.name, portal.x - 40, portal.y + 60);
    }
    requestAnimationFrame(drawMap);
  }
  drawMap();

  mapCanvas.addEventListener("click", (e) => {
    portals.forEach(portal => {
      const dist = Math.hypot(e.clientX - portal.x, e.clientY - portal.y);
      if (dist < 40) openRoom(portal.name);
    });
  });
}

function openRoom(name) {
  document.querySelectorAll(".room").forEach(r => r.classList.add("hidden"));
  if (name === "Memory Island") document.getElementById("memoryIsland").classList.remove("hidden");
  if (name === "Dream Forest") document.getElementById("dreamForest").classList.remove("hidden");
  if (name === "Cosmic Stage") document.getElementById("cosmicStage").classList.remove("hidden");
}