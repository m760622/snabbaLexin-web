// ========================================
//  SWEDISH WORD CONNECT GAME MODULE
// ========================================

// --- CONFIG & STATE ---
const WC_CONFIG = {
    totalChapters: 10,
    stagesPerChapter: 10,
    hintCost: 50
};

// Seed words for 100 levels (10 chapters x 10 stages)
// WC_ROOT_WORDS is loaded from wordConnectData.js - DO NOT REDEFINE HERE

var wcState = {
    chapter: 1,
    stage: 1,
    maxChapter: 1, // Highest reached
    maxStage: 1,   // Highest reached
    coins: 300,
    currentLevelData: null,
    foundWords: [],
    currentInput: "",
    isDragging: false,
    visitedNodes: [],
    svgLine: null,
    streak: 0,
    lastLogin: null,
    bonusWords: [],
    timerInterval: null
};

let wcInitRetries = 0;

// --- INITIALIZATION ---

function initWordConnect() {
    console.log("Initializing Word Connect Module...");

    // Safeguard: Check if wordConnectData.js is loaded
    if (typeof WC_PREDEFINED_LEVELS === 'undefined' || typeof WC_DICTIONARY === 'undefined' || typeof WC_ROOT_WORDS === 'undefined') {
        if (wcInitRetries < 5) {
            wcInitRetries++;
            console.warn(`Word Connect: Data not ready. Retrying (${wcInitRetries}/5)...`);
            setTimeout(initWordConnect, 500);
            return;
        }
        console.error("Word Connect: WC_PREDEFINED_LEVELS or WC_DICTIONARY is missing!");
        showToast("Ett fel uppstod: Speldata laddades inte. / حدث خطأ: بيانات اللعبة لم يتم تحميلها.", "error");
        return;
    }

    wcInitRetries = 0; // Reset on success

    loadProgress();
    startLevel(wcState.chapter, wcState.stage);
}

function loadProgress() {
    const saved = localStorage.getItem('wcProgress');
    if (saved) {
        const parsed = JSON.parse(saved);
        wcState.chapter = parsed.chapter || 1;
        wcState.stage = parsed.stage || 1;
        wcState.maxChapter = parsed.maxChapter || 1;
        wcState.maxStage = parsed.maxStage || 1;
        wcState.coins = parsed.coins || 300;
    }
    updateCoinDisplay();
}

function saveProgress() {
    // Update max progress
    if (wcState.chapter > wcState.maxChapter) {
        wcState.maxChapter = wcState.chapter;
        wcState.maxStage = wcState.stage;
    } else if (wcState.chapter === wcState.maxChapter && wcState.stage > wcState.maxStage) {
        wcState.maxStage = wcState.stage;
    }

    const data = {
        chapter: wcState.chapter,
        stage: wcState.stage,
        maxChapter: wcState.maxChapter,
        maxStage: wcState.maxStage,
        coins: wcState.coins,
        streak: wcState.streak,
        lastLogin: wcState.lastLogin
    };
    localStorage.setItem('wcProgress', JSON.stringify(data));
    updateCoinDisplay();
}

function updateCoinDisplay() {
    const el = document.getElementById('wcCoinCount');
    if (el) el.textContent = wcState.coins;

    const streakEl = document.getElementById('wcStreakCount');
    if (streakEl) streakEl.textContent = wcState.streak;

    const bonusEl = document.getElementById('wcBonusCount');
    if (bonusEl) bonusEl.textContent = wcState.bonusWords ? wcState.bonusWords.length : 0;
}

function checkDailyReward() {
    const today = new Date().toDateString();

    if (wcState.lastLogin !== today) {
        // New day!

        // Check if consecutive (yesterday)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (wcState.lastLogin === yesterday.toDateString()) {
            wcState.streak++;
        } else {
            wcState.streak = 1; // Reset or start new
        }

        wcState.lastLogin = today;
        wcState.coins += 20; // Daily Reward
        saveProgress();

        showToast(`Daglig Belöning: +20 Mynt! 🔥 Streak: ${wcState.streak}`, "success");
        triggerConfetti();
    }
}

