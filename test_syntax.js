// ========================================
//  SWEDISH WORD CONNECT GAME MODULE
// ========================================
alert("Word Connect Loaded");

// --- CONFIG & STATE ---
const WC_CONFIG = {
    totalChapters: 100, // Infinite
    stagesPerChapter: 10,
    hintCost: 5,
    version: "2.0" // Bump version to force reset
};

const BONUS_REWARD = 5; // New Bonus Reward

// --- DATA STRUCTURE ---
// SWEDISH_DATA is now loaded from wordConnectData.js

// Seed words for 100 levels (10 chapters x 10 stages)
// WC_ROOT_WORDS is loaded from wordConnectData.js - DO NOT REDEFINE HERE

var wcState = {
    chapter: 1,
    stage: 1,
    maxChapter: 1, // Highest reached
    maxStage: 1,   // Highest reached
    // Bomb Mode State
    bombActive: false,
    bombIndex: -1,
    bombTimer: 0,
    bombInterval: null,

    // Proverb State
    currentProverbId: 1,
    proverbProgress: 0, // Words unlocked

    // Level Data
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
    timerInterval: null,
    // --- NEW STATE ---
    comboCount: 0,
    lastWordTime: 0,
    generatedLevels: {}, // Cache for session
    generatedLevels: {}, // Cache for session
    usedRootWords: [], // Track used words to prevent repetition
    learnedWords: {} // { "food": ["MAT", "OST"], "nature": ["SOL"] }
};

// Optimized Dictionary Index for fast generation
let WC_OPTIMIZED_DICT = {
    byLength: {}, // { 3: ["ORD", ...], 4: ["BORD", ...] }
    allWords: []  // Set of all valid words for quick lookup
};

let wcInitRetries = 0;

// --- INITIALIZATION ---

