// ========================================
// WORD WHEEL GAME - عجلة الكلمات
// ========================================
console.log("wordWheelGame.js LOADED");

// State
let wheelTarget = null;
let wheelCurrentWord = '';
let wheelScore = 0;
let wheelLevel = 3; // Starting word length
let wheelWordsSolved = 0;

// Start Word Wheel Game
window.startWordWheelGame = function (retryCount = 0) {
    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        if (retryCount < 10) {
            console.warn(`Data not ready for Word Wheel. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar speldata... / جاري تحميل البيانات...", 'info');
            setTimeout(() => startWordWheelGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Data failed to load for Word Wheel.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda data. Uppdatera sidan. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }
    const answerBox = document.getElementById('wheelAnswerBox');
    const hintEl = document.getElementById('wheelHint');
    const lettersEl = document.getElementById('wheelLetters');
    const feedbackEl = document.getElementById('wheelFeedback');
    const exampleEl = document.getElementById('wheelExample');
    const nextBtn = document.getElementById('nextWheelBtn2');
    const lengthSelect = document.getElementById('wordWheelLength');

    wheelLevel = lengthSelect ? parseInt(lengthSelect.value) : 3;

    // Reset UI
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'game-feedback';
    exampleEl.classList.add('hidden');
    nextBtn.classList.add('hidden');
    answerBox.innerHTML = '';
    wheelCurrentWord = '';

    // Find a word of the selected length
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_ARB]) {
            const word = item[COL_SWE].toUpperCase();
            if (word.length === wheelLevel &&
                !word.includes(' ') &&
                !word.includes('-') &&
                /^[A-ZÅÄÖ]+$/.test(word)) {
                candidate = {
                    word: word,
                    translation: item[COL_ARB],
                    example: item[COL_EX] || '',
                    exampleArb: item[COL_EX_ARB] || '' // Capture Arabic translation
                };
            }
        }
        attempts++;
    }

    if (!candidate) {
        hintEl.textContent = "Kunde inte hitta ett ord. Försök igen.";
        lettersEl.innerHTML = '<button class="wheel-letter" onclick="startWordWheelGame()">🔄</button>';
        return;
    }

    wheelTarget = candidate;
    hintEl.textContent = candidate.translation;

    // Dynamic Font Sizing for Arabic Hint
    const arbLength = candidate.translation.length;
    if (arbLength > 15) {
        hintEl.style.fontSize = '1.5rem';
    } else if (arbLength > 10) {
        hintEl.style.fontSize = '1.8rem';
    } else {
        hintEl.style.fontSize = '2.2rem'; // Default large size
    }

    // Set Dynamic Answer Box Width based on letter count
    // Width = (N * 44px letter) + ((N-1) * 0.4rem gap) + 20px padding + 4px border
    const letterCount = candidate.word.length;
    let charWidth = 44;
    let gapSize = 6.4; // 0.4rem approx

    // Adjust for long words
    if (letterCount > 6) {
        answerBox.classList.add('small-text');
        charWidth = 36; // Match CSS width for small-text
    } else {
        answerBox.classList.remove('small-text');
    }

    // Using 50px per letter + gap to be safe vs tight fit
    const totalWidth = (letterCount * charWidth) + ((letterCount - 1) * gapSize) + 30; // 30px for padding/border safety
    answerBox.style.width = `${totalWidth}px`;
    answerBox.style.minWidth = '0'; // Override any CSS min-width

    // Shuffle letters
    const letters = candidate.word.split('').sort(() => Math.random() - 0.5);

    // Render wheel letters
    lettersEl.innerHTML = '';
    letters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.className = 'wheel-letter';
        btn.textContent = letter;
        btn.dataset.index = index;
        btn.onclick = () => selectWheelLetter(btn, letter);

        // Position in circle
        const angle = (index / letters.length) * 2 * Math.PI - Math.PI / 2;
        const radius = 45; // Reduced from 60 to 45 for tighter, smaller wheel
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        btn.style.left = `${x}%`;
        btn.style.top = `${y}%`;
        btn.style.transform = 'translate(-50%, -50%)';

        lettersEl.appendChild(btn);
    });

    // Bind check button
    const checkBtn = document.getElementById('wheelCheckBtn');
    if (checkBtn) {
        checkBtn.onclick = checkWordWheel;
    }

    updateHintButtonState();
};

function updateHintButtonState() {
    const hintBtn = document.getElementById('wheelShowAnswerBtn');
    if (!hintBtn) return;

    if (wheelScore >= 1) {
        hintBtn.disabled = false;
        hintBtn.title = "Visa svaret (Kostar 1 poäng) / أظهر الإجابة (تكلفة 1 نقطة)";
    } else {
        hintBtn.disabled = true;
        hintBtn.title = "Du behöver 1 poäng / تحتاج إلى نقطة واحدة";
    }
}

// Select Letter
function selectWheelLetter(btn, letter) {
    if (btn.classList.contains('used')) return;

    if (typeof soundManager !== 'undefined') soundManager.playClick();

    btn.classList.add('used');
    wheelCurrentWord += letter;
    updateWheelAnswerBox();

    // Auto-check if word length matches
    if (wheelCurrentWord.length === wheelTarget.word.length) {
        checkWordWheel();
    }
}

// Update Answer Box
function updateWheelAnswerBox() {
    const answerBox = document.getElementById('wheelAnswerBox');
    answerBox.innerHTML = '';

    // Clear shake if typing resets
    answerBox.classList.remove('shake-error');
    document.getElementById('wheelFeedback').innerHTML = ''; // Clear feedback on type

    wheelCurrentWord.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'wheel-answer-letter';
        span.textContent = letter;
        span.onclick = () => removeWheelLetter(index, letter);
        answerBox.appendChild(span);
    });
}

// Remove Letter
function removeWheelLetter(index, letter) {
    if (typeof soundManager !== 'undefined') soundManager.playClick();
    wheelCurrentWord = wheelCurrentWord.slice(0, index) + wheelCurrentWord.slice(index + 1);

    // Re-enable the letter button
    const lettersEl = document.getElementById('wheelLetters');
    const usedBtns = lettersEl.querySelectorAll('.wheel-letter.used');
    let found = false;
    usedBtns.forEach(btn => {
        if (!found && btn.textContent === letter) {
            btn.classList.remove('used');
            found = true;
        }
    });

    updateWheelAnswerBox();
}

// Check Answer
function checkWordWheel() {
    const feedbackEl = document.getElementById('wheelFeedback');
    const exampleEl = document.getElementById('wheelExample');
    const nextBtn = document.getElementById('nextWheelBtn2');
    const answerBox = document.getElementById('wheelAnswerBox');

    if (wheelCurrentWord.toUpperCase() === wheelTarget.word) {
        if (typeof soundManager !== 'undefined') soundManager.playSuccess();

        feedbackEl.innerHTML = '✅ Rätt! / صحيح!';
        feedbackEl.className = 'game-feedback success';
        wheelScore++;
        wheelWordsSolved++;
        document.getElementById('wordWheelScore').textContent = wheelScore;
        updateHintButtonState();

        if (wheelTarget.example) {
            // Show Swedish example AND Arabic translation if available
            let exampleHtml = `💡 ${wheelTarget.example}`;
            if (wheelTarget.exampleArb) {
                exampleHtml += `<br><span class="arb-example" style="color: #fbbf24; font-weight: bold; display: block; margin-top: 0.5rem;">${wheelTarget.exampleArb}</span>`;
            }
            exampleEl.innerHTML = exampleHtml;
            exampleEl.classList.remove('hidden');
        }

        if (typeof saveScore === 'function') {
            saveScore('word-wheel', wheelScore);
        }

        // Speak the word
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(wheelTarget.word.toLowerCase(), 'sv');
        }

        nextBtn.classList.remove('hidden');
    } else {
        if (typeof soundManager !== 'undefined') soundManager.playError();

        // Add Shake Animation to Answer Box
        answerBox.classList.add('shake-error');
        setTimeout(() => answerBox.classList.remove('shake-error'), 500);

        feedbackEl.innerHTML = '❌ Fel svar, försök igen! / إجابة خاطئة، حاول مرة أخرى';
        feedbackEl.className = 'game-feedback error';

        // Vibrate if on mobile
        if (navigator.vibrate) navigator.vibrate(200);
    }
}

// Undo
window.undoWordWheel = function () {
    if (wheelCurrentWord.length > 0) {
        const lastLetter = wheelCurrentWord[wheelCurrentWord.length - 1];
        wheelCurrentWord = wheelCurrentWord.slice(0, -1);

        const lettersEl = document.getElementById('wheelLetters');
        const usedBtns = Array.from(lettersEl.querySelectorAll('.wheel-letter.used'));
        for (let i = usedBtns.length - 1; i >= 0; i--) {
            if (usedBtns[i].textContent === lastLetter) {
                usedBtns[i].classList.remove('used');
                break;
            }
        }

        updateWheelAnswerBox();
    }
};

// Skip
window.skipWordWheel = function () {
    startWordWheelGame();
};

// Show Answer (Costs 1 Point)
window.showWordWheelAnswer = function () {
    if (wheelScore < 1) {
        if (typeof showToast === 'function') showToast("Du behöver minst 1 poäng! / تحتاج نقطة واحدة على الأقل!", 'error');
        return;
    }

    // Deduct cost
    wheelScore--;
    document.getElementById('wordWheelScore').textContent = wheelScore;
    updateHintButtonState();

    // Fill Answer Logic
    wheelCurrentWord = wheelTarget.word;

    // Mark all letters as used
    const lettersEl = document.getElementById('wheelLetters');
    const letters = lettersEl.querySelectorAll('.wheel-letter');
    letters.forEach(btn => btn.classList.add('used'));

    updateWheelAnswerBox();

    // Trigger Success check manually since we bypassed clicking
    // But we need to make sure we don't award a point for this!
    // Wait, update: user asked "show correct word... and deduct 1 mark".
    // If we call checkWordWheel, it increments score again. We should avoid that loop.

    const feedbackEl = document.getElementById('wheelFeedback');
    const exampleEl = document.getElementById('wheelExample');
    const nextBtn = document.getElementById('nextWheelBtn2');

    if (typeof soundManager !== 'undefined') soundManager.playSuccess();

    feedbackEl.innerHTML = '✅ Löst! / تم الحل!';
    feedbackEl.className = 'game-feedback success';
    // Do NOT increment score/solved count here. Just show success state.

    if (wheelTarget.example) {
        let exampleHtml = `💡 ${wheelTarget.example}`;
        if (wheelTarget.exampleArb) {
            exampleHtml += `<br><span class="arb-example" style="color: #fbbf24; font-weight: bold; display: block; margin-top: 0.5rem;">${wheelTarget.exampleArb}</span>`;
        }
        exampleEl.innerHTML = exampleHtml;
        exampleEl.classList.remove('hidden');
    }

    if (typeof TTSManager !== 'undefined') {
        TTSManager.speak(wheelTarget.word.toLowerCase(), 'sv');
    }

    nextBtn.classList.remove('hidden');
};