// --- DIFFICULTY LOGIC ---
function getDifficulty(chapter, stage) {
    const levelIndex = (chapter - 1) * 10 + stage; // 1-100

    // Chapter 1: Max 3 letters, Max 3 words (Progressive)
    if (chapter === 1) {
        if (stage <= 5) {
            // Stages 1-5: Very Easy (Max 3 words, Max 3 letters)
            return { minWords: 2, maxWords: 3, maxLength: 3, dist: { 2: 1, 3: 2 } };
        } else {
            // Stages 6-10: Easy (Max 4 words, Max 3 letters)
            return { minWords: 3, maxWords: 4, maxLength: 3, dist: { 2: 2, 3: 2 } };
        }
    }

    // Chapter 2: Max 3 letters, Exactly 3 words (Progressive)
    if (chapter === 2) {
        if (stage <= 5) {
            // Stages 1-5: 3 words (1x 2-letters, 2x 3-letters)
            return { minWords: 3, maxWords: 3, maxLength: 3, dist: { 2: 1, 3: 2 } };
        } else {
            // Stages 6-10: 3 words (3x 3-letters) - Harder
            return { minWords: 3, maxWords: 3, maxLength: 3, dist: { 3: 3 } };
        }
    }

    // General scaling for other chapters
    if (levelIndex <= 30) {
        return { minWords: 5, maxWords: 6, maxLength: 5, dist: { 3: 3, 4: 3 } };
    } else {
        return { minWords: 6, maxWords: 8, maxLength: 6, dist: null };
    }
}

// --- LEVEL GENERATOR ---
function startLevel(chapter, stage) {
    try {
        // Hide Level Select if open
        document.getElementById('wcLevelSelectModal').style.display = 'none';

        // Reset State
        wcState.chapter = chapter;
        wcState.stage = stage;
        wcState.foundWords = [];
        wcState.currentInput = "";
        wcState.isDragging = false;
        wcState.visitedNodes = [];
        wcState.bonusWords = [];
        if (wcState.timerInterval) clearInterval(wcState.timerInterval);

        const timerEl = document.getElementById('wcTimer');
        if (timerEl) {
            timerEl.style.display = 'none';
            timerEl.style.animation = 'none'; // Reset animation
        }

        // Update UI
        document.getElementById('wcLevelTitle').textContent = `Nivå ${chapter}-${stage}`;
        document.getElementById('wcLevelCompleteModal').style.display = 'none';

        // Reset Buttons
        const hintBtn = document.querySelector('.wc-hint-btn');
        if (hintBtn) hintBtn.style.display = 'flex';

        const nextBtn = document.getElementById('wcNextLevelBtn');
        if (nextBtn) nextBtn.style.display = 'none';

        updateCoinDisplay(); // Reset bonus count display

        // Clear Translation Display
        const transEl = document.getElementById('wcTranslationDisplay');
        if (transEl) {
            transEl.innerHTML = '';
            transEl.style.opacity = '0';
            transEl.onclick = null;
            transEl.style.cursor = 'default';
        }

        // Generate Data
        const levelIndex = (chapter - 1) * 10 + (stage - 1);

        // Safety check for root words
        let rootWord = "SKOLAN"; // Default fallback
        if (typeof WC_ROOT_WORDS !== 'undefined' && WC_ROOT_WORDS.length > 0) {
            rootWord = WC_ROOT_WORDS[levelIndex % WC_ROOT_WORDS.length];
        }

        const difficulty = getDifficulty(chapter, stage);

        wcState.currentLevelData = generateLevelData(rootWord, difficulty);

        if (!wcState.currentLevelData || !wcState.currentLevelData.words || wcState.currentLevelData.words.length === 0) {
            console.error("Failed to generate level data", wcState.currentLevelData);
            throw new Error("Kunde inte ladda nivådata / فشل تحميل بيانات المستوى");
        }

        // Theme logic disabled to restore original background color
        /*
        const gameModule = document.getElementById('word-game-module');
        gameModule.className = ''; // Reset
        if (chapter <= 3) {
            gameModule.classList.add('theme-nature');
        } else if (chapter <= 7) {
            gameModule.classList.add('theme-city');
        } else {
            gameModule.classList.add('theme-ice');
        }
        */

        // Shuffle letters (Fisher-Yates)
        for (let i = wcState.currentLevelData.letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wcState.currentLevelData.letters[i], wcState.currentLevelData.letters[j]] =
                [wcState.currentLevelData.letters[j], wcState.currentLevelData.letters[i]];
        }

        renderGrid();
        renderWheel();
    } catch (error) {
        console.error("Error starting level:", error);
        showToast(`Fel: ${error.message} / خطأ: ${error.message}`, "error");
    }
}

function generateLevelData(rootWord, difficulty) {
    // 1. Check for Predefined Level
    const levelKey = `${wcState.chapter}-${wcState.stage}`;
    if (WC_PREDEFINED_LEVELS[levelKey]) {
        console.log(`Loading predefined level: ${levelKey}`);
        return WC_PREDEFINED_LEVELS[levelKey];
    }

    // 2. Dynamic Generation using WC_DICTIONARY
    // Fallback if no predefined level
    let currentRoot = rootWord.toUpperCase();
    let rootMap = getCharMap(currentRoot);

    // Find valid subsets from WC_DICTIONARY
    let allValidSubsets = [];
    for (const item of WC_DICTIONARY) {
        const word = item.w.toUpperCase();
        // Filter by difficulty.maxLength immediately
        if (word.length >= 2 && word.length <= difficulty.maxLength && /^[A-ZÅÄÖ]+$/.test(word)) {
            if (isSubset(word, rootMap)) {
                allValidSubsets.push(word);
            }
        }
    }

    // Deduplicate
    allValidSubsets = [...new Set(allValidSubsets)];

    // If currentRoot is longer than allowed, pick a new root from subsets
    if (currentRoot.length > difficulty.maxLength) {
        // Find candidates with length == maxLength (or closest possible)
        const possibleRoots = allValidSubsets.filter(w => w.length === difficulty.maxLength);
        if (possibleRoots.length > 0) {
            // Pick a random one
            currentRoot = possibleRoots[Math.floor(Math.random() * possibleRoots.length)];
        } else {
            // Fallback: Pick longest available
            allValidSubsets.sort((a, b) => b.length - a.length);
            if (allValidSubsets.length > 0) {
                currentRoot = allValidSubsets[0];
            }
        }
        // Re-filter subsets to ensure they match the NEW root
        rootMap = getCharMap(currentRoot);
        allValidSubsets = allValidSubsets.filter(w => isSubset(w, rootMap));
    }

    // Sort by length
    allValidSubsets.sort((a, b) => b.length - a.length);

    // Use distribution logic if available, otherwise simple fill
    let selected = [];
    if (difficulty.dist) {
        // Always include the root word (it's the longest)
        if (!selected.includes(currentRoot)) selected.push(currentRoot);

        let pool = allValidSubsets.filter(w => w !== currentRoot);

        for (const [len, count] of Object.entries(difficulty.dist)) {
            const length = parseInt(len);
            let needed = count;
            if (currentRoot.length === length) needed--;

            if (needed > 0) {
                const matching = pool.filter(w => w.length === length);
                matching.sort(() => Math.random() - 0.5);
                for (let i = 0; i < needed && i < matching.length; i++) {
                    selected.push(matching[i]);
                    // Remove from pool? Not strictly necessary if we rely on unique check, but cleaner
                    pool = pool.filter(w => w !== matching[i]);
                }
            }
        }
    } else {
        // Simple selection
        for (const w of allValidSubsets) {
            if (selected.length >= difficulty.maxWords) break;
            selected.push(w);
        }
    }

    // Ensure we have enough words
    if (selected.length < difficulty.minWords) {
        // Fallback: just use what we have, or add the root word if missing
        if (!selected.includes(currentRoot)) selected.push(currentRoot);

        // Fill with remaining valid subsets if needed
        for (const w of allValidSubsets) {
            if (selected.length >= difficulty.minWords) break;
            if (!selected.includes(w)) selected.push(w);
        }
    }

    // Final safety check: Ensure root is in selected
    if (!selected.includes(currentRoot)) selected.push(currentRoot);

    return {
        words: selected,
        letters: currentRoot.split('').sort(() => Math.random() - 0.5)
    };
}

// Helper to count char frequency
function getCharMap(str) {
    const map = {};
    for (const char of str) {
        const upper = char.toLocaleUpperCase('sv-SE');
        map[upper] = (map[upper] || 0) + 1;
    }
    return map;
}

// Helper to check if word can be formed from letters
function isSubset(word, letterMap) {
    const wordMap = getCharMap(word);
    for (const char in wordMap) {
        if (!letterMap[char] || wordMap[char] > letterMap[char]) {
            return false;
        }
    }
    return true;
}

// --- RENDER GRID ---
function renderGrid() {
    const gridContainer = document.getElementById('wcGridContainer');
    gridContainer.innerHTML = '';

    wcState.currentLevelData.words.forEach(word => {
        const wordRow = document.createElement('div');
        wordRow.className = 'wc-word-row';
        wordRow.dataset.word = word;

        for (let i = 0; i < word.length; i++) {
            const letterBox = document.createElement('div');
            letterBox.className = 'wc-letter-box';
            letterBox.dataset.letter = word[i];
            wordRow.appendChild(letterBox);
        }
        gridContainer.appendChild(wordRow);
    });
}

// --- RENDER WHEEL ---
function renderWheel() {
    const wheelContainer = document.getElementById('wcWheel');
    wheelContainer.innerHTML = '';

    const letters = wcState.currentLevelData.letters;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    const angleStep = (2 * Math.PI) / letters.length;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "wc-connector-lines");
    svg.setAttribute("width", "200");
    svg.setAttribute("height", "200");
    svg.style.pointerEvents = "none"; // Ensure clicks pass through

    // Add dynamic line (rubber band)
    const dynamicLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dynamicLine.setAttribute("id", "wc-dynamic-line");
    dynamicLine.setAttribute("stroke", "#fbbf24"); // Gold
    dynamicLine.setAttribute("stroke-width", "10");
    dynamicLine.setAttribute("stroke-linecap", "round");
    dynamicLine.setAttribute("opacity", "0"); // Hidden initially
    svg.appendChild(dynamicLine);

    wheelContainer.appendChild(svg);
    wcState.svgLine = svg;

    letters.forEach((char, index) => {
        const angle = index * angleStep - (Math.PI / 2);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const btn = document.createElement('div');
        btn.className = 'wc-wheel-letter';
        btn.textContent = char;
        btn.style.left = `${x - 25}px`;
        btn.style.top = `${y - 25}px`;
        btn.dataset.index = index;
        btn.dataset.char = char;
        btn.dataset.x = x;
        btn.dataset.y = y;

        btn.addEventListener('mousedown', handleInputStart);
        btn.addEventListener('touchstart', handleInputStart, { passive: false });

        wheelContainer.appendChild(btn);
    });
    wheelContainer.addEventListener('mousemove', handleInputMove);
    wheelContainer.addEventListener('touchmove', handleInputMove, { passive: false });
    document.addEventListener('mouseup', handleInputEnd);
    document.addEventListener('touchend', handleInputEnd);
}