function initWordConnect() {
    console.log("Initializing Word Connect Module...");

    // Safeguard: Check if wordConnectData.js is loaded
    if (typeof WC_PREDEFINED_LEVELS === 'undefined' || typeof WC_DICTIONARY === 'undefined' || typeof WC_ROOT_WORDS === 'undefined' || typeof SWEDISH_DATA === 'undefined') {
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

    // Build Optimized Index
    buildOptimizedDictionary();

    loadProgress();
    startLevel(wcState.chapter, wcState.stage);
}

function buildOptimizedDictionary() {
    console.log("Building Optimized Dictionary...");
    WC_OPTIMIZED_DICT.byLength = {};
    WC_OPTIMIZED_DICT.allWords = [];

    WC_DICTIONARY.forEach(entry => {
        const word = entry.w.toUpperCase();
        const len = word.length;

        if (!WC_OPTIMIZED_DICT.byLength[len]) WC_OPTIMIZED_DICT.byLength[len] = [];
        WC_OPTIMIZED_DICT.byLength[len].push(word);
        WC_OPTIMIZED_DICT.allWords.push(word);
    });
    console.log("Dictionary Indexed.", WC_OPTIMIZED_DICT);
}

function loadProgress() {
    const saved = localStorage.getItem('wcProgress');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Version Check
        if (parsed.version !== WC_CONFIG.version) {
            console.log("New version detected. Resetting progress.");
            localStorage.removeItem('wcProgress');
            wcState.chapter = 1;
            wcState.stage = 1;
            wcState.maxChapter = 1;
            wcState.maxStage = 1;
            wcState.coins = 300;
        } else {
            wcState.chapter = parsed.chapter || 1;
            wcState.stage = parsed.stage || 1;
            wcState.maxChapter = parsed.maxChapter || 1;
            wcState.maxStage = parsed.maxStage || 1;
            wcState.coins = parsed.coins || 300;
            wcState.usedRootWords = parsed.usedRootWords || [];
            // Load Proverb Progress
            wcState.currentProverbId = parsed.currentProverbId || 1;
            wcState.proverbProgress = parsed.proverbProgress || 0;
            wcState.learnedWords = parsed.learnedWords || {};
        }
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
        streak: wcState.streak,
        lastLogin: wcState.lastLogin,
        version: WC_CONFIG.version, // Save version
        version: WC_CONFIG.version, // Save version
        usedRootWords: wcState.usedRootWords,
        learnedWords: wcState.learnedWords
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
        wcState.comboCount = 0; // Reset combo
        wcState.lastWordTime = 0; // Reset timer
        if (wcState.timerInterval) clearInterval(wcState.timerInterval);

        const timerEl = document.getElementById('wcTimer');
        if (timerEl) {
            timerEl.style.display = 'none';
            timerEl.style.animation = 'none'; // Reset animation
        }

        // Update UI
        // Update UI
        document.getElementById('wcLevelTitle').textContent = `Nivå ${chapter}-${stage}`;
        document.getElementById('wcLevelCompleteModal').style.display = 'none';

        // Apply Theme
        if (typeof getThemeForChapter === 'function') {
            const theme = getThemeForChapter(chapter);
            if (theme) {
                const container = document.getElementById('word-game-module'); // Or specific container
                // We might want to style the header or background
                // For now, let's set a CSS variable or background on the game area
                const gameArea = document.querySelector('.wc-game-container');
                if (gameArea) {
                    // gameArea.style.background = theme.background; // Optional: Full background
                    // Or just a subtle indicator
                }

                // Update Title with Icon
                document.getElementById('wcLevelTitle').innerHTML = `${theme.icon} Nivå ${chapter}-${stage} <span style="font-size:0.8em; opacity:0.8">(${theme.name.split('/')[0].trim()})</span>`;

                // Set accent color
                document.documentElement.style.setProperty('--wc-accent', theme.accent);
            }
        }

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

        // Use new progression logic
        wcState.currentLevelData = getNextLevel(levelIndex + 1); // Pass 1-based level index

        if (!wcState.currentLevelData || !wcState.currentLevelData.words || wcState.currentLevelData.words.length === 0) {
            console.error("Failed to generate level data", wcState.currentLevelData);
            throw new Error("Kunde inte ladda nivådata / فشل تحميل بيانات المستوى");
        }

        // Shuffle letters (Fisher-Yates) - ALREADY DONE IN getNextLevel but good to ensure
        // getNextLevel returns { words: [...], letters: [...] }

        renderGrid();
        // Reset Bomb Mode
        wcState.bombActive = false;
        if (wcState.bombInterval) clearInterval(wcState.bombInterval);

        // Initialize Bomb Mode (Chance based on level, e.g., > Level 5)
        if (wcState.currentLevel > 5 && Math.random() > 0.5) {
            initBombMode(levelData.letters.length);
        }

        renderWheel();
    } catch (error) {
        console.error("Error starting level:", error);
        showToast(`Fel: ${error.message} / خطأ: ${error.message}`, "error");
    }
}



// --- DYNAMIC GENERATION ENGINE ---
function generateDynamicLevel(levelIndex) {
    // 1. Determine Difficulty Parameters
    // Levels 1-5: Exactly 2 words
    // Levels 6-20: Exactly 3 words
    // Levels 21-50: Exactly 4 words
    // Levels 51+: Exactly 5 words

    let targetLength = 3;
    let exactWordCount = 2;

    if (levelIndex <= 5) { targetLength = 3; exactWordCount = 2; }
    else if (levelIndex <= 20) { targetLength = Math.random() > 0.5 ? 4 : 3; exactWordCount = 3; }
    else if (levelIndex <= 50) { targetLength = Math.random() > 0.5 ? 5 : 4; exactWordCount = 4; }
    else { targetLength = Math.min(7, 4 + Math.floor(Math.random() * 3)); exactWordCount = 4; }

    // 2. Pick a Root Word
    // Try up to 20 times to find a good root
    for (let attempt = 0; attempt < 20; attempt++) {
        const candidates = WC_OPTIMIZED_DICT.byLength[targetLength];
        if (!candidates || candidates.length === 0) {
            targetLength--; // Fallback to smaller words if none found
            if (targetLength < 3) targetLength = 3;
            continue;
        }

        // Filter out used words
        let availableCandidates = candidates.filter(w => !wcState.usedRootWords.includes(w));

        // If all used, reset used list for this length (or global reset if preferred)
        // For infinite play, we must eventually reuse.
        if (availableCandidates.length === 0) {
            console.log("All words of length " + targetLength + " used. Recycling.");
            // Optional: Remove these specific words from usedRootWords to allow them again
            // or just use candidates as is (allow reuse)
            availableCandidates = candidates;
        }

        const rootWord = availableCandidates[Math.floor(Math.random() * availableCandidates.length)];
        const rootMap = getCharMap(rootWord);

        // 3. Find Valid Subsets
        const validSubsets = [];
        const levelDictionary = {};

        // Optimization: Only check words <= root length
        for (let len = 2; len <= targetLength; len++) {
            const wordsOfLength = WC_OPTIMIZED_DICT.byLength[len];
            if (wordsOfLength) {
                for (const w of wordsOfLength) {
                    if (isSubset(w, rootMap)) {
                        validSubsets.push(w);
                        // Add to level dictionary
                        const entry = WC_DICTIONARY.find(item => item.w.toUpperCase() === w);
                        if (entry) levelDictionary[w] = { ar: entry.t, sv: entry.s || "", st: entry.st || "" };
                    }
                }
            }
        }

        // 4. Validate Level Quality
        if (validSubsets.length >= exactWordCount) {
            // Success!
            // Sort by length descending
            validSubsets.sort((a, b) => b.length - a.length);

            // Select EXACTLY 'exactWordCount' targets
            let targets = [];

            // Always try to include the root word if it fits the count
            // (It usually makes the puzzle feel "complete")
            if (validSubsets.includes(rootWord)) {
                targets.push(rootWord);
            }

            // Fill the rest with other valid subsets
            for (const word of validSubsets) {
                if (targets.length >= exactWordCount) break;
                if (!targets.includes(word)) {
                    targets.push(word);
                }
            }

            // Re-sort for display (optional, but usually length based)
            targets.sort((a, b) => a.length - b.length);

            // Add to used list
            if (!wcState.usedRootWords.includes(rootWord)) {
                wcState.usedRootWords.push(rootWord);
            }
            saveProgress(); // Save used list

            return {
                id: `gen_${levelIndex}_${Date.now()}`,
                tier: Math.floor(levelIndex / 10) + 1,
                main_chars: rootWord,
                targets: targets,
                dictionary: levelDictionary
            };
        }
    }

    // Fallback if dynamic fails (should rarely happen with good dictionary)
    console.warn("Dynamic generation failed, using fallback.");
    return SWEDISH_DATA[0];
}

// Override getNextLevel to use Dynamic Engine
function getNextLevel(currentLevel) {
    // 1. Check for Predefined Level first
    // Calculate Chapter/Stage from linear level index (1-based)
    const chapter = Math.ceil(currentLevel / 10);
    const stage = (currentLevel - 1) % 10 + 1;
    const levelKey = `${chapter}-${stage}`;

    if (WC_PREDEFINED_LEVELS[levelKey]) {
        console.log(`Loading predefined level: ${levelKey}`);
        const level = WC_PREDEFINED_LEVELS[levelKey];
        // Limit to max 4 words per user request
        const limitedWords = level.words.slice(0, 4);

        // Use robust shuffle for predefined levels too
        // Predefined levels usually have 'letters' array, but we should ensure it's shuffled well if it matches a word
        let letters = level.letters;
        const mainWord = level.words[0]; // Usually the first word is the main one
        if (mainWord && letters.join('') === mainWord) {
            letters = shuffleLetters(mainWord);
        } else {
            // Just shuffle existing letters array to be safe
            letters = shuffleLetters(letters.join(''));
        }

        return {
            ...level,
            words: limitedWords,
            letters: letters
        };
    }

    // 2. Fallback to Dynamic Generation
    const levelData = generateDynamicLevel(currentLevel);
    wcState.currentLevelDictionary = levelData.dictionary;

    return {
        words: levelData.targets,
        letters: shuffleLetters(levelData.main_chars)
    };
}

