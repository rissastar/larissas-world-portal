const quotes = {
    dreamy: ["Dream like a star 🌟", "Let your soul wander."],
    cosmic: ["You are stardust.", "The universe whispers to you."],
    ocean: ["Flow like the tide.", "Dive deep into peace."],
    mystic: ["Magic is everywhere.", "Trust the unseen."],
    secret: ["You found me 👁️", "The magic is inside you.", "Only seekers can see this."],
    level2: ["Welcome to the hidden realm of wonders 🌠", "You’ve unlocked the deeper magic 💫", "Only the curious can enter this world 🌿"]
};

let currentMood = "dreamy";
let easterEggActive = false;
let level2Active = false;
let canvas, ctx, particles = [];

function displayQuotes() {
    const quoteBox = document.getElementById("quotes");
    quoteBox.innerHTML = "";
    quotes[currentMood].forEach(q => {
        let div = document.createElement("div");
        div.textContent = q;
        quoteBox.appendChild(div);
    });
}

document.getElementById("moodSelector").addEventListener("change", (e) => {
    currentMood = e.target.value;
    displayQuotes();
    updateTheme();
    initCanvas();
});

function updateTheme() {
    const body = document.body;
    const moodColors = {
        dreamy: "#2a2a72",
        cosmic: "#0d0d0d",
        ocean: "#014f86",
        mystic: "#4b0082",
        secret: "#ff1493",
        level2: "#00ffff"
    };
    body.style.backgroundColor = moodColors[currentMood] || "#0a0a0a";
}

document.getElementById("adminToggle").addEventListener("click", () => {
    document.getElementById("adminPanel").classList.toggle("hidden");
});

document.getElementById("closeAdmin").addEventListener("click", () => {
    document.getElementById("adminPanel").classList.add("hidden");
});

document.getElementById("addQuoteBtn").addEventListener("click", () => {
    const newQuote = document.getElementById("newQuote").value.trim();
    if (newQuote) {
        quotes[currentMood].push(newQuote);
        displayQuotes();
        document.getElementById("newQuote").value = "";
    }
});

displayQuotes();
updateTheme();
initCanvas();

// Easter Eggs
document.body.addEventListener("dblclick", () => {
    easterEggActive = !easterEggActive;
    if (easterEggActive) {
        currentMood = "secret";
    } else {
        currentMood = document.getElementById("moodSelector").value;
    }
    displayQuotes();
    updateTheme();
    initCanvas();
});

const secretSpot = document.createElement("div");
secretSpot.classList.add("secret-spot");
document.body.appendChild(secretSpot);

secretSpot.addEventListener("click", () => {
    if (!easterEggActive) {
        alert("✨ You discovered a hidden realm! Double-click to enter it.");
    }
});

const level2Button = document.createElement("div");
level2Button.style.position = "fixed";
level2Button.style.top = "50%";
level2Button.style.left = "50%";
level2Button.style.transform = "translate(-50%, -50%)";
level2Button.style.width = "40px";
level2Button.style.height = "40px";
level2Button.style.background = "radial-gradient(circle, rgba(0,255,255,0.8), rgba(0,255,255,0))";
level2Button.style.borderRadius = "50%";
level2Button.style.cursor = "pointer";
level2Button.style.boxShadow = "0 0 20px rgba(0,255,255,0.7)";
level2Button.style.display = "none";
level2Button.classList.add("secret-spot");
document.body.appendChild(level2Button);

level2Button.addEventListener("click", () => {
    level2Active = true;
    currentMood = "level2";
    displayQuotes();
    updateTheme();
    initCanvas();
    level2Button.style.display = "none";
});

function checkLevel2Button() {
    if (easterEggActive && !level2Active) {
        level2Button.style.display = "block";
    } else {
        level2Button.style.display = "none";
    }
}

document.body.addEventListener("mousemove", () => {
    checkLevel2Button();
});

function getParticleColor() {
    const colors = {
        dreamy: "rgba(255, 255, 255, 0.8)",
        cosmic: "rgba(255, 255, 200, 0.9)",
        ocean: "rgba(0, 150, 255, 0.7)",
        mystic: "rgba(200, 0, 255, 0.8)",
        secret: "rgba(255, 20, 147, 0.9)",
        level2: "rgba(0, 255, 255, 0.9)"
    };
    return colors[currentMood] || "white";
}