// --- INPUT HANDLING ---
function handleInputStart(e) {
    e.preventDefault();
    wcState.isDragging = true;
    wcState.currentInput = "";
    wcState.visitedNodes = [];

    // Clear static lines (keep dynamic line)
    const dynamicLine = wcState.svgLine.querySelector('#wc-dynamic-line');
    wcState.svgLine.innerHTML = '';
    if (dynamicLine) wcState.svgLine.appendChild(dynamicLine);

    document.querySelectorAll('.wc-wheel-letter').forEach(el => el.classList.remove('active'));

    const target = e.target.closest('.wc-wheel-letter');
    if (target) selectNode(target);
}

function handleInputMove(e) {
    if (!wcState.isDragging) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const el = document.elementFromPoint(touch.clientX, touch.clientY);

    // Update Dynamic Line
    if (wcState.visitedNodes.length > 0) {
        const lastIndex = wcState.visitedNodes[wcState.visitedNodes.length - 1];
        const lastEl = document.getElementById('wcWheel').querySelector(`.wc-wheel-letter[data-index="${lastIndex}"]`);

        if (lastEl) {
            const rect = document.getElementById('wcWheel').getBoundingClientRect();
            // Calculate relative coordinates for SVG
            // SVG is 200x200, centered in container.
            // We need to map clientX/Y to SVG space.
            // Assuming SVG fills the container (200x200).

            // Scale factor if responsive?
            const scaleX = 200 / rect.width;
            const scaleY = 200 / rect.height;

            const mouseX = (touch.clientX - rect.left) * scaleX;
            const mouseY = (touch.clientY - rect.top) * scaleY;

            const startX = parseFloat(lastEl.dataset.x);
            const startY = parseFloat(lastEl.dataset.y);

            const dynLine = document.getElementById('wc-dynamic-line');
            if (dynLine) {
                dynLine.setAttribute("x1", startX);
                dynLine.setAttribute("y1", startY);
                dynLine.setAttribute("x2", mouseX);
                dynLine.setAttribute("y2", mouseY);
                dynLine.setAttribute("opacity", "1");
            }
        }
    }

    if (el && el.classList.contains('wc-wheel-letter')) {
        const index = parseInt(el.dataset.index);
        if (!wcState.visitedNodes.includes(index)) {
            selectNode(el);
        }
    }
}

function handleInputEnd(e) {
    if (!wcState.isDragging) return;
    wcState.isDragging = false;

    // Hide dynamic line
    const dynLine = document.getElementById('wc-dynamic-line');
    if (dynLine) dynLine.setAttribute("opacity", "0");

    validateWord();
    setTimeout(() => {
        document.querySelectorAll('.wc-wheel-letter').forEach(el => el.classList.remove('active'));

        // Clear static lines
        const dynamicLine = wcState.svgLine.querySelector('#wc-dynamic-line');
        wcState.svgLine.innerHTML = '';
        if (dynamicLine) wcState.svgLine.appendChild(dynamicLine);

        document.getElementById('wcPreviewText').textContent = "";
    }, 300);
}

function selectNode(el) {
    const index = parseInt(el.dataset.index);
    const char = el.dataset.char;
    wcState.visitedNodes.push(index);
    wcState.currentInput += char;
    el.classList.add('active');
    document.getElementById('wcPreviewText').textContent = wcState.currentInput;

    if (wcState.visitedNodes.length > 1) {
        const prevIndex = wcState.visitedNodes[wcState.visitedNodes.length - 2];
        const prevEl = document.getElementById('wcWheel').querySelector(`.wc-wheel-letter[data-index="${prevIndex}"]`);
        if (prevEl) drawLine(prevEl, el);
    }
}

function drawLine(startEl, endEl) {
    const x1 = parseFloat(startEl.dataset.x);
    const y1 = parseFloat(startEl.dataset.y);
    const x2 = parseFloat(endEl.dataset.x);
    const y2 = parseFloat(endEl.dataset.y);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#fbbf24"); // Gold color
    line.setAttribute("stroke-width", "12");
    line.setAttribute("stroke-linecap", "round");

    // Insert before dynamic line so dynamic line stays on top
    const dynLine = document.getElementById('wc-dynamic-line');
    if (dynLine) {
        wcState.svgLine.insertBefore(line, dynLine);
    } else {
        wcState.svgLine.appendChild(line);
    }
}