// Helper to shuffle letters and avoid original word
function shuffleLetters(word) {
    let arr = word.split('');
    // If word is short (<=3), simple shuffle is fine
    if (arr.length <= 3) {
        return arr.sort(() => Math.random() - 0.5);
    }

    // For longer words, ensure it doesn't match original
    let shuffled;
    let attempts = 0;
    do {
        shuffled = [...arr].sort(() => Math.random() - 0.5);
        attempts++;
    } while (shuffled.join('') === word && attempts < 10);

    return shuffled;
}

// Kept for compatibility if needed, but getNextLevel replaces it
function generateLevelData(rootWord, difficulty) {
    // ... (Legacy code, can be kept or removed. Keeping for safety if we fall back)
    return {
        words: [rootWord],
        letters: rootWord.split('')
    };

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

        // Bomb Overlay
        if (wcState.bombActive && index === wcState.bombIndex) {
            const bombOverlay = document.createElement('div');
            bombOverlay.className = 'wc-bomb-overlay';
            bombOverlay.innerHTML = '<span class="wc-bomb-icon">💣</span>';

            const timerEl = document.createElement('div');
            timerEl.className = 'wc-bomb-timer';
            timerEl.id = 'wcBombTimer';
            timerEl.textContent = wcState.bombTimer + 's';

            bombOverlay.appendChild(timerEl);
            btn.appendChild(bombOverlay);
        }

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
function showRewardMessage(text, type = 'default') {
    // Message display removed per user request
    console.log(`Reward Message: ${text} (${type})`);
}

function validateWord() {
    const word = wcState.currentInput;
    if (wcState.currentLevelData.words.includes(word)) {
        if (!wcState.foundWords.includes(word)) {
            wcState.foundWords.push(word);
            revealWord(word);

            // Reward & Translation
            let reward = 5;

            // COMBO SYSTEM
            const now = Date.now();
            if (now - wcState.lastWordTime < 2500) { // 2.5 seconds window
                wcState.comboCount++;
                reward += (wcState.comboCount * 2); // Bonus: +2, +4, +6...
                showRewardMessage(`COMBO x${wcState.comboCount + 1}! +${reward} 🪙`, "combo");
                // triggerConfetti(); // Removed per user request
            } else {
                wcState.comboCount = 0;
                // Simple reward message for normal word
                showRewardMessage(`+${reward} 🪙`, "default");
            }
            wcState.lastWordTime = now;

            wcState.coins += reward;
            saveProgress();

            // Find translation in Level Dictionary
            const wordUpper = word.toUpperCase();
            let entry = wcState.currentLevelDictionary ? wcState.currentLevelDictionary[wordUpper] : null;

            // Fallback lookup
            if (!entry && typeof WC_DICTIONARY !== 'undefined') {
                const globalEntry = WC_DICTIONARY.find(item => item.w.toUpperCase() === wordUpper);
                if (globalEntry) {
                    entry = { ar: globalEntry.t, sv: globalEntry.s || "", st: globalEntry.st || "" };
                }
            }

            // Update Translation Display (Bottom)
            const transEl = document.getElementById('wcTranslationDisplay');
            if (transEl) {
                if (entry) {
                    transEl.innerHTML = `
                        <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${entry.ar}</div>
                        <div class="wc-example-text" style="font-style: italic; color: #fbbf24; margin-bottom: 0.2rem; cursor: pointer; text-decoration: underline;" onclick="event.stopPropagation(); speakWord('${entry.sv.replace(/'/g, "\\'")}')">"${entry.sv}" 🔊</div>
                        ${entry.st ? `<div class="wc-example-translation" style="font-size: 0.9rem; color: #aaa;">(${entry.st})</div>` : ''}
                    `;

                    // Speak automatically
                    if (typeof speakWord === 'function') speakWord(word);
                } else {
                    const fallbackSentence = generateFallbackSentence(word, null);
                    transEl.innerHTML = `
                        <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${word}</div>
                        <div class="wc-example-text" style="cursor: pointer; text-decoration: underline;" onclick="event.stopPropagation(); speakWord('${fallbackSentence.replace(/'/g, "\\'")}')">"${fallbackSentence}" 🔊</div>
                    `;
                }

                transEl.style.opacity = '1';
                transEl.classList.add('pop-in');
                transEl.onclick = () => speakWord(word);
                transEl.style.cursor = 'pointer';
                setTimeout(() => transEl.classList.remove('pop-in'), 300);
            }

            triggerWheelGlow('correct'); // Green Neon

            // Check Bomb Defusal
            if (wcState.bombActive) {
                // Check if used letters include the bomb index
                const usedIndices = wcState.visitedNodes;
                if (usedIndices.includes(wcState.bombIndex)) {
                    defuseBomb();
                }
            }

            checkWin();
        } else {
            // Already found
            showRewardMessage("Redan hittat! / وجدتها مسبقاً", "default");
            triggerWheelGlow('bonus'); // Yellow (reuse for duplicate/info)
        }
    } else {
        // Not in level words - Check for BONUS word
        const wordUpper = word.toUpperCase();

        // Check if valid word in global dictionary
        const globalEntry = typeof WC_DICTIONARY !== 'undefined' ? WC_DICTIONARY.find(item => item.w.toUpperCase() === wordUpper) : null;
        const isValidWord = !!globalEntry;

        if (isValidWord) {
            if (!wcState.bonusWords.includes(wordUpper)) {
                wcState.bonusWords.push(wordUpper);
                wcState.coins += 1; // Bonus coin
                saveProgress();

                triggerWheelGlow('bonus'); // Yellow Neon

                // Find definition for bonus word
                let msg = `Bonusord! +1 🪙`;

                if (globalEntry) {
                    // Show sentence if available
                    const sentence = globalEntry.s || "";
                    const trans = globalEntry.t || "";
                    if (sentence) {
                        // Update Translation Display for Bonus
                        const transEl = document.getElementById('wcTranslationDisplay');
                        if (transEl) {
                            transEl.innerHTML = `
                                <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${wordUpper}</div>
                                <div style="font-size: 1.2rem; font-weight: 700;">${trans}</div>
                                <div class="wc-example-text" style="font-style: italic; color: #fbbf24;">"${sentence}"</div>
                            `;
                            transEl.style.opacity = '1';
                            transEl.classList.add('pop-in');
                            setTimeout(() => transEl.classList.remove('pop-in'), 300);
                        }
                    }
                    showRewardMessage(msg, "combo"); // Use combo style for visibility
                } else {
                    showRewardMessage(msg, "default");
                }
                // triggerConfetti(); // Removed per user request
            } else {
                showRewardMessage("Redan hittat bonusord! / كلمة إضافية مكررة", "default");
                triggerWheelGlow('bonus');
            }
        } else {
            // Invalid word
            // showToast("Inte ett giltigt ord / ليست كلمة صحيحة", "error"); // Removed per user request
            triggerWheelGlow('error'); // Red Neon

            // Wrong Word Penalty
            if (wcState.coins > 0) {
                wcState.coins--;
                saveProgress();
                const coinEl = document.getElementById('wcCoinCount');
                if (coinEl) coinEl.textContent = wcState.coins;
            }
        }
    }
}

// --- VISUAL EFFECTS ---
function triggerWheelGlow(type) {
    const wheel = document.getElementById('wcWheel');
    if (!wheel) return;

    // Remove existing classes to reset animation
    wheel.classList.remove('correct', 'bonus', 'error');

    // Force reflow to restart animation if same class is re-added
    void wheel.offsetWidth;

    // Add specific class
    if (type === 'correct') wheel.classList.add('correct');
    if (type === 'bonus') wheel.classList.add('bonus');
    if (type === 'error') wheel.classList.add('error');

    // Remove class after animation (e.g., 1s)
    setTimeout(() => {
        wheel.classList.remove('correct', 'bonus', 'error');
    }, 1000);
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

        // Update Status Element
        const statusEl = document.getElementById('wcLevelStatus');
        if (statusEl) {
            // statusEl.textContent = "Nivå Klar! / اكتمل المستوى!"; // Removed per user request
            statusEl.classList.add('visible');
        }

        wcState.coins += 20;

        // Unlock Proverb Word
        unlockProverbWord();

        // Track Learned Words
        if (wcState.currentLevelData && wcState.currentLevelData.words) {
            const theme = getThemeForChapter(wcState.chapter);
            if (theme) {
                if (!wcState.learnedWords[theme.id]) wcState.learnedWords[theme.id] = [];
                wcState.currentLevelData.words.forEach(w => {
                    if (!wcState.learnedWords[theme.id].includes(w)) {
                        wcState.learnedWords[theme.id].push(w);
                    }
                });
            }
        }

        saveProgress();

        // Start Countdown
        startLevelCountdown();
    }
}

function startLevelCountdown() {
    const statusEl = document.getElementById('wcLevelStatus');
    if (!statusEl) {
        nextLevel(); // Fallback
        return;
    }

    let timeLeft = 5;
    const totalTime = 5;

    // Render Circular Countdown
    statusEl.innerHTML = `
        <div class="wc-countdown-container">
            <svg class="wc-countdown-svg" viewBox="0 0 60 60">
                <circle class="wc-countdown-circle-bg" cx="30" cy="30" r="28"></circle>
                <circle class="wc-countdown-circle-progress" cx="30" cy="30" r="28"></circle>
            </svg>
            <div class="wc-countdown-text">${timeLeft}</div>
        </div>
    `;
    statusEl.classList.add('visible');

    const progressCircle = statusEl.querySelector('.wc-countdown-circle-progress');
    const textEl = statusEl.querySelector('.wc-countdown-text');
    const circumference = 2 * Math.PI * 28; // ~176

    const interval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            if (textEl) textEl.textContent = timeLeft;

            // Update Progress Ring
            if (progressCircle) {
                const offset = circumference - (timeLeft / totalTime) * circumference;
                progressCircle.style.strokeDashoffset = offset;
            }
        } else {
            clearInterval(interval);
            statusEl.classList.remove('visible');
            setTimeout(() => {
                statusEl.innerHTML = '';
                nextLevel();
            }, 300); // Wait for fade out
        }
    }, 1000);
}

