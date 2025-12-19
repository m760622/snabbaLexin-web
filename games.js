// Game Logic for Snabba Lexin Games
console.log("games.js LOADED and EXECUTING");

// Constants (matching app.js exactly)
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_DEF = 5;      // Swedish Definition (was COL_SWE_DEF)
const COL_FORMS = 6;
const COL_EX = 7;       // Swedish Example (was COL_EX_SWE)
const COL_EX_ARB = 8;
const COL_IDIOM = 9;    // Swedish Idiom (was COL_IDIOM_SWE)
const COL_IDIOM_ARB = 10;


// State
let gameScore = 0;



// Grammar Game State





// Start initialization (will retry until data is ready)




// Toast Notification
// Toast Notification
function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = 'toast-notification visible'; // Reset classes
        if (type === 'error') {
            toast.classList.add('error');
        } else if (type === 'success') {
            toast.classList.add('success');
        }

        setTimeout(() => {
            toast.classList.remove('visible');
        }, 3000);
    }
}

// Global Start Game Function with Error Boundary
window.startGame = function (gameType) {
    try {
        console.log("window.startGame called with:", gameType);
        const gameMenu = document.getElementById('gameMenu');
        const missingWordGame = document.getElementById('missingWordGame');
        const flashcardsGame = document.getElementById('flashcardsGame');
        const pronunciationGame = document.getElementById('pronunciationGame');
        const spellingGame = document.getElementById('spellingGame');
        const wordWheelGame = document.getElementById('wordWheelGame');
        const sentenceGame = document.getElementById('sentenceGame');
        const rainGame = document.getElementById('rainGame');
        const wordleGame = document.getElementById('wordleGame');
        const grammarGame = document.getElementById('grammarGame');
        const wordConnectGame = document.getElementById('word-game-module');

        // Hide all active game containers
        document.querySelectorAll('.active-game-container').forEach(el => el.style.display = 'none');

        // Hide Menu
        if (gameMenu) gameMenu.style.display = 'none';

        // Hide Global UI Elements (Stats, Banner, Filters)
        document.querySelectorAll('.stats-hero, .daily-banner, .category-filter-container')
            .forEach(el => el.style.display = 'none');

        // Scroll to top
        window.scrollTo(0, 0);

        // Reset Score for new game session
        resetGameScore();

        // Redirect to standalone pages
        if (gameType === 'missing-word') {
            window.location.href = 'missing_word.html';
            return;
        } else if (gameType === 'flashcards') {
            window.location.href = 'flashcards.html';
            return;
        } else if (gameType === 'pronunciation') {
            window.location.href = 'pronunciation.html';
            return;
        } else if (gameType === 'spelling') {
            window.location.href = 'spelling.html';
            return;
        } else if (gameType === 'word-wheel') {
            window.location.href = 'word_wheel.html';
            return;
        } else if (gameType === 'sentence-builder') {
            window.location.href = 'sentence_builder.html';
            return;
        } else if (gameType === 'word-rain') {
            window.location.href = 'word_rain.html';
            return;
        } else if (gameType === 'wordle') {
            window.location.href = 'wordle.html';
            return;
        } else if (gameType === 'grammar') {
            window.location.href = 'grammar.html';
            return;
        } else if (gameType === 'word-connect') {
            window.location.href = 'word_connect.html';
            return;
        }
    } catch (error) {
        console.error("❌ Game Error:", error);
        // Show user-friendly error message
        showToast("Spelet kunde inte laddas. Försök igen! / اللعبة لم تحمل، حاول مجددًا", 'error');
        // Fallback: return to game menu
        setTimeout(() => {
            try {
                showGameMenu();
            } catch (e) {
                // Last resort: reload page
                window.location.reload();
            }
        }, 2000);
    }
}

window.showGameMenu = function () {
    try {
        const gameMenu = document.getElementById('gameMenu');
        const gameElements = [
            'missingWordGame', 'flashcardsGame', 'pronunciationGame',
            'spellingGame', 'wordWheelGame', 'sentenceGame',
            'rainGame', 'wordleGame', 'grammarGame', 'word-game-module'
        ];

        // Show menu
        if (gameMenu) gameMenu.style.display = 'block';

        // Show Global UI Elements
        document.querySelectorAll('.stats-hero, .daily-banner, .category-filter-container')
            .forEach(el => el.style.display = '');

        // Scroll to top
        window.scrollTo(0, 0);

        // Hide all games safely
        gameElements.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Refresh scores
        loadScores();
    } catch (error) {
        console.error("❌ Error showing game menu:", error);
        // Fallback: reload page if menu fails
        window.location.href = 'games.html';
    }
}


