/* Larissa's World — interactive canvas + cards (no sound) */
/* Copy this file to js/script.js */

(() => {
  // ----- config & state -----
  const QUOTES = {
    dreamy: [
      {title: "Soft Glow", text: "the sky keeps secrets in pastel whispers."},
      {title: "Quiet Sky", text: "close your eyes and float with the clouds."}
    ],
    cozy: [
      {title: "Warmth", text: "a mug, a blanket, a small fierce calm."},
      {title: "Fireside", text: "the world softens at the edges tonight."}
    ],
    wild: [
      {title: "Wilder", text: "wind carries stories of places we haven't been."},
      {title: "Roots", text: "there is strength in becoming small and steady."}
    ],
    all: [
      {title: "Hello", text: "welcome home — wander a little, wonder more."},
      {title: "Secret", text: "this world remembers how you like to breathe."}
    ]
  };

  const secretPhrases = [
    "You are a galaxy in human form.",
    "Small rebellions make beautiful days.",
    "Keep a pocket for light."
  ];

  let mood = "all";
  let canvas, ctx, W, H, particles = [];
  let rafId = null;
  const particleCountByMood = { dreamy: 140, cozy: 70, wild: 100, all: 90 };
  const particleColorByMood = {
    dreamy: ["rgba(255,255,255,0.85)", "rgba(200,180,255,0.7)"],
    cozy: ["rgba(255,180,120,0.9)", "rgba(255,220,180,0.6)"],
    wild: ["rgba(120,240,170,0.9)", "rgba(80,200,120,0.6)"],
    all: ["rgba(220,220,220,0.85)", "rgba(180,200,230,0.6)"]
  };

  // DOM
  const enterBtn = document.getElementById("enterBtn");
  const landing = document.getElementById("landing");
  const world = document.getElementById("world");
  const bgLayer = document.getElementById("bgLayer");
  const mist = document.getElementById("mistLayer");
  const cardsContainer = document.getElementById("cards");
  const cursorOrb = document.getElementById("cursorOrb");
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");

  // helpers
  const rand = (min, max) => Math.random() * (max - min) + min;
  const lerp = (a, b, t) => a + (b - a) * t;

  // ----- particle system -----
  class Particle {
    constructor(x, y, r, vx, vy, color) {
      this.x = x; this.y = y; this.r = r;
      this.vx = vx; this.vy = vy; this.color = color;
      this.baseAlpha = parseFloat(color.slice(color.lastIndexOf(",") + 1)) || 0.8;
    }
    update(mouse) {
      // basic movement
      this.x += this.vx;
      this.y += this.vy;

      // bounce edges
      if (this.x < -20) this.x = W + 20;
      if (this.x > W + 20) this.x = -20;
      if (this.y < -20) this.y = H + 20;
      if (this.y > H + 20) this.y = -20;

      // react to mouse: attract or repel slightly
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        // swirl away a bit
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * 0.15 * force;
        this.vy += (dy / dist) * 0.15 * force;
      } else if (dist < 300) {
        // mild attraction
        const force = (dist - 120) / 300;
        this.vx += -(dx / dist) * 0.01 * force;
        this.vy += -(dy / dist) * 0.01 * force;
      }

      // slow down a little
      this.vx *= 0.995;
      this.vy *= 0.995;
    }
    draw(ctx) {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r*3);
      grad.addColorStop(0, this.color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.r*2, 0, Math.PI*2);
      ctx.fill();
    }
  }

  const initParticles = () => {
    particles = [];
    const count = particleCountByMood[mood] || 90;
    const colors = particleColorByMood[mood] || particleColorByMood.all;
    for (let i=0;i<count;i++){
      const x = Math.random()*W;
      const y = Math.random()*H;
      const r = rand(1,3);
      const vx = rand(-0.15,0.15);
      const vy = rand(-0.15,0.15);
      const color = colors[Math.floor(Math.random()*colors.length)];
      particles.push(new Particle(x,y,r,vx,vy,color));
    }
  };

  // ----- animation loop -----
  let mouse = { x: -9999, y: -9999 };
  function step() {
    ctx.clearRect(0,0,W,H);

    // subtle layered background glow (parallax by mouse)
    const mx = (mouse.x / W - 0.5) * 20;
    const my = (mouse.y / H - 0.5) * 20;
    bgLayer.style.filter = `saturate(${lerp(0.9,1.1,Math.abs(mx)/20)}) blur(${lerp(0,2,Math.abs(my)/20)}px)`;

    // draw particles
    for (let p of particles) {
      p.update(mouse);
      p.draw(ctx);
    }

    // occasional sparkles: randomly draw a glowing star
    if (Math.random() < 0.008) {
      createSparkle();
    }

    rafId = requestAnimationFrame(step);
  }

  // sparkles = clickable small DOM nodes that show easter quotes
  function createSparkle() {
    const el = document.createElement("div");
    el.className = "sparkle";
    const size = rand(6, 12);
    el.style.position = "absolute";
    el.style.left = rand(4, 96) + "%";
    el.style.top = rand(6, 90) + "%";
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.zIndex = 30;
    el.style.pointerEvents = "auto";
    el.style.borderRadius = "50%";
    el.style.boxShadow = `0 0 ${size*0.8}px rgba(255,255,255,0.9),0 0 ${size*1.6}px rgba(255,255,255,0.12)`;
    el.style.background = "rgba(255,255,255,0.9)";
    el.style.opacity = 0;
    el.style.transition = "opacity 350ms, transform 600ms";
    document.body.appendChild(el);

    // fade in then slowly float away & remove
    requestAnimationFrame(()=>{ el.style.opacity = 1; el.style.transform = `translateY(${rand(-6,6)}px) scale(${rand(0.8,1.2)})`; });

    // click shows secret
    el.addEventListener("click", () => showSecret( secretPhrases[Math.floor(Math.random()*secretPhrases.length)] ));

    // remove after some time
    setTimeout(()=>{ el.style.opacity = 0; el.style.transform = `translateY(${rand(-40,-90)}px) scale(0.5)`; setTimeout(()=>el.remove(),800) }, rand(2500,6500));
  }

  // ----- cards (drifting text boxes) -----
  function makeCardsForMood(moodKey) {
    cardsContainer.innerHTML = "";
    const list = QUOTES[moodKey] ? QUOTES[moodKey] : QUOTES.all;
    // create 3-4 positioned cards
    for (let i=0;i<list.length;i++){
      const card = document.createElement("div");
      card.className = "card";
      card.style.left = `${10 + i*28 + rand(-6,6)}%`;
      card.style.top = `${20 + i*14 + rand(-6,6)}%`;
      card.style.transform = `rotate(${rand(-6,6)}deg)`;
      card.dataset.vx = rand(-0.2,0.2);
      card.dataset.vy = rand(-0.15,0.15);
      card.innerHTML = `<h3>${list[i].title}</h3><p>${list[i].text}</p><div class="small">— Larissa's World</div>`;
      // drag behavior to move them around
      enableCardDrag(card);
      cardsContainer.appendChild(card);
      // gentle float animation
      floatCard(card);
    }
  }

  function floatCard(card){
    let tx = rand(-8,8);
    let ty = rand(-8,8);
    card.animate([
      { transform: `translate(0px,0px) rotate(${rand(-4,4)}deg)` },
      { transform: `translate(${tx}px,${ty}px) rotate(${rand(-4,4)}deg)` }
    ], { duration: 4000 + Math.random()*5000, iterations: Infinity, direction: "alternate", easing: "ease-in-out" });
  }

  function enableCardDrag(card){
    let dragging = false, startX=0, startY=0, origLeft=0, origTop=0;
    card.addEventListener("pointerdown", (e)=>{
      dragging = true; card.setPointerCapture(e.pointerId);
      startX = e.clientX; startY = e.clientY;
      const rect = card.getBoundingClientRect();
      origLeft = rect.left; origTop = rect.top;
      card.style.transition = "none";
    });
    window.addEventListener("pointermove", (e)=>{
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      card.style.left = `${(origLeft + dx) / window.innerWidth * 100}%`;
      card.style.top = `${(origTop + dy) / window.innerHeight * 100}%`;
    });
    window.addEventListener("pointerup", (e)=>{
      if (!dragging) return;
      dragging = false;
      card.releasePointerCapture && card.releasePointerCapture(e.pointerId);
      card.style.transition = "";
    });
  }

  // ----- UI / mood switching -----
  function setMood(newMood) {
    mood = newMood;
    // visual transition for bg
    if (mood === "dreamy") {
      bgLayer.style.background = "radial-gradient(circle at 20% 20%, #39264a, #5b3b8b 40%, #2b1b47 80%)";
      mist.style.opacity = 1;
      cursorOrb.style.background = "rgba(155,126,214,0.95)";
    } else if (mood === "cozy") {
      bgLayer.style.background = "radial-gradient(circle at 20% 20%, #4b2f2a, #9f5e46 40%, #3b241e 80%)";
      mist.style.opacity = 0.9;
      cursorOrb.style.background = "rgba(210,120,90,0.95)";
    } else if (mood === "wild") {
      bgLayer.style.background = "radial-gradient(circle at 20% 20%, #08321a, #1e6a38 40%, #0f331b 80%)";
      mist.style.opacity = 0.7;
      cursorOrb.style.background = "rgba(46,163,106,0.95)";
    } else {
      bgLayer.style.background = "radial-gradient(circle at center, #0d0d0d, #111 70%)";
      mist.style.opacity = 0.85;
      cursorOrb.style.background = "rgba(255,255,255,0.95)";
    }

    initParticles();
    makeCardsForMood(mood === "all" ? "all" : mood);
  }

  // ----- secrets & modal -----
  function showSecret(text) {
    modalText.textContent = text;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }
  function hideModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }
  modalClose && modalClose.addEventListener("click", hideModal);
  modal.addEventListener("click", (e)=>{ if (e.target === modal) hideModal(); });

  // double-click reveal
  window.addEventListener("dblclick", ()=> {
    showSecret(secretPhrases[Math.floor(Math.random()*secretPhrases.length)]);
  });

  // ----- cursor orb -----
  function startCursor() {
    window.addEventListener("mousemove", (e)=>{
      cursorOrb.style.left = `${e.clientX}px`;
      cursorOrb.style.top = `${e.clientY}px`;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    // hide when leaving
    window.addEventListener("mouseleave", ()=>{ cursorOrb.style.opacity = 0.4 });
    window.addEventListener("mouseenter", ()=>{ cursorOrb.style.opacity = 1 });
  }

  // ----- canvas setup -----
  function startCanvas() {
    canvas = document.getElementById("particleCanvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    initParticles();
    if (!rafId) step();
  }

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // ----- init / start -----
  enterBtn.addEventListener("click", () => {
    landing.classList.add("hidden");
    world.classList.remove("hidden");
    world.setAttribute("aria-hidden", "false");
    startCanvas();
    startCursor();
    setTimeout(()=> { setMood("all"); }, 120);
  });

  // mood buttons
  document.querySelectorAll(".mood-button").forEach(btn=>{
    btn.addEventListener("click", () => {
      const m = btn.dataset.mood || btn.textContent.toLowerCase();
      setMood(m);
      // small pulse on clicked button
      btn.animate([{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],{duration:380,easing:"ease-out"});
    });
  });

  // start hidden world state (no animation until enter)
  let mouse = {x:-9999,y:-9999};

  // cleanup on page unload
  window.addEventListener("beforeunload", ()=>{ cancelAnimationFrame(rafId) });

  // initial card placeholder
  makeCardsForMood("all");

})();