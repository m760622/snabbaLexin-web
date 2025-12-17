// ========================================
// WORDLE GAME - ووردل السويدية
// Extracted from games.js
// ========================================
console.log("wordleGame.js LOADED");

// State
let wordleTarget = '';
let wordleGuesses = [];
let wordleCurrentGuess = '';
let wordleGameOver = false;
let wordleStreak = parseInt(localStorage.getItem('wordleStreak') || '0');

// Save streak on progress
function saveWordleStreak() {
    localStorage.setItem('wordleStreak', wordleStreak.toString());
}

// Export for global access if needed
window.wordleStreak = wordleStreak;

window.startWordleGame = function (retryCount = 0) {
    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        if (retryCount < 10) {
            console.warn(`Data not ready for Wordle. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar speldata... / جاري تحميل البيانات...", 'info');
            setTimeout(() => startWordleGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Data failed to load for Wordle.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda data. Uppdatera sidan. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }
    const grid = document.getElementById('wordleGrid');
    const keyboard = document.getElementById('wordleKeyboard');
    const messageEl = document.getElementById('wordleMessage');
    const nextBtn = document.getElementById('nextWordleBtn');
    const typeFilter = document.getElementById('wordleTypeFilter') ? document.getElementById('wordleTypeFilter').value : 'all';
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
    if (messageEl) messageEl.textContent = '';
    if (nextBtn) nextBtn.style.display = 'none';
    if (grid) grid.innerHTML = '';
    if (keyboard) keyboard.innerHTML = '';

    // Select Target Word based on difficulty
    let candidate = null;
    let attempts = 0;

    if (typeof dictionaryData === 'undefined') {
        console.error("dictionaryData is undefined");
        return;
    }

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
        if (messageEl) messageEl.textContent = "Kunde inte hitta ett ord. Försök igen.";
        return;
    }

    wordleTarget = candidate[COL_SWE].toUpperCase();
    const wordLength = wordleTarget.length;
    console.log("Wordle Target:", wordleTarget, "Difficulty:", difficulty);

    // Create Grid (6 rows, 5 cols) - FIXED: use wordle-tile not wordle-cell
    if (grid) {
        for (let i = 0; i < 30; i++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-tile';
            grid.appendChild(cell);
        }
    }

    // Create Keyboard
    const keys = [
        'QWERTYUIOPÅ',
        'ASDFGHJKLÖÄ',
        'ZXCVBNM'
    ];

    if (keyboard) {
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
    }

    // Keyboard Listeners (Physical)
    document.onkeydown = (e) => {
        const wordleGame = document.getElementById('wordleGame');
        if (!wordleGame || wordleGame.style.display === 'none') return;

        const key = e.key.toUpperCase();
        if (key === 'ENTER') submitWordleGuess();
        else if (key === 'BACKSPACE') handleWordleInput('BACKSPACE');
        else if (/^[A-ZÅÄÖ]$/.test(key)) handleWordleInput(key);
    };
}

window.handleWordleInput = function (key) {
    if (wordleGameOver) return;

    if (key === 'BACKSPACE') {
        wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
    } else if (wordleCurrentGuess.length < 5) {
        wordleCurrentGuess += key;
    }
    updateWordleGrid();
}

window.updateWordleGrid = function () {
    const grid = document.getElementById('wordleGrid');
    if (!grid) return;

    const currentRow = wordleGuesses.length;
    const startIdx = currentRow * 5;

    // Clear current row
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        if (cell) {
            cell.textContent = '';
            cell.classList.remove('typing');
        }
    }

    // Fill current guess
    for (let i = 0; i < wordleCurrentGuess.length; i++) {
        const cell = grid.children[startIdx + i];
        if (cell) {
            cell.textContent = wordleCurrentGuess[i];
            cell.classList.add('typing');
        }
    }
}

window.submitWordleGuess = function () {
    if (wordleGameOver) return;
    if (wordleCurrentGuess.length !== 5) {
        if (typeof showToast === 'function') showToast("Ordet måste ha 5 bokstäver");
        return;
    }

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

        // Safety check
        if (!cell) return;

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
            if (typeof showToast === 'function') showToast(`Grattis! Du gissade ordet! 🎉 / تهانينا!`, 'success');

            // Trigger generic success if available
            if (typeof playSuccessSound === 'function') playSuccessSound();
            if (typeof triggerConfetti === 'function') triggerConfetti();

            const messageEl = document.getElementById('wordleMessage');
            if (messageEl) messageEl.textContent = "Du vann! / فزت!";

            const nextBtn = document.getElementById('nextWordleBtn');
            if (nextBtn) nextBtn.style.display = 'block';

            // Update streak
            wordleStreak++;
            saveWordleStreak();

            // Save score
            if (typeof saveScore === 'function') {
                const score = (6 - wordleGuesses.length + 1) * 10;
                saveScore('wordle', score);
            }
        }, 1500);
    } else if (wordleGuesses.length >= 6) {
        wordleGameOver = true;
        setTimeout(() => {
            if (typeof showToast === 'function') showToast(`Tyvärr! Ordet var ${wordleTarget}`, 'error');

            const messageEl = document.getElementById('wordleMessage');
            if (messageEl) messageEl.textContent = `Rätt svar: ${wordleTarget}`;

            const nextBtn = document.getElementById('nextWordleBtn');
            if (nextBtn) nextBtn.style.display = 'block';

            // Reset streak
            wordleStreak = 0;
            saveWordleStreak();
        }, 1500);
    } else {
        // Next guess
        wordleCurrentGuess = '';
    }
}
