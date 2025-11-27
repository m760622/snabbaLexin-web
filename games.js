// Game Logic for Snabba Lexin Games

// Constants (matching app.js)
// Constants (matching app.js)
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5;
const COL_FORMS = 6;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// State
let gameScore = 0;
let currentCorrectAnswer = '';
let flashcardsQueue = [];
let currentFlashcardIndex = 0;
let recognition = null;
let pronunciationWord = '';
let spellingWord = '';
let currentSpellingItem = null; // Store full item for examples
let wheelWord = '';
let wheelCurrentInput = '';
let wheelLevel = 3; // Start with 3 letters
let wheelWordsSolved = 0;

// New Games State
let sentenceTarget = []; // Array of words
let sentenceCurrent = [];
let rainActive = false;
let rainScore = 0;
let rainLives = 3;
let rainWords = []; // {x, y, word, translation, speed}
let rainSpeedMultiplier = 1;
let wordleTarget = '';
let wordleGuesses = [];
let wordleCurrentGuess = '';
let wordleGameOver = false;
let wordleStreak = 0;

// Grammar Game State
let grammarTarget = [];
let grammarCurrent = [];
let grammarScore = 0;
let currentGrammarRule = null;

// ========================================
//  GRAMMAR GAME LOGIC
// ========================================

// Initialize Grammar Rules (generated on demand or loaded from static DB)
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


// Mobile View Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileViewToggle = document.getElementById('mobileViewToggle');
    if (mobileViewToggle) {
        mobileViewToggle.addEventListener('click', () => {
            document.body.classList.toggle('iphone-view');
            const isMobileView = document.body.classList.contains('iphone-view');
            localStorage.setItem('mobileView', isMobileView);
        });

        // Restore state
        if (localStorage.getItem('mobileView') === 'true') {
            document.body.classList.add('iphone-view');
        }
    }
});

// Start initialization (will retry until data is ready)
initializeGrammarRules();



// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => {
            toast.classList.remove('visible');
        }, 2000);
    }
}

// Global Start Game Function
window.startGame = function (gameType) {
    const gameMenu = document.getElementById('gameMenu');
    const missingWordGame = document.getElementById('missingWordGame');
    const flashcardsGame = document.getElementById('flashcardsGame');
    const pronunciationGame = document.getElementById('pronunciationGame');
    const spellingGame = document.getElementById('spellingGame');
    const wordWheelGame = document.getElementById('wordWheelGame');
    const sentenceGame = document.getElementById('sentenceGame');
    const rainGame = document.getElementById('rainGame');
    const wordleGame = document.getElementById('wordleGame');
    const grammarGame = document.getElementById('grammarGame');

    // Hide all active game containers
    document.querySelectorAll('.active-game-container').forEach(el => el.style.display = 'none');

    // Hide Menu
    gameMenu.style.display = 'none';

    // Reset Score for new game session
    resetGameScore();

    if (gameType === 'missing-word') {
        missingWordGame.style.display = 'block';
        startRound();
    } else if (gameType === 'flashcards') {
        flashcardsGame.style.display = 'block';
        initFlashcards();
    } else if (gameType === 'pronunciation') {
        pronunciationGame.style.display = 'block';
        startPronunciationGame();
    } else if (gameType === 'spelling') {
        spellingGame.style.display = 'block';
        startSpellingGame();
    } else if (gameType === 'word-wheel') {
        wordWheelGame.style.display = 'block';
        // Reset Wheel State
        wheelLevel = 3;
        wheelWordsSolved = 0;
        startWordWheelGame();
    } else if (gameType === 'sentence-builder') {
        sentenceGame.style.display = 'block';
        startSentenceGame();
    } else if (gameType === 'word-rain') {
        rainGame.style.display = 'block';
        initRainGame();
    } else if (gameType === 'wordle') {
        wordleGame.style.display = 'block';
        startWordleGame();
    } else if (gameType === 'grammar') {
        grammarGame.style.display = 'block';
        startGrammarGame();
    }
}

window.showGameMenu = function () {
    document.getElementById('gameMenu').style.display = 'block';
    document.getElementById('missingWordGame').style.display = 'none';
    document.getElementById('flashcardsGame').style.display = 'none';
    document.getElementById('pronunciationGame').style.display = 'none';
    document.getElementById('spellingGame').style.display = 'none';
    document.getElementById('wordWheelGame').style.display = 'none';

    document.getElementById('wordWheelGame').style.display = 'none';
    document.getElementById('sentenceGame').style.display = 'none';
    document.getElementById('rainGame').style.display = 'none';
    document.getElementById('wordleGame').style.display = 'none';
    document.getElementById('grammarGame').style.display = 'none';

    // Refresh scores
    loadScores();
}