// Quotes for interactions
let secretQuotes = [
    "You are a star 🌟",
    "Magic is real ✨",
    "The universe loves you 💜",
    "Seek and you shall find 🔮",
    "You are exactly where you’re meant to be 🌙"
];

let level2Quotes = [
    "You are a cosmic dreamer 🌠",
    "Every click reveals a secret ✨",
    "The deeper you go, the more magic you find 💫",
    "You are infinite 🌀",
    "Trust the journey 🌿"
];

canvas.addEventListener("click", (e) => {
    if (easterEggActive) {
        const randomQuote = secretQuotes[Math.floor(Math.random() * secretQuotes.length)];
        showSecretQuote(randomQuote, e.clientX, e.clientY);
    }
    if (level2Active) {
        const randomQuote = level2Quotes[Math.floor(Math.random() * level2Quotes.length)];
        showLevel2Quote(randomQuote, e.clientX, e.clientY);
    }
});

function showSecretQuote(quote, x, y) {
    createFloatingQuote(quote, x, y, "rgba(255,20,147,0.9)", "white");
}
function showLevel2Quote(quote, x, y) {
    createFloatingQuote(quote, x, y, "rgba(0,255,255,0.9)", "black");
}

function createFloatingQuote(quote, x, y, bg, color) {
    const quoteElem = document.createElement("div");
    quoteElem.textContent = quote;
    quoteElem.style.position = "fixed";
    quoteElem.style.left = `${x}px`;
    quoteElem.style.top = `${y}px`;
    quoteElem.style.background = bg;
    quoteElem.style.padding = "5px 10px";
    quoteElem.style.borderRadius = "8px";
    quoteElem.style.color = color;
    quoteElem.style.fontFamily = "'Poppins', sans-serif";
    quoteElem.style.zIndex = "1000";
    quoteElem.style.fontSize = "14px";
    quoteElem.style.pointerEvents = "none";
    quoteElem.style.boxShadow = `0px 0px 10px ${bg}`;
    document.body.appendChild(quoteElem);

    setTimeout(() => {
        quoteElem.remove();
    }, 3000);
}

// Canvas animation
class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + (currentMood === "level2" ? 1 : 0);
        this.angle = Math.random() * 2 * Math.PI;
        this.shape = easterEggActive ? this.randomShape() : "circle";
    }
    randomShape() {
        const shapes = ["star", "heart", "rune"];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }
    update() {
        if (currentMood === "level2") {
            this.x += Math.sin(this.angle) * 0.5;
            this.y += Math.cos(this.angle) * 0.5;
            this.angle += 0.01;
        } else {
            this.y -= this.speed;
        }
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) this.reset();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = getParticleColor();

        if (currentMood === "level2") {
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
            ctx.fill();
        } else {
            if (this.shape === "circle") {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.shape === "star") {
                drawStar(0, 0, this.size, this.size * 2, 5);
            } else if (this.shape === "heart") {
                drawHeart(0, 0, this.size);
            } else if (this.shape === "rune") {
                drawRune(0, 0, this.size);
            }
        }

        ctx.restore();
    }
}

function drawStar(x, y, radius, outerRadius, points) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        let angle = (i * Math.PI) / points;
        let r = (i % 2 === 0) ? outerRadius : radius;
        ctx.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
}

function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size / 2, x - size, y - size / 2, x - size, y);
    ctx.bezierCurveTo(x - size, y + size / 2, x, y + size, x, y + size * 1.5);
    ctx.bezierCurveTo(x, y + size, x + size, y + size / 2, x + size, y);
    ctx.bezierCurveTo(x + size, y - size / 2, x, y - size / 2, x, y);
    ctx.closePath();
    ctx.fill();
}

function drawRune(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y - size);
    ctx.closePath();
    ctx.fill();
}

function initCanvas() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentMood === "level2") {
        drawLevel2Particles();
    } else {
        particles.forEach(p => {
            p.update();
            p.draw();
        });
    }
    requestAnimationFrame(animate);
}

function drawLevel2Particles() {
    particles.forEach(p => {
        p.update();
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 4);
        gradient.addColorStop(0, "rgba(0,255,255,1)");
        gradient.addColorStop(1, "rgba(0,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.arc(0, 0, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", initCanvas);