function resetGameScore() {
    gameScore = 0;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('pronunciationScore').textContent = '0';
    document.getElementById('spellingScore').textContent = '0';
    document.getElementById('spellingScore').textContent = '0';
    document.getElementById('wordWheelScore').textContent = '0';
    document.getElementById('sentenceScore').textContent = '0';
    document.getElementById('rainScore').textContent = '0';
    // Wordle streak persists, so maybe don't reset visual immediately or handle differently
    // Flashcards uses progress, so we reset that elsewhere or just leave it
}

// --- MISSING WORD GAME ---

// --- MISSING WORD GAME ---
// Logic moved to missingWordGame.js


// --- FLASHCARDS GAME ---



// --- PRONUNCIATION GAME ---


function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            angle: Math.random() * 6.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle) * 2;
            p.angle += 0.1;

            if (p.y < canvas.height) {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                active = true;
            }
        });

        if (active) requestAnimationFrame(animate);
        else canvas.remove();
    }

    animate();
}

// --- SPELLING GAME (Refactored to Multiple Choice) ---


// --- WORD WHEEL GAME ---






// --- SCORE & SETTINGS LOGIC ---

function loadScores() {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    document.getElementById('score-missing-word').textContent = scores['missing-word'] || 0;
    document.getElementById('score-flashcards').textContent = scores['flashcards'] || 0;
    document.getElementById('score-pronunciation').textContent = scores['pronunciation'] || 0;
    document.getElementById('score-spelling').textContent = scores['spelling'] || 0;
    document.getElementById('score-word-wheel').textContent = scores['word-wheel'] || 0;
    document.getElementById('score-sentence').textContent = scores['sentence'] || 0;
    document.getElementById('score-rain').textContent = scores['rain'] || 0;
    document.getElementById('score-wordle').textContent = scores['wordle'] || 0;
    document.getElementById('score-grammar').textContent = scores['grammar'] || 0;
    document.getElementById('score-word-connect').textContent = scores['word-connect'] || 0;
}

function saveScore(game, score) {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    const currentHigh = scores[game] || 0;

    if (score > currentHigh) {
        scores[game] = score;
        localStorage.setItem('gameScores', JSON.stringify(scores));
        // Update UI if menu is visible
        loadScores();
        showToast(`Nytt rekord! 🏆 / رقم قياسي جديد!`);
    }
}

function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return; // Exit if button doesn't exist

    const moonIcon = toggleBtn.querySelector('.moon-icon');
    const sunIcon = toggleBtn.querySelector('.sun-icon');

    // Check saved preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);

        if (isNowDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });
}

// Toggle Mobile View Mode
window.toggleMobileView = function () {
    const body = document.body;
    const isMobile = body.classList.toggle('mobile-view-mode');

    // Save preference
    localStorage.setItem('mobileViewMode', isMobile);

    // Update button visual
    const btn = document.getElementById('mobileToggle');
    if (btn) {
        btn.textContent = isMobile ? '🖥️' : '📱';
        btn.title = isMobile ? 'Desktop View' : 'Mobile View';
    }

    // Show toast
    if (typeof showToast === 'function') {
        showToast(isMobile ? '📱 Mobile View' : '🖥️ Desktop View', 'success');
    }
}

// Initialize Mobile View on page load
function initMobileView() {
    const savedMode = localStorage.getItem('mobileViewMode');
    if (savedMode === 'true') {
        document.body.classList.add('mobile-view-mode');
        const btn = document.getElementById('mobileToggle');
        if (btn) {
            btn.textContent = '🖥️';
            btn.title = 'Desktop View';
        }
    }
}

// Update game end logic to save scores
// We need to inject saveScore calls into the existing game logic

// ========================================
// Game Prioritization Logic
// ========================================

function trackGameUsage(gameId) {
    if (!gameId) return;

    try {
        const usageData = JSON.parse(localStorage.getItem('gameUsageCounts') || '{}');
        usageData[gameId] = (usageData[gameId] || 0) + 1;
        localStorage.setItem('gameUsageCounts', JSON.stringify(usageData));
        console.log(`Tracked usage for ${gameId}: ${usageData[gameId]}`);
    } catch (e) {
        console.error("Error tracking game usage:", e);
    }
}