function resetGameScore() {
    gameScore = 0;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('pronunciationScore').textContent = '0';
    document.getElementById('spellingScore').textContent = '0';
    document.getElementById('spellingScore').textContent = '0';
    document.getElementById('wordWheelScore').textContent = '0';
    document.getElementById('sentenceScore').textContent = '0';
    document.getElementById('rainScore').textContent = '0';
    // Wordle streak persists, so maybe don't reset visual immediately or handle differently
    // Flashcards uses progress, so we reset that elsewhere or just leave it
}

// --- MISSING WORD GAME ---
function startRound() {
    const gameSentence = document.getElementById('gameSentence');
    const gameHint = document.getElementById('gameHint');
    const gameOptions = document.getElementById('gameOptions');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Ensure Next button triggers new round
    nextQuestionBtn.onclick = startRound;

    // Check if data is loaded
    if (typeof dictionaryData === 'undefined' || !dictionaryData || dictionaryData.length === 0) {
        gameSentence.textContent = "Fel: Data inte laddad / خطأ: البيانات لم يتم تحميلها";
        return;
    }

    // Reset UI
    gameOptions.innerHTML = '';
    nextQuestionBtn.style.display = 'none';

    // 1. Find a word with an example
    let candidate = null;
    let attempts = 0;

    // Increased attempts to find a valid word
    while (!candidate && attempts < 500) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_EX_SWE] && randomItem[COL_SWE]) {
            const word = randomItem[COL_SWE].toLowerCase();
            const example = randomItem[COL_EX_SWE].toLowerCase();

            // Create regex here to ensure we can actually hide the word
            // Use word boundary to avoid partial matches (e.g. hiding 'rum' in 'trumma')
            const regex = new RegExp(`\\b${word}\\b`, 'i');

            // Ensure word is long enough and actually matches the regex in the example
            if (word.length > 2 && regex.test(example)) {
                candidate = randomItem;
            }
        }
        attempts++;
    }

    if (!candidate) {
        gameSentence.textContent = "Kunde inte hitta en lämplig fråga. Försök igen!";
        return;
    }

    const targetWord = candidate[COL_SWE];
    currentCorrectAnswer = targetWord;

    // 2. Prepare Sentence (Hide Word)
    // Remove 'g' flag to only replace the first occurrence
    const regex = new RegExp(`\\b${targetWord}\\b`, 'i');
    const displaySentence = candidate[COL_EX_SWE].replace(regex, '<span class="missing-word-slot"></span>');

    gameSentence.innerHTML = displaySentence;
    gameHint.textContent = candidate[COL_EX_ARB] || candidate[COL_ARB];

    // 3. Generate Distractors
    const options = [targetWord];
    while (options.length < 4) {
        const randomDistractor = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomDistractor && randomDistractor[COL_SWE]) {
            const distractor = randomDistractor[COL_SWE];
            if (!options.includes(distractor) && distractor !== targetWord) {
                options.push(distractor);
            }
        }
    }

    options.sort(() => Math.random() - 0.5);

    // 4. Render Options
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, opt);
        gameOptions.appendChild(btn);
    });
}

function checkAnswer(btn, selected) {
    const isCorrect = selected.toLowerCase() === currentCorrectAnswer.toLowerCase();
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const scoreEl = document.getElementById('gameScore');

    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        gameScore += 10;
        saveScore('missing-word', gameScore); // Save Score
        showToast('Rätt svar! 🎉 / إجابة صحيحة!');
    } else {
        btn.classList.add('wrong');
        allBtns.forEach(b => {
            if (b.textContent.toLowerCase() === currentCorrectAnswer.toLowerCase()) {
                b.classList.add('correct');
            }
        });
        showToast('Fel svar 😢 / إجابة خاطئة');
    }

    scoreEl.textContent = gameScore;
    nextQuestionBtn.style.display = 'block';
}

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

// --- PRONUNCIATION GAME ---
function startPronunciationGame() {
    const wordDisplay = document.getElementById('pronunciationWord');
    const translationDisplay = document.getElementById('pronunciationTranslation');
    const feedback = document.getElementById('pronunciationFeedback');
    const micStatus = document.getElementById('micStatus');
    const nextBtn = document.getElementById('nextPronunciationBtn');
    const micBtn = document.getElementById('micBtn');

    feedback.textContent = '';
    feedback.className = 'pronunciation-feedback';
    micStatus.textContent = 'Tryck för att tala / اضغط للتحدث';
    nextBtn.style.display = 'none';
    micBtn.classList.remove('listening');

    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 50) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_SWE] && randomItem[COL_SWE].length > 2 && !randomItem[COL_SWE].includes(' ')) {
            candidate = randomItem;
        }
        attempts++;
    }

    if (!candidate) {
        wordDisplay.textContent = "Error";
        return;
    }

    pronunciationWord = candidate[COL_SWE];
    wordDisplay.textContent = pronunciationWord;
    translationDisplay.textContent = candidate[COL_ARB] || '';
}

