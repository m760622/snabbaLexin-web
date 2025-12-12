// ========================================
//  GRAMMAR GAME LOGIC
// ========================================

// Grammar Game State
let grammarTarget = [];
let grammarCurrent = [];
let grammarScore = 0;
let currentGrammarRule = null;
let grammarRules = [];
let grammarInitialized = false;

// Generate rules for all categories
function initializeGrammarRules() {
    // Check if grammarDatabase is loaded
    if (typeof grammarDatabase !== 'undefined' && grammarDatabase) {
        console.log('📚 Loading grammar rules from Static Database...');
        grammarRules = [];

        for (const [category, sentences] of Object.entries(grammarDatabase)) {
            sentences.forEach(sent => {
                grammarRules.push({
                    category: category,
                    ...sent
                });
            });
        }

        grammarInitialized = true;
        console.log(`✅ Loaded ${grammarRules.length} grammar rules from Static Database`);
    } else {
        console.error('❌ grammarDatabase not found! Grammar game will not work.');
    }
}

// --- GRAMMAR GAME ---
function startGrammarGame() {
    const hintEl = document.getElementById('grammarHint');
    const dropZone = document.getElementById('grammarDropZone');
    const wordBank = document.getElementById('grammarWordBank');
    const feedbackEl = document.getElementById('grammarFeedback');
    const explanationEl = document.getElementById('grammarExplanation');
    const nextBtn = document.getElementById('nextGrammarBtn');
    const checkBtn = document.getElementById('checkGrammarBtn');
    const showAnswerBtn = document.getElementById('grammarShowAnswerBtn');

    // Reset
    dropZone.innerHTML = '';
    wordBank.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'game-feedback';
    explanationEl.style.display = 'none';
    nextBtn.style.display = 'none';
    checkBtn.style.display = 'inline-block';
    checkBtn.disabled = false;
    if (showAnswerBtn) {
        showAnswerBtn.style.display = 'inline-block';
        showAnswerBtn.disabled = false;
    }
    grammarCurrent = [];

    // Get selected category
    const categoryFilter = document.getElementById('grammarCategoryFilter').value;

    // Filter rules by category
    let filteredRules = grammarRules;
    if (categoryFilter !== 'all') {
        filteredRules = grammarRules.filter(rule => rule.category === categoryFilter);
    }

    if (filteredRules.length === 0) {
        hintEl.textContent = 'Inga regler hittades för denna kategori / لم يتم العثور على قواعد';
        return;
    }

    // Pick random rule
    currentGrammarRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];

    // Set target
    grammarTarget = currentGrammarRule.correct;

    // Set hint
    hintEl.textContent = currentGrammarRule.hint;

    // Shuffle words for bank
    const shuffled = [...currentGrammarRule.words].sort(() => Math.random() - 0.5);

    shuffled.forEach((word, index) => {
        const btn = document.createElement('div');
        btn.className = 'sentence-word';
        btn.textContent = word;
        btn.dataset.word = word;
        btn.dataset.id = index;

        btn.onclick = () => {
            if (btn.parentElement === wordBank) {
                dropZone.appendChild(btn);
                grammarCurrent.push(word);
            } else {
                wordBank.appendChild(btn);
                const idx = grammarCurrent.indexOf(word);
                if (idx > -1) grammarCurrent.splice(idx, 1);
            }
        };
        wordBank.appendChild(btn);
    });

    // Bind check button
    checkBtn.onclick = () => {
        const currentStr = Array.from(dropZone.children).map(c => c.textContent).join(' ');
        const targetStr = grammarTarget.join(' ');

        const explanationEl = document.getElementById('grammarExplanation');

        if (currentStr === targetStr) {
            feedbackEl.textContent = "Helt rätt! 🌟 / صحيح تماماً!";
            feedbackEl.className = 'game-feedback success';
            grammarScore += 20;
            document.getElementById('grammarScore').textContent = grammarScore;
            saveScore('grammar', grammarScore);
            // Trigger confetti (commented out per user request previously, but we can verify if needed)
            // triggerConfetti(); 

            // Show explanation with Listen Button
            const sentenceText = grammarTarget.join(' ');
            explanationEl.innerHTML = `
                <strong>✓ Korrekt!</strong><br>
                <button class="grammar-listen-btn" onclick="speakSentence('${sentenceText.replace(/'/g, "\\'")}')" style="background:none; border:none; cursor:pointer; font-size:1.2rem; float:right;">🔊 Lyssna</button>
                ${currentGrammarRule.explanation}<br>
                <span style="direction: rtl; display: block; margin-top: 0.5rem;">${currentGrammarRule.explanationAr}</span>
            `;
            explanationEl.style.display = 'block';
            explanationEl.style.background = 'rgba(16, 185, 129, 0.1)';
            explanationEl.style.borderLeft = '4px solid #10b981';

            nextBtn.style.display = 'block';
            checkBtn.style.display = 'none';
        } else {
            feedbackEl.textContent = "Inte riktigt... Försök igen! / ليس تماماً...";
            feedbackEl.className = 'game-feedback error';
        }
    };

    nextBtn.onclick = startGrammarGame;
}

window.showGrammarAnswer = function () {
    const dropZone = document.getElementById('grammarDropZone');
    const wordBank = document.getElementById('grammarWordBank');
    const feedbackEl = document.getElementById('grammarFeedback');
    const explanationEl = document.getElementById('grammarExplanation');
    const nextBtn = document.getElementById('nextGrammarBtn');
    const checkBtn = document.getElementById('checkGrammarBtn');
    const showAnswerBtn = document.getElementById('grammarShowAnswerBtn');

    if (!currentGrammarRule) return;

    // Fill drop zone with correct order
    dropZone.innerHTML = '';
    grammarTarget.forEach(word => {
        const el = document.createElement('div');
        el.className = 'sentence-word';
        el.textContent = word;
        dropZone.appendChild(el);
    });

    // Disable word bank
    const bankWords = wordBank.querySelectorAll('.sentence-word');
    bankWords.forEach(w => w.classList.add('used'));

    feedbackEl.textContent = "Här är rätt svar! / إليك الإجابة الصحيحة!";
    feedbackEl.className = 'game-feedback';

    // Construct Explanation HTML with Listen Button
    const sentenceText = grammarTarget.join(' ');
    explanationEl.innerHTML = `
        <strong>ℹ️ Förklaring:</strong><br>
        <button class="grammar-listen-btn" onclick="speakSentence('${sentenceText.replace(/'/g, "\\'")}')" style="background:none; border:none; cursor:pointer; font-size:1.2rem; float:right;">🔊 Lyssna</button>
        ${currentGrammarRule.explanation}<br>
        <span style="direction: rtl; display: block; margin-top: 0.5rem;">${currentGrammarRule.explanationAr}</span>
    `;

    explanationEl.style.display = 'block';
    // Style adjustments for explanation box handled in CSS usually, but inline here:
    explanationEl.style.background = 'rgba(99, 102, 241, 0.1)';
    explanationEl.style.borderLeft = '4px solid #6366f1';

    nextBtn.style.display = 'inline-block';
    checkBtn.disabled = true;
    if (showAnswerBtn) showAnswerBtn.disabled = true;
}

// Speak helper
function speakSentence(text) {
    if (typeof TTSManager !== 'undefined') {
        TTSManager.speak(text);
    } else {
        console.warn('TTSManager not found');
    }
}

// Initialize on load
initializeGrammarRules();
