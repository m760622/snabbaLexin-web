// ========================================
//  WORD RAIN GAME LOGIC
// ========================================

let rainActive = false;
let rainScore = 0;
let rainLives = 3;
let rainWords = []; // {x, y, word, translation, speed}
let rainSpeedMultiplier = 1;

// --- WORD RAIN GAME ---
function initRainGame() {
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('rainInput');
    const scoreEl = document.getElementById('rainScoreDisplay');
    const livesEl = document.getElementById('rainLivesDisplay');
    const startBtn = document.getElementById('startRainBtn');
    const gameOverEl = document.getElementById('rainGameOver');
    const finalScoreEl = document.getElementById('rainFinalScore');
    const restartBtn = document.getElementById('restartRainBtn');

    // Resize canvas
    function resize() {
        const container = document.getElementById('rainGame');
        if (container.style.display !== 'none') {
            canvas.width = container.clientWidth;
            canvas.height = 400; // Fixed height for gameplay area
        }
    }
    window.addEventListener('resize', resize);
    resize();

    // Reset State
    rainActive = false;
    rainScore = 0;
    rainLives = 3;
    rainWords = [];
    rainSpeedMultiplier = 1;
    scoreEl.textContent = '0';
    livesEl.textContent = '❤️❤️❤️';
    gameOverEl.style.display = 'none';
    startBtn.style.display = 'block';
    input.value = '';
    input.disabled = true;

    startBtn.onclick = () => {
        startBtn.style.display = 'none';
        input.disabled = false;
        input.focus();
        startRainGame();
    };

    restartBtn.onclick = () => {
        initRainGame();
        startBtn.click();
    };

    // Input Handler
    input.oninput = () => {
        const val = input.value.trim().toLowerCase();
        const matchIndex = rainWords.findIndex(w => w.word.toLowerCase() === val);

        if (matchIndex > -1) {
            // Correct!
            rainWords.splice(matchIndex, 1);
            rainScore += 10;
            scoreEl.textContent = rainScore;
            input.value = '';
            input.classList.add('correct-flash');
            setTimeout(() => input.classList.remove('correct-flash'), 200);

            // Increase difficulty slightly
            if (rainScore % 50 === 0) {
                rainSpeedMultiplier += 0.1;
            }
        }
    };
}

function startRainGame() {
    rainActive = true;
    rainWords = [];
    rainScore = 0;
    rainLives = 3;
    rainSpeedMultiplier = 1;

    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    let lastSpawn = 0;

    function gameLoop(timestamp) {
        if (!rainActive) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn
        if (timestamp - lastSpawn > 2000 / rainSpeedMultiplier) {
            spawnRainWord(canvas);
            lastSpawn = timestamp;
        }

        // Update & Draw
        updateRainGame(ctx, canvas);

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
}

function spawnRainWord(canvas) {
    const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
    if (item && item[COL_SWE] && item[COL_SWE].length > 2) {
        rainWords.push({
            x: Math.random() * (canvas.width - 100) + 10,
            y: -30,
            word: item[COL_SWE],
            translation: item[COL_ARB] || '',
            speed: (Math.random() * 0.5 + 0.5) * rainSpeedMultiplier
        });
    }
}

function updateRainGame(ctx, canvas) {
    ctx.font = 'bold 20px "Cairo", sans-serif'; // Use Cairo for Arabic support if needed

    for (let i = rainWords.length - 1; i >= 0; i--) {
        let w = rainWords[i];
        w.y += w.speed;

        // Draw Bubble
        const textWidth = ctx.measureText(w.word).width;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.roundRect(w.x - 10, w.y - 25, textWidth + 20, 35, 15);
        ctx.fill();
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Text
        ctx.fillStyle = '#1e293b';
        ctx.fillText(w.word, w.x, w.y);

        // Draw Translation (small below)
        if (w.translation) {
            ctx.font = '12px "Cairo", sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText(w.translation, w.x, w.y + 15);
            ctx.font = 'bold 20px "Cairo", sans-serif'; // Reset font
        }

        // Check Hit Bottom
        if (w.y > canvas.height) {
            rainWords.splice(i, 1);
            rainLives--;
            updateLivesDisplay();

            if (rainLives <= 0) {
                endRainGame();
            }
        }
    }
}

function updateLivesDisplay() {
    const livesEl = document.getElementById('rainLivesDisplay');
    let hearts = '';
    for (let i = 0; i < rainLives; i++) hearts += '❤️';
    livesEl.textContent = hearts;
}

function endRainGame() {
    rainActive = false;
    document.getElementById('rainGameOver').style.display = 'flex';
    document.getElementById('rainFinalScore').textContent = rainScore;
    document.getElementById('rainInput').disabled = true;

    // Save High Score
    const currentHigh = parseInt(document.getElementById('score-rain').textContent) || 0;
    if (rainScore > currentHigh) {
        saveScore('rain', rainScore); // Changed to rain
    }
}
