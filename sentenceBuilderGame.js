// ========================================
// SENTENCE BUILDER GAME - بناء الجملة
// ========================================
console.log("sentenceBuilderGame.js LOADED");

// State
let sentenceTarget = [];
let sentenceCurrent = [];
let sentenceScore = 0;
let currentSentenceItem = null;

// Start Sentence Game
window.startSentenceGame = function (retryCount = 0) {
    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        if (retryCount < 10) {
            console.warn(`Data not ready for Sentence Builder. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar speldata... / جاري تحميل البيانات...", 'info');
            setTimeout(() => startSentenceGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Data failed to load for Sentence Builder.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda data. Uppdatera sidan. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }
    const hintEl = document.getElementById('sentenceHint');
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');

    // Reset
    feedbackEl.innerHTML = '';
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';
    checkBtn.style.display = 'block';
    dropZone.innerHTML = '<div class="drop-placeholder">Dra ord hit / اسحب الكلمات هنا</div>';
    wordBank.innerHTML = '';
    sentenceCurrent = [];

    // Find a word with an example sentence
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 200) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_EX] && item[COL_EX].split(' ').length >= 3 && item[COL_EX].split(' ').length <= 8) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        hintEl.textContent = "Kunde inte hitta en mening. Försök igen.";
        return;
    }

    currentSentenceItem = candidate;
    const sentence = candidate[COL_EX];
    const arabicHint = candidate[COL_EX_ARB] || candidate[COL_ARB] || '';

    // Show Arabic translation as hint
    hintEl.innerHTML = `<span style="direction: rtl; display: block;">${arabicHint}</span>`;

    // Split and shuffle
    sentenceTarget = sentence.split(' ').filter(w => w.length > 0);
    const shuffled = [...sentenceTarget].sort(() => Math.random() - 0.5);

    // Create word buttons
    shuffled.forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'sentence-word';
        btn.textContent = word;
        btn.onclick = () => moveWord(btn, word);
        wordBank.appendChild(btn);
    });

    // Bind check button
    if (checkBtn) {
        checkBtn.onclick = checkSentence;
    }
};

// Move Word between zones
function moveWord(btn, word) {
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const placeholder = dropZone.querySelector('.drop-placeholder');

    if (btn.parentElement === wordBank) {
        // Move to drop zone
        if (placeholder) placeholder.remove();
        dropZone.appendChild(btn);
        sentenceCurrent.push(word);
    } else {
        // Move back to bank
        wordBank.appendChild(btn);
        const idx = sentenceCurrent.indexOf(word);
        if (idx > -1) sentenceCurrent.splice(idx, 1);

        // Show placeholder if empty
        if (dropZone.children.length === 0) {
            dropZone.innerHTML = '<div class="drop-placeholder">Dra ord hit / اسحب الكلمات هنا</div>';
        }
    }
}

// Check Sentence
function checkSentence() {
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');
    const dropZone = document.getElementById('sentenceDropZone');

    const currentStr = Array.from(dropZone.querySelectorAll('.sentence-word')).map(el => el.textContent).join(' ');
    const targetStr = sentenceTarget.join(' ');

    if (currentStr === targetStr) {
        feedbackEl.textContent = "✅ Helt rätt! / صحيح تماماً!";
        feedbackEl.className = 'game-feedback success';
        sentenceScore++;
        document.getElementById('sentenceScore').textContent = sentenceScore;

        if (typeof saveScore === 'function') {
            saveScore('sentence', sentenceScore);
        }

        // Speak the sentence
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(targetStr, 'sv');
        }

        nextBtn.style.display = 'block';
        checkBtn.style.display = 'none';
    } else {
        feedbackEl.textContent = "❌ Inte riktigt... Försök igen! / ليس تماماً...";
        feedbackEl.className = 'game-feedback error';
    }
}

// Show Answer
window.showSentenceAnswer = function () {
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');

    // Clear and show correct order
    dropZone.innerHTML = '';
    wordBank.innerHTML = '';

    sentenceTarget.forEach(word => {
        const span = document.createElement('span');
        span.className = 'sentence-word correct';
        span.textContent = word;
        dropZone.appendChild(span);
    });

    feedbackEl.innerHTML = `📖 Rätt ordning visas ovan`;
    feedbackEl.className = 'game-feedback';

    // Speak the sentence
    if (typeof TTSManager !== 'undefined') {
        TTSManager.speak(sentenceTarget.join(' '), 'sv');
    }

    nextBtn.style.display = 'block';
    checkBtn.style.display = 'none';
};

// Bind next button
document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextSentenceBtn');
    if (nextBtn) {
        nextBtn.onclick = startSentenceGame;
    }
});