function toggleMic() {
    const micBtn = document.getElementById('micBtn');
    const micStatus = document.getElementById('micStatus');
    const feedback = document.getElementById('pronunciationFeedback');

    if (!('webkitSpeechRecognition' in window)) {
        alert("Din webbläsare stöder inte taligenkänning. Prova Chrome eller Safari. \n متصفحك لا يدعم التعرف على الصوت.");
        return;
    }

    if (micBtn.classList.contains('listening')) {
        if (recognition) recognition.stop();
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'sv-SE';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        micBtn.classList.add('listening');
        micStatus.textContent = 'Lyssnar... / أستمع...';
        feedback.textContent = '';
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        micStatus.textContent = 'Tryck för att tala / اضغط للتحدث';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const target = pronunciationWord.toLowerCase();

        if (transcript === target || transcript.includes(target) || target.includes(transcript)) {
            feedback.textContent = `Utmärkt! Du sa: "${transcript}" 🎉`;
            feedback.className = 'pronunciation-feedback success';
            triggerConfetti();
            document.getElementById('nextPronunciationBtn').style.display = 'block';
            gameScore += 20;
            saveScore('pronunciation', gameScore); // Save Score
        } else {
            feedback.textContent = `Inte riktigt... Du sa: "${transcript}". Försök igen! 💪`;
            feedback.className = 'pronunciation-feedback error';
        }
    };

    recognition.onerror = (event) => {
        micBtn.classList.remove('listening');
        micStatus.textContent = 'Fel vid igenkänning / خطأ في التعرف';
        console.error('Speech recognition error', event.error);
    };

    recognition.start();
}

function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            angle: Math.random() * 6.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
            p.y += p.speed;
            p.x += Math.sin(p.angle) * 2;
            p.angle += 0.1;

            if (p.y < canvas.height) {
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
                active = true;
            }
        });

        if (active) requestAnimationFrame(animate);
        else canvas.remove();
    }

    animate();
}

// --- SPELLING GAME (Refactored to Multiple Choice) ---
function startSpellingGame() {
    const hintEl = document.getElementById('spellingHint');
    const optionsContainer = document.getElementById('spellingOptions');
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');

    // Reset
    optionsContainer.innerHTML = '';
    feedbackEl.textContent = '';
    document.getElementById('spellingExample').textContent = ''; // Clear example
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';

    // Find correct word
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 100) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        // Require example sentence (COL_EX_SWE) to be present
        if (item && item[COL_SWE] && item[COL_SWE].length > 2 && !item[COL_SWE].includes(' ') && item[COL_EX_SWE]) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) return;

    currentSpellingItem = candidate; // Save for feedback
    spellingWord = candidate[COL_SWE];
    hintEl.textContent = candidate[COL_ARB] || candidate[COL_EX_ARB] || "Välj rätt ord";

    // Find 2 distractors
    const options = [candidate];
    while (options.length < 3) {
        const distractor = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (distractor && distractor[COL_SWE] && distractor[COL_SWE] !== spellingWord && !distractor[COL_SWE].includes(' ')) {
            options.push(distractor);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render Buttons
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'spelling-option-btn';
        btn.textContent = opt[COL_SWE];
        btn.onclick = () => checkSpellingOption(btn, opt[COL_SWE]);
        optionsContainer.appendChild(btn);
    });
}

function checkSpellingOption(btn, selectedWord) {
    const feedbackEl = document.getElementById('spellingFeedback');
    const nextBtn = document.getElementById('nextSpellingBtn');
    const allBtns = document.querySelectorAll('.spelling-option-btn');

    // Disable all buttons
    allBtns.forEach(b => b.disabled = true);

    if (selectedWord === spellingWord) {
        btn.classList.add('correct');
        feedbackEl.textContent = "Rätt svar! 🎉 / إجابة صحيحة!";
        feedbackEl.className = 'game-feedback success';
        gameScore += 10;
        document.getElementById('spellingScore').textContent = gameScore;
        saveScore('spelling', gameScore);
        triggerConfetti();
    } else {
        btn.classList.add('wrong');
        // Highlight correct one
        allBtns.forEach(b => {
            if (b.textContent === spellingWord) b.classList.add('correct');
        });
        feedbackEl.innerHTML = `Fel! Rätt svar var: <strong>${spellingWord}</strong> <br> خطأ! الإجابة الصحيحة كانت: <strong>${spellingWord}</strong>`;
        feedbackEl.className = 'game-feedback error';
    }

    // Add Example Sentence if available
    if (currentSpellingItem && currentSpellingItem[COL_EX_SWE]) {
        const exampleEl = document.getElementById('spellingExample');
        exampleEl.textContent = `"${currentSpellingItem[COL_EX_SWE]}"`;
        // feedbackEl.innerHTML += `<br><br><div style="font-size: 0.9em; color: #555;">Exempel: "${currentSpellingItem[COL_EX_SWE]}"</div>`;
    }

    nextBtn.style.display = 'block';
}

