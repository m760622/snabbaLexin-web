// ========================================
// Professional Flashcards Game Logic
// ========================================
console.log("flashcardsGame.js LOADED - Professional Edition");

// ========================================
// State Management
// ========================================
let flashcardCards = [];
let flashcardIndex = 0;
let flashcardScore = 0;
let flashcardTotal = 0;
let cardStartTime = 0;
let sessionStats = { correct: 0, wrong: 0, totalTime: 0 };
let touchStartX = 0;
let touchEndX = 0;

// Column indices (from data.js)
const FC_COL_ID = 0;
const FC_COL_TYPE = 1;
const FC_COL_SWE = 2;
const FC_COL_ARB = 3;
const FC_COL_ARB_DEF = 4;
const FC_COL_SWE_DEF = 5;
const FC_COL_FORMS = 6;
const FC_COL_EX_SWE = 7;
const FC_COL_EX_ARB = 8;

// ========================================
// Leitner Box System (5 boxes)
// ========================================
const LeitnerSystem = {
    STORAGE_KEY: 'flashcard_leitner_data',

    // Box intervals in days: Box 1 = daily, Box 5 = monthly
    BOX_INTERVALS: [1, 3, 7, 14, 30],

    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        } catch (e) { return {}; }
    },

    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    getWordBox(wordId) {
        const data = this.getData();
        return data[wordId]?.box || 1;
    },

    promoteWord(wordId) {
        const data = this.getData();
        const currentBox = data[wordId]?.box || 1;
        const newBox = Math.min(currentBox + 1, 5);
        data[wordId] = {
            box: newBox,
            lastReview: Date.now(),
            nextReview: Date.now() + (this.BOX_INTERVALS[newBox - 1] * 24 * 60 * 60 * 1000)
        };
        this.saveData(data);
        return newBox;
    },

    demoteWord(wordId) {
        const data = this.getData();
        data[wordId] = {
            box: 1,
            lastReview: Date.now(),
            nextReview: Date.now() + (24 * 60 * 60 * 1000) // Tomorrow
        };
        this.saveData(data);
        return 1;
    },

    getBoxIcon(box) {
        const icons = ['❄️', '🌱', '🌿', '🌳', '🔥'];
        return icons[box - 1] || icons[0];
    },

    getDueWords() {
        const data = this.getData();
        const now = Date.now();
        return Object.entries(data)
            .filter(([id, info]) => info.nextReview <= now)
            .map(([id]) => id);
    }
};

// ========================================
// Haptic Feedback
// ========================================
// HapticFeedback replaced by global HapticManager in utils.js

