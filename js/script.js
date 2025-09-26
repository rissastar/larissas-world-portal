const quotes = {
    dreamy: ["Dream like a star 🌟", "Let your soul wander."],
    cosmic: ["You are stardust.", "The universe whispers to you."],
    ocean: ["Flow like the tide.", "Dive deep into peace."],
    mystic: ["Magic is everywhere.", "Trust the unseen."]
};

let currentMood = "dreamy";

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
});

function updateTheme() {
    const body = document.body;
    const moodColors = {
        dreamy: "#2a2a72",
        cosmic: "#0d0d0d",
        ocean: "#014f86",
        mystic: "#4b0082"
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