// --- HINT SYSTEM ---
function useHint() {
    // Animate button
    const btn = document.querySelector('.wc-hint-btn');
    if (btn) {
        btn.classList.remove('active-hint');
        void btn.offsetWidth; // Force reflow
        btn.classList.add('active-hint');
        setTimeout(() => btn.classList.remove('active-hint'), 600);
    }

    if (wcState.coins < 5) {
        showRewardMessage("Inte tillräckligt med mynt! / لا يوجد عملات كافية", "default");
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
        wcState.coins -= 5; // Fixed cost
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
    // 1. Try Online TTS (Google Translate)
    playOnlineTTS(text);
}

function playOnlineTTS(text) {
    const audio = new Audio();
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=sv&client=tw-ob&q=${encodeURIComponent(text)}`;

    audio.play().catch(err => {
        console.warn("Online TTS failed, falling back to local:", err);
        playLocalTTS(text);
    });
}

function playLocalTTS(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'sv-SE'; // Swedish
        utterance.rate = 0.9; // Slightly slower

        // Smart Voice Selection
        const voices = window.speechSynthesis.getVoices();
        let selectedVoice = null;

        // 1. Try to find a specific high-quality Swedish voice
        const swedishVoices = voices.filter(voice => voice.lang.includes('sv'));

        if (swedishVoices.length > 0) {
            // Priority: Google > Microsoft > Enhanced > Default
            selectedVoice = swedishVoices.find(v => v.name.includes('Google')) ||
                swedishVoices.find(v => v.name.includes('Microsoft')) ||
                swedishVoices.find(v => v.name.includes('Enhanced')) ||
                swedishVoices[0];
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            // Adjust rate based on voice type if needed
            if (selectedVoice.name.includes('Google')) utterance.rate = 0.85;
        }

        window.speechSynthesis.speak(utterance);
    }
}

// --- BOMB MODE LOGIC ---
function initBombMode(letterCount) {
    wcState.bombActive = true;
    wcState.bombIndex = Math.floor(Math.random() * letterCount);
    wcState.bombTimer = 15; // 15 seconds to defuse

    // Start Timer
    wcState.bombInterval = setInterval(updateBombTimer, 1000);
    console.log(`Bomb Mode Activated! Index: ${wcState.bombIndex}`);
}

function updateBombTimer() {
    if (!wcState.bombActive) return;

    wcState.bombTimer--;
    const timerEl = document.getElementById('wcBombTimer');
    if (timerEl) timerEl.textContent = wcState.bombTimer + 's';

    if (wcState.bombTimer <= 0) {
        triggerBombExplosion();
    }
}

function triggerBombExplosion() {
    clearInterval(wcState.bombInterval);
    wcState.bombActive = false;

    // Visual Effect
    const wheel = document.getElementById('wcWheel');
    if (wheel) {
        wheel.classList.add('wc-explosion-effect');
        setTimeout(() => wheel.classList.remove('wc-explosion-effect'), 500);
    }

    // Penalty
    if (wcState.coins >= 5) {
        wcState.coins -= 5;
        showRewardMessage("BOOM! -5 🪙", "error");
    } else {
        wcState.coins = 0;
        showRewardMessage("BOOM! 💥", "error");
    }
    saveProgress();

    // Shuffle Letters
    wcState.currentLevelData.letters = shuffleLetters(wcState.currentLevelData.letters.join(''));
    renderWheel();
}

function defuseBomb() {
    if (!wcState.bombActive) return;

    clearInterval(wcState.bombInterval);
    wcState.bombActive = false;

    // Remove UI
    const timerEl = document.getElementById('wcBombTimer');
    if (timerEl) {
        const overlay = timerEl.parentElement;
        if (overlay) overlay.remove();
    }

    // Reward
    wcState.coins += 3;
    saveProgress();
    showRewardMessage("Bomb desarmerad! +3 🪙", "bonus");
}

// --- PROVERB LOGIC ---
function unlockProverbWord() {
    if (typeof WC_PROVERBS === 'undefined') return;

    const proverb = WC_PROVERBS.find(p => p.id === wcState.currentProverbId);
    if (!proverb) return;

    const words = proverb.text.split(' ');
    if (wcState.proverbProgress < words.length) {
        wcState.proverbProgress++;

        // Check if proverb completed
        if (wcState.proverbProgress >= words.length) {
            showProverbReward(proverb);
            // Advance to next proverb
            wcState.currentProverbId++;
            wcState.proverbProgress = 0;
        } else {
            // Show progress toast
            showRewardMessage(`Ordspråk: ${wcState.proverbProgress}/${words.length} ord`, "bonus");
        }
        saveProgress();
    }
}

function showProverbReward(proverb) {
    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'wc-modal-overlay';
    modal.style.display = 'flex';
    modal.style.zIndex = '2000';

    modal.innerHTML = `
        <div class="wc-proverb-modal-content pop-in">
            <div class="wc-proverb-title">Svenskt Ordspråk</div>
            <div class="wc-proverb-text">"${proverb.text}"</div>
            <div class="wc-proverb-translation">${proverb.translation}</div>
            <button class="game-btn next-btn" onclick="this.closest('.wc-modal-overlay').remove()">
                Fortsätt / استمر
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}


// --- WORD LIBRARY ---
function showLibrary() {
    const modal = document.getElementById('wcLibraryModal');
    const content = document.getElementById('wcLibraryContent');
    content.innerHTML = ''; // Clear previous

    // Add Clear All Button if there are words
    if (wcState.learnedWords && Object.keys(wcState.learnedWords).length > 0) {
        const clearBtnContainer = document.createElement('div');
        clearBtnContainer.style.textAlign = 'right';
        clearBtnContainer.style.marginBottom = '1rem';
        clearBtnContainer.innerHTML = `
            <button onclick="clearLibrary()" class="wc-lib-clear-btn">
                Rensa allt / مسح الكل 🗑️
            </button>
        `;
        content.appendChild(clearBtnContainer);
    }

    if (!wcState.learnedWords || Object.keys(wcState.learnedWords).length === 0) {
        content.innerHTML = '<div class="wc-empty-library">Du har inte samlat några ord än! Spela mer för att fylla ditt bibliotek. <br> لم تجمع أي كلمات بعد! العب المزيد لملء مكتبتك.</div>';
    } else {
        // Render Themes
        WC_THEMES.forEach(theme => {
            const words = wcState.learnedWords[theme.id] || [];
            if (words.length > 0) {
                const section = document.createElement('div');
                section.className = 'wc-library-section';

                const header = document.createElement('div');
                header.className = 'wc-library-header';
                header.style.background = theme.background;
                header.innerHTML = `<span>${theme.icon} ${theme.name}</span> <span class="wc-word-count">${words.length}</span>`;
                section.appendChild(header);

                const grid = document.createElement('div');
                grid.className = 'wc-library-grid';

                words.forEach(word => {
                    const card = document.createElement('div');
                    card.className = 'wc-library-card';

                    // Find translation and examples
                    let translation = "";
                    let sentenceSv = "";
                    let sentenceAr = "";

                    const entry = WC_DICTIONARY.find(e => e.w === word);
                    if (entry) {
                        translation = entry.t;
                        sentenceSv = entry.s || "";
                        sentenceAr = entry.st || "";
                    }

                    card.innerHTML = `
                        <div class="wc-lib-word">${word}</div>
                        <div class="wc-lib-trans">${translation}</div>
                        ${sentenceSv ? `
                            <div class="wc-lib-sentence-row">
                                <div class="wc-lib-sentence-sv">"${sentenceSv}"</div>
                                <button class="wc-lib-speak-sm" onclick="speakSentence('${sentenceSv.replace(/'/g, "\\'")}')" title="Lyssna / استمع">🔊</button>
                            </div>
                        ` : ''}
                        ${sentenceAr ? `<div class="wc-lib-sentence-ar">${sentenceAr}</div>` : ''}
                        <button class="wc-lib-speak-main" onclick="speakWord('${word}')" title="Lyssna / استمع">🔊</button>
                        <button class="wc-lib-delete" onclick="deleteWord('${word}')" title="Ta bort / حذف">🗑️</button>
                    `;
                    grid.appendChild(card);
                });

                section.appendChild(grid);
                content.appendChild(section);
            }
        });
    }

    modal.style.display = 'flex';
}