// --- WORD WHEEL GAME ---
function startWordWheelGame() {
    const hintEl = document.getElementById('wheelHint');
    const answerBox = document.getElementById('wheelAnswerBox');
    const lettersContainer = document.getElementById('wheelLetters');
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');

    // Reset
    wheelCurrentInput = '';
    answerBox.textContent = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'game-feedback';
    nextBtn.style.display = 'none';
    checkBtn.disabled = false;
    checkBtn.onclick = checkWordWheelAnswer; // Bind the check function
    if (skipBtn) skipBtn.style.display = 'inline-block';
    lettersContainer.innerHTML = '';

    // Get selected length
    const lengthSelect = document.getElementById('wordWheelLength');
    if (lengthSelect) {
        wheelLevel = parseInt(lengthSelect.value) || 3;
    }

    // Find word based on current level (length)
    let candidate = null;
    let attempts = 0;
    if (showAnswerBtn) {
        // Always visible, enabled at start
        showAnswerBtn.style.display = 'inline-block';
        showAnswerBtn.disabled = false;
        showAnswerBtn.onclick = showWordWheelAnswer;
    }

    // Find word based on level (Strict length match now)
    // Removed duplicate declarations here
    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        const word = item[COL_SWE] || '';
        // Strict length match
        if (word.length === wheelLevel && !word.includes(' ') && !word.includes('-') && /^[a-zåäö]+$/i.test(word)) {
            candidate = item;
        }
        attempts++;
    }

    if (!candidate) {
        // Fallback: Try +/- 1 length if strict fails
        attempts = 0;
        while (!candidate && attempts < 100) {
            const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
            const word = item[COL_SWE] || '';
            if (Math.abs(word.length - wheelLevel) <= 1 && !word.includes(' ') && !word.includes('-')) {
                candidate = item;
            }
            attempts++;
        }
    }

    if (!candidate) {
        hintEl.textContent = "Kunde inte hitta ord... Försöker igen.";
        setTimeout(startWordWheelGame, 1000);
        return;
    }

    wheelWord = candidate[COL_SWE].toLowerCase();
    hintEl.textContent = candidate[COL_ARB] || "Bygg ordet / كوّن الكلمة";

    // Scramble letters
    const letters = wheelWord.split('').sort(() => Math.random() - 0.5);

    // Render Wheel
    const radius = 100; // px
    const centerX = 150; // half of container width
    const centerY = 150; // half of container height
    const angleStep = (2 * Math.PI) / letters.length;

    letters.forEach((char, index) => {
        const btn = document.createElement('button');
        btn.className = 'wheel-letter';
        btn.textContent = char;

        const angle = index * angleStep - (Math.PI / 2); // Start from top
        const x = centerX + radius * Math.cos(angle) - 25; // -25 for half button size (50px width)
        const y = centerY + radius * Math.sin(angle) - 25;

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;

        btn.onclick = () => {
            if (!btn.classList.contains('selected')) {
                wheelCurrentInput += char;
                answerBox.textContent = wheelCurrentInput;
                btn.classList.add('selected');
            }
        };

        lettersContainer.appendChild(btn);
    });
}

function showWordWheelAnswer() {
    const answerBox = document.getElementById('wheelAnswerBox');
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');

    // Reveal the correct answer
    wheelCurrentInput = wheelWord;
    answerBox.textContent = wheelWord;
    document.querySelectorAll('.wheel-letter').forEach(btn => btn.classList.add('selected'));
    feedbackEl.textContent = `Rätt svar var: ${wheelWord}`;
    feedbackEl.className = 'game-feedback'; // neutral

    // Keep Skip button visible in column 1
    if (skipBtn) {
        skipBtn.style.display = 'inline-flex';
        skipBtn.style.gridColumn = '1';
    }
    // Show Next button in column 3
    if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.style.gridColumn = '3';
    }
    // Hide Show Answer button
    if (showAnswerBtn) {
        showAnswerBtn.style.display = 'none';
    }
    // Disable Check button (no longer needed)
    if (checkBtn) {
        checkBtn.disabled = true;
    }
}

function skipWordWheel() {
    startWordWheelGame();
}

function checkWordWheelAnswer() {
    const feedbackEl = document.getElementById('wheelFeedback');
    const nextBtn = document.getElementById('nextWheelBtn');
    const checkBtn = document.getElementById('wheelCheckBtn');
    const skipBtn = document.getElementById('skipWheelBtn');
    const showAnswerBtn = document.getElementById('wheelShowAnswerBtn');

    if (wheelCurrentInput.toLowerCase() === wheelWord) {
        // Correct!
        feedbackEl.textContent = "Rätt svar! 🎉 / إجابة صحيحة!";
        feedbackEl.className = 'game-feedback success';
        gameScore += 10;
        document.getElementById('wordWheelScore').textContent = gameScore; // Changed to wordWheelScore
        saveScore('word-wheel', gameScore); // Changed to word-wheel
        triggerConfetti();

        // After showing answer, keep Skip button visible and place Next button in column 3
        if (skipBtn) {
            skipBtn.style.display = 'inline-flex';
            skipBtn.style.gridColumn = '1';
        }
        nextBtn.style.display = 'inline-flex'; // Show Next button
        nextBtn.style.gridColumn = '3'; // Place Next in its own column
        // Hide Show Answer button
        if (showAnswerBtn) {
            showAnswerBtn.style.display = 'none';
        }

        checkBtn.disabled = true; // Check button is in center (wheel center), so it doesn't affect grid

        if (showAnswerBtn) {
            showAnswerBtn.disabled = true;
            showAnswerBtn.style.display = 'inline-flex'; // Keep visible in grid slot 2
            showAnswerBtn.style.gridColumn = '2';
        }
        // Progression Logic (Optional: Auto-increase level if user wants? 
        // Since we have a selector, maybe we SHOULDN'T auto-change it, or update the selector)
        wheelWordsSolved++;
        /* 
        if (wheelWordsSolved % 3 === 0) {
             // Let user decide via selector
        } 
        */
    } else {
        // Wrong
        feedbackEl.textContent = "Försök igen... / حاول مجدداً";
        feedbackEl.className = 'game-feedback error';
        setTimeout(() => {
            feedbackEl.textContent = "";
        }, 1500);
    }
}

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
    while (!candidate && attempts < 100) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_EX_SWE] && item[COL_EX_SWE].split(' ').length >= 3 && item[COL_EX_SWE].length < 60) {
            candidate = item;
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
            feedbackEl.textContent = "Helt rätt! 🌟 / صحيح تماماً!";
            feedbackEl.className = 'game-feedback success';
            gameScore += 20;
            document.getElementById('sentenceScore').textContent = gameScore;
            saveScore('sentence', gameScore);
            triggerConfetti();
            nextBtn.style.display = 'block';
            checkBtn.style.display = 'none';
        } else {
            feedbackEl.textContent = "Inte riktigt... Försök igen! / ليس تماماً...";
            feedbackEl.className = 'game-feedback error';
        }
    };

    nextBtn.onclick = startSentenceGame;
}

window.showSentenceAnswer = function () {
    const dropZone = document.getElementById('sentenceDropZone');
    const wordBank = document.getElementById('sentenceWordBank');
    const feedbackEl = document.getElementById('sentenceFeedback');
    const nextBtn = document.getElementById('nextSentenceBtn');
    const checkBtn = document.getElementById('checkSentenceBtn');
    const showAnswerBtn = document.getElementById('sentenceShowAnswerBtn');

    // Fill Drop Zone with correct order
    dropZone.innerHTML = '';
    sentenceTarget.forEach(word => {
        const el = document.createElement('div');
        el.className = 'sentence-word';
        el.textContent = word;
        dropZone.appendChild(el);
    });

    // Disable Word Bank
    const bankWords = wordBank.querySelectorAll('.sentence-word');
    bankWords.forEach(w => w.classList.add('used'));

    feedbackEl.textContent = "Här är rätt svar! / إليك الإجابة الصحيحة!";
    feedbackEl.className = 'game-feedback';

    nextBtn.style.display = 'inline-block';
    checkBtn.disabled = true;
    if (showAnswerBtn) showAnswerBtn.disabled = true;
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
            triggerConfetti();

            // Show explanation
            explanationEl.innerHTML = `<strong>✓ Korrekt!</strong><br>${currentGrammarRule.explanation}<br><span style="direction: rtl; display: block; margin-top: 0.5rem;">${currentGrammarRule.explanationAr}</span>`;
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

    // Show explanation
    explanationEl.innerHTML = `<strong>ℹ️ Förklaring:</strong><br>${currentGrammarRule.explanation}<br><span style="direction: rtl; display: block; margin-top: 0.5rem;">${currentGrammarRule.explanationAr}</span>`;
    explanationEl.style.display = 'block';
    explanationEl.style.background = 'rgba(99, 102, 241, 0.1)';
    explanationEl.style.borderLeft = '4px solid #6366f1';

    nextBtn.style.display = 'inline-block';
    checkBtn.disabled = true;
    if (showAnswerBtn) showAnswerBtn.disabled = true;
}

// --- WORD RAIN GAME ---
function initRainGame() {
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startRainBtn');
    const controls = document.getElementById('rainControls');

    startBtn.style.display = 'block';
    controls.innerHTML = '';
    rainActive = false;

    startBtn.onclick = () => {
        startBtn.style.display = 'none';
        startRainGame();
    };
}

function startRainGame() {
    rainActive = true;
    rainScore = 0;
    rainLives = 3;
    rainSpeedMultiplier = 1;
    rainWords = [];
    document.getElementById('rainScore').textContent = '0';
    document.getElementById('rainLives').textContent = '3';

    spawnRainWord();
    requestAnimationFrame(updateRainGame);
}