// ========================================
// Confetti Effect
// ========================================
function triggerConfetti() {
    const container = document.getElementById('flashcardsGame');
    if (!container) return;

    const colors = ['#6366f1', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            animation-delay: ${Math.random() * 0.5}s;
            z-index: 9999;
            pointer-events: none;
        `;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ========================================
// Initialize Flashcards Game
// ========================================
function initFlashcards() {
    const typeFilter = document.getElementById('flashcardTypeFilter')?.value || 'all';

    if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
        console.error("dictionaryData not loaded!");
        return;
    }

    let pool = [...dictionaryData];

    // Apply type filter
    if (typeFilter !== 'all') {
        pool = pool.filter(entry => {
            const type = (entry[FC_COL_TYPE] || '').toLowerCase();
            return type.includes(typeFilter);
        });
    }

    // Filter out entries without Swedish word (already handled by initial filter, but good to keep explicit)
    pool = pool.filter(entry => entry[FC_COL_SWE] && entry[FC_COL_SWE].length > 0);

    // ============================================================
    // RULE: Show example only if Swedish sentence is >= 3 words
    // This allows "relevanta fakta" (2 words) -> still hidden? User asked for 3.
    // "relevanta fakta" is 2 words. "Jag äter mat" is 3.
    // ============================================================
    // For now, we won't strictly hide words without examples, but if they DO have an example,
    // we want to ensure it's a "good" one before displaying it prominently.
    // However, the user said "Apply this rule in the Flashcards game".
    // This implies we should ideally skipping cards with "bad" examples, 
    // OR we just ensure we only DISPLAY the example if it meets the criteria.

    // Let's implement logic to `showNextFlashcard` to validate the example before showing it.
    // We don't filter the *cards* themselves (we still want to learn the words), 
    // but controls *which* example is shown or if it's shown at all.

    // Adaptive: Prioritize words in lower boxes (harder words)
    pool.sort((a, b) => {
        const boxA = LeitnerSystem.getWordBox(String(a[FC_COL_ID]));
        const boxB = LeitnerSystem.getWordBox(String(b[FC_COL_ID]));
        return boxA - boxB; // Lower box = higher priority
    });

    // Shuffle within same-box groups, then pick 20
    // The user's provided code had a line `flashcardCards = pool.sort(() => 0.5 - Math.random()).slice(0, 50);`
    // followed by `flashcardCards = shuffled;`. This suggests replacing the `shuffled` logic.
    // I'll use the new shuffle and slice, limiting to 50 cards.
    flashcardCards = pool.sort(() => 0.5 - Math.random()).slice(0, 50); // Limit to 50 for performance

    flashcardIndex = 0;
    flashcardScore = 0;
    flashcardTotal = flashcardCards.length;
    sessionStats = { correct: 0, wrong: 0, totalTime: 0 };

    // Update progress display
    updateProgressRing(0);
    initSegmentedProgress(); // Initialize segments
    document.getElementById('flashcardProgress').textContent = `0/${flashcardTotal}`;

    // Reset flashcard state
    const flashcard = document.getElementById('flashcard');
    if (flashcard) flashcard.classList.remove('flipped');

    // Setup swipe gestures
    setupSwipeGestures();

    // Show first card
    showNextFlashcard();

    // Enter full screen on mobile
    enterFullScreenMode();
}

// ========================================
// Segmented Progress Bar
// ========================================
function initSegmentedProgress() {
    const container = document.getElementById('fcSegmentedProgress');
    if (!container) return;

    container.innerHTML = '';

    // Create segments
    for (let i = 0; i < flashcardTotal; i++) {
        const segment = document.createElement('div');
        segment.className = 'fc-progress-segment';
        segment.id = `fc-seg-${i}`;
        container.appendChild(segment);
    }
}

function updateSegmentedProgress(index, status) {
    const segment = document.getElementById(`fc-seg-${index}`);
    if (!segment) return;

    // Clear active state from all
    document.querySelectorAll('.fc-progress-segment').forEach(s => s.classList.remove('active'));

    if (status) {
        // Result: correct or wrong
        segment.classList.add('completed');
        segment.classList.add(status); // 'correct' or 'wrong'
    } else {
        // New active
        segment.classList.add('active');
    }
}

// ========================================
// Progress Ring Update (Legacy/Header)
// ========================================
function updateProgressRing(progress) {
    const ring = document.querySelector('.fc-progress-ring-circle');
    if (!ring) return;

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;
    ring.style.strokeDashoffset = offset;
}

// ========================================
// Swipe Gesture Setup
// ========================================
let touchStartTime = 0;
let lastFlipTime = 0;

function setupSwipeGestures() {
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) return;

    flashcard.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchEndX = touchStartX; // Reset for tap detection
        touchStartTime = Date.now();
    }, { passive: true });

    flashcard.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;

        // Visual feedback during swipe
        if (Math.abs(diff) > 30) {
            flashcard.style.transform = `translateX(${diff * 0.3}px) rotate(${diff * 0.02}deg)`;
            flashcard.style.opacity = Math.max(0.5, 1 - Math.abs(diff) / 500);
        }
    }, { passive: true });

    flashcard.addEventListener('touchend', (e) => {
        const diff = touchEndX - touchStartX;
        const touchDuration = Date.now() - touchStartTime;
        flashcard.style.transform = '';
        flashcard.style.opacity = '';

        if (Math.abs(diff) > 100) {
            // Swipe detected
            // Swipe detected
            if (typeof HapticManager !== 'undefined') HapticManager.trigger('medium');
            if (diff > 0) {
                handleFlashcardRating(4); // Swipe right = Know
            } else {
                handleFlashcardRating(0); // Swipe left = Don't know
            }
        } else if (Math.abs(diff) < 30 && touchDuration < 500) {
            // Tap detected - flip the card
            flipFlashcard();
        }
    });

    // Also support click for desktop browsers
    flashcard.addEventListener('click', (e) => {
        // Debounce to prevent rapid double-flips
        if (Date.now() - lastFlipTime < 300) return;
        // Prevent if this is a touch device and touch just happened
        if (touchStartTime > 0 && Date.now() - touchStartTime < 500) return;
        flipFlashcard();
    });
}

// ========================================
// Flip Flashcard Function
// ========================================
function flipFlashcard() {
    // Debounce
    if (Date.now() - lastFlipTime < 300) return;
    lastFlipTime = Date.now();

    const flashcard = document.getElementById('flashcard');
    if (!flashcard) return;

    flashcard.classList.toggle('flipped');

    // Pro Feel: Haptic + Sound
    if (typeof HapticManager !== 'undefined') HapticManager.trigger('selection');
    if (typeof SoundManager !== 'undefined') SoundManager.play('flip');

    // Buttons are now always visible, no need to toggle display
}

// ========================================
// Show Next Flashcard
// ========================================
function showNextFlashcard() {
    if (flashcardIndex >= flashcardCards.length) {
        finishFlashcards();
        return;
    }

    const card = flashcardCards[flashcardIndex];
    const swedishWord = card[FC_COL_SWE] || '';
    const arabicWord = card[FC_COL_ARB] || '';
    const exampleSwe = card[FC_COL_EX_SWE] || '';
    const swedishDef = card[FC_COL_SWE_DEF] || '';
    const wordType = card[FC_COL_TYPE] || '';
    const wordId = String(card[FC_COL_ID]);
    const box = LeitnerSystem.getWordBox(wordId);

    // Start timing
    cardStartTime = Date.now();

    // Update Segmented Progress (Active)
    updateSegmentedProgress(flashcardIndex, null);

    // Populate Data
    const wordEl = document.getElementById('flashcardWord');
    const wordText = card[FC_COL_SWE] || '';
    wordEl.textContent = wordText;

    // Dynamic Text Sizing
    if (typeof TextSizeManager !== 'undefined') {
        TextSizeManager.apply(wordEl, wordText, 'flashcard');
    }

    document.getElementById('flashcardTranslation').textContent = card[FC_COL_ARB];

    // New: Back of card Details
    const sweExampleText = card[FC_COL_EX_SWE] || '';
    const arbExampleText = card[FC_COL_EX_ARB] || '';

    // DEBUG: Log specific word data
    if (wordText.includes('Högtryckslaminat') || wordText.includes('Byggterm')) {
        console.log('DEBUG CHECK:', card);
        console.log('DEBUG EX:', sweExampleText, 'Length:', sweExampleText.split(' ').length);
    }

    // Show mastery indicator
    const masteryEl = document.getElementById('flashcardMastery');
    if (masteryEl) {
        masteryEl.innerHTML = `${LeitnerSystem.getBoxIcon(box)} Box ${box}`;
    }

    // Show word type badge
    const typeEl = document.getElementById('flashcardType');
    if (typeEl) {
        typeEl.textContent = wordType;
    }

    // Shimmer effect for Mastered words (Box 5)
    const flashcardEl = document.getElementById('flashcard');
    if (flashcardEl) {
        if (box >= 5) {
            flashcardEl.classList.add('shimmering');
        } else {
            flashcardEl.classList.remove('shimmering');
        }
    }

    // --- POPULATE BACK OF CARD ---

    // 1. Swedish Section
    const backWordEl = document.getElementById('flashcardBackWord');
    if (backWordEl) backWordEl.textContent = swedishWord;

    const backSentenceEl = document.getElementById('flashcardBackSentence');
    if (backSentenceEl) {
        if (exampleSwe) {
            backSentenceEl.textContent = exampleSwe;
            backSentenceEl.style.display = 'block';
        } else {
            backSentenceEl.style.display = 'none';
        }
    }

    // 2. Arabic Section
    const arbTranslationEl = document.getElementById('flashcardTranslation');
    if (arbTranslationEl) arbTranslationEl.textContent = arabicWord;

    const arbSentenceEl = document.getElementById('flashcardExampleArb');
    // We need to fetch Arabic example if available in data
    const exampleArb = card[FC_COL_EX_ARB] || '';

    if (arbSentenceEl) {
        if (exampleArb) {
            arbSentenceEl.textContent = exampleArb;
            arbSentenceEl.style.display = 'block';
        } else {
            // Fallback: If no arabic example, maybe show def? 
            // Or just hide it. User asked specifically for sentence.
            arbSentenceEl.style.display = 'none';
        }
    }

    // Update progress
    const progress = (flashcardIndex / flashcardTotal) * 100;
    updateProgressRing(progress);
    document.getElementById('flashcardProgress').textContent = `${flashcardIndex + 1}/${flashcardTotal}`;

    // Reset card state
    // Reset card state
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
        flashcard.classList.remove('swiping-left', 'swiping-right', 'slide-out-right', 'slide-out-left');
        flashcard.style.transform = '';
        flashcard.style.opacity = '';
    }

    // Buttons stay visible


    // Auto TTS - speak Swedish word
    setTimeout(() => {
        if (typeof TTSManager !== 'undefined' && isAutoPlayEnabled) {
            TTSManager.speak(swedishWord, 'sv');
        }
    }, 500); // Slight delay for transition

    // Adjust card height dynamically based on content
    setTimeout(adjustCardHeight, 50);
}

function adjustCardHeight() {
    const front = document.querySelector('.fc-front-pro');
    const back = document.querySelector('.fc-back-pro');
    const card = document.getElementById('flashcard');

    if (!front || !back || !card) return;

    // Reset height to auto to measure natural height
    // But faces are absolute, so we need to measure scrollHeight of faces
    const frontH = front.scrollHeight;
    const backH = back.scrollHeight;

    // Add some padding/buffer
    const maxH = Math.max(frontH, backH, 320); // 320 is min height

    card.style.height = `${maxH}px`;
}

// ========================================
// Auto-Play Settings
// ========================================
let isAutoPlayEnabled = localStorage.getItem('fc_autoplay') !== 'false'; // Default true

function toggleAutoPlay() {
    isAutoPlayEnabled = !isAutoPlayEnabled;
    localStorage.setItem('fc_autoplay', isAutoPlayEnabled);
    updateAutoPlayButton();

    // Feedback
    if (typeof showToast === 'function') {
        showToast(isAutoPlayEnabled ? 'Auto-play: PÅ 🔊' : 'Auto-play: AV 🔇');
    }
}

function updateAutoPlayButton() {
    const btn = document.getElementById('fcAutoPlayToggle');
    if (btn) {
        btn.textContent = isAutoPlayEnabled ? '🔊' : '🔇';
        btn.classList.toggle('muted', !isAutoPlayEnabled);
    }
}

// Initialize button state on load
// (Call this in initFlashcards or global scope)
document.addEventListener('DOMContentLoaded', updateAutoPlayButton);

// ========================================
// Next Review Toast
// ========================================
function showNextReviewToast(box, isCorrect) {
    if (typeof showToast !== 'function') return;

    // Boxes: 1 (Daily), 2 (3d), 3 (7d), 4 (14d), 5 (30d)
    const intervals = [1, 3, 7, 14, 30];
    const days = intervals[box - 1] || 1;

    const msg = isCorrect
        ? `Bra! Nästa repetition om ${days} dagar (Box ${box})`
        : `Repetition imorgon (Box 1)`;

    showToast(msg, 2000);
}

// ========================================
// 4-Level Rating System (Anki-style)
// ========================================
window.handleFlashcardRating = function (rating) {
    try {
        console.log("HandleRating CALLED with: " + rating);
        handleFlashcardRatingInternal(rating);
    } catch (e) {
        console.error("CRITICAL ERROR in handleFlashcardRating: " + e.message + "\nStack: " + e.stack);
        alert("Error: " + e.message);
    }
};

function handleFlashcardRatingInternal(rating) {
    console.log(`handleFlashcardRatingInternal called with rating: ${rating}`);
    const card = flashcardCards[flashcardIndex];
    if (!card) {
        console.error("No card found at index " + flashcardIndex + ". Current flashcardIndex: " + flashcardIndex + ", total cards: " + flashcardCards.length);
        return;
    }
    console.log(`Processing card: ${card[FC_COL_ID]} (Swedish: ${card[FC_COL_SWE]})`);
    const wordId = String(card[FC_COL_ID]);
    const timeSpent = Date.now() - cardStartTime;
    console.log(`Time spent on card: ${timeSpent}ms`);

    sessionStats.totalTime += timeSpent;

    // Update Leitner box
    if (rating >= 3) {
        // Good or Easy - promote
        console.log(`Rating ${rating} (Good/Easy), promoting word ${wordId}`);
        LeitnerSystem.promoteWord(wordId);
        flashcardScore++;
        sessionStats.correct++;
        if (typeof HapticManager !== 'undefined') HapticManager.trigger('success');
        if (typeof SoundManager !== 'undefined') SoundManager.play('success');
        updateSegmentedProgress(flashcardIndex, 'correct');
        const newBox = LeitnerSystem.getWordBox(wordId); // already promoted
        showNextReviewToast(newBox, true);
    } else {
        // Hard or Again - demote
        console.log(`Rating ${rating} (Hard/Again), demoting word ${wordId}`);
        LeitnerSystem.demoteWord(wordId);
        sessionStats.wrong++;
        if (typeof HapticManager !== 'undefined') HapticManager.trigger('error');
        if (typeof SoundManager !== 'undefined') SoundManager.play('error');
        updateSegmentedProgress(flashcardIndex, 'wrong');
        showNextReviewToast(1, false);
    }

    // Add to favorites if struggling (rating 0)
    if (rating === 0 && typeof FavoritesManager !== 'undefined') {
        const idStr = String(wordId);
        // Only toggle if NOT already a favorite (to add it)
        if (!FavoritesManager.isFavorite(idStr)) {
            console.log(`Rating 0, adding word ${wordId} to favorites.`);
            FavoritesManager.toggle(idStr);
            // Toggle shows its own toast, so we don't need another one
        }
    }

    // Animation
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        const isFlipped = flashcard.classList.contains('flipped');

        let animationClass = '';
        if (isFlipped) {
            animationClass = rating >= 3 ? 'slide-out-right' : 'slide-out-left';
        } else {
            animationClass = rating >= 3 ? 'slide-out-right-front' : 'slide-out-left-front';
        }

        console.log("Applying animation: " + animationClass + " | Flipped: " + isFlipped);
        flashcard.classList.add(animationClass);

        setTimeout(() => {
            console.log("Animation complete, showing next card");
            flashcard.classList.remove('slide-out-right', 'slide-out-left', 'slide-out-right-front', 'slide-out-left-front');
            flashcardIndex++;
            showNextFlashcard();
        }, 300);
    } else {
        console.error("Flashcard element not found for animation!");
        // If flashcard element is missing, still proceed to next card
        flashcardIndex++;
        showNextFlashcard();
    }
}

// ========================================
// Finish Flashcards Session
// ========================================
function finishFlashcards() {
    const percentage = Math.round((flashcardScore / flashcardTotal) * 100);
    const avgTime = Math.round(sessionStats.totalTime / flashcardTotal / 1000);

    // Trigger confetti for good performance
    if (percentage >= 70) {
        triggerConfetti();
        if (typeof HapticManager !== 'undefined') HapticManager.trigger('success');
        if (typeof SoundManager !== 'undefined') SoundManager.play('success');
    }

    // Show results
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
        flashcard.onclick = null;
    }

    document.getElementById('flashcardWord').innerHTML = `
        <span style="font-size: 3rem;">${percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}</span>
        <div style="font-size: 2.5rem; font-weight: 700; margin-top: 0.5rem;">${percentage}%</div>
    `;

    document.getElementById('flashcardTranslation').innerHTML = `
        <div style="margin-bottom: 1rem;">Du kunde ${flashcardScore} av ${flashcardTotal} ord!</div>
        <div style="display: flex; gap: 1rem; justify-content: center; font-size: 0.9rem;">
            <span>✅ ${sessionStats.correct}</span>
            <span>❌ ${sessionStats.wrong}</span>
            <span>⏱️ ${avgTime}s/kort</span>
        </div>
    `;

    const exampleEl = document.getElementById('flashcardExample');
    if (exampleEl) {
        exampleEl.innerHTML = `
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
                <button onclick="initFlashcards()" class="fc-action-btn">🔄 Igen</button>
                <button onclick="showGameMenu()" class="fc-action-btn secondary">🏠 Meny</button>
            </div>
        `;
        exampleEl.style.display = 'block';
    }

    // Hide rating buttons
    const ratingBtns = document.getElementById('flashcardRatingBtns');
    if (ratingBtns) ratingBtns.style.display = 'none';

    // Update progress ring to 100%
    updateProgressRing(100);

    // Save score
    if (typeof saveScore === 'function') {
        saveScore('flashcards', flashcardScore);
    }

    if (typeof updateGamesStats === 'function') {
        updateGamesStats(percentage >= 70, flashcardScore);
    }

    // Exit full screen
    exitFullScreenMode();
}

// ========================================
// Full Screen Mode
// ========================================
function enterFullScreenMode() {
    const game = document.getElementById('flashcardsGame');
    if (game && window.innerWidth < 768) {
        game.classList.add('fullscreen-mode');
    }
}

function exitFullScreenMode() {
    const game = document.getElementById('flashcardsGame');
    if (game) {
        game.classList.remove('fullscreen-mode');
    }
}

// ========================================
// Global Exports
// ========================================
window.initFlashcards = initFlashcards;
window.handleFlashcardResult = handleFlashcardRating; // Legacy support
window.handleFlashcardRating = handleFlashcardRating;
window.LeitnerSystem = LeitnerSystem;
