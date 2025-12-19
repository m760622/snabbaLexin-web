// ========================================
// WORD RAIN GAME - مطر الكلمات
// ========================================
console.log("wordRainGame.js LOADED (Premium Upgrade)");

// State
let rainCanvas, rainCtx;
let rainWords = [];
let rainParticles = []; // For "dazzling" effects
let rainScore = 0;
let rainLives = 3;
let rainGameActive = false;
let rainAnimationId = null;
let rainLastSpawnTime = 0;
let rainSpawnInterval = 2000; // ms between spawns

// Colors for particles
const PARTICLE_COLORS = ['#fbbf24', '#f59e0b', '#ffffff', '#60a5fa'];

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
    rainParticles = [];
    rainScore = 0;
    rainLives = 3;
    rainGameActive = false;

    document.getElementById('rainScore').textContent = '0';
    document.getElementById('rainLives').textContent = '3';
    document.getElementById('rainGameOver').classList.add('hidden');
    document.getElementById('rainInput').disabled = true;
    document.getElementById('rainInput').value = '';
    document.getElementById('startRainBtn').style.display = 'block';

    // Draw initial state (transparent)
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    // Draw "Ready" text
    rainCtx.font = '24px Inter, sans-serif';
    rainCtx.fillStyle = 'rgba(255,255,255,0.8)';
    rainCtx.textAlign = 'center';
    rainCtx.fillText('Redo att spela? / مستعد للعب؟', rainCanvas.width / 2, rainCanvas.height / 2);


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
    rainParticles = [];
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
        // Speed up
        rainSpawnInterval = Math.max(800, rainSpawnInterval - 20);
    }

    // Update word positions (add drift)
    rainWords.forEach(word => {
        word.y += word.speed;
        word.x += Math.sin(word.y * 0.05) * 0.5; // Slight horizontal drift
    });

    // Update Particles
    for (let i = rainParticles.length - 1; i >= 0; i--) {
        let p = rainParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vy += 0.05; // Gravity
        if (p.life <= 0) {
            rainParticles.splice(i, 1);
        }
    }

    // Check bounds
    rainWords = rainWords.filter(word => {
        if (word.y > rainCanvas.height + 20) { // Allow to fall slightly past
            rainLives--;
            document.getElementById('rainLives').textContent = rainLives;

            // Screen shake effect on life lost
            rainCanvas.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            setTimeout(() => rainCanvas.style.transform = 'none', 100);

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
                y: -40,
                speed: 1 + Math.random() * 1.5, // Faster start
                color: `hsl(${Math.random() * 60 + 200}, 80%, 70%)` // Random blue/cyan tint
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
    // Clear canvas (Transparent to let CSS gradient show)
    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

    // Draw Particles (Behind words)
    rainParticles.forEach(p => {
        rainCtx.globalAlpha = p.life;
        rainCtx.fillStyle = p.color;
        rainCtx.beginPath();
        rainCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        rainCtx.fill();
    });
    rainCtx.globalAlpha = 1;

    // Draw words
    rainWords.forEach(word => {
        // "Glass" Pill Background
        const textWidth = rainCtx.measureText(word.arabic).width + 30;

        // Glow Shadow
        rainCtx.shadowColor = word.color;
        rainCtx.shadowBlur = 15;

        rainCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        rainCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        rainCtx.lineWidth = 1;

        rainCtx.beginPath();
        rainCtx.roundRect(word.x - textWidth / 2, word.y - 18, textWidth, 40, 20);
        rainCtx.fill();
        rainCtx.stroke();

        // Reset Shadow for Text
        rainCtx.shadowBlur = 0;

        // Arabic text
        rainCtx.font = 'bold 20px "Noto Sans Arabic", sans-serif';
        rainCtx.fillStyle = '#fbbf24'; // Gold text
        rainCtx.textAlign = 'center';
        rainCtx.fillText(word.arabic, word.x, word.y + 10);

        // Small "Highlight" reflection on top of pill
        rainCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        rainCtx.beginPath();
        rainCtx.ellipse(word.x, word.y - 12, textWidth / 4, 3, 0, 0, Math.PI * 2);
        rainCtx.fill();
    });
}

// Spawn Particles
function spawnExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        rainParticles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1.0,
            size: Math.random() * 3 + 2,
            color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
        });
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
        const word = rainWords[matchIndex];

        // Trigger Explosion at word position
        spawnExplosion(word.x, word.y);

        rainWords.splice(matchIndex, 1);
        rainScore += 10;
        document.getElementById('rainScore').textContent = rainScore;

        // Visual feedback
        inputEl.classList.add('correct-flash');
        setTimeout(() => inputEl.classList.remove('correct-flash'), 300);

        // Speak
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(guess, 'sv');
        }
    } else {
        // Wrong
        inputEl.classList.add('wrong-flash');
        setTimeout(() => inputEl.classList.remove('wrong-flash'), 300);
        if (typeof soundManager !== 'undefined') soundManager.playError();
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