// --- GAME LOGIC ---
function validateWord() {
    const word = wcState.currentInput;
    if (wcState.currentLevelData.words.includes(word)) {
        if (!wcState.foundWords.includes(word)) {
            wcState.foundWords.push(word);
            revealWord(word);

            // Reward & Translation
            wcState.coins += 5;
            saveProgress();

            // Find translation in WC_DICTIONARY
            const entry = WC_DICTIONARY.find(item => item.w.toLocaleUpperCase('sv-SE') === word.trim().toLocaleUpperCase('sv-SE'));

            if (entry) {
                const translation = entry.t;
                const example = entry.s || generateFallbackSentence(word, null);

                const transEl = document.getElementById('wcTranslationDisplay');
                if (transEl) {
                    transEl.innerHTML = `
                        <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${translation}</div>
                        <div class="wc-example-text">"${example}"</div>
                    `;

                    transEl.style.opacity = '1';
                    transEl.classList.add('pop-in');
                    transEl.onclick = () => speakWord(word);
                    transEl.style.cursor = 'pointer';
                    setTimeout(() => transEl.classList.remove('pop-in'), 300);

                    // Speak automatically
                    speakWord(word);
                }
            } else {
                console.warn(`Translation not found in WC_DICTIONARY for: ${word}`);
                // Fallback to generic display if not in dictionary
                const transEl = document.getElementById('wcTranslationDisplay');
                if (transEl) {
                    transEl.innerHTML = `
                        <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${word}</div>
                        <div class="wc-example-text">"${generateFallbackSentence(word, null)}"</div>
                    `;
                    transEl.style.opacity = '1';
                }
            }

            checkWin();
        } else {
            showToast("Redan hittat! / وجدتها مسبقاً", "default");
        }
    } else {
        // Check for Bonus Word
        // Must be in dictionary and valid subset
        const entry = WC_DICTIONARY.find(item => item.w.toUpperCase() === word.toUpperCase());
        if (entry && !wcState.bonusWords.includes(word)) {
            // Verify it is a subset of current letters (extra safety)
            const rootMap = getCharMap(wcState.currentLevelData.letters.join(''));
            if (isSubset(word, rootMap)) {
                wcState.bonusWords.push(word);
                wcState.coins += 5;
                saveProgress();
                showToast(`Bonusord! +5 🪙 / كلمة إضافية!`, "success");
                // triggerConfetti(); // Removed per user request
            }
        } else {
            // Wrong Word Penalty
            if (wcState.coins > 0) {
                wcState.coins--;
                saveProgress();
                const coinEl = document.getElementById('wcCoinCount');
                if (coinEl) coinEl.textContent = wcState.coins;
            }

            // Show error in Translation Display
            const transEl = document.getElementById('wcTranslationDisplay');
            if (transEl) {
                transEl.innerHTML = `
                    <div style="color: #ef4444; font-weight: 700; font-size: 1.2rem;">
                        Fel ord! -1 🪙
                    </div>
                    <div style="color: #ef4444; font-size: 1rem;">
                        كلمة خاطئة!
                    </div>
                `;
                transEl.style.opacity = '1';
                transEl.classList.add('shake'); // Add shake animation if available

                // Clear after 1.5 seconds
                setTimeout(() => {
                    transEl.style.opacity = '0';
                    transEl.classList.remove('shake');
                }, 1500);
            }
        }
    }
}

