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
const FC_COL_EX_SWE = 6;
const FC_COL_ARB_DEF2 = 7;
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
const HapticFeedback = {
    trigger(type = 'light') {
        if ('vibrate' in navigator) {
            const patterns = {
                light: [10],
                medium: [20],
                heavy: [30],
                success: [10, 50, 20],
                error: [50, 30, 50]
            };
            navigator.vibrate(patterns[type] || patterns.light);
        }
    }
};

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

    // Filter out entries without Swedish word
    pool = pool.filter(entry => entry[FC_COL_SWE] && entry[FC_COL_SWE].length > 0);

    // Adaptive: Prioritize words in lower boxes (harder words)
    pool.sort((a, b) => {
        const boxA = LeitnerSystem.getWordBox(String(a[FC_COL_ID]));
        const boxB = LeitnerSystem.getWordBox(String(b[FC_COL_ID]));
        return boxA - boxB; // Lower box = higher priority
    });

    // Shuffle within same-box groups, then pick 20
    const shuffled = pool.sort(() => Math.random() - 0.3).slice(0, 20);

    flashcardCards = shuffled;
    flashcardIndex = 0;
    flashcardScore = 0;
    flashcardTotal = flashcardCards.length;
    sessionStats = { correct: 0, wrong: 0, totalTime: 0 };

    // Update progress display
    updateProgressRing(0);
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
// Progress Ring Update
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
            HapticFeedback.trigger('medium');
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
    HapticFeedback.trigger('light');

    // Get fresh reference to rating buttons
    const btns = document.getElementById('flashcardRatingBtns');
    if (flashcard.classList.contains('flipped')) {
        // Show rating buttons when flipped
        if (btns) btns.style.display = 'flex';
    } else {
        // Hide rating buttons when unflipped
        if (btns) btns.style.display = 'none';
    }
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

    // Update UI
    document.getElementById('flashcardWord').textContent = swedishWord;
    document.getElementById('flashcardTranslation').textContent = arabicWord;

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

    // Show example sentence AND Swedish definition
    const exampleEl = document.getElementById('flashcardExample');
    if (exampleEl) {
        let content = '';
        // Add Swedish definition if available
        if (swedishDef && swedishDef.length > 0) {
            content += `<div style="margin-bottom: 0.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.8);">📖 ${swedishDef}</div>`;
        }
        // Add example sentence if available
        if (exampleSwe && exampleSwe.length > 0) {
            content += `<div style="font-size: 0.9rem; color: rgba(255,255,255,0.6); font-style: italic;">📝 ${exampleSwe}</div>`;
        }

        if (content) {
            exampleEl.innerHTML = content;
            exampleEl.style.display = 'block';
        } else {
            exampleEl.innerHTML = '';
            exampleEl.style.display = 'none';
        }
    }

    // Update progress
    const progress = (flashcardIndex / flashcardTotal) * 100;
    updateProgressRing(progress);
    document.getElementById('flashcardProgress').textContent = `${flashcardIndex + 1}/${flashcardTotal}`;

    // Reset card state
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
        flashcard.classList.remove('swiping-left', 'swiping-right', 'slide-out-right', 'slide-out-left');
        flashcard.style.transform = '';
        flashcard.style.opacity = '';
    }

    // Hide rating buttons initially
    const ratingBtns = document.getElementById('flashcardRatingBtns');
    if (ratingBtns) ratingBtns.style.display = 'none';

    // Auto TTS - speak Swedish word
    setTimeout(() => {
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(swedishWord, 'sv');
        }
    }, 300);

}

// ========================================
// 4-Level Rating System (Anki-style)
// ========================================
function handleFlashcardRating(rating) {
    const card = flashcardCards[flashcardIndex];
    const wordId = String(card[FC_COL_ID]);
    const timeSpent = Date.now() - cardStartTime;

    sessionStats.totalTime += timeSpent;

    // Update Leitner box
    if (rating >= 3) {
        // Good or Easy - promote
        LeitnerSystem.promoteWord(wordId);
        flashcardScore++;
        sessionStats.correct++;
        HapticFeedback.trigger('success');
    } else {
        // Again or Hard - demote
        LeitnerSystem.demoteWord(wordId);
        sessionStats.wrong++;
        HapticFeedback.trigger('error');
    }

    // Add to favorites if struggling (rating 0)
    if (rating === 0 && typeof FavoritesManager !== 'undefined') {
        FavoritesManager.add(parseInt(wordId));
        showToast('Lagt till favoriter / أضيف للمفضلة ⭐');
    }

    // Animate out and show next
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.classList.add(rating >= 3 ? 'slide-out-right' : 'slide-out-left');
        setTimeout(() => {
            flashcard.classList.remove('slide-out-right', 'slide-out-left');
            flashcardIndex++;
            showNextFlashcard();
        }, 300);
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
        HapticFeedback.trigger('success');
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