function spawnRainWord() {
    if (!rainActive) return;

    if (typeof dictionaryData === 'undefined' || !dictionaryData || dictionaryData.length === 0) {
        console.error("Dictionary data not loaded");
        rainActive = false;
        return;
    }

    let item = null;
    let attempts = 0;

    // Try to find a valid word with a limit on attempts
    while (!item && attempts < 50) {
        const candidate = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (candidate && candidate[COL_SWE]) {
            item = candidate;
        }
        attempts++;
    }

    if (!item) {
        // If we still don't have a word, just wait and try again later without recursion stack buildup
        setTimeout(spawnRainWord, 500);
        return;
    }

    rainWords.push({
        x: Math.random() * (500) + 50, // padding
        y: -30,
        word: item[COL_SWE],
        translation: item[COL_ARB] || item[COL_SWE], // Fallback
        speed: (Math.random() * 0.5 + 0.5) * rainSpeedMultiplier,
        item: item
    });

    // Schedule next spawn
    setTimeout(spawnRainWord, 2000 / rainSpeedMultiplier);
}

function updateRainGame() {
    if (!rainActive) return;

    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Words
    ctx.font = '20px Inter';
    ctx.fillStyle = '#ffffff';

    for (let i = rainWords.length - 1; i >= 0; i--) {
        const w = rainWords[i];
        w.y += w.speed;

        ctx.fillText(w.word, w.x, w.y);

        // Hit bottom
        if (w.y > canvas.height) {
            rainWords.splice(i, 1);
            loseLife();
        }
    }

    // Update Controls (Show options for the lowest word)
    updateRainControls();

    if (rainActive) requestAnimationFrame(updateRainGame);
}

function updateRainControls() {
    const controls = document.getElementById('rainControls');

    // Find lowest word that hasn't been answered yet (closest to bottom)
    // Actually, let's just pick the one closest to bottom
    if (rainWords.length === 0) {
        controls.innerHTML = '';
        return;
    }

    const target = rainWords.sort((a, b) => b.y - a.y)[0];

    // If controls already match this word, don't redraw
    if (controls.dataset.target === target.word) return;

    controls.dataset.target = target.word;
    controls.innerHTML = '';

    // Generate options
    const options = [target.item];
    while (options.length < 3) {
        const rand = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (rand && rand !== target.item) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'rain-option-btn';
        btn.textContent = opt[COL_ARB] || opt[COL_SWE]; // Show Arabic translation
        btn.onclick = () => checkRainAnswer(btn, opt, target);
        controls.appendChild(btn);
    });
}

function checkRainAnswer(btn, selectedItem, targetWordObj) {
    if (!rainActive) return;

    if (selectedItem === targetWordObj.item) {
        // Correct
        rainScore += 10;
        document.getElementById('rainScore').textContent = rainScore;
        saveScore('rain', rainScore);

        // Remove word from screen
        const idx = rainWords.indexOf(targetWordObj);
        if (idx > -1) rainWords.splice(idx, 1);

        // Increase speed slightly
        rainSpeedMultiplier += 0.05;

        // Clear controls to force refresh
        document.getElementById('rainControls').innerHTML = '';
        document.getElementById('rainControls').dataset.target = '';

    } else {
        // Wrong
        btn.style.background = '#ef4444';
        loseLife();
    }
}

function loseLife() {
    rainLives--;
    document.getElementById('rainLives').textContent = rainLives;
    if (rainLives <= 0) {
        rainActive = false;
        alert(`Game Over! Poäng: ${rainScore}`);
        initRainGame();
    }
}

// --- WORDLE GAME ---
// (Moved to bottom of file to avoid duplication)


// --- SCORE & SETTINGS LOGIC ---

function loadScores() {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    document.getElementById('score-missing-word').textContent = scores['missing-word'] || 0;
    document.getElementById('score-flashcards').textContent = scores['flashcards'] || 0;
    document.getElementById('score-pronunciation').textContent = scores['pronunciation'] || 0;
    document.getElementById('score-spelling').textContent = scores['spelling'] || 0;
    document.getElementById('score-word-wheel').textContent = scores['word-wheel'] || 0;
    document.getElementById('score-sentence').textContent = scores['sentence'] || 0;
    document.getElementById('score-rain').textContent = scores['rain'] || 0;
    document.getElementById('score-wordle').textContent = scores['wordle'] || 0;
    document.getElementById('score-grammar').textContent = scores['grammar'] || 0;
}

function saveScore(game, score) {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    const currentHigh = scores[game] || 0;

    if (score > currentHigh) {
        scores[game] = score;
        localStorage.setItem('gameScores', JSON.stringify(scores));
        // Update UI if menu is visible
        loadScores();
        showToast(`Nytt rekord! 🏆 / رقم قياسي جديد!`);
    }
}

function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    const sunIcon = toggleBtn.querySelector('.sun-icon');

    // Check saved preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);

        if (isNowDark) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    });
}

