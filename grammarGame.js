// ========================================
//  GRAMMAR GAME LOGIC (Cyber Matrix Theme)
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
function startGrammarGame(retryCount = 0) {
    if (!grammarInitialized || grammarRules.length === 0) {
        initializeGrammarRules();

        if (retryCount < 10) {
            console.warn(`Rules not ready for Grammar Game. Retrying (${retryCount + 1}/10)...`);
            if (typeof showToast === 'function') showToast("Laddar grammatik... / جاري تحميل القواعد...", 'info');
            setTimeout(() => startGrammarGame(retryCount + 1), 500);
        } else {
            console.error("Critical: Failed to load grammar rules.");
            if (typeof showToast === 'function') showToast("Kunde inte ladda speldata. / تعذر تحميل البيانات.", 'error');
        }
        return;
    }

    const hintEl = document.getElementById('grammarHint');
    const dropZone = document.getElementById('grammarDropZone');
    const wordBank = document.getElementById('grammarWordBank');
    const feedbackEl = document.getElementById('grammarFeedback');
    const explanationEl = document.getElementById('grammarExplanation');
    const nextBtn = document.getElementById('nextGrammarBtn');
    const checkBtn = document.getElementById('checkGrammarBtn');
    const showAnswerBtn = document.getElementById('grammarShowAnswerBtn');

    // Reset UI
    dropZone.innerHTML = '<div class="gr-drop-placeholder"><span class="gr-drop-icon">⬇️</span><span>Dra ord hit / اسحب الكلمات هنا</span></div>';
    wordBank.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'gr-feedback';
    explanationEl.classList.add('hidden');
    explanationEl.querySelector('.gr-explanation-content').innerHTML = '';
    nextBtn.classList.add('hidden');
    checkBtn.classList.remove('hidden');
    checkBtn.disabled = false;
    if (showAnswerBtn) {
        showAnswerBtn.classList.remove('hidden');
        showAnswerBtn.disabled = false;
    }
    dropZone.classList.remove('correct', 'wrong');
    grammarCurrent = [];

    // Get selected category
    const categoryFilter = document.getElementById('grammarCategoryFilter').value;

    // Filter rules by category
    let filteredRules = grammarRules;
    if (categoryFilter !== 'all') {
        filteredRules = grammarRules.filter(rule => rule.category === categoryFilter);
    }

    if (filteredRules.length === 0) {
        const hintText = hintEl.querySelector('.gr-hint-text');
        if (hintText) hintText.textContent = 'Inga regler hittades / لم يتم العثور على قواعد';
        return;
    }

    // Pick random rule
    currentGrammarRule = filteredRules[Math.floor(Math.random() * filteredRules.length)];
    grammarTarget = currentGrammarRule.correct;

    // Set hint text
    const hintText = hintEl.querySelector('.gr-hint-text');
    if (hintText) {
        hintText.textContent = currentGrammarRule.hint;
    } else {
        hintEl.textContent = currentGrammarRule.hint;
    }

    // Shuffle words for bank
    const shuffled = [...currentGrammarRule.words].sort(() => Math.random() - 0.5);

    shuffled.forEach((word, index) => {
        const btn = document.createElement('div');
        btn.className = 'gr-word-chip animate-in';
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.textContent = word;
        btn.dataset.word = word;
        btn.dataset.id = index;

        btn.onclick = () => {
            // Play click sound
            if (typeof soundManager !== 'undefined' && soundManager.playClick) {
                soundManager.playClick();
            }

            if (btn.parentElement === wordBank) {
                // Remove placeholder if present
                const placeholder = dropZone.querySelector('.gr-drop-placeholder');
                if (placeholder) placeholder.remove();

                dropZone.appendChild(btn);
                btn.classList.add('in-zone');
                grammarCurrent.push(word);
            } else {
                wordBank.appendChild(btn);
                btn.classList.remove('in-zone');
                const idx = grammarCurrent.indexOf(word);
                if (idx > -1) grammarCurrent.splice(idx, 1);

                // Re-add placeholder if empty
                if (dropZone.children.length === 0) {
                    dropZone.innerHTML = '<div class="gr-drop-placeholder"><span class="gr-drop-icon">⬇️</span><span>Dra ord hit / اسحب الكلمات هنا</span></div>';
                }
            }
        };
        wordBank.appendChild(btn);
    });

    // Bind check button
    checkBtn.onclick = () => {
        const currentStr = Array.from(dropZone.querySelectorAll('.gr-word-chip')).map(c => c.textContent).join(' ');
        const targetStr = grammarTarget.join(' ');

        if (currentStr === targetStr) {
            // Success!
            feedbackEl.textContent = "Helt rätt! 🌟 / صحيح تماماً!";
            feedbackEl.className = 'gr-feedback success';
            dropZone.classList.add('correct');
            grammarScore += 20;
            document.getElementById('grammarScore').textContent = grammarScore;
            saveScore('grammar', grammarScore);

            // Play success sound
            if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
                soundManager.playSuccess();
            }

            // Celebration disabled per user request
            // if (typeof triggerConfetti === 'function') {
            //     triggerConfetti();
            // }

            // Show explanation
            const sentenceText = grammarTarget.join(' ');
            const explanationContent = explanationEl.querySelector('.gr-explanation-content');
            explanationContent.innerHTML = `
                <strong>✓ Korrekt!</strong>
                <button class="grammar-listen-btn" onclick="speakSentence('${sentenceText.replace(/'/g, "\\'")}')" style="background:none; border:none; cursor:pointer; font-size:1.5rem; float:right; filter: drop-shadow(0 0 5px rgba(34,211,238,0.5));">🔊</button>
                <br>${currentGrammarRule.explanation}<br>
                <span style="direction: rtl; display: block; margin-top: 0.5rem; color: #a7f3d0;">${currentGrammarRule.explanationAr || ''}</span>
            `;
            explanationEl.classList.remove('hidden');

            nextBtn.classList.remove('hidden');
            checkBtn.classList.add('hidden');
        } else {
            // Wrong
            feedbackEl.textContent = "Inte riktigt... Försök igen! / ليس تماماً...";
            feedbackEl.className = 'gr-feedback error';
            dropZone.classList.add('wrong');

            // Play error sound
            if (typeof soundManager !== 'undefined' && soundManager.playError) {
                soundManager.playError();
            }

            // Remove wrong class after animation
            setTimeout(() => dropZone.classList.remove('wrong'), 500);
        }
    };

    nextBtn.onclick = startGrammarGame;
}