// Helper to generate simple sentences if missing
function generateFallbackSentence(word, type) {
    if (!type) return `Ordet är "${word}".`;

    const t = type.toLowerCase();
    if (t.includes('subst')) return `Det här är en ${word}.`; // Noun
    if (t.includes('verb')) return `Jag gillar att ${word}.`; // Verb
    if (t.includes('adj')) return `Det är ${word}.`; // Adjective
    if (t.includes('adv')) return `Han springer ${word}.`; // Adverb
    if (t.includes('pron')) return `${word} är här.`; // Pronoun

    return `Ordet är "${word}".`; // Default
}

function revealWord(word) {
    const rows = document.querySelectorAll('.wc-word-row');
    rows.forEach(row => {
        if (row.dataset.word === word) {
            row.classList.add('solved');
            const letters = row.querySelectorAll('.wc-letter-box');
            letters.forEach((box, i) => {
                box.textContent = word[i];
                box.classList.add('reveal');
            });
        }
    });
}

function checkWin() {
    if (wcState.foundWords.length === wcState.currentLevelData.words.length) {
        // Level Complete!
        // triggerConfetti(); // Removed per user request

        // Hide Hint Button
        const hintBtn = document.querySelector('.wc-hint-btn');
        if (hintBtn) hintBtn.style.display = 'none';

        // Show Next Level Button (Inline)
        const nextBtn = document.getElementById('wcNextLevelBtn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
            // Re-trigger animation
            nextBtn.style.animation = 'none';
            nextBtn.offsetHeight; /* trigger reflow */
            nextBtn.style.animation = 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }

        // Start Timer
        const timerEl = document.getElementById('wcTimer');
        const timerText = document.getElementById('wcTimerText');

        if (timerEl) {
            timerEl.style.display = 'flex'; // Changed to flex for centering
            // Reset animation
            timerEl.style.animation = 'none';
            timerEl.offsetHeight;
            // We use the pseudo-element for the bar, so we don't animate the container itself

            // Reset pseudo-element animation by removing/adding class or just relying on DOM reflow?
            // The CSS animation is on ::after. To restart it, we need to re-insert the element or toggle a class.
            // Simplest way: clone and replace
            const newTimerEl = timerEl.cloneNode(true);
            timerEl.parentNode.replaceChild(newTimerEl, timerEl);

            // Re-select
            const finalTimerEl = document.getElementById('wcTimer');
            const finalTimerText = document.getElementById('wcTimerText');

            let timeLeft = 5;
            if (finalTimerText) finalTimerText.textContent = `Nästa nivå om ${timeLeft}s...`;

            wcState.timerInterval = setInterval(() => {
                timeLeft--;
                if (finalTimerText) finalTimerText.textContent = `Nästa nivå om ${timeLeft}s...`;

                if (timeLeft <= 0) {
                    clearInterval(wcState.timerInterval);
                    nextLevel();
                }
            }, 1000);
        }

        wcState.coins += 20;
        saveProgress();
    }
}

// --- HINT SYSTEM ---
function useHint() {
    if (wcState.coins < WC_CONFIG.hintCost) {
        showToast("Inte tillräckligt med mynt! / لا يوجد عملات كافية", "error");
        return;
    }

    let targetBox = null;
    const rows = document.querySelectorAll('.wc-word-row');

    for (const row of rows) {
        if (!row.classList.contains('solved')) {
            const boxes = row.querySelectorAll('.wc-letter-box');
            for (const box of boxes) {
                if (!box.classList.contains('reveal')) {
                    targetBox = box;
                    break;
                }
            }
        }
        if (targetBox) break;
    }

    if (targetBox) {
        wcState.coins -= WC_CONFIG.hintCost;
        saveProgress();

        targetBox.textContent = targetBox.dataset.letter;
        targetBox.classList.add('reveal');
        targetBox.style.color = '#e11d48';

        const row = targetBox.parentElement;
        const allRevealed = Array.from(row.querySelectorAll('.wc-letter-box')).every(b => b.classList.contains('reveal'));
        if (allRevealed) {
            row.classList.add('solved');
            const word = row.dataset.word;
            if (!wcState.foundWords.includes(word)) {
                wcState.foundWords.push(word);
                checkWin();
            }
        }
    }
}