function prioritizePopularGames() {
    try {
        const usageData = JSON.parse(localStorage.getItem('gameUsageCounts') || '{}');
        const threshold = 3; // Games with > 3 clicks are prioritized

        // Find games that meet the threshold
        const popularGames = Object.entries(usageData)
            .filter(([id, count]) => count > threshold)
            .sort((a, b) => b[1] - a[1]); // Sort by count descending

        if (popularGames.length === 0) return;

        const grid = document.querySelector('.game-cards-grid');
        if (!grid) return;

        console.log("Prioritizing games:", popularGames);

        // Move popular games to the top
        // We reverse iterate so the most popular (first in array) ends up at the very top
        // when we prepend them one by one. Or actually, let's append them in order to a document fragment 
        // and then prepend the whole fragment.

        // Better strategy: Select the Flashcard card (it should stay first usually, unless we want popular ones ABOVE it?)
        // The user asked "جعل اللعبة التي يتم فتحها أكثر من ٣ مرات تتصدر أول الألعاب" -> Make the game opened > 3 times TOP the list.
        // So yes, they should go to the very top.

        // Let's reverse the array so we prepend the least popular of the popular ones first, 
        // and finally the most popular one, so it ends up at index 0.
        [...popularGames].reverse().forEach(([gameId, count]) => {
            const card = document.querySelector(`.game-card-item[data-game-id="${gameId}"]`);
            if (card) {
                // Add a visual indicator of popularity? Maybe not needed.
                // grid.prepend(card);

                // If we use prepend, it moves to the top.
                // If we have multiple popular games, say A(10), B(5).
                // Array: [[A, 10], [B, 5]]
                // Reverse: [[B, 5], [A, 10]]
                // 1. Prepend B. Grid: B, ...
                // 2. Prepend A. Grid: A, B, ...
                // This preserves the sorted order.

                grid.prepend(card);
                card.classList.add('popular-game-highlight'); // Optional: CSS class if we want to style it
            }
        });

    } catch (e) {
        console.error("Error prioritizing games:", e);
    }
}


// ========================================
// Scroll Animation Observer
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-in-view');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const targets = document.querySelectorAll('.game-card-item, .stats-hero, .daily-banner, .category-filter-container, .wc-header-compact');

    targets.forEach(target => {
        observer.observe(target);
    });
}


// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize prioritization
    prioritizePopularGames();

    // Add tracking to all game cards
    document.querySelectorAll('.game-card-item').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game-id');
            if (gameId) trackGameUsage(gameId);
        });
    });

    loadScores();
    initDarkMode();
    initMobileView(); // Initialize Mobile View
    initScrollAnimations(); // Initialize Scroll Animations

    const flashcard = document.getElementById('flashcard');
    const fcWrongBtn = document.getElementById('fcWrongBtn');
    const fcCorrectBtn = document.getElementById('fcCorrectBtn');
    const micBtn = document.getElementById('micBtn');
    const nextPronunciationBtn = document.getElementById('nextPronunciationBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Word Wheel Elements
    const wheelCheckBtn = document.getElementById('wheelCheckBtn');
    const nextWheelBtn = document.getElementById('nextWheelBtn');
    const skipWheelBtn = document.getElementById('skipWheelBtn');

    if (flashcard) {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
    }

    if (fcWrongBtn) fcWrongBtn.addEventListener('click', () => handleFlashcardResult(false));
    if (fcCorrectBtn) fcCorrectBtn.addEventListener('click', () => handleFlashcardResult(true));
    if (micBtn) micBtn.addEventListener('click', toggleMic);
    if (nextPronunciationBtn) nextPronunciationBtn.addEventListener('click', startPronunciationGame);
    // nextQuestionBtn is handled in missingWordGame.js



    // Word Wheel Listeners are handled in wordWheelGame.js
    // if (wheelCheckBtn) wheelCheckBtn.addEventListener('click', checkWordWheel);
    // if (nextWheelBtn) nextWheelBtn.addEventListener('click', startWordWheelGame);
    // if (skipWheelBtn) skipWheelBtn.addEventListener('click', skipWordWheel);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        const flashcardsGame = document.getElementById('flashcardsGame');
        if (flashcardsGame.style.display === 'block') {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                const flashcard = document.getElementById('flashcard');
                if (flashcard) flashcard.classList.toggle('flipped');
            } else if (e.code === 'ArrowLeft') {
                handleFlashcardResult(false);
            } else if (e.code === 'ArrowRight') {
                handleFlashcardResult(true);
            }
        }
    });
});

// --- WORDLE GAME ---
// Logic moved to wordleGame.js
// Leftover Wordle logic removed

// Set up Wordle Next button event listener (outside submitWordleGuess to avoid multiple bindings)
if (document.getElementById('nextWordleBtn')) {
    document.getElementById('nextWordleBtn').onclick = startWordleGame;
}