function speakSentence(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'sv-SE';
        utterance.rate = 0.9; // Slightly slower for sentences
        window.speechSynthesis.speak(utterance);
    }
}

function deleteWord(wordToDelete) {
    if (!confirm(`Vill du ta bort "${wordToDelete}" från biblioteket? \n هل تريد حذف "${wordToDelete}" من المكتبة؟`)) {
        return;
    }

    let found = false;
    // Iterate through themes to find and remove the word
    for (const themeId in wcState.learnedWords) {
        const index = wcState.learnedWords[themeId].indexOf(wordToDelete);
        if (index > -1) {
            wcState.learnedWords[themeId].splice(index, 1);
            // If theme becomes empty, delete the key (optional, but keeps it clean)
            if (wcState.learnedWords[themeId].length === 0) {
                delete wcState.learnedWords[themeId];
            }
            found = true;
            break; // Word found and removed
        }
    }

    if (found) {
        saveProgress(); // Corrected function name
        showLibrary(); // Re-render
    }
}

function clearLibrary() {
    if (!confirm("Är du säker på att du vill rensa hela biblioteket? Detta kan inte ångras. \n هل أنت متأكد أنك تريد مسح المكتبة بالكامل؟ لا يمكن التراجع عن هذا.")) {
        return;
    }

    wcState.learnedWords = {};
    saveProgress(); // Corrected function name
    showLibrary(); // Re-render
}

function closeLibrary() {
    document.getElementById('wcLibraryModal').style.display = 'none';
}
