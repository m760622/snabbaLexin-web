// ========================================
// SPELLING GAME - Write the Word / اكتب الكلمة
// ========================================
console.log("spellingGame.js LOADED");

// State
let spellingCurrentItem = null;
let spellingScore = 0;

// Start Spelling Game
window.startSpellingGame = function (retryCount = 0) {
    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        if (retryCount < 10) {
            console.warn(`Data not ready for Spelling. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar speldata... / جاري تحميل البيانات...", 'info');
            setTimeout(() => startSpellingGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Data failed to load for Spelling.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda data. Uppdatera sidan. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }

    spellingScore = 0;
    document.getElementById('spellingScore').textContent = '0';
    loadSpellingQuestion();
};

// Load Question
function loadSpellingQuestion() {
    const hintEl = document.getElementById('spellingHint');
    const exampleEl = document.getElementById('spellingExample');
    const optionsEl = document.getElementById('spellingOptions');
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');

    feedbackEl.innerHTML = '';
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';
    optionsEl.innerHTML = '<div class="skeleton-loader">Laddar...</div>';

    // Find a suitable word with translation
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 200) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_ARB] && item[COL_SWE].length > 2 && item[COL_SWE].length < 15) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        hintEl.textContent = "Kunde inte hitta ett ord. Försök igen.";
        exampleEl.textContent = "";
        optionsEl.innerHTML = '<button class="game-option" onclick="loadSpellingQuestion()">Försök igen</button>';
        return;
    }

    spellingCurrentItem = candidate;
    const word = candidate[COL_SWE];
    const translation = candidate[COL_ARB];
    const example = candidate[COL_EX] || '';

    // Show Arabic translation as hint
    hintEl.textContent = translation;
    exampleEl.textContent = example ? `💡 ${example}` : '';

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
        btn.className = 'spelling-option-btn';
        btn.textContent = option;
        btn.onclick = () => checkSpellingAnswer(option, word, btn);
        optionsEl.appendChild(btn);
    });
}

// Check Answer
function checkSpellingAnswer(selected, correct, btnEl) {
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');
    const allBtns = document.querySelectorAll('.spelling-option-btn');

    // Disable all buttons
    allBtns.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        btnEl.classList.add('correct');
        feedbackEl.innerHTML = '✅ Rätt! / صحيح!';
        feedbackEl.className = 'game-feedback success';
        spellingScore++;
        document.getElementById('spellingScore').textContent = spellingScore;

        // Save score
        if (typeof saveScore === 'function') {
            saveScore('spelling', spellingScore);
        }

        // Speak the word
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(correct, 'sv');
        }
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
}
