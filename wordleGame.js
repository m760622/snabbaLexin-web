// ========================================
//  WORDLE GAME LOGIC
// ========================================

let wordleTarget = '';
let wordleGuesses = [];
let wordleCurrentGuess = '';
let wordleGameOver = false;
let wordleStreak = 0;

// --- WORDLE GAME ---
function startWordleGame() {
    const grid = document.getElementById('wordleGrid');
    const keyboard = document.getElementById('wordleKeyboard');
    const messageEl = document.getElementById('wordleMessage');
    const restartBtn = document.getElementById('restartWordleBtn');

    // Reset
    wordleGuesses = [];
    wordleCurrentGuess = '';
    wordleGameOver = false;
    grid.innerHTML = '';
    keyboard.innerHTML = '';
    messageEl.textContent = '';
    restartBtn.style.display = 'none';

    // Pick a 5-letter word
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        const word = item[COL_SWE] || '';
        if (word.length === 5 && !word.includes(' ') && !word.includes('-') && /^[a-zåäö]+$/i.test(word)) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        messageEl.textContent = "Kunde inte hitta ord...";
        return;
    }

    wordleTarget = candidate[COL_SWE].toLowerCase();
    console.log("Wordle Target:", wordleTarget); // Debug

    // Create Grid (6 rows, 5 cols)
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'wordle-cell';
        grid.appendChild(cell);
    }

    // Create Keyboard
    const keys = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ö', 'ä',
        'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'
    ];

    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'key-btn';
        if (key === 'enter') btn.classList.add('wide');
        if (key === 'back') btn.classList.add('wide');
        btn.textContent = key === 'back' ? '⌫' : key.toUpperCase();
        btn.dataset.key = key;
        btn.onclick = () => handleWordleInput(key);
        keyboard.appendChild(btn);
    });

    restartBtn.onclick = startWordleGame;
}

function handleWordleInput(key) {
    if (wordleGameOver) return;

    if (key === 'enter') {
        if (wordleCurrentGuess.length === 5) {
            checkWordleGuess();
        } else {
            showToast("För kort! / قصير جداً");
        }
    } else if (key === 'back') {
        wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
        updateWordleGrid();
    } else {
        if (wordleCurrentGuess.length < 5) {
            wordleCurrentGuess += key;
            updateWordleGrid();
        }
    }
}

function updateWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    const rowStart = wordleGuesses.length * 5;

    // Clear current row visual
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[rowStart + i];
        cell.textContent = wordleCurrentGuess[i] || '';
        cell.className = 'wordle-cell'; // Reset
        if (wordleCurrentGuess[i]) cell.classList.add('filled');
    }
}

function checkWordleGuess() {
    const guess = wordleCurrentGuess.toLowerCase();
    const target = wordleTarget;
    const grid = document.getElementById('wordleGrid');
    const rowStart = wordleGuesses.length * 5;
    const messageEl = document.getElementById('wordleMessage');

    // Check dictionary (optional, skipping for simplicity or can check dictionaryData)
    // For now, assume valid word if 5 chars

    // Color Logic
    const targetCounts = {};
    for (let char of target) targetCounts[char] = (targetCounts[char] || 0) + 1;

    const result = Array(5).fill('absent');
    const guessArr = guess.split('');

    // 1. Check Correct (Green)
    guessArr.forEach((char, i) => {
        if (char === target[i]) {
            result[i] = 'correct';
            targetCounts[char]--;
        }
    });

    // 2. Check Present (Yellow)
    guessArr.forEach((char, i) => {
        if (result[i] !== 'correct' && targetCounts[char] > 0) {
            result[i] = 'present';
            targetCounts[char]--;
        }
    });

    // Apply Styles with Animation Delay
    result.forEach((status, i) => {
        const cell = grid.children[rowStart + i];
        setTimeout(() => {
            cell.classList.add(status);
            // Update Keyboard
            const keyBtn = document.querySelector(`.key-btn[data-key="${guessArr[i]}"]`);
            if (keyBtn) {
                // Priority: correct > present > absent
                if (status === 'correct') keyBtn.className = 'key-btn correct';
                else if (status === 'present' && !keyBtn.classList.contains('correct')) keyBtn.className = 'key-btn present';
                else if (status === 'absent' && !keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) keyBtn.classList.add('absent');
            }
        }, i * 100);
    });

    wordleGuesses.push(guess);
    wordleCurrentGuess = '';

    if (guess === target) {
        wordleGameOver = true;
        messageEl.textContent = "Grattis! / مبروك!";
        triggerConfetti();
        wordleStreak++;
        saveScore('wordle', wordleStreak); // Save Streak
        document.getElementById('restartWordleBtn').style.display = 'block';
    } else if (wordleGuesses.length >= 6) {
        wordleGameOver = true;
        messageEl.textContent = `Rätt ord var: ${target.toUpperCase()}`;
        wordleStreak = 0; // Reset streak on loss
        saveScore('wordle', wordleStreak);
        document.getElementById('restartWordleBtn').style.display = 'block';
    }
}
