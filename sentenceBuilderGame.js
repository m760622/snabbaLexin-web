// ========================================
//  SENTENCE BUILDER GAME LOGIC
// ========================================

let sentenceTarget = []; // Array of words
let sentenceCurrent = [];

// --- SENTENCE BUILDER GAME ---
function startSentenceGame() {
    const hintEl = document.getElementById('sentenceHint');
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');
    const showAnswerBtn = document.getElementById('sentenceShowAnswerBtn');

    // Reset
    dropZone.innerHTML = '';
    dropZone.className = 'sentence-drop-zone'; // Reset classes
    wordBank.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';
    checkBtn.style.display = 'inline-block';
    checkBtn.disabled = false;
    if (showAnswerBtn) {
        showAnswerBtn.style.display = 'inline-block';
        showAnswerBtn.disabled = false;
        showAnswerBtn.onclick = showSentenceAnswer;
    }
    sentenceCurrent = [];

    // Find sentence
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 1000) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_EX_SWE] && item[COL_EX_ARB]) {
            const swe = item[COL_EX_SWE].trim();
            const arb = item[COL_EX_ARB].trim();

            // Relaxed Filter conditions:
            // 1. Length: 3-15 words
            // 2. Starts with capital letter (preferred but not strict if fallback needed)
            // 3. Ends with valid punctuation (preferred)
            // 4. No weird characters like | or []

            const wordCount = swe.split(' ').length;
            const startsWithCap = /^[A-ZÅÄÖ]/.test(swe);
            const endsWithPunct = /[.!?]$/.test(swe);
            const cleanText = !/[|\[\]<>]/.test(swe);

            // Strict check first
            if (wordCount >= 3 && wordCount <= 15 && startsWithCap && endsWithPunct && cleanText && arb.length > 0) {
                candidate = item;
            }
            // Fallback: If strict check fails for many attempts, accept less perfect sentences
            else if (attempts > 800 && wordCount >= 3 && cleanText && arb.length > 0) {
                candidate = item;
            }
        }
        attempts++;
    }

    if (!candidate) return;

    // Clean sentence (remove punctuation for simplicity in matching, or keep it)
    // Let's keep punctuation attached to words for now
    const rawSentence = candidate[COL_EX_SWE];
    sentenceTarget = rawSentence.split(' ').filter(w => w.length > 0);

    hintEl.textContent = candidate[COL_EX_ARB] || candidate[COL_ARB];

    // Shuffle for bank
    const shuffled = [...sentenceTarget].sort(() => Math.random() - 0.5);

    shuffled.forEach((word, index) => {
        const btn = document.createElement('div');
        btn.className = 'sentence-word';
        btn.textContent = word;
        btn.dataset.word = word;
        btn.dataset.id = index; // unique id for duplicates

        btn.onclick = () => {
            if (btn.parentElement === wordBank) {
                dropZone.appendChild(btn);
                sentenceCurrent.push(word);
            } else {
                wordBank.appendChild(btn);
                // Remove from current
                const idx = sentenceCurrent.indexOf(word);
                if (idx > -1) sentenceCurrent.splice(idx, 1);
            }
        };
        wordBank.appendChild(btn);
    });

    checkBtn.onclick = () => {
        const currentStr = Array.from(dropZone.children).map(c => c.textContent).join(' ');
        const targetStr = sentenceTarget.join(' ');

        if (currentStr === targetStr) {
            // Correct!
            dropZone.classList.add('correct');
            feedbackEl.textContent = "Helt rätt! 🌟 / صحيح تماماً!";
            feedbackEl.className = 'game-feedback success';

            gameScore += 20;
            const scoreEl = document.getElementById('sentenceScore');
            if (scoreEl) scoreEl.textContent = gameScore;
            saveScore('sentence', gameScore);
            // triggerConfetti(); // Removed

            nextBtn.style.display = 'inline-block';
            checkBtn.style.display = 'none';
            if (showAnswerBtn) showAnswerBtn.style.display = 'none';
        } else {
            // Wrong
            dropZone.classList.add('wrong');
            feedbackEl.textContent = "Inte riktigt... Försök igen! / ليس تماماً...";
            feedbackEl.className = 'game-feedback error';

            setTimeout(() => {
                dropZone.classList.remove('wrong');
                feedbackEl.textContent = "";
            }, 1500);
        }
    };

    nextBtn.onclick = startSentenceGame;
}

function showSentenceAnswer() {
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');
    const showAnswerBtn = document.getElementById('sentenceShowAnswerBtn');

    // Move all words to dropZone in correct order
    dropZone.innerHTML = '';
    sentenceTarget.forEach(word => {
        const el = document.createElement('div');
        el.className = 'sentence-word';
        el.textContent = word;
        dropZone.appendChild(el);
    });

    // Clear word bank
    wordBank.innerHTML = '';

    feedbackEl.textContent = "Här är rätt svar! / إليك الإجابة الصحيحة!";
    feedbackEl.className = 'game-feedback';

    nextBtn.style.display = 'inline-block';
    checkBtn.style.display = 'none';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
}