// Update game end logic to save scores
// We need to inject saveScore calls into the existing game logic

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadScores();
    initDarkMode();

    const flashcard = document.getElementById('flashcard');
    const fcWrongBtn = document.getElementById('fcWrongBtn');
    const fcCorrectBtn = document.getElementById('fcCorrectBtn');
    const micBtn = document.getElementById('micBtn');
    const nextPronunciationBtn = document.getElementById('nextPronunciationBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Word Wheel Elements
    const wheelCheckBtn = document.getElementById('wheelCheckBtn');
    const nextWheelBtn = document.getElementById('nextWheelBtn');
    const skipWheelBtn = document.getElementById('skipWheelBtn');

    if (flashcard) {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
    }

    if (fcWrongBtn) fcWrongBtn.addEventListener('click', () => handleFlashcardResult(false));
    if (fcCorrectBtn) fcCorrectBtn.addEventListener('click', () => handleFlashcardResult(true));
    if (micBtn) micBtn.addEventListener('click', toggleMic);
    if (nextPronunciationBtn) nextPronunciationBtn.addEventListener('click', startPronunciationGame);
    if (nextQuestionBtn) nextQuestionBtn.addEventListener('click', startRound);

    // Spelling Listeners - Handled via inline onclick in HTML for reliability
    // document.addEventListener('click', (e) => {
    //     const btn = e.target.closest('#nextSpellingBtn');
    //     if (btn) {
    //         e.preventDefault();
    //         startSpellingGame();
    //     }
    // });

    // Word Wheel Listeners
    if (wheelCheckBtn) wheelCheckBtn.addEventListener('click', checkWordWheel);
    if (nextWheelBtn) nextWheelBtn.addEventListener('click', startWordWheelGame);
    if (skipWheelBtn) skipWheelBtn.addEventListener('click', skipWordWheel);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        const flashcardsGame = document.getElementById('flashcardsGame');
        if (flashcardsGame.style.display === 'block') {
            if (e.code === 'Space') {
                e.preventDefault(); // Prevent scrolling
                const flashcard = document.getElementById('flashcard');
                if (flashcard) flashcard.classList.toggle('flipped');
            } else if (e.code === 'ArrowLeft') {
                handleFlashcardResult(false);
            } else if (e.code === 'ArrowRight') {
                handleFlashcardResult(true);
            }
        }
    });
});

// --- WORDLE GAME ---
function startWordleGame() {
    const grid = document.getElementById('wordleGrid');
    const keyboard = document.getElementById('wordleKeyboard');
    const messageEl = document.getElementById('wordleMessage');
    const nextBtn = document.getElementById('nextWordleBtn');
    const typeFilter = document.getElementById('wordleTypeFilter').value;

    // Reset State
    wordleGuesses = [];
    wordleCurrentGuess = '';
    wordleGameOver = false;
    messageEl.textContent = '';
    nextBtn.style.display = 'none';
    grid.innerHTML = '';
    keyboard.innerHTML = '';

    // Select Target Word (5 letters)
    let candidate = null;
    let attempts = 0;
    while (!candidate && attempts < 500) {
        const item = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (item && item[COL_SWE] && item[COL_SWE].length === 5 && !item[COL_SWE].includes(' ') && !item[COL_SWE].includes('-')) {
            // Filter by type if selected
            if (typeFilter !== 'all') {
                if (item[COL_TYPE] && item[COL_TYPE].toLowerCase().includes(typeFilter)) {
                    candidate = item;
                }
            } else {
                candidate = item;
            }
        }
        attempts++;
    }

    if (!candidate) {
        messageEl.textContent = "Kunde inte hitta ett ord. Försök igen.";
        return;
    }

    wordleTarget = candidate[COL_SWE].toUpperCase();
    console.log("Wordle Target:", wordleTarget); // Debug

    // Create Grid (6 rows, 5 cols) - FIXED: use wordle-tile not wordle-cell
    for (let i = 0; i < 30; i++) {
        const cell = document.createElement('div');
        cell.className = 'wordle-tile';
        grid.appendChild(cell);
    }

    // Create Keyboard
    const keys = [
        'QWERTYUIOPÅ',
        'ASDFGHJKLÖÄ',
        'ZXCVBNM'
    ];

    keys.forEach(row => {
        const rowEl = document.createElement('div');
        rowEl.className = 'keyboard-row';

        row.split('').forEach(key => {
            const keyBtn = document.createElement('button');
            keyBtn.className = 'key-btn';
            keyBtn.textContent = key;
            keyBtn.onclick = () => handleWordleInput(key);
            keyBtn.dataset.key = key;
            rowEl.appendChild(keyBtn);
        });

        if (row === 'ZXCVBNM') {
            // Add Enter and Backspace
            const enterBtn = document.createElement('button');
            enterBtn.className = 'key-btn wide';
            enterBtn.textContent = 'ENTER';
            enterBtn.onclick = submitWordleGuess;
            rowEl.appendChild(enterBtn);

            const backBtn = document.createElement('button');
            backBtn.className = 'key-btn wide';
            backBtn.textContent = '⌫';
            backBtn.onclick = () => handleWordleInput('BACKSPACE');
            rowEl.prepend(backBtn);
        }

        keyboard.appendChild(rowEl);
    });

    // Keyboard Listeners (Physical)
    document.onkeydown = (e) => {
        if (document.getElementById('wordleGame').style.display === 'none') return;

        const key = e.key.toUpperCase();
        if (key === 'ENTER') submitWordleGuess();
        else if (key === 'BACKSPACE') handleWordleInput('BACKSPACE');
        else if (/^[A-ZÅÄÖ]$/.test(key)) handleWordleInput(key);
    };
}

