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

        // Reset Score for new game session
        resetGameScore();

        if (gameType === 'missing-word') {
            missingWordGame.style.display = 'block';
            startMissingWordGame();
        } else if (gameType === 'flashcards') {
            flashcardsGame.style.display = 'block';
            initFlashcards();
        } else if (gameType === 'pronunciation') {
            pronunciationGame.style.display = 'block';
            startPronunciationGame();
        } else if (gameType === 'spelling') {
            spellingGame.style.display = 'block';
            startSpellingGame();
        } else if (gameType === 'word-wheel') {
            wordWheelGame.style.display = 'block';
            // Reset Wheel State
            wheelLevel = 3;
            wheelWordsSolved = 0;
            startWordWheelGame();
        } else if (gameType === 'sentence-builder') {
            sentenceGame.style.display = 'block';
            startSentenceGame();
        } else if (gameType === 'word-rain') {
            if (rainGame) rainGame.style.display = 'block';
            else console.error("rainGame element not found!");

            if (typeof initRainGame === 'function') {
                initRainGame();
            } else {
                console.error("initRainGame function not found!");
            }
        } else if (gameType === 'wordle') {
            wordleGame.style.display = 'block';
            startWordleGame();
        } else if (gameType === 'grammar') {
            grammarGame.style.display = 'block';
            startGrammarGame();
        } else if (gameType === 'word-connect') {
            wordConnectGame.style.display = 'flex'; // Flex for full height layout
            initWordConnect();
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

let missingWordCurrentItem = null;
let missingWordScore = 0;

function startMissingWordGame() {
    missingWordScore = 0;
    document.getElementById('gameScore').textContent = '0';
    loadMissingWordQuestion();
}

function loadMissingWordQuestion() {
    const sentenceEl = document.getElementById('gameSentence');
    const hintEl = document.getElementById('gameHint');
    const optionsEl = document.getElementById('gameOptions');
    const feedbackEl = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextQuestionBtn');

    feedbackEl.innerHTML = '';
    nextBtn.style.display = 'none';
    optionsEl.innerHTML = '<div class="skeleton-loader">Laddar...</div>';

    // Find a word with an example sentence
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 200) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_EX] && item[COL_SWE] && item[COL_ARB]) {
            const example = item[COL_EX];
            const word = item[COL_SWE];
            // Check if the word appears in the example
            if (example.toLowerCase().includes(word.toLowerCase()) && word.length > 2) {
                candidate = item;
            }
        }
        attempts++;
    }

    if (!candidate) {
        sentenceEl.textContent = "Kunde inte hitta en fråga. Försök igen.";
        hintEl.textContent = "";
        optionsEl.innerHTML = '<button class="game-option" onclick="loadMissingWordQuestion()">Försök igen</button>';
        return;
    }

    missingWordCurrentItem = candidate;
    const word = candidate[COL_SWE];
    const example = candidate[COL_EX];
    const translation = candidate[COL_ARB];

    // Create sentence with blank
    const regex = new RegExp(word, 'i');
    const sentenceWithBlank = example.replace(regex, '______');

    sentenceEl.innerHTML = sentenceWithBlank;
    hintEl.textContent = translation;

    // Generate options (1 correct + 3 wrong)
    const options = [word];
    let optionAttempts = 0;

    while (options.length < 4 && optionAttempts < 100) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_SWE] &&
            randomItem[COL_SWE] !== word &&
            !options.includes(randomItem[COL_SWE]) &&
            randomItem[COL_SWE].length > 2) {
            options.push(randomItem[COL_SWE]);
        }
        optionAttempts++;
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render options
    optionsEl.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'game-option';
        btn.textContent = option;
        btn.onclick = () => checkMissingWordAnswer(option, word, btn);
        optionsEl.appendChild(btn);
    });
}