// Speak helper
function speakSentence(text) {
    if (typeof TTSManager !== 'undefined') {
        TTSManager.speak(text);
    } else {
        console.warn('TTSManager not found');
    }
}

// Category to Lesson ID Mapping
const categoryToLessonId = {
    'word-order': 'wordOrder',
    'v2-rule': 'v2Rule',
    'questions': 'questions',
    'adverbs': 'wordOrder',
    'time-manner-place': 'wordOrder',
    'bisatser': 'wordOrder',
    'possessiva': 'pronouns',
    'prepositioner': 'prepositions',
    'passiv': 'verbs',
    'imperativ': 'verbs',
    'komparativ': 'adjectives'
};

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
    grammarTarget.forEach((word, index) => {
        const el = document.createElement('div');
        el.className = 'gr-word-chip in-zone animate-in';
        el.style.animationDelay = `${index * 0.1}s`;
        el.textContent = word;
        dropZone.appendChild(el);
    });

    // Disable word bank
    const bankWords = wordBank.querySelectorAll('.gr-word-chip');
    bankWords.forEach(w => {
        w.style.opacity = '0.4';
        w.style.pointerEvents = 'none';
    });

    feedbackEl.textContent = "Här är rätt svar! / إليك الإجابة الصحيحة!";
    feedbackEl.className = 'gr-feedback';

    // Construct Explanation HTML
    const sentenceText = grammarTarget.join(' ');
    const lessonId = categoryToLessonId[currentGrammarRule.category];
    let learnLinkHtml = '';

    if (lessonId) {
        learnLinkHtml = `<a href="learn.html?lesson=${lessonId}" class="learn-link-btn" style="display:inline-block; margin-top:10px; padding:8px 16px; background: linear-gradient(145deg, rgba(34, 211, 238, 0.3), rgba(6, 182, 212, 0.2)); color:#67e8f9; border-radius:12px; text-decoration:none; font-size:0.9rem; border: 1px solid rgba(34, 211, 238, 0.4);">📖 Läs regeln / اقرأ القاعدة</a>`;
    }

    const explanationContent = explanationEl.querySelector('.gr-explanation-content');
    explanationContent.innerHTML = `
        <strong>ℹ️ Förklaring:</strong>
        <button class="grammar-listen-btn" onclick="speakSentence('${sentenceText.replace(/'/g, "\\'")}')" style="background:none; border:none; cursor:pointer; font-size:1.5rem; float:right; filter: drop-shadow(0 0 5px rgba(34,211,238,0.5));">🔊</button>
        <br>${currentGrammarRule.explanation}<br>
        <span style="direction: rtl; display: block; margin-top: 0.5rem; color: #a7f3d0;">${currentGrammarRule.explanationAr || ''}</span>
        ${learnLinkHtml}
    `;

    explanationEl.classList.remove('hidden');

    nextBtn.classList.remove('hidden');
    checkBtn.disabled = true;
    if (showAnswerBtn) showAnswerBtn.disabled = true;
}

// Initialize on load
initializeGrammarRules();
