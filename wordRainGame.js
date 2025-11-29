// ========================================
//  WORD RAIN GAME LOGIC
// ========================================

let rainActive = false;
let rainScore = 0;
let rainLives = 3;
let rainWords = []; // {x, y, word, translation, speed, color}
let rainSpeedMultiplier = 1;
let rainAnimationId = null;
let lastSpawnTime = 0;

// Constants (Already defined in games.js)
// const COL_SWE = 2;
// const COL_ARB = 3;

// Colors for bubbles
const BUBBLE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

// --- WORD RAIN GAME ---
function initRainGame() {
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('rainInput');
    const scoreEl = document.getElementById('rainScore');
    const livesEl = document.getElementById('rainLives');
    const startBtn = document.getElementById('startRainBtn');

    if (!startBtn) console.error("CRITICAL: Start button not found in DOM");

    const gameOverEl = document.getElementById('rainGameOver');
    const restartBtn = document.getElementById('restartRainBtn');

    // Resize canvas
    function resize() {
        const container = document.querySelector('.rain-area');
        if (container && canvas) {
            canvas.width = container.clientWidth;
            canvas.height = 450;
        }
    }
    window.addEventListener('resize', resize);
    resize();

    // Reset UI State
    resetGameState();

    // Event Listeners
    startBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        startRainLoop();
    };

    restartBtn.onclick = () => {
        resetGameState();
        startRainLoop();
    };

    // Input Handler
    input.oninput = () => {
        if (!rainActive) return;

        const val = input.value.trim().toLowerCase();
        const matchIndex = rainWords.findIndex(w => w.word.toLowerCase() === val);

        if (matchIndex > -1) {
            // Correct!
            handleCorrectWord(matchIndex);
        }
    };

    function resetGameState() {
        rainActive = false;
        rainScore = 0;
        rainLives = 3;
        rainWords = [];
        rainSpeedMultiplier = 1;

        if (scoreEl) scoreEl.textContent = '0';
        if (livesEl) livesEl.textContent = '❤️❤️❤️';

        if (gameOverEl) gameOverEl.style.display = 'none';
        if (startBtn) startBtn.style.display = 'block';
        if (input) {
            input.value = '';
            input.disabled = true;
            input.focus(); // Keep focus ready
        }

        if (rainAnimationId) {
            cancelAnimationFrame(rainAnimationId);
            rainAnimationId = null;
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startRainLoop() {
        rainActive = true;
        rainWords = [];
        rainScore = 0;
        rainLives = 3;
        rainSpeedMultiplier = 1;
        lastSpawnTime = 0;

        if (startBtn) startBtn.style.display = 'none';
        if (gameOverEl) gameOverEl.style.display = 'none';
        if (input) {
            input.disabled = false;
            input.value = '';
            input.focus();
        }

        if (rainAnimationId) cancelAnimationFrame(rainAnimationId);
        gameLoop(0);
    }

    function handleCorrectWord(index) {
        rainWords.splice(index, 1);
        rainScore += 10;
        if (scoreEl) scoreEl.textContent = rainScore;

        input.value = '';
        input.classList.add('correct-flash');
        setTimeout(() => input.classList.remove('correct-flash'), 200);

        // Increase difficulty
        if (rainScore % 50 === 0) {
            rainSpeedMultiplier += 0.1;
        }
    }

    function gameLoop(timestamp) {
        if (!rainActive) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn
        if (timestamp - lastSpawnTime > 2000 / rainSpeedMultiplier) {
            spawnRainWord();
            lastSpawnTime = timestamp;
        }

        // Update & Draw
        updateRainGame(ctx, canvas);

        rainAnimationId = requestAnimationFrame(gameLoop);
    }

    function spawnRainWord() {
        if (!dictionaryData || dictionaryData.length === 0) return;

        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_SWE].length > 2) {
            // Ensure no overlap (simple check)
            const x = Math.random() * (canvas.width - 120) + 10;

            rainWords.push({
                x: x,
                y: -40,
                word: item[COL_SWE],
                translation: item[COL_ARB] || '',
                speed: (Math.random() * 0.5 + 0.5) * rainSpeedMultiplier,
                color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
            });
        }
    }

    function updateRainGame(ctx, canvas) {
        ctx.font = 'bold 18px "Inter", sans-serif';

        for (let i = rainWords.length - 1; i >= 0; i--) {
            let w = rainWords[i];
            w.y += w.speed;

            // Draw Bubble
            const textMetrics = ctx.measureText(w.word);
            const textWidth = textMetrics.width;
            const padding = 15;
            const bubbleWidth = textWidth + (padding * 2);
            const bubbleHeight = 40;

            // Draw Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            drawRoundedRect(ctx, w.x + 2, w.y + 2, bubbleWidth, bubbleHeight, 12);
            ctx.fill();

            // Draw Main Bubble
            ctx.fillStyle = w.color;
            drawRoundedRect(ctx, w.x, w.y, bubbleWidth, bubbleHeight, 12);
            ctx.fill();

            // Shine effect
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.ellipse(w.x + bubbleWidth / 2, w.y + 10, bubbleWidth / 2 - 5, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Draw Text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.fillText(w.word, w.x + padding, w.y + 26);

            // Draw Translation (small below)
            if (w.translation) {
                ctx.font = '12px "Noto Sans Arabic", sans-serif';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.textAlign = 'center';
                ctx.fillText(w.translation, w.x + bubbleWidth / 2, w.y + bubbleHeight + 15);

                // Reset font
                ctx.font = 'bold 18px "Inter", sans-serif';
                ctx.textAlign = 'left';
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

    function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    }

    function updateLivesDisplay() {
        if (!livesEl) return;
        let hearts = '';
        for (let i = 0; i < rainLives; i++) hearts += '❤️';
        livesEl.textContent = hearts;
    }

    function endRainGame() {
        rainActive = false;
        if (rainAnimationId) cancelAnimationFrame(rainAnimationId);

        if (gameOverEl) gameOverEl.style.display = 'flex';
        const finalScoreEl = document.getElementById('rainFinalScore');
        if (finalScoreEl) finalScoreEl.textContent = rainScore;

        if (input) input.disabled = true;

        // Save High Score
        const currentHigh = parseInt(document.getElementById('score-rain').textContent) || 0;
        if (rainScore > currentHigh) {
            saveScore('rain', rainScore);
        }
    }
}

// Expose to window
window.initRainGame = initRainGame;