function checkMissingWordAnswer(selected, correct, btnEl) {
    const feedbackEl = document.getElementById('gameFeedback');
    const nextBtn = document.getElementById('nextQuestionBtn');
    const allBtns = document.querySelectorAll('.game-option');

    // Disable all buttons
    allBtns.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        btnEl.classList.add('correct');
        feedbackEl.innerHTML = '✅ Rätt! / صحيح!';
        feedbackEl.className = 'game-feedback success';
        missingWordScore++;
        document.getElementById('gameScore').textContent = missingWordScore;
        saveScore('missing-word', missingWordScore);
    } else {
        btnEl.classList.add('wrong');
        feedbackEl.innerHTML = `❌ Fel! Rätt svar: <strong>${correct}</strong>`;
        feedbackEl.className = 'game-feedback error';
        // Highlight correct answer
        allBtns.forEach(btn => {
            if (btn.textContent === correct) {
                btn.classList.add('correct');
            }
        });
    }

    nextBtn.style.display = 'block';
    nextBtn.onclick = loadMissingWordQuestion;
}

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
function startWordleGame() {
    const grid = document.getElementById('wordleGrid');
    const keyboard = document.getElementById('wordleKeyboard');
    const messageEl = document.getElementById('wordleMessage');
    const nextBtn = document.getElementById('nextWordleBtn');
    const typeFilter = document.getElementById('wordleTypeFilter').value;
    const difficultyEl = document.getElementById('wordleDifficulty');
    const difficulty = difficultyEl ? difficultyEl.value : 'medium';

    // Difficulty settings: word length range
    let minLen = 5, maxLen = 5;
    if (difficulty === 'easy') {
        minLen = 4; maxLen = 4; // Short 4-letter words
    } else if (difficulty === 'medium') {
        minLen = 5; maxLen = 5; // Standard 5-letter words
    } else if (difficulty === 'hard') {
        minLen = 6; maxLen = 6; // Longer 6-letter words
    }

    // Reset State
    wordleGuesses = [];
    wordleCurrentGuess = '';
    wordleGameOver = false;
    messageEl.textContent = '';
    nextBtn.style.display = 'none';
    grid.innerHTML = '';
    keyboard.innerHTML = '';

    // Select Target Word based on difficulty
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_SWE].length >= minLen && item[COL_SWE].length <= maxLen &&
            !item[COL_SWE].includes(' ') && !item[COL_SWE].includes('-') && /^[a-zA-ZåäöÅÄÖ]+$/.test(item[COL_SWE])) {
            // Filter by type if selected
            if (typeFilter !== 'all') {
                if (item[COL_TYPE] && item[COL_TYPE].toLowerCase().includes(typeFilter)) {
                    candidate = item;
                }
            } else {
                candidate = item;
            }
        }
        attempts++;
    }

    if (!candidate) {
        messageEl.textContent = "Kunde inte hitta ett ord. Försök igen.";
        return;
    }

    wordleTarget = candidate[COL_SWE].toUpperCase();
    const wordLength = wordleTarget.length;
    console.log("Wordle Target:", wordleTarget, "Difficulty:", difficulty);

    // Create Grid (6 rows, 5 cols) - FIXED: use wordle-tile not wordle-cell
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'wordle-tile';
        grid.appendChild(cell);
    }

    // Create Keyboard
    const keys = [
        'QWERTYUIOPÅ',
        'ASDFGHJKLÖÄ',
        'ZXCVBNM'
    ];

    keys.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'keyboard-row';

        row.split('').forEach(key => {
            const keyBtn = document.createElement('button');
            keyBtn.className = 'key-btn';
            keyBtn.textContent = key;
            keyBtn.onclick = () => handleWordleInput(key);
            keyBtn.dataset.key = key;
            rowEl.appendChild(keyBtn);
        });

        if (row === 'ZXCVBNM') {
            // Add Enter and Backspace
            const enterBtn = document.createElement('button');
            enterBtn.className = 'key-btn wide';
            enterBtn.textContent = 'ENTER';
            enterBtn.onclick = submitWordleGuess;
            rowEl.appendChild(enterBtn);

            const backBtn = document.createElement('button');
            backBtn.className = 'key-btn wide';
            backBtn.textContent = '⌫';
            backBtn.onclick = () => handleWordleInput('BACKSPACE');
            rowEl.prepend(backBtn);
        }

        keyboard.appendChild(rowEl);
    });

    // Keyboard Listeners (Physical)
    document.onkeydown = (e) => {
        if (document.getElementById('wordleGame').style.display === 'none') return;

        const key = e.key.toUpperCase();
        if (key === 'ENTER') submitWordleGuess();
        else if (key === 'BACKSPACE') handleWordleInput('BACKSPACE');
        else if (/^[A-ZÅÄÖ]$/.test(key)) handleWordleInput(key);
    };
}

