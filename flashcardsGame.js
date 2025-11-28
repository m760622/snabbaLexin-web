// ========================================
//  FLASHCARDS GAME LOGIC
// ========================================

let flashcardsQueue = [];
let currentFlashcardIndex = 0;

// --- FLASHCARDS GAME ---
function initFlashcards() {
    const filterType = document.getElementById('flashcardTypeFilter').value;
    flashcardsQueue = [];

    // --- DICTIONARY MODE (ALWAYS) ---
    // Filter by type if not 'all_dict'
    let candidates = dictionaryData;

    if (filterType !== 'all_dict') {
        candidates = dictionaryData.filter(item => {
            const type = (item[COL_TYPE] || '').toLowerCase();
            const word = (item[COL_SWE] || '');
            return type.includes(filterType) && word.length <= 10;
        });
    } else {
        // Even for 'all_dict', apply length limit
        candidates = dictionaryData.filter(item => {
            const word = (item[COL_SWE] || '');
            return word.length <= 10;
        });
    }

    if (candidates.length === 0) {
        alert("Inga ord hittades för denna typ.");
        return;
    }

    // Pick 20 random words to avoid overwhelming the user
    const poolSize = Math.min(candidates.length, 20);
    const usedIndices = new Set();

    while (flashcardsQueue.length < poolSize) {
        const idx = Math.floor(Math.random() * candidates.length);
        if (!usedIndices.has(idx)) {
            usedIndices.add(idx);
            flashcardsQueue.push(candidates[idx]);
        }
    }

    // Wire up buttons
    document.getElementById('fcCorrectBtn').onclick = () => handleFlashcardResult(true);
    document.getElementById('fcWrongBtn').onclick = () => handleFlashcardResult(false);

    flashcardsQueue.sort(() => Math.random() - 0.5);
    currentFlashcardIndex = 0;

    showNextFlashcard();
}

function showNextFlashcard() {
    if (flashcardsQueue.length === 0) {
        initFlashcards(); // Restart or refill
        return;
    }

    const item = flashcardsQueue[currentFlashcardIndex];
    const card = document.getElementById('flashcard');

    // Reset state
    card.classList.remove('flipped');

    // Update content
    document.getElementById('flashcardWord').textContent = item[COL_SWE];

    // Better Arabic Fallback
    let arabicText = item[COL_ARB];
    if (!arabicText || arabicText.trim() === '') {
        arabicText = item[COL_EX_ARB] || "Ingen översättning / لا توجد ترجمة";
    }
    document.getElementById('flashcardTranslation').textContent = arabicText;

    document.getElementById('flashcardExample').textContent = item[COL_EX_SWE] || '';

    // Update Progress
    document.getElementById('flashcardProgress').textContent = `${currentFlashcardIndex + 1}/${flashcardsQueue.length}`;

    // Card Click Flip
    card.onclick = () => {
        card.classList.toggle('flipped');
    };

    // Explicitly allow clicking the word text to flip
    const wordText = document.getElementById('flashcardWord');
    wordText.style.cursor = 'pointer';
    wordText.onclick = (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
    };

    // Explicitly allow clicking the translation text to flip back
    const transText = document.getElementById('flashcardTranslation');
    transText.style.cursor = 'pointer';
    transText.onclick = (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
    };

    const exText = document.getElementById('flashcardExample');
    exText.style.cursor = 'pointer';
    exText.onclick = (e) => {
        e.stopPropagation();
        card.classList.toggle('flipped');
    };

    // Next Button
    document.getElementById('flashcardNextBtn').onclick = () => {
        currentFlashcardIndex++;
        if (currentFlashcardIndex >= flashcardsQueue.length) {
            // End of deck
            alert("Bra jobbat! Du har gått igenom alla kort. \n أحسنت! لقد أتممت جميع البطاقات.");
            initFlashcards(); // Restart
        } else {
            showNextFlashcard();
        }
    };
}

function handleFlashcardResult(known) {
    if (known) {
        showToast('Bra! 👍 / ممتاز!');
        // For flashcards, maybe track "cards mastered" in a session?
        // Let's just increment a counter for now stored in localStorage as 'flashcards'
        const current = parseInt(document.getElementById('score-flashcards').textContent) || 0;
        saveScore('flashcards', current + 1);
    } else {
        showToast('Vi övar mer senare 💪 / سنراجعها لاحقاً');
    }
    currentFlashcardIndex++;
    showNextFlashcard();
}
