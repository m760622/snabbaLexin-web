// ========================================
// SPELLING GAME - Cyber Neon Theme
// ========================================
console.log("spellingGame.js LOADED");

// State
let spellingCurrentItem = null;
let spellingScore = 0;
let spellingStreak = 0;

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
    spellingStreak = 0;
    updateSpellingDisplay();
    loadSpellingQuestion();
};

// Update Display
function updateSpellingDisplay() {
    const scoreEl = document.getElementById('spellingScore');
    const streakEl = document.getElementById('spellingStreak');
    if (scoreEl) scoreEl.textContent = spellingScore;
    if (streakEl) streakEl.textContent = spellingStreak;
}

// Load Question
function loadSpellingQuestion() {
    const hintEl = document.getElementById('spellingHint');
    const exampleEl = document.getElementById('spellingExample');
    const optionsEl = document.getElementById('spellingOptions');
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');
    const hintBtn = document.getElementById('spHintBtn');

    // Reset UI
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'sp-feedback';
    nextBtn.classList.add('hidden');
    if (hintBtn) hintBtn.classList.remove('hidden');
    optionsEl.innerHTML = '<div class="sp-loading"><div class="sp-loading-spinner"></div><span>Laddar...</span></div>';

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
        optionsEl.innerHTML = '<button class="spelling-option-btn" onclick="loadSpellingQuestion()">Försök igen</button>';
        return;
    }

    spellingCurrentItem = candidate;
    const word = candidate[COL_SWE];
    const translation = candidate[COL_ARB];
    const example = candidate[COL_EX] || '';

    // Show Arabic translation as hint (hide example until after correct answer)
    hintEl.textContent = translation;
    exampleEl.textContent = ''; // Hide example - will show after correct answer

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

    // Render options with delay for animation
    setTimeout(() => {
        optionsEl.innerHTML = '';
        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'spelling-option-btn';
            btn.textContent = option;
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.onclick = () => {
                // Play click sound
                if (typeof soundManager !== 'undefined' && soundManager.playClick) {
                    soundManager.playClick();
                }
                checkSpellingAnswer(option, word, btn);
            };
            optionsEl.appendChild(btn);
        });
    }, 300);

    // Setup speak button
    const speakBtn = document.getElementById('spSpeakHint');
    if (speakBtn) {
        speakBtn.onclick = () => {
            if (typeof TTSManager !== 'undefined') {
                TTSManager.speak(word, 'sv');
            }
        };
    }
}

// Check Answer
function checkSpellingAnswer(selected, correct, btnEl) {
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');
    const hintBtn = document.getElementById('spHintBtn');
    const allBtns = document.querySelectorAll('.spelling-option-btn');

    // Disable all buttons
    allBtns.forEach(btn => btn.disabled = true);

    // Hide hint button
    if (hintBtn) hintBtn.classList.add('hidden');

    // Common Feedback Generation (Learning-focused)
    const translation = spellingCurrentItem[COL_ARB] || '';
    const exampleSwe = spellingCurrentItem[COL_EX] || '';
    const exampleArb = spellingCurrentItem[COL_EX_ARB] || '';
    const definitionSwe = spellingCurrentItem[5] || ''; // Index 5 is Swedish Definition/Synonyms
    const type = spellingCurrentItem[1] || 'ord'; // Index 1 is Part of Speech

    let feedbackHTML = '';

    // Generate educational sentence using shared utility
    const sentenceData = generateEducationalSentence(correct, translation, exampleSwe, exampleArb, definitionSwe, type);

    feedbackHTML += `<div class="sp-example-sentence">
        <div class="sp-sentence-swe">📖 ${sentenceData.s}</div>
        <div class="sp-sentence-arb calc-text-size">${sentenceData.a}</div>
    </div>`;

    if (selected === correct) {
        btnEl.classList.add('correct');
        spellingScore++;
        spellingStreak++;
        updateSpellingDisplay();

        // Haptic vibration
        if (typeof HapticManager !== 'undefined') {
            HapticManager.trigger('success');
        } else if (navigator.vibrate) {
            navigator.vibrate([50, 30, 50]);
        }

        // Play success sound
        if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
            soundManager.playSuccess();
        }

        feedbackEl.innerHTML = feedbackHTML;
        feedbackEl.className = 'sp-feedback success';

        // Trigger text sizing calc
        if (window.TextSizeManager) {
            window.TextSizeManager.applyRules();
        }

        // Save score
        if (typeof saveScore === 'function') {
            saveScore('spelling', spellingScore);
        }

        // Trigger celebration for streaks
        if (spellingStreak >= 3 && spellingStreak % 3 === 0) {
            if (typeof showToast === 'function') {
                showToast(`🔥 ${spellingStreak} i rad! / ${spellingStreak} على التوالي!`, 'success');
            }
        }
    } else {
        btnEl.classList.add('wrong');

        // Find and highlight correct button
        allBtns.forEach(btn => {
            if (btn.textContent === correct) {
                setTimeout(() => btn.classList.add('correct'), 300);
            }
        });

        feedbackEl.innerHTML = feedbackHTML;
        feedbackEl.className = 'sp-feedback'; // Neutral or error style

        spellingStreak = 0;
        updateSpellingDisplay();

        // Play error sound
        if (typeof soundManager !== 'undefined' && soundManager.playError) {
            soundManager.playError();
        }
    }

    // Always speak the word for learning
    if (typeof TTSManager !== 'undefined') {
        TTSManager.speak(correct, 'sv');
    }

    nextBtn.classList.remove('hidden');
}

// Show Hint (reveal first letter)
window.showSpellingHint = function () {
    if (!spellingCurrentItem) return;

    const word = spellingCurrentItem[COL_SWE];
    const firstLetter = word.charAt(0).toUpperCase();

    if (typeof showToast === 'function') {
        showToast(`💡 Första bokstaven: ${firstLetter}`, 'info');
    }

    // Disable hint button after use
    const hintBtn = document.getElementById('spHintBtn');
    if (hintBtn) {
        hintBtn.disabled = true;
        hintBtn.style.opacity = '0.5';
    }
}