// --- NAVIGATION & MENUS ---
function goBackToMenu() {
    document.getElementById('word-game-module').style.display = 'none';
    showGameMenu();
}

function nextLevel() {
    if (wcState.timerInterval) clearInterval(wcState.timerInterval);
    wcState.stage++;
    if (wcState.stage > WC_CONFIG.stagesPerChapter) {
        wcState.stage = 1;
        wcState.chapter++;
    }
    saveProgress();
    startLevel(wcState.chapter, wcState.stage);
}

// --- LEVEL SELECT UI ---
function openLevelSelect() {
    const modal = document.getElementById('wcLevelSelectModal');
    const grid = document.getElementById('wcLevelGrid');
    grid.innerHTML = '';

    modal.style.display = 'flex';

    // Render 100 levels
    for (let c = 1; c <= WC_CONFIG.totalChapters; c++) {
        // Chapter Header
        const header = document.createElement('div');
        header.className = 'wc-chapter-header';
        header.textContent = `Kapitel ${c} `;
        grid.appendChild(header);

        const chapterGrid = document.createElement('div');
        chapterGrid.className = 'wc-chapter-grid';

        for (let s = 1; s <= WC_CONFIG.stagesPerChapter; s++) {
            const btn = document.createElement('button');
            btn.className = 'wc-level-btn';
            btn.textContent = `${c} -${s} `;

            // Lock Logic
            // Unlock if:
            // 1. Chapter is less than maxChapter
            // 2. Chapter IS maxChapter AND Stage is <= maxStage
            // STRICT CHAPTER LOCKING: Can't see next chapter until current is done (implied by maxChapter)

            const isUnlocked = (c < wcState.maxChapter) || (c === wcState.maxChapter && s <= wcState.maxStage);

            // Also, only show current chapter or unlocked chapters? 
            // User asked: "Open first chapter, when finished open second".
            // So we should visually lock/dim future chapters.
            // The current logic handles unlocking.

            if (isUnlocked) {
                btn.classList.add('unlocked');
                btn.onclick = () => startLevel(c, s);
            } else {
                btn.classList.add('locked');
                btn.innerHTML += ' 🔒';
                btn.disabled = true;
            }

            chapterGrid.appendChild(btn);
        }
        grid.appendChild(chapterGrid);
    }

    // Add Reset Button at the bottom
    const resetBtn = document.createElement('button');
    resetBtn.className = 'wc-btn-secondary';
    resetBtn.style.marginTop = '2rem';
    resetBtn.style.width = '100%';
    resetBtn.style.color = '#ef4444';
    resetBtn.style.borderColor = '#ef4444';
    resetBtn.textContent = 'Återställ Framsteg / إعادة تعيين التقدم ⚠️';
    resetBtn.onclick = resetWordConnectProgress;
    grid.appendChild(resetBtn);
}

function closeLevelSelect() {
    document.getElementById('wcLevelSelectModal').style.display = 'none';
}

function resetWordConnectProgress() {
    if (confirm("Är du säker på att du vill återställa dina framsteg? / هل أنت متأكد أنك تريد إعادة تعيين تقدمك؟")) {
        localStorage.removeItem('wcProgress');
        wcState.chapter = 1;
        wcState.stage = 1;
        wcState.maxChapter = 1;
        wcState.maxStage = 1;
        wcState.coins = 300;
        wcState.foundWords = [];
        wcState.bonusWords = [];
        saveProgress();
        startLevel(1, 1);
        closeLevelSelect();
        showToast("Framsteg återställda / تم إعادة تعيين التقدم", "success");
    }
}

// --- AUDIO ---
function speakWord(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'sv-SE'; // Swedish
        utterance.rate = 0.9; // Slightly slower
        window.speechSynthesis.speak(utterance);
    }
}