function handleWordleInput(key) {
    if (wordleGameOver) return;

    if (key === 'BACKSPACE') {
        wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
    } else if (wordleCurrentGuess.length < 5) {
        wordleCurrentGuess += key;
    }
    updateWordleGrid();
}

function updateWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    const currentRow = wordleGuesses.length;
    const startIdx = currentRow * 5;

    // Clear current row
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = '';
        cell.classList.remove('typing');
    }

    // Fill current guess
    for (let i = 0; i < wordleCurrentGuess.length; i++) {
        const cell = grid.children[startIdx + i];
        cell.textContent = wordleCurrentGuess[i];
        cell.classList.add('typing');
    }
}

function submitWordleGuess() {
    if (wordleGameOver) return;
    if (wordleCurrentGuess.length !== 5) {
        showToast("Ordet måste ha 5 bokstäver");
        return;
    }

    // Check if word exists (optional, but good for UX)
    // For now, we allow any 5-letter combo to keep it simple, or check dictionary
    /*
    const exists = dictionaryData.some(d => d[COL_SWE].toUpperCase() === wordleCurrentGuess);
    if (!exists) {
        showToast("Finns inte i ordlistan");
        return;
    }
    */

    const guess = wordleCurrentGuess;
    wordleGuesses.push(guess);

    // Color the grid
    const rowStart = (wordleGuesses.length - 1) * 5;
    const grid = document.getElementById('wordleGrid');
    const targetChars = wordleTarget.split('');

    // First pass: Correct (Green)
    const guessChars = guess.split('');
    const states = Array(5).fill('absent'); // absent, present, correct

    guessChars.forEach((char, i) => {
        if (char === targetChars[i]) {
            states[i] = 'correct';
            targetChars[i] = null; // Mark as used
            guessChars[i] = null;
        }
    });

    // Second pass: Present (Yellow)
    guessChars.forEach((char, i) => {
        if (char && targetChars.includes(char)) {
            states[i] = 'present';
            const targetIdx = targetChars.indexOf(char);
            targetChars[targetIdx] = null;
        }
    });

    // Apply styles with animation delay
    states.forEach((state, i) => {
        const cell = grid.children[rowStart + i];
        setTimeout(() => {
            cell.classList.add(state);
            // Update Keyboard
            const keyBtn = document.querySelector(`.key-btn[data-key="${guess[i]}"]`);
            if (keyBtn) {
                // Only upgrade status (absent -> present -> correct)
                const currentClass = keyBtn.classList.contains('correct') ? 'correct' :
                    keyBtn.classList.contains('present') ? 'present' : 'absent';

                if (state === 'correct') keyBtn.className = `key-btn correct`;
                else if (state === 'present' && currentClass !== 'correct') keyBtn.className = `key-btn present`;
                else if (state === 'absent' && currentClass === 'absent') keyBtn.className = `key-btn absent`;
                else if (state === 'absent' && !keyBtn.classList.contains('correct') && !keyBtn.classList.contains('present')) keyBtn.classList.add('absent');
            }
        }, i * 100);
    });

    // Check Win/Loss
    if (guess === wordleTarget) {
        wordleGameOver = true;
        setTimeout(() => {
            document.getElementById('wordleMessage').textContent = "Grattis! Du klarade det! 🎉";
            wordleStreak++;
            document.getElementById('wordleStreak').textContent = wordleStreak;
            triggerConfetti();
            document.getElementById('nextWordleBtn').style.display = 'block';
        }, 2000);
    } else if (wordleGuesses.length >= 6) {
        wordleGameOver = true;
        setTimeout(() => {
            document.getElementById('wordleMessage').innerHTML = `Tyvärr! Rätt ord var: <strong>${wordleTarget}</strong>`;
            wordleStreak = 0;
            document.getElementById('wordleStreak').textContent = wordleStreak;
            document.getElementById('nextWordleBtn').style.display = 'block';
        }, 2000);
    }

    wordleCurrentGuess = '';
}

// Set up Wordle Next button event listener (outside submitWordleGuess to avoid multiple bindings)
if (document.getElementById('nextWordleBtn')) {
    document.getElementById('nextWordleBtn').onclick = startWordleGame;
}
