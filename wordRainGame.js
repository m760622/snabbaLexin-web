// ========================================
// WORD RAIN GAME - مطر الكلمات
// ========================================
console.log("wordRainGame.js LOADED");

// State
let rainCanvas, rainCtx;
let rainWords = [];
let rainScore = 0;
let rainLives = 3;
let rainGameActive = false;
let rainAnimationId = null;
let rainLastSpawnTime = 0;
let rainSpawnInterval = 2000; // ms between spawns

// Initialize Rain Game
window.initRainGame = function (retryCount = 0) {
    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        if (retryCount < 10) {
            console.warn(`Data not ready for Rain Game. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar speldata... / جاري تحميل البيانات...", 'info');
            setTimeout(() => initRainGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Data failed to load for Rain Game.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda data. Uppdatera sidan. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }
    rainCanvas = document.getElementById('rainCanvas');
    rainCtx = rainCanvas.getContext('2d');

    // Set canvas size
    rainCanvas.width = rainCanvas.offsetWidth || 600;
    rainCanvas.height = rainCanvas.offsetHeight || 400;

    // Reset state
    rainWords = [];
    rainScore = 0;
    rainLives = 3;
    rainGameActive = false;

    document.getElementById('rainScore').textContent = '0';
    document.getElementById('rainLives').textContent = '3';
    document.getElementById('rainGameOver').classList.add('hidden');
    document.getElementById('rainInput').disabled = true;
    document.getElementById('rainInput').value = '';
    document.getElementById('startRainBtn').style.display = 'block';

    // Draw initial state
    drawRainCanvas();

    // Bind buttons
    const startBtn = document.getElementById('startRainBtn');
    const restartBtn = document.getElementById('restartRainBtn');
    const inputEl = document.getElementById('rainInput');

    if (startBtn) startBtn.onclick = startRainGame;
    if (restartBtn) restartBtn.onclick = initRainGame;
    if (inputEl) {
        inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') {
                checkRainInput();
            }
        };
    }
};

// Start Game
function startRainGame() {
    rainGameActive = true;
    rainWords = [];
    rainScore = 0;
    rainLives = 3;
    rainLastSpawnTime = Date.now();

    document.getElementById('rainScore').textContent = '0';
    document.getElementById('rainLives').textContent = '3';
    document.getElementById('startRainBtn').style.display = 'none';
    document.getElementById('rainInput').disabled = false;
    document.getElementById('rainInput').focus();

    // Start animation loop
    gameLoop();
}

// Game Loop
function gameLoop() {
    if (!rainGameActive) return;

    const now = Date.now();

    // Spawn new word
    if (now - rainLastSpawnTime > rainSpawnInterval) {
        spawnRainWord();
        rainLastSpawnTime = now;
        // Speed up over time
        rainSpawnInterval = Math.max(800, rainSpawnInterval - 20);
    }

    // Update word positions
    rainWords.forEach(word => {
        word.y += word.speed;
    });

    // Check for words that fell off screen
    rainWords = rainWords.filter(word => {
        if (word.y > rainCanvas.height) {
            rainLives--;
            document.getElementById('rainLives').textContent = rainLives;
            if (rainLives <= 0) {
                endRainGame();
            }
            return false;
        }
        return true;
    });

    // Draw
    drawRainCanvas();

    // Continue loop
    if (rainGameActive) {
        rainAnimationId = requestAnimationFrame(gameLoop);
    }
}

// Spawn Word
function spawnRainWord() {
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 100) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_ARB] && item[COL_SWE].length <= 10) {
            candidate = {
                swedish: item[COL_SWE],
                arabic: item[COL_ARB],
                x: Math.random() * (rainCanvas.width - 100) + 50,
                y: 0,
                speed: 0.5 + Math.random() * 0.5
            };
        }
        attempts++;
    }

    if (candidate) {
        rainWords.push(candidate);
    }
}

// Draw Canvas
function drawRainCanvas() {
    // Clear canvas
    rainCtx.fillStyle = '#0f172a';
    rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

    // Draw gradient overlay
    const gradient = rainCtx.createLinearGradient(0, 0, 0, rainCanvas.height);
    gradient.addColorStop(0, 'rgba(30, 41, 59, 0.8)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
    rainCtx.fillStyle = gradient;
    rainCtx.fillRect(0, 0, rainCanvas.width, rainCanvas.height);

    // Draw words
    rainWords.forEach(word => {
        // Background pill
        rainCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        const textWidth = rainCtx.measureText(word.arabic).width + 20;
        rainCtx.beginPath();
        rainCtx.roundRect(word.x - textWidth / 2, word.y - 15, textWidth + 20, 35, 8);
        rainCtx.fill();

        // Arabic text (primary)
        rainCtx.font = 'bold 18px "Noto Sans Arabic", sans-serif';
        rainCtx.fillStyle = '#fbbf24';
        rainCtx.textAlign = 'center';
        rainCtx.fillText(word.arabic, word.x, word.y + 8);
    });

    // Draw instructions if no active words
    if (rainWords.length === 0 && rainGameActive) {
        rainCtx.font = '16px sans-serif';
        rainCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        rainCtx.textAlign = 'center';
        rainCtx.fillText('Väntar på ord... / في انتظار الكلمات', rainCanvas.width / 2, rainCanvas.height / 2);
    }
}

// Check Input
function checkRainInput() {
    const inputEl = document.getElementById('rainInput');
    const guess = inputEl.value.trim().toLowerCase();
    inputEl.value = '';

    if (!guess) return;

    // Find matching word
    const matchIndex = rainWords.findIndex(word =>
        word.swedish.toLowerCase() === guess
    );

    if (matchIndex !== -1) {
        // Correct!
        rainWords.splice(matchIndex, 1);
        rainScore += 10;
        document.getElementById('rainScore').textContent = rainScore;

        // Visual feedback
        inputEl.classList.add('correct-flash');
        setTimeout(() => inputEl.classList.remove('correct-flash'), 300);

        // Speak the word
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(guess, 'sv');
        }
    } else {
        // Wrong
        inputEl.classList.add('wrong-flash');
        setTimeout(() => inputEl.classList.remove('wrong-flash'), 300);
    }
}

// End Game
function endRainGame() {
    rainGameActive = false;
    if (rainAnimationId) {
        cancelAnimationFrame(rainAnimationId);
    }

    document.getElementById('rainFinalScore').textContent = rainScore;
    document.getElementById('rainGameOver').classList.remove('hidden');
    document.getElementById('rainInput').disabled = true;

    if (typeof saveScore === 'function') {
        saveScore('rain', rainScore);
    }
}