function handleWordleInput(key) {
    if (wordleGameOver) return;

    if (key === 'BACKSPACE') {
        wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
    } else if (wordleCurrentGuess.length < 5) {
        wordleCurrentGuess += key;
    }
    updateWordleGrid();
}

function updateWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    const currentRow = wordleGuesses.length;
    const startIdx = currentRow * 5;

    // Clear current row
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = '';
        cell.classList.remove('typing');
    }

    // Fill current guess
    for (let i = 0; i < wordleCurrentGuess.length; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = wordleCurrentGuess[i];
        cell.classList.add('typing');
    }
}

function submitWordleGuess() {
    if (wordleGameOver) return;
    if (wordleCurrentGuess.length !== 5) {
        showToast("Ordet måste ha 5 bokstäver");
        return;
    }

    // Check if word exists (optional, but good for UX)
    // For now, we allow any 5-letter combo to keep it simple, or check dictionary
    /*
    const exists = dictionaryData.some(d => d[COL_SWE].toUpperCase() === wordleCurrentGuess);
    if (!exists) {
        showToast("Finns inte i ordlistan");
        return;
    }
    */

    const guess = wordleCurrentGuess;
    wordleGuesses.push(guess);

    // Color the grid
    const rowStart = (wordleGuesses.length - 1) * 5;
    const grid = document.getElementById('wordleGrid');
    const targetChars = wordleTarget.split('');

    // First pass: Correct (Green)
    const guessChars = guess.split('');
    const states = Array(5).fill('absent'); // absent, present, correct

    guessChars.forEach((char, i) => {
        if (char === targetChars[i]) {
            states[i] = 'correct';
            targetChars[i] = null; // Mark as used
            guessChars[i] = null;
        }
    });

    // Second pass: Present (Yellow)
    guessChars.forEach((char, i) => {
        if (char && targetChars.includes(char)) {
            states[i] = 'present';
            const targetIdx = targetChars.indexOf(char);
            targetChars[targetIdx] = null;
        }
    });

    // Apply styles with animation delay
    states.forEach((state, i) => {
        const cell = grid.children[rowStart + i];
        setTimeout(() => {
            cell.classList.add(state);
            // Update Keyboard
            const keyBtn = document.querySelector(`.key-btn[data-key="${guess[i]}"]`);
            if (keyBtn) {
                // Only upgrade status (absent -> present -> correct)
                const currentClass = keyBtn.classList.contains('correct') ? 'correct' :
                    keyBtn.classList.contains('present') ? 'present' : 'absent';

                if (state === 'correct') keyBtn.className = `key-btn correct`;
                else if (state === 'present' && currentClass !== 'correct') keyBtn.className = `key-btn present`;
                else if (state === 'absent' && currentClass === 'absent') keyBtn.className = `key-btn absent`;
                else if (state === 'absent' && !keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) keyBtn.classList.add('absent');
            }
        }, i * 100);
    });

    // Check Win/Loss
    if (guess === wordleTarget) {
        wordleGameOver = true;
        setTimeout(() => {
            document.getElementById('wordleMessage').textContent = "Grattis! Du klarade det! 🎉";
            wordleStreak++;
            document.getElementById('wordleStreak').textContent = wordleStreak;
            triggerConfetti();
            document.getElementById('nextWordleBtn').style.display = 'block';
        }, 2000);
    } else if (wordleGuesses.length >= 6) {
        wordleGameOver = true;
        setTimeout(() => {
            document.getElementById('wordleMessage').innerHTML = `Tyvärr! Rätt ord var: <strong>${wordleTarget}</strong>`;
            wordleStreak = 0;
            document.getElementById('wordleStreak').textContent = wordleStreak;
            document.getElementById('nextWordleBtn').style.display = 'block';
        }, 2000);
    }

    wordleCurrentGuess = '';
}

// Set up Wordle Next button event listener (outside submitWordleGuess to avoid multiple bindings)
if (document.getElementById('nextWordleBtn')) {
    document.getElementById('nextWordleBtn').onclick = startWordleGame;
}
