body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Arial', sans-serif;
    background: radial-gradient(circle at center, #1a1a1a, #000);
    color: white;
    cursor: none;
}

#landing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle at center, #2b1055, #7597de);
    animation: backgroundGlow 10s infinite alternate;
    text-align: center;
}

#landing h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

#enterBtn {
    padding: 15px 30px;
    font-size: 1.2em;
    border: none;
    border-radius: 25px;
    background: linear-gradient(45deg, #ff758c, #ff7eb3);
    color: white;
    cursor: pointer;
}

#world {
    display: none;
}

#moodSelector {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
}

.mood-button {
    padding: 10px 20px;
    background: #333;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

#moodCanvas {
    display: block;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(circle at center, #0d0d0d, #111);
}

.custom-cursor {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(255,255,255,0.7);
    transform: translate(-50%, -50%);
    z-index: 9999;
}
