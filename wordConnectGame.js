// ========================================
//  SWEDISH WORD CONNECT GAME MODULE
// ========================================
// alert("Word Connect Loaded");

// --- CONFIG & STATE ---
const WC_CONFIG = {
    totalChapters: 10, // 10 Chapters
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
    glowTimer: null, // For wheel glow reset

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
    if (typeof WC_PREDEFINED_LEVELS === 'undefined' || typeof WC_DICTIONARY === 'undefined') {
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

    // Initialize Particles
    initParticles();

    loadProgress();
    startLevel(wcState.chapter, wcState.stage);
}

// --- FLOATING PARTICLES SYSTEM ---
function initParticles() {
    const container = document.getElementById('wcParticles');
    if (!container) return;

    // Create 15 floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.opacity = `${0.3 + Math.random() * 0.4}`;
        container.appendChild(particle);
    }
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
// عداد متحرك للعملات
let coinAnimationFrame = null;

function updateCoinDisplay(animate = true) {
    const el = document.getElementById('wcCoinCount');
    if (el) {
        const currentValue = parseInt(el.textContent) || 0;
        const targetValue = wcState.coins;

        if (animate && currentValue !== targetValue) {
            animateCounter(el, currentValue, targetValue);
        } else {
            el.textContent = wcState.coins;
        }
    }

    const streakEl = document.getElementById('wcStreakCount');
    if (streakEl) streakEl.textContent = wcState.streak || 0;

    const bonusEl = document.getElementById('wcBonusCount');
    if (bonusEl) bonusEl.textContent = wcState.bonusWords ? wcState.bonusWords.length : 0;
}

// دالة تحريك العداد تصاعدياً
function animateCounter(element, from, to) {
    if (coinAnimationFrame) cancelAnimationFrame(coinAnimationFrame);

    const duration = 500; // مدة الحركة بالمللي ثانية
    const startTime = performance.now();
    const diff = to - from;

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutQuad)
        const easeProgress = 1 - (1 - progress) * (1 - progress);

        const currentValue = Math.round(from + diff * easeProgress);
        element.textContent = currentValue;

        // إضافة تأثير بصري
        if (diff > 0) {
            element.style.transform = `scale(${1 + (0.2 * (1 - progress))})`;
            element.style.color = '#22c55e'; // أخضر عند الزيادة
        } else if (diff < 0) {
            element.style.color = '#ef4444'; // أحمر عند النقصان
        }

        if (progress < 1) {
            coinAnimationFrame = requestAnimationFrame(step);
        } else {
            element.textContent = to;
            element.style.transform = 'scale(1)';
            element.style.color = ''; // إعادة اللون الأصلي
        }
    }

    coinAnimationFrame = requestAnimationFrame(step);
}

// Update streak display with animation
function updateStreakDisplay() {
    const streakEl = document.getElementById('wcStreakCount');
    const streakPill = document.querySelector('.wc-streak-pill');

    if (streakEl) {
        const streak = wcState.streak || 0;
        streakEl.textContent = streak;

        // Add fire effect for high streaks
        if (streakPill) {
            if (streak >= 3) {
                streakPill.classList.add('streak-on-fire');
            } else {
                streakPill.classList.remove('streak-on-fire');
            }

            // Pop animation
            streakPill.classList.add('streak-pop');
            setTimeout(() => streakPill.classList.remove('streak-pop'), 300);
        }
    }
}

// Toggle sound on/off
window.toggleSound = function () {
    if (typeof soundManager !== 'undefined' && soundManager.toggle) {
        const enabled = soundManager.toggle();
        const iconEl = document.getElementById('wcSoundIcon');
        if (iconEl) {
            iconEl.textContent = enabled ? '🔊' : '🔇';
        }
        if (typeof showToast === 'function') {
            showToast(enabled ? 'الصوت مفعّل / Ljud på' : 'الصوت مغلق / Ljud av', 'info');
        }
    }
};

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
        // triggerConfetti(); // Removed per user request
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
        document.getElementById('wcLevelSelectModal').classList.add('hidden');

        // === انتقال ناعم: إخفاء ===
        const gameContainer = document.querySelector('.wc-game-container');
        if (gameContainer) {
            gameContainer.classList.add('level-transitioning');
        }

        // تأخير قصير للسماح بالانتقال
        setTimeout(() => {
            performLevelStart(chapter, stage, gameContainer);
        }, 150);

    } catch (err) {
        console.error("Error in startLevel:", err);
    }
}

// الدالة الفعلية لبدء المستوى (بعد الانتقال)
function performLevelStart(chapter, stage, gameContainer) {
    try {
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
                document.getElementById('wcLevelTitle').textContent = `${theme.icon} ${chapter}-${stage}`;

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

        if (!wcState.currentLevelData || !wcState.currentLevelData.targets || wcState.currentLevelData.targets.length === 0) {
            console.error("Failed to load level data", wcState.currentLevelData);
            throw new Error("Kunde inte ladda nivådata / فشل تحميل بيانات المستوى");
        }

        // Ensure letters is an array (convert from string if needed)
        if (typeof wcState.currentLevelData.main_chars === 'string') {
            wcState.currentLevelData.letters = wcState.currentLevelData.main_chars.split('');
        } else if (!wcState.currentLevelData.letters) {
            wcState.currentLevelData.letters = wcState.currentLevelData.main_chars.split('');
        }

        // Ensure words array exists for backward compatibility
        if (!wcState.currentLevelData.words) {
            wcState.currentLevelData.words = wcState.currentLevelData.targets;
        }

        renderGrid();
        // Reset Bomb Mode
        wcState.bombActive = false;
        if (wcState.bombInterval) clearInterval(wcState.bombInterval);

        // Initialize Bomb Mode (Chance based on level, e.g., > Level 5)
        if (wcState.currentLevel > 5 && Math.random() > 0.5) {
            initBombMode(levelData.letters.length);
        }

        renderWheel();

        // === انتقال ناعم: إظهار ===
        if (gameContainer) {
            setTimeout(() => {
                gameContainer.classList.remove('level-transitioning');
            }, 50);
        }
    } catch (error) {
        console.error("Error starting level:", error);
        showToast(`Fel: ${error.message} / خطأ: ${error.message}`, "error");
        // إظهار الحاوي حتى في حالة الخطأ
        if (gameContainer) gameContainer.classList.remove('level-transitioning');
    }
}



// --- DYNAMIC GENERATION ENGINE ---
function generateDynamicLevel(levelIndex) {
    // 1. Determine Difficulty Parameters based on Stage in Chapter
    const stagesPerChapter = WC_CONFIG.stagesPerChapter || 10;
    const stageInChapter = ((levelIndex - 1) % stagesPerChapter) + 1;

    let targetWordCount = 3;
    let minWordLength = 3;
    let maxWordLength = 4;

    if (stageInChapter <= 3) {
        // Stages 1-3: 3 words, 3-4 letters
        targetWordCount = 3;
        minWordLength = 3;
        maxWordLength = 4;
    } else if (stageInChapter <= 6) {
        // Stages 4-6: 4 words, 3-5 letters
        targetWordCount = 4;
        minWordLength = 3;
        maxWordLength = 5;
    } else if (stageInChapter <= 9) {
        // Stages 7-9: 5 words, 3-6 letters
        targetWordCount = 5;
        minWordLength = 3;
        maxWordLength = 6;
    } else {
        // Stage 10: 6 words, 3-7 letters
        targetWordCount = 6;
        minWordLength = 3;
        maxWordLength = 7;
    }

    // Root word MUST be exactly maxWordLength to ensure the longest word is solvable
    let rootLength = maxWordLength;

    // 2. Pick a Root Word
    // Try up to 50 times to find a good root
    for (let attempt = 0; attempt < 50; attempt++) {
        let rootWord = null;
        let candidates = [];
        let isThemeWord = false;

        // PRIORITIZE THEME WORDS
        if (typeof getThemeForChapter === 'function') {
            const theme = getThemeForChapter(wcState.chapter);
            if (theme && theme.words) {
                // Get all unused theme words that match the required root length
                // We can be slightly flexible: if theme word is shorter than max, we can't use it as root
                // If it is longer, we can't use it because of the constraint "longest word X"
                const themeCandidates = theme.words
                    .map(item => (typeof item === 'string' ? item : item.word).toUpperCase())
                    .filter(w => !wcState.usedRootWords.includes(w) && w.length === rootLength);

                if (themeCandidates.length > 0) {
                    rootWord = themeCandidates[Math.floor(Math.random() * themeCandidates.length)];
                    isThemeWord = true;
                }
            }
        }

        // Fallback to dictionary
        if (!rootWord) {
            candidates = WC_OPTIMIZED_DICT.byLength[rootLength];
            if (!candidates || candidates.length === 0) {
                // Should not happen with standard dictionary, but safety first
                continue;
            }

            // Filter out used words
            let availableCandidates = candidates.filter(w => !wcState.usedRootWords.includes(w));
            if (availableCandidates.length === 0) {
                availableCandidates = candidates; // Recycle
            }
            rootWord = availableCandidates[Math.floor(Math.random() * availableCandidates.length)];
        }

        const rootMap = getCharMap(rootWord);

        // 3. Find Valid Subsets
        const validSubsets = [];
        const levelDictionary = {};

        // Only check words within the min/max length range
        for (let len = minWordLength; len <= maxWordLength; len++) {
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
        // We prefer exact count, but allow -1 if we are struggling (attempt > 20)
        let minWordsRequired = targetWordCount;
        if (attempt > 20) minWordsRequired = Math.max(2, targetWordCount - 1);

        if (validSubsets.length >= minWordsRequired) {
            // Success!
            // Sort by length descending, then alphabetical
            validSubsets.sort((a, b) => b.length - a.length || a.localeCompare(b));

            let targets = [];

            // Always include the root word (it matches maxWordLength)
            if (validSubsets.includes(rootWord)) {
                targets.push(rootWord);
            }

            // Fill the rest
            for (const word of validSubsets) {
                if (targets.length >= targetWordCount) break;
                if (!targets.includes(word)) {
                    targets.push(word);
                }
            }

            // Final check: do we have enough?
            if (targets.length < minWordsRequired) continue;

            targets.sort((a, b) => a.length - b.length);

            if (!wcState.usedRootWords.includes(rootWord)) {
                wcState.usedRootWords.push(rootWord);
            }
            saveProgress();

            return {
                id: `gen_${levelIndex}_${Date.now()}`,
                tier: Math.floor(levelIndex / 10) + 1,
                main_chars: rootWord,
                targets: targets,
                dictionary: levelDictionary
            };
        }
    }

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
        // Limit to max 6 words per user request (Stage 10)
        const limitedWords = level.words; // Use all words defined in static data

        // Use robust shuffle for predefined levels too
        let letters = level.letters;
        const mainWord = level.words[0]; // Usually the first word is the main one
        if (mainWord && letters.join('') === mainWord) {
            letters = shuffleLetters(mainWord);
        } else {
            // Just shuffle existing letters
            for (let i = letters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[j]] = [letters[j], letters[i]];
            }
        }

        // Build dictionary for this level
        const levelDictionary = {};
        level.validWords.forEach(w => {
            const entry = WC_DICTIONARY.find(item => item.w === w);
            if (entry) {
                levelDictionary[w] = { ar: entry.t, sv: entry.s || "", st: entry.st || "" };
            } else {
                // Fallback if not in dictionary (should not happen with correct data)
                levelDictionary[w] = { ar: "", sv: "", st: "" };
            }
        });

        return {
            id: levelKey,
            tier: chapter,
            main_chars: letters.join(''),
            targets: limitedWords,
            dictionary: levelDictionary,
            validWords: level.validWords // Include validWords for bonus check
        };
    }

    // Fallback if static level is missing (should not happen with 100 levels)
    console.error(`Level ${levelKey} not found in static data!`);
    return null;
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

// Shuffle wheel letters in place and re-render (for Blanda button)
window.shuffleWheelLetters = function () {
    if (!wcState.currentLevelData || !wcState.currentLevelData.letters) return;

    // Fisher-Yates shuffle
    let arr = [...wcState.currentLevelData.letters];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    wcState.currentLevelData.letters = arr;
    renderWheel();

    // Play shuffle sound if available
    if (typeof soundManager !== 'undefined' && soundManager.playShuffle) {
        soundManager.playShuffle();
    }
};

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
            // Updated to Premium Class
            letterBox.className = 'wc-slot';
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

    // The .wc-letters container matches wheel size (286px - +10%)
    const containerSize = 286;
    const centerX = containerSize / 2; // 143
    const centerY = containerSize / 2; // 143

    // Letter nodes are 48x48 (-20%), so we need to account for that
    const letterSize = 48;
    const letterHalf = letterSize / 2;

    // Radius should place letter CENTERS 10px away from border
    // Container is 286px, center is 143, letter half is 24, gap is 10px
    // So: 143 - 24 - 10 = 109
    const radius = 109;

    const angleStep = (2 * Math.PI) / letters.length;

    // SVG for Neon Lines - sized to match container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "wc-connector-lines");
    svg.setAttribute("width", String(containerSize));
    svg.setAttribute("height", String(containerSize));
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";

    // Define Glow Filter and Gradient
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" type="matrix" 
                values="0 0 0 0 0.13
                        0 0 0 0 0.83
                        0 0 0 0 0.93
                        0 0 0 1 0" result="colorBlur"/>
            <feMerge>
                <feMergeNode in="colorBlur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#22d3ee" />
            <stop offset="50%" stop-color="#60a5fa" />
            <stop offset="100%" stop-color="#fbbf24" />
        </linearGradient>
    `;
    svg.appendChild(defs);

    // Static Lines Group (for permanent connections)
    const staticGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    staticGroup.setAttribute("id", "wc-static-lines");
    svg.appendChild(staticGroup);

    // Dynamic Line (Rubber Band) - thicker for better visibility
    const dynamicLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dynamicLine.setAttribute("id", "wc-dynamic-line");
    dynamicLine.setAttribute("stroke", "url(#lineGradient)"); // Use gradient
    dynamicLine.setAttribute("stroke-width", "12");
    dynamicLine.setAttribute("stroke-linecap", "round");
    dynamicLine.setAttribute("filter", "url(#neonGlow)"); // Apply Glow
    dynamicLine.setAttribute("opacity", "0");
    svg.appendChild(dynamicLine);

    wheelContainer.appendChild(svg);
    wcState.svgLine = svg;

    letters.forEach((char, index) => {
        const angle = index * angleStep - (Math.PI / 2); // Start from top

        // Calculate CENTER position of the letter
        const centerPosX = centerX + radius * Math.cos(angle);
        const centerPosY = centerY + radius * Math.sin(angle);

        // Position by top-left corner (subtract half of letter size)
        const leftPos = centerPosX - letterHalf;
        const topPos = centerPosY - letterHalf;

        const btn = document.createElement('div');
        btn.className = 'wc-letter-node';
        btn.textContent = char;
        btn.style.left = `${leftPos}px`;
        btn.style.top = `${topPos}px`;
        btn.dataset.index = index;
        btn.dataset.char = char;
        // Store CENTER coordinates for line drawing
        btn.dataset.x = centerPosX;
        btn.dataset.y = centerPosY;

        wheelContainer.appendChild(btn);
    });

    // Event listeners for dragging (Container handles everything)
    wheelContainer.addEventListener('mousedown', handleInputStart);
    wheelContainer.addEventListener('touchstart', handleInputStart, { passive: false });
    wheelContainer.addEventListener('mousemove', handleInputMove);
    wheelContainer.addEventListener('touchmove', handleInputMove, { passive: false });
    document.addEventListener('mouseup', handleInputEnd);
    document.addEventListener('touchend', handleInputEnd);
}

// --- UPDATE SVG LINE ---
// Helper to draw lines between visited nodes
function updateConnectionLine() {
    if (!wcState.svgLine) return;

    // Calculate Path Data 'd' from visited nodes
    let d = "";
    if (wcState.visitedNodes.length > 1) {
        const container = document.getElementById('wcWheel');
        if (!container) return;

        wcState.visitedNodes.forEach((index, i) => {
            const el = container.querySelector(`.wc-letter-node[data-index="${index}"]`);
            if (el) {
                const x = parseFloat(el.dataset.x);
                const y = parseFloat(el.dataset.y);
                if (i === 0) {
                    d += `M ${x} ${y}`;
                } else {
                    d += ` L ${x} ${y}`;
                }
            }
        });
    }

    // Get or create static group
    let staticGroup = wcState.svgLine.querySelector('#wc-static-lines');
    if (!staticGroup) {
        staticGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        staticGroup.setAttribute("id", "wc-static-lines");
        // Insert before dynamic line
        const dynLine = wcState.svgLine.querySelector('#wc-dynamic-line');
        if (dynLine) wcState.svgLine.insertBefore(staticGroup, dynLine);
        else wcState.svgLine.appendChild(staticGroup);
    }

    // Clear only old static lines
    staticGroup.innerHTML = '';

    // Re-add Defs
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="50%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#fbbf24"/>
        </linearGradient>
        <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    `;
    // Background glow layer - thick and visible
    const glowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    glowPath.setAttribute("d", d);
    glowPath.setAttribute("stroke", "rgba(251, 191, 36, 0.4)");
    glowPath.setAttribute("stroke-width", "12"); // Matches main line
    glowPath.setAttribute("fill", "none");
    glowPath.setAttribute("stroke-linejoin", "round");
    glowPath.setAttribute("stroke-linecap", "round");
    glowPath.setAttribute("filter", "url(#neonGlow)"); // Use same filter as dynamic
    staticGroup.appendChild(glowPath);

    // Main line with gradient - Thick
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("stroke", "url(#lineGradient)");
    path.setAttribute("stroke-width", "12"); // Thick line for visibility
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-linecap", "round");
    staticGroup.appendChild(path);

    // Inner highlight - Subtle detail
    const highlightPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    highlightPath.setAttribute("d", d);
    highlightPath.setAttribute("stroke", "rgba(255, 255, 255, 0.4)");
    highlightPath.setAttribute("stroke-width", "2"); // Thinner highlight
    highlightPath.setAttribute("fill", "none");
    highlightPath.setAttribute("stroke-linejoin", "round");
    highlightPath.setAttribute("stroke-linecap", "round");
    staticGroup.appendChild(highlightPath);
}


// --- INPUT HANDLING ---
// New Mode: Start only when pressing a letter, continue tracking until double-tap or submit

function handleInputStart(e) {
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const container = document.getElementById('wcWheel');
    const rect = container.getBoundingClientRect();

    // Calculate coordinates (286x286 space - matches container)
    const scaleX = 286 / rect.width;
    const scaleY = 286 / rect.height;
    const mouseX = (touch.clientX - rect.left) * scaleX;
    const mouseY = (touch.clientY - rect.top) * scaleY;

    // Find if we hit a letter
    const hitRadius = 50; // Slightly larger for easier selection
    const letters = container.querySelectorAll('.wc-letter-node');
    let hitLetter = null;

    letters.forEach(btn => {
        const btnX = parseFloat(btn.dataset.x);
        const btnY = parseFloat(btn.dataset.y);
        const distSq = (mouseX - btnX) ** 2 + (mouseY - btnY) ** 2;

        if (distSq < hitRadius ** 2) {
            hitLetter = btn;
        }
    });

    // Only start if we actually hit a letter
    if (hitLetter) {
        // Check if we're in continuous mode (already have letters selected)
        if (!wcState.isDragging && wcState.visitedNodes.length === 0) {
            // Fresh start
            wcState.isDragging = true;
            wcState.currentInput = "";
            wcState.visitedNodes = [];

            // Clear static lines - Keep defs!
            const staticGroup = wcState.svgLine.querySelector('#wc-static-lines');
            if (staticGroup) staticGroup.innerHTML = '';

            document.querySelectorAll('.wc-letter-node').forEach(el => el.classList.remove('selected'));
        }

        wcState.isDragging = true;

        const index = parseInt(hitLetter.dataset.index);
        if (!wcState.visitedNodes.includes(index)) {
            selectNode(hitLetter);
        }
    }
}

function handleInputMove(e) {
    if (!wcState.isDragging) return;
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;

    // === تأثير السحب المضيء ===
    if (typeof dragTrail !== 'undefined' && dragTrail.addPoint) {
        dragTrail.addPoint(touch.clientX, touch.clientY);
    }

    // Get container rect
    const container = document.getElementById('wcWheel');
    const rect = container.getBoundingClientRect();

    // Calculate coordinates in 286x286 space
    const scaleX = 286 / rect.width;
    const scaleY = 286 / rect.height;
    const mouseX = (touch.clientX - rect.left) * scaleX;
    const mouseY = (touch.clientY - rect.top) * scaleY;

    // Update Dynamic Line
    if (wcState.visitedNodes.length > 0) {
        const lastIndex = wcState.visitedNodes[wcState.visitedNodes.length - 1];
        const lastEl = container.querySelector(`.wc-letter-node[data-index="${lastIndex}"]`);

        if (lastEl) {
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

    // Distance-based hit testing (Magnetic feel)
    const hitRadius = 50;
    const letters = container.querySelectorAll('.wc-letter-node');

    letters.forEach(btn => {
        const btnX = parseFloat(btn.dataset.x);
        const btnY = parseFloat(btn.dataset.y);

        // Calculate distance squared (faster than sqrt)
        const distSq = (mouseX - btnX) ** 2 + (mouseY - btnY) ** 2;

        if (distSq < hitRadius ** 2) {
            const index = parseInt(btn.dataset.index);

            // Check for Backtracking (drag back to previous node)
            if (wcState.visitedNodes.length >= 2 &&
                index === wcState.visitedNodes[wcState.visitedNodes.length - 2]) {

                // Remove last node
                const lastIndex = wcState.visitedNodes.pop();
                wcState.currentInput = wcState.currentInput.slice(0, -1);
                document.getElementById('wcPreviewText').textContent = wcState.currentInput;

                // Deselect visual
                const lastBtn = container.querySelector(`.wc-letter-node[data-index="${lastIndex}"]`);
                if (lastBtn) lastBtn.classList.remove('selected');

                // Redraw line
                updateConnectionLine();
                return; // Done
            }

            if (!wcState.visitedNodes.includes(index)) {
                selectNode(btn);
            }
        }
    });
}

function handleInputEnd(e) {
    if (!wcState.isDragging) return;

    // === مسح تأثير السحب المضيء ===
    if (typeof dragTrail !== 'undefined' && dragTrail.clear) {
        dragTrail.clear();
    }

    // Check if we have at least 2 letters to validate
    if (wcState.visitedNodes.length >= 2) {
        wcState.isDragging = false;

        // Hide dynamic line
        const dynLine = document.getElementById('wc-dynamic-line');
        if (dynLine) dynLine.setAttribute("opacity", "0");

        validateWord();
        setTimeout(() => {
            document.querySelectorAll('.wc-letter-node').forEach(el => el.classList.remove('selected'));

            // Clear static lines - Keep defs!
            const staticGroup = wcState.svgLine.querySelector('#wc-static-lines');
            if (staticGroup) staticGroup.innerHTML = '';

            document.getElementById('wcPreviewText').textContent = "";
            wcState.visitedNodes = [];
            wcState.currentInput = "";
        }, 300);
    } else {
        // Only 1 letter selected - keep it selected for tap-to-continue mode
        wcState.isDragging = false;

        // Hide dynamic line but keep selection
        const dynLine = document.getElementById('wc-dynamic-line');
        if (dynLine) dynLine.setAttribute("opacity", "0");

        // Reset to default glow if dragging stops without submit
        if (wcState.visitedNodes.length < 2) {
            setWheelState('default');
        }
    }
}

function selectNode(el) {
    const index = parseInt(el.dataset.index);
    const char = el.dataset.char;
    wcState.visitedNodes.push(index);
    wcState.currentInput += char;
    el.classList.add('selected');
    document.getElementById('wcPreviewText').textContent = wcState.currentInput;

    // Play letter selection sound
    if (typeof soundManager !== 'undefined' && soundManager.playLetterSelect) {
        soundManager.playLetterSelect();
    }

    if (wcState.visitedNodes.length > 1) {
        const prevIndex = wcState.visitedNodes[wcState.visitedNodes.length - 2];
        const prevEl = document.getElementById('wcWheel').querySelector(`.wc-letter-node[data-index="${prevIndex}"]`);
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
    line.setAttribute("stroke", "url(#lineGradient)"); // Use gradient
    line.setAttribute("stroke-width", "12"); // Thick line for visibility
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("filter", "url(#neonGlow)"); // Apply glow
    line.classList.add("wc-connection-line");

    // Insert before dynamic line so dynamic line stays on top
    // Draw directly to static group instead of replacing
    const staticGroup = wcState.svgLine.querySelector('#wc-static-lines');
    if (staticGroup) {
        // Background glow layer - thick and visible
        const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        glowLine.setAttribute("x1", x1);
        glowLine.setAttribute("y1", y1);
        glowLine.setAttribute("x2", x2);
        glowLine.setAttribute("y2", y2);
        glowLine.setAttribute("stroke", "rgba(251, 191, 36, 0.4)");
        glowLine.setAttribute("stroke-width", "12");
        glowLine.setAttribute("stroke-linecap", "round");
        glowLine.setAttribute("filter", "url(#neonGlow)");
        staticGroup.appendChild(glowLine);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "url(#lineGradient)"); // Use gradient
        line.setAttribute("stroke-width", "12"); // Thick line for visibility
        line.setAttribute("stroke-linecap", "round");
        staticGroup.appendChild(line);
    }
}

// --- GAME LOGIC ---
function setWheelState(state) {
    const container = document.getElementById('wcWheel');
    if (!container) return;

    // Clear buffer
    if (wcState.glowTimer) {
        clearTimeout(wcState.glowTimer);
        wcState.glowTimer = null;
    }

    // Remove all state classes
    container.classList.remove('wc-state-success', 'wc-state-error', 'wc-state-bonus');

    // Add new state
    if (state === 'success') {
        container.classList.add('wc-state-success');
        createParticleExplosion(wcState.centerX, wcState.centerY, '#34d399');
        // Revert after 1s
        wcState.glowTimer = setTimeout(() => setWheelState('default'), 1000);
    } else if (state === 'error') {
        container.classList.add('wc-state-error');
        // Revert after 0.5s
        wcState.glowTimer = setTimeout(() => setWheelState('default'), 500);
    } else if (state === 'bonus') {
        container.classList.add('wc-state-bonus');
        createParticleExplosion(wcState.centerX, wcState.centerY, '#fbbf24');
        // Revert after 1s
        wcState.glowTimer = setTimeout(() => setWheelState('default'), 1000);
    }
    // 'default' does nothing (just removals)
}

function startDailyChallenge() {
    // Placeholder to prevent reference errors if called
    console.log("Daily Challenge not implemented yet");
}

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

            // COMBO SYSTEM + STREAK
            const now = Date.now();
            if (now - wcState.lastWordTime < 2500) { // 2.5 seconds window
                wcState.comboCount++;
                wcState.streak = (wcState.streak || 0) + 1;
                reward += (wcState.comboCount * 2); // Bonus: +2, +4, +6...
                showRewardMessage(`COMBO x${wcState.comboCount + 1}! +${reward} 🪙`, "combo");
                // Play streak sound
                if (typeof soundManager !== 'undefined' && soundManager.playStreak) {
                    soundManager.playStreak(wcState.streak);
                }
                // triggerConfetti(); // Removed per user request
            } else {
                wcState.comboCount = 0;
                wcState.streak = (wcState.streak || 0) + 1;
                // Simple reward message for normal word
                showRewardMessage(`+${reward} 🪙`, "default");
                // Play word found sound
                if (typeof soundManager !== 'undefined' && soundManager.playWordFound) {
                    soundManager.playWordFound();
                }
            }
            wcState.lastWordTime = now;
            updateStreakDisplay();

            wcState.coins += reward;
            saveProgress();

            // Find translation in Level Dictionary
            const wordUpper = word.toUpperCase();
            let entry = wcState.currentLevelData.dictionary ? wcState.currentLevelData.dictionary[wordUpper] : null;

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
                        <div class="wc-arabic-meaning">${entry.ar}</div>
                        <div class="wc-example-text" onclick="event.stopPropagation(); speakWord('${entry.sv.replace(/'/g, "\\'")}')">${entry.sv} 🔊</div>
                        ${entry.st ? `<div class="wc-example-translation">${entry.st}</div>` : ''}
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

            setWheelState('success'); // Green Neon

            // Play success sound
            if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
                soundManager.playSuccess();
            }

            // Haptic feedback for mobile
            if (navigator.vibrate) navigator.vibrate(50);

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
            // Already found
            showRewardMessage("Redan hittat! / وجدتها مسبقاً", "default");

            // Trigger YELLOW glow
            setWheelState('bonus');
        }
    } else {
        // Not in level words - Check for BONUS word
        const wordUpper = word.toUpperCase();

        // Check if valid word (either in global dictionary OR in level's validWords)
        let isValidWord = false;
        let globalEntry = null;

        // 1. Check Level's Valid Words (includes bonus words)
        if (wcState.currentLevelData.validWords && wcState.currentLevelData.validWords.includes(wordUpper)) {
            isValidWord = true;
        }

        // 2. Fallback to Global Dictionary (if defined)
        if (!isValidWord && typeof WC_DICTIONARY !== 'undefined') {
            globalEntry = WC_DICTIONARY.find(item => item.w.toUpperCase() === wordUpper);
            if (globalEntry) isValidWord = true;
        } else if (isValidWord && typeof WC_DICTIONARY !== 'undefined') {
            // Look up definition even if we already know it's valid
            globalEntry = WC_DICTIONARY.find(item => item.w.toUpperCase() === wordUpper);
        }

        if (isValidWord) {
            // Bonus Word Rule: Must be > 2 chars (3 or more)
            if (wordUpper.length < 3) {
                // Too short for bonus
                setWheelState('error');
                showRewardMessage("För kort! / قصيرة جداً", "error");
                return;
            }

            if (!wcState.bonusWords.includes(wordUpper)) {
                wcState.bonusWords.push(wordUpper);
                wcState.coins += 3; // Bonus coin (increased from 1)
                saveProgress();

                setWheelState('bonus'); // Yellow Neon

                // Find definition for bonus word
                let msg = `Bonusord! +1 🪙`;

                if (globalEntry) {
                    // Bonus word found!
                    let msg = `Bonusord! +1 🪙`;

                    // Show sentence if available for bonus word
                    const trans = globalEntry.ar || globalEntry.t || "";
                    const sentence = globalEntry.sv || globalEntry.s || "";

                    const transEl = document.getElementById('wcTranslationDisplay');
                    if (transEl) {
                        transEl.innerHTML = `
                            <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.2rem;">${wordUpper}</div>
                            <div style="font-size: 1.2rem; font-weight: 700;">${trans}</div>
                            ${sentence ? `<div class="wc-example-text" style="font-style: italic; color: #fbbf24; margin-top: 0.2rem;">"${sentence}"</div>` : ''}
                        `;
                        transEl.style.opacity = '1';
                        transEl.classList.add('pop-in');
                        setTimeout(() => transEl.classList.remove('pop-in'), 300);
                    }

                    showRewardMessage(msg, "combo");
                } else {
                    // Valid bonus word, but no definition available
                    showRewardMessage(`Bonusord! +1 🪙`, "combo");

                    const transEl = document.getElementById('wcTranslationDisplay');
                    if (transEl) {
                        transEl.innerHTML = `<div style="font-size: 1.4rem; font-weight: 700;">${wordUpper}</div><div style="font-size: 1rem; color: #aaa;">Bonusord / كلمة إضافية</div>`;
                        transEl.style.opacity = '1';
                        transEl.classList.add('pop-in');
                        setTimeout(() => transEl.classList.remove('pop-in'), 300);
                    }
                }
                // Play success sound for bonus word
                if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
                    soundManager.playSuccess();
                }
            } else {
                showRewardMessage("Redan hittat bonusord! / كلمة إضافية مكررة", "default");
                setWheelState('bonus');
            }
        } else {
            // Invalid word
            // showToast("Inte ett giltigt ord / ليست كلمة صحيحة", "error"); // Removed per user request
            setWheelState('error'); // Red Neon
            shakeWheel();

            // Play error sound
            if (typeof soundManager !== 'undefined' && soundManager.playError) {
                soundManager.playError();
            }

            // Haptic feedback for wrong word
            if (navigator.vibrate) navigator.vibrate(200);

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
function shakeWheel() {
    const wheel = document.getElementById('wcWheel');
    if (wheel) {
        wheel.classList.add('shake');
        setTimeout(() => wheel.classList.remove('shake'), 500);
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
            // Fixed: Use correct class selector '.wc-slot' instead of '.wc-letter-box'
            const letters = row.querySelectorAll('.wc-slot');
            letters.forEach((box, i) => {
                box.textContent = word[i];
                // Fixed: CSS class is '.revealed' not '.reveal'
                box.classList.add('revealed');
            });
        }
    });
}

function checkWin() {
    if (wcState.foundWords.length === wcState.currentLevelData.words.length) {
        // Level Complete!

        const statusEl = document.getElementById('wcLevelStatus');
        if (statusEl) {
            statusEl.classList.add('visible');
            triggerStageCelebration(); // Enhanced Celebration!
        }

        // 🎉 Confetti celebration! - Disabled per user request
        // if (typeof triggerConfetti === 'function') {
        //     triggerConfetti();
        // }

        // Play success sound for level completion
        if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
            soundManager.playSuccess();
        }

        // Haptic celebration
        if (navigator.vibrate) navigator.vibrate([50, 50, 100]);

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

    // 5 seconds countdown - answers stay visible briefly
    let timeLeft = 5; // 5 seconds
    const totalTime = 5;

    // Show countdown in a simple format (minutes:seconds)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Create countdown display (non-intrusive, at bottom)
    let countdownEl = document.getElementById('wcAutoNextCountdown');
    if (!countdownEl) {
        countdownEl = document.createElement('div');
        countdownEl.id = 'wcAutoNextCountdown';
        countdownEl.style.cssText = `
            position: fixed;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid rgba(251, 191, 36, 0.5);
            border-radius: 20px;
            padding: 0.8rem 1.5rem;
            color: #fbbf24;
            font-size: 1rem;
            font-weight: 600;
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(countdownEl);
    }

    // Update display
    countdownEl.innerHTML = `
        <span>⏱️ المرحلة التالية:</span>
        <span id="wcCountdownTime">${formatTime(timeLeft)}</span>
        <button onclick="skipToNextLevel()" style="
            background: linear-gradient(145deg, #22c55e, #16a34a);
            border: none;
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
        ">تخطي ➜</button>
    `;

    // Store interval ID for cleanup
    if (wcState.levelCountdownInterval) {
        clearInterval(wcState.levelCountdownInterval);
    }

    wcState.levelCountdownInterval = setInterval(() => {
        timeLeft--;
        const timeEl = document.getElementById('wcCountdownTime');
        if (timeEl) timeEl.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(wcState.levelCountdownInterval);
            if (countdownEl) countdownEl.remove();
            nextLevel();
        }
    }, 1000);
}

// Function to skip directly to next level
window.skipToNextLevel = function () {
    if (wcState.levelCountdownInterval) {
        clearInterval(wcState.levelCountdownInterval);
    }
    const countdownEl = document.getElementById('wcAutoNextCountdown');
    if (countdownEl) countdownEl.remove();
    nextLevel();
};

// --- HINT SYSTEM ---
function useHint() {
    // Animate button
    const btn = document.querySelector('.wc-wheel-center-btn');
    if (btn) {
        btn.classList.remove('selected-hint');
        void btn.offsetWidth; // Force reflow
        btn.classList.add('selected-hint');
        setTimeout(() => btn.classList.remove('selected-hint'), 600);
    }

    if (wcState.coins < 10) {
        showRewardMessage("لا يوجد عملات كافية! / Inte tillräckligt med mynt!", "default");
        return;
    }

    let targetBox = null;
    const rows = document.querySelectorAll('.wc-word-row');

    for (const row of rows) {
        if (!row.classList.contains('solved')) {
            const boxes = row.querySelectorAll('.wc-slot');
            for (const box of boxes) {
                if (!box.classList.contains('revealed')) {
                    targetBox = box;
                    break;
                }
            }
        }
        if (targetBox) break;
    }

    if (targetBox) {
        wcState.coins -= 10; // Cost 10 coins
        saveProgress();
        updateCoinDisplay();

        targetBox.textContent = targetBox.dataset.letter;
        targetBox.classList.add('revealed');
        targetBox.style.color = '#fbbf24'; // Gold color for hint

        // Check if all letters in the row are revealed
        const row = targetBox.parentElement;
        const allRevealed = Array.from(row.querySelectorAll('.wc-slot')).every(b => b.classList.contains('revealed'));
        if (allRevealed) {
            row.classList.add('solved');
            const word = row.dataset.word;
            if (!wcState.foundWords.includes(word)) {
                wcState.foundWords.push(word);
                revealWord(word);
                checkWin();
            }
        }

        // Play sound
        if (typeof soundManager !== 'undefined' && soundManager.playClick) {
            soundManager.playClick();
        }
    } else {
        showRewardMessage("لا توجد حروف لكشفها!", "default");
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

// --- VISUAL STAGE MAP UI ---
function openLevelSelect() {
    const modal = document.getElementById('wcLevelSelectModal');
    const grid = document.getElementById('wcLevelGrid');

    // Clear grid
    grid.innerHTML = '';

    // Render all chapters and stages in a simple grid
    for (let c = 1; c <= WC_CONFIG.totalChapters; c++) {
        // Chapter Section
        const section = document.createElement('div');
        section.className = 'wc-chapter-section';

        // Chapter Title
        const theme = getThemeForChapter(c);
        const title = document.createElement('div');
        title.className = 'wc-chapter-title';
        // Shortened format: just chapter number and theme name
        title.innerHTML = theme ? `<span class="chapter-num">${c}</span> ${theme.name}` : `الفصل ${c}`;
        section.appendChild(title);

        // Stages Grid
        const stagesGrid = document.createElement('div');
        stagesGrid.className = 'wc-stages-grid';

        // Stage 1 of every chapter is always unlocked
        for (let s = 1; s <= WC_CONFIG.stagesPerChapter; s++) {
            const isUnlocked = (c < wcState.maxChapter) ||
                (c === wcState.maxChapter && s <= wcState.maxStage) ||
                (s === 1); // Stage 1 of ALL chapters is unlocked
            const isCurrent = (c === wcState.chapter && s === wcState.stage);
            const isCompleted = (c < wcState.maxChapter) ||
                (c === wcState.maxChapter && s < wcState.maxStage);

            const btn = document.createElement('button');
            btn.className = 'wc-stage-btn';
            if (isUnlocked) btn.classList.add('unlocked');
            if (isCurrent) btn.classList.add('current');
            if (isCompleted) btn.classList.add('completed');
            if (!isUnlocked) btn.classList.add('locked');

            btn.innerHTML = isUnlocked ?
                `<span class="stage-num">${s}</span>` :
                `<span class="stage-lock">🔒</span>`;

            if (isUnlocked) {
                btn.onclick = () => {
                    wcState.chapter = c;
                    wcState.stage = s;
                    startLevel(c, s);
                    closeLevelSelect();
                };
            }

            stagesGrid.appendChild(btn);
        }

        section.appendChild(stagesGrid);
        grid.appendChild(section);
    }

    // Show modal
    modal.classList.remove('hidden');
}

function closeLevelSelect() {
    document.getElementById('wcLevelSelectModal').classList.add('hidden');
}

function clearLibrary() {
    if (confirm("Är du säker på att du vill rensa hela biblioteket? / هل أنت متأكد أنك تريد مسح المكتبة بالكامل؟")) {
        wcState.learnedWords = {};
        saveProgress();
        showLibrary();
    }
}

function deleteWord(wordToDelete) {
    if (!confirm(`Är du säker på att du vill ta bort "${wordToDelete}"? / هل أنت متأcker att du vill ta bort "${wordToDelete}"؟`)) return;

    let found = false;
    // Iterate over all themes in wcState.learnedWords
    for (const themeId in wcState.learnedWords) {
        const words = wcState.learnedWords[themeId];
        const index = words.indexOf(wordToDelete);
        if (index > -1) {
            words.splice(index, 1);
            found = true;
            // If theme becomes empty, remove the key
            if (words.length === 0) {
                delete wcState.learnedWords[themeId];
            }
            break;
        }
    }

    if (found) {
        saveProgress();
        showLibrary();
    } else {
        console.error("Word not found to delete:", wordToDelete);
    }
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

// --- AUDIO (Uses Google Translate TTS via Unified Manager) ---
function speakWord(text) {
    // Only speak if TTSManager is available
    if (typeof TTSManager !== 'undefined' && TTSManager && typeof TTSManager.speak === 'function') {
        TTSManager.speak(text);
    } else {
        // Fallback: use browser's built-in speech synthesis
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'sv-SE';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }
}

// Remove local TTS implementations
// playOnlineTTS and playLocalTTS are now handled by unified TTSManager
// initialized in utils.js

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

    // Create Controls Container
    const controlsContainer = document.createElement('div');
    controlsContainer.style.display = 'flex';
    controlsContainer.style.justifyContent = 'flex-end';
    controlsContainer.style.alignItems = 'center';
    controlsContainer.style.gap = '1rem';
    controlsContainer.style.marginBottom = '1rem';

    // Add Clear All Button if there are words
    if (wcState.learnedWords && Object.keys(wcState.learnedWords).length > 0) {
        const clearBtn = document.createElement('button');
        clearBtn.onclick = clearLibrary;
        clearBtn.className = 'wc-lib-clear-btn';
        clearBtn.innerHTML = 'Rensa allt / مسح الكل 🗑️';
        controlsContainer.appendChild(clearBtn);
    }

    // Add Exit Button (Always)
    const exitBtn = document.createElement('button');
    exitBtn.className = 'wc-modal-close-btn';
    exitBtn.onclick = closeLibrary;
    exitBtn.innerHTML = '✕';
    controlsContainer.appendChild(exitBtn);

    content.appendChild(controlsContainer);

    if (!wcState.learnedWords || Object.keys(wcState.learnedWords).length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'wc-empty-library';
        emptyMsg.innerHTML = 'Du har inte samlat några ord än! Spela mer för att fylla ditt bibliotek. <br> لم تجمع أي كلمات بعد! العب المزيد لملء مكتبتك.';
        content.appendChild(emptyMsg);
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
    TTSManager.speak(text);
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

// --- ENHANCED STAGE CELEBRATION ---
function triggerStageCelebration() {
    // 1. Confetti effect - Disabled per user request
    // if (typeof triggerConfetti === 'function') {
    //     triggerConfetti();
    // }

    // 2. Screen flash effect
    const flash = document.createElement('div');
    flash.className = 'celebration-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // 3. Stars burst from center
    createStarBurst();
}

function createStarBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const stars = ['⭐', '🌟', '✨', '💫'];

    for (let i = 0; i < 12; i++) {
        const star = document.createElement('div');
        star.className = 'celebration-star';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];

        // Random position spread
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        star.style.left = centerX + 'px';
        star.style.top = centerY + 'px';
        star.style.setProperty('--endX', (endX - centerX) + 'px');
        star.style.setProperty('--endY', (endY - centerY) + 'px');
        star.style.animationDelay = (i * 50) + 'ms';

        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1200);
    }
}

// ========================================
//  ENHANCED FEATURES SYSTEM
// ========================================

// --- Extended State ---
const wcEnhancedState = {
    // Daily Streak
    dailyStreak: 0,
    lastPlayDate: null,

    // Achievements
    achievements: {
        firstWord: { id: 'firstWord', name: 'أول كلمة', icon: '🎉', unlocked: false },
        tenWords: { id: 'tenWords', name: '10 كلمات', icon: '📚', unlocked: false },
        fiftyWords: { id: 'fiftyWords', name: '50 كلمة', icon: '🏆', unlocked: false },
        firstChapter: { id: 'firstChapter', name: 'فصل كامل', icon: '⭐', unlocked: false },
        weekStreak: { id: 'weekStreak', name: 'أسبوع متواصل', icon: '🔥', unlocked: false },
        speedMaster: { id: 'speedMaster', name: 'سريع البديهة', icon: '⚡', unlocked: false },
        bonusHunter: { id: 'bonusHunter', name: 'صياد البونص', icon: '🎯', unlocked: false },
        perfectLevel: { id: 'perfectLevel', name: 'مستوى مثالي', icon: '💎', unlocked: false }
    },

    // Stats
    stats: {
        totalWords: 0,
        totalPlayTime: 0, // in seconds
        accuracy: 100,
        wrongAttempts: 0,
        correctAttempts: 0,
        weeklyProgress: [0, 0, 0, 0, 0, 0, 0], // last 7 days
        hardestWords: [] // words player struggled with
    },

    // Player Level
    playerLevel: {
        level: 'beginner',
        xp: 0,
        wordsToNextLevel: 50
    },

    // Settings
    speechSpeed: 1.0, // 0.5, 1.0, 1.5
    nightModeAuto: true,

    // Session
    sessionStartTime: Date.now()
};

// --- Load Enhanced State ---
function loadEnhancedState() {
    const saved = localStorage.getItem('wcEnhancedState');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(wcEnhancedState.achievements, parsed.achievements || {});
        Object.assign(wcEnhancedState.stats, parsed.stats || {});
        Object.assign(wcEnhancedState.playerLevel, parsed.playerLevel || {});
        wcEnhancedState.dailyStreak = parsed.dailyStreak || 0;
        wcEnhancedState.lastPlayDate = parsed.lastPlayDate;
        wcEnhancedState.speechSpeed = parsed.speechSpeed || 1.0;
    }

    // Check and update daily streak
    updateDailyStreak();

    // Auto night mode
    if (wcEnhancedState.nightModeAuto) {
        checkNightMode();
    }
}

// --- Save Enhanced State ---
function saveEnhancedState() {
    // Update play time
    wcEnhancedState.stats.totalPlayTime += Math.floor((Date.now() - wcEnhancedState.sessionStartTime) / 1000);
    wcEnhancedState.sessionStartTime = Date.now();

    localStorage.setItem('wcEnhancedState', JSON.stringify({
        achievements: wcEnhancedState.achievements,
        stats: wcEnhancedState.stats,
        playerLevel: wcEnhancedState.playerLevel,
        dailyStreak: wcEnhancedState.dailyStreak,
        lastPlayDate: wcEnhancedState.lastPlayDate,
        speechSpeed: wcEnhancedState.speechSpeed
    }));
}

// ========================================
//  VISUAL EFFECTS
// ========================================

// --- Particle System ---
function createParticles(x, y, count = 10, color = '#a855f7') {
    const container = document.querySelector('.wc-game-container') || document.body;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'wc-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = (3 + Math.random() * 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = color;
        particle.style.animationDuration = (1 + Math.random()) + 's';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');

        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

// --- Star Burst on Word Found ---
function triggerStarBurst(element) {
    const rect = element ? element.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const centerX = rect.left + (rect.width || 0) / 2;
    const centerY = rect.top + (rect.height || 0) / 2;

    const stars = ['⭐', '🌟', '✨', '💫', '🎉'];
    const burst = document.createElement('div');
    burst.className = 'wc-star-burst';
    burst.style.left = centerX + 'px';
    burst.style.top = centerY + 'px';

    for (let i = 0; i < 8; i++) {
        const star = document.createElement('span');
        star.className = 'wc-star';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];

        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        star.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        star.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

        burst.appendChild(star);
    }

    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 1000);
}

// --- Enable Pulsing Glow on Available Letters ---
function enableLetterPulse() {
    document.querySelectorAll('.wc-letter-node:not(.selected)').forEach(node => {
        node.classList.add('pulse-glow');
    });
}

function disableLetterPulse() {
    document.querySelectorAll('.wc-letter-node').forEach(node => {
        node.classList.remove('pulse-glow');
    });
}

// ========================================
//  NIGHT MODE
// ========================================

function checkNightMode() {
    const hour = new Date().getHours();
    const isNight = hour >= 20 || hour < 6;

    const gameContainer = document.getElementById('word-game-module');
    if (gameContainer) {
        if (isNight) {
            gameContainer.classList.add('wc-night-mode');
        } else {
            gameContainer.classList.remove('wc-night-mode');
        }
    }
}

function toggleNightMode() {
    const gameContainer = document.getElementById('word-game-module');
    if (gameContainer) {
        gameContainer.classList.toggle('wc-night-mode');
    }
}

// ========================================
//  DAILY STREAK & REWARDS
// ========================================

function updateDailyStreak() {
    const today = new Date().toDateString();
    const lastPlay = wcEnhancedState.lastPlayDate;

    if (!lastPlay) {
        wcEnhancedState.dailyStreak = 1;
    } else if (lastPlay === today) {
        // Already played today
        return;
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastPlay === yesterday.toDateString()) {
            wcEnhancedState.dailyStreak++;
        } else {
            wcEnhancedState.dailyStreak = 1; // Reset streak
        }
    }

    wcEnhancedState.lastPlayDate = today;

    // Update weekly progress
    const dayIndex = new Date().getDay();
    wcEnhancedState.stats.weeklyProgress[dayIndex]++;

    // Give streak bonus
    const streakBonus = Math.min(wcEnhancedState.dailyStreak * 5, 50);
    wcState.coins += streakBonus;

    // Check streak achievement
    if (wcEnhancedState.dailyStreak >= 7) {
        unlockAchievement('weekStreak');
    }

    saveEnhancedState();
    showStreakBanner();
}

function showStreakBanner() {
    if (wcEnhancedState.dailyStreak < 2) return;

    const existing = document.querySelector('.wc-streak-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'wc-streak-banner';
    banner.innerHTML = `
        <span class="wc-streak-fire">🔥</span>
        <span>${wcEnhancedState.dailyStreak} أيام متتالية!</span>
        <span class="wc-streak-fire">🔥</span>
    `;

    const statsRow = document.querySelector('.wc-stats-row');
    if (statsRow) {
        statsRow.after(banner);
        setTimeout(() => banner.remove(), 5000);
    }
}

// --- Word of the Day ---
function getWordOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const wordIndex = dayOfYear % WC_DICTIONARY.length;
    return WC_DICTIONARY[wordIndex];
}

function showWordOfDay() {
    const word = getWordOfTheDay();
    if (!word) return;

    const container = document.createElement('div');
    container.className = 'wc-word-of-day';
    container.innerHTML = `
        <div class="wc-word-of-day-title">📖 كلمة اليوم / Dagens ord</div>
        <div class="wc-word-of-day-word">${word.w}</div>
        <div class="wc-word-of-day-translation">${word.t}</div>
    `;
    container.onclick = () => {
        speakWord(word.w);
        container.remove();
    };

    const gameContainer = document.querySelector('.wc-game-container');
    if (gameContainer) {
        gameContainer.prepend(container);
    }
}

// ========================================
//  ACHIEVEMENTS SYSTEM
// ========================================

function unlockAchievement(id) {
    const achievement = wcEnhancedState.achievements[id];
    if (!achievement || achievement.unlocked) return;

    achievement.unlocked = true;
    saveEnhancedState();

    // Show notification
    showAchievementNotification(achievement);

    // Bonus coins
    wcState.coins += 20;
    updateCoinDisplay();
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'wc-modal-overlay';
    notification.style.zIndex = '2000';
    notification.innerHTML = `
        <div class="wc-modal-content" style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${achievement.icon}</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #fbbf24;">🏆 إنجاز جديد!</div>
            <div style="font-size: 1rem; color: #e2e8f0; margin-top: 0.5rem;">${achievement.name}</div>
            <div style="font-size: 0.8rem; color: #6ee7b7; margin-top: 0.5rem;">+20 💎</div>
        </div>
    `;
    notification.onclick = () => notification.remove();

    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function checkWordAchievements() {
    const totalWords = wcEnhancedState.stats.totalWords;

    if (totalWords >= 1) unlockAchievement('firstWord');
    if (totalWords >= 10) unlockAchievement('tenWords');
    if (totalWords >= 50) unlockAchievement('fiftyWords');
}

// ========================================
//  ADVANCED HINTS
// ========================================

function showHintMenu() {
    const existing = document.querySelector('.wc-hint-menu');
    if (existing) {
        existing.remove();
        return;
    }

    const menu = document.createElement('div');
    menu.className = 'wc-hint-menu';
    menu.innerHTML = `
        <button class="wc-hint-btn-type" onclick="useAdvancedHint('letter')">
            <span class="hint-icon">🔤</span>
            <span>حرف</span>
            <span class="hint-cost">-5 💎</span>
        </button>
        <button class="wc-hint-btn-type" onclick="useAdvancedHint('meaning')">
            <span class="hint-icon">📖</span>
            <span>معنى</span>
            <span class="hint-cost">-3 💎</span>
        </button>
        <button class="wc-hint-btn-type" onclick="useAdvancedHint('audio')">
            <span class="hint-icon">🔊</span>
            <span>نطق</span>
            <span class="hint-cost">-2 💎</span>
        </button>
    `;

    const hintBtn = document.querySelector('.wc-hint-btn');
    if (hintBtn) {
        hintBtn.after(menu);
    }
}

function useAdvancedHint(type) {
    const costs = { letter: 5, meaning: 3, audio: 2 };
    const cost = costs[type] || 5;

    if (wcState.coins < cost) {
        showToast('عملات غير كافية! / Inte tillräckligt med mynt!', 'error');
        return;
    }

    // Find a word not yet found
    const remainingWords = wcState.currentLevelData.targetWords.filter(
        w => !wcState.foundWords.includes(w.toUpperCase())
    );

    if (remainingWords.length === 0) return;

    const targetWord = remainingWords[0];
    wcState.coins -= cost;
    updateCoinDisplay();
    saveProgress();

    const menu = document.querySelector('.wc-hint-menu');
    if (menu) menu.remove();

    switch (type) {
        case 'letter':
            // Reveal first letter of target word
            const letter = targetWord[0];
            showToast(`الحرف الأول: ${letter}`, 'success');
            // Highlight the letter on the wheel
            document.querySelectorAll('.wc-letter-node').forEach(node => {
                if (node.textContent.trim().toUpperCase() === letter.toUpperCase()) {
                    node.style.boxShadow = '0 0 20px #10b981, 0 0 40px #10b981';
                    setTimeout(() => node.style.boxShadow = '', 3000);
                }
            });
            break;

        case 'meaning':
            // Show Arabic meaning
            const entry = WC_DICTIONARY.find(e => e.w.toUpperCase() === targetWord.toUpperCase());
            if (entry) {
                showToast(`المعنى: ${entry.t}`, 'info');
            }
            break;

        case 'audio':
            // Speak the word
            speakWord(targetWord, 0.7); // Slower speed
            showToast('استمع جيداً! 🔊', 'info');
            break;
    }
}

// ========================================
//  PLAYER LEVEL SYSTEM
// ========================================

function addXP(amount) {
    wcEnhancedState.playerLevel.xp += amount;

    // Level thresholds
    const levels = [
        { name: 'beginner', minXP: 0, title: 'مبتدئ' },
        { name: 'intermediate', minXP: 100, title: 'متوسط' },
        { name: 'expert', minXP: 300, title: 'خبير' },
        { name: 'master', minXP: 600, title: 'محترف' }
    ];

    // Find current level
    for (let i = levels.length - 1; i >= 0; i--) {
        if (wcEnhancedState.playerLevel.xp >= levels[i].minXP) {
            if (wcEnhancedState.playerLevel.level !== levels[i].name) {
                wcEnhancedState.playerLevel.level = levels[i].name;
                showToast(`🎉 ارتقيت إلى مستوى ${levels[i].title}!`, 'success');
            }
            break;
        }
    }

    saveEnhancedState();
}

function getPlayerLevelInfo() {
    const levels = {
        beginner: { title: 'مبتدئ', icon: '🌱', nextXP: 100 },
        intermediate: { title: 'متوسط', icon: '🌿', nextXP: 300 },
        expert: { title: 'خبير', icon: '🌳', nextXP: 600 },
        master: { title: 'محترف', icon: '👑', nextXP: Infinity }
    };
    return levels[wcEnhancedState.playerLevel.level] || levels.beginner;
}

// ========================================
//  STATS DASHBOARD
// ========================================

function showStatsModal() {
    const stats = wcEnhancedState.stats;
    const level = getPlayerLevelInfo();

    // Calculate accuracy
    const totalAttempts = stats.correctAttempts + stats.wrongAttempts;
    const accuracy = totalAttempts > 0 ? Math.round((stats.correctAttempts / totalAttempts) * 100) : 100;

    // Format play time
    const hours = Math.floor(stats.totalPlayTime / 3600);
    const minutes = Math.floor((stats.totalPlayTime % 3600) / 60);
    const timeStr = hours > 0 ? `${hours}س ${minutes}د` : `${minutes} دقيقة`;

    const modal = document.createElement('div');
    modal.className = 'wc-modal-overlay';
    modal.innerHTML = `
        <div class="wc-modal-content wc-stats-dashboard">
            <div class="wc-modal-header">
                <h3>📊 الإحصائيات / Statistik</h3>
                <button class="wc-modal-close" onclick="this.closest('.wc-modal-overlay').remove()">✕</button>
            </div>
            
            <!-- Player Level -->
            <div class="wc-player-level" style="justify-content: center; margin-bottom: 1rem;">
                <span class="wc-level-badge wc-level-${wcEnhancedState.playerLevel.level}">${level.icon}</span>
                <span class="wc-level-text">${level.title} (${wcEnhancedState.playerLevel.xp} XP)</span>
            </div>
            
            <!-- Weekly Chart -->
            <div class="wc-stats-chart">
                ${stats.weeklyProgress.map((val, i) =>
        `<div class="wc-stat-bar" style="height: ${Math.min(val * 10, 100)}%"></div>`
    ).join('')}
            </div>
            
            <!-- Stats Grid -->
            <div class="wc-stats-grid">
                <div class="wc-stat-item">
                    <span class="wc-stat-value">${stats.totalWords}</span>
                    <span class="wc-stat-label">كلمات مكتسبة</span>
                </div>
                <div class="wc-stat-item">
                    <span class="wc-stat-value">${accuracy}%</span>
                    <span class="wc-stat-label">نسبة الدقة</span>
                </div>
                <div class="wc-stat-item">
                    <span class="wc-stat-value">${timeStr}</span>
                    <span class="wc-stat-label">وقت اللعب</span>
                </div>
                <div class="wc-stat-item">
                    <span class="wc-stat-value">${wcEnhancedState.dailyStreak}</span>
                    <span class="wc-stat-label">أيام متتالية 🔥</span>
                </div>
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
}

// ========================================
//  ACHIEVEMENTS MODAL
// ========================================

function showAchievementsModal() {
    const achievements = wcEnhancedState.achievements;

    const modal = document.createElement('div');
    modal.className = 'wc-modal-overlay';
    modal.innerHTML = `
        <div class="wc-modal-content">
            <div class="wc-modal-header">
                <h3>🏆 الإنجازات / Prestationer</h3>
                <button class="wc-modal-close" onclick="this.closest('.wc-modal-overlay').remove()">✕</button>
            </div>
            <div class="wc-achievements-grid">
                ${Object.values(achievements).map(a => `
                    <div class="wc-achievement-badge ${a.unlocked ? 'unlocked' : 'locked'}">
                        <span class="wc-achievement-icon">${a.icon}</span>
                        <span class="wc-achievement-name">${a.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    document.body.appendChild(modal);
}

// ========================================
//  SPEECH SPEED CONTROL
// ========================================

function speakWord(word, speed = null) {
    if (!window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'sv-SE';
    utterance.rate = speed || wcEnhancedState.speechSpeed;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function setSpeechSpeed(speed) {
    wcEnhancedState.speechSpeed = speed;
    saveEnhancedState();

    document.querySelectorAll('.wc-speed-btn').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
    });
}

// ========================================
//  PROGRESS BAR
// ========================================

function updateProgressBar() {
    const progressContainer = document.querySelector('.wc-progress-bar-container');
    if (!progressContainer) return;

    const total = wcState.currentLevelData?.targetWords?.length || 1;
    const found = wcState.foundWords?.length || 0;
    const percent = Math.round((found / total) * 100);

    const fill = progressContainer.querySelector('.wc-progress-bar-fill');
    const text = progressContainer.querySelector('.wc-progress-text');

    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = `${found}/${total} كلمات`;
}

// ========================================
//  ENHANCED WORD FOUND HANDLER
// ========================================

function onWordFoundEnhanced(word) {
    // Update stats
    wcEnhancedState.stats.totalWords++;
    wcEnhancedState.stats.correctAttempts++;

    // Add XP
    addXP(word.length * 2);

    // Visual effects
    const wordDisplay = document.querySelector('.wc-current-word-display');
    if (wordDisplay) {
        triggerStarBurst(wordDisplay);
        // createParticles(wordDisplay.offsetLeft + wordDisplay.offsetWidth / 2, wordDisplay.offsetTop, 15);
    }

    // Check achievements
    checkWordAchievements();

    // Update progress bar
    updateProgressBar();

    // Save
    saveEnhancedState();
}

// ========================================
//  INITIALIZE ENHANCEMENTS
// ========================================

function initEnhancements() {
    loadEnhancedState();

    // Add progress bar to UI
    const wordGrid = document.querySelector('.wc-word-grid');
    if (wordGrid && !document.querySelector('.wc-progress-bar-container')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'wc-progress-bar-container';
        progressBar.innerHTML = `
            <div class="wc-progress-bar-fill" style="width: 0%"></div>
        `;
        const progressText = document.createElement('div');
        progressText.className = 'wc-progress-text';
        progressText.textContent = '0/0 كلمات';

        wordGrid.before(progressBar);
        progressBar.after(progressText);
    }

    // Pulse glow removed per user request
    // setTimeout(enableLetterPulse, 1000);

    // Show word of day (first time only)
    const today = new Date().toDateString();
    if (localStorage.getItem('wcWordOfDayShown') !== today) {
        setTimeout(showWordOfDay, 2000);
        localStorage.setItem('wcWordOfDayShown', today);
    }
}

// Hook into existing init
const originalInit = initWordConnect;
initWordConnect = function () {
    originalInit();
    setTimeout(initEnhancements, 500);
};

// --- PARTICLE SYSTEMS ---
function createParticleExplosion(x, y, color) {
    const particleCount = 20;
    const container = document.body;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'wc-particle';
        p.style.backgroundColor = color;
        p.style.left = x + 'px';
        p.style.top = y + 'px';

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';

        p.style.setProperty('--tx', tx);
        p.style.setProperty('--ty', ty);

        p.style.animation = `particle-explode 0.8s ease-out forwards`;

        container.appendChild(p);

        // Cleanup
        setTimeout(() => p.remove(), 800);
    }
}

// ========================================
//  DRAG TRAIL EFFECT SYSTEM
// ========================================

const dragTrail = {
    canvas: null,
    ctx: null,
    points: [],
    isActive: false,
    animationFrame: null,

    init() {
        this.canvas = document.getElementById('wcDragTrailCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // استمع لتغيير حجم النافذة
        window.addEventListener('resize', () => this.resize());
    },

    resize() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },

    addPoint(x, y) {
        // تحويل الإحداثيات النسبية للـ canvas
        if (!this.canvas) return;

        const rect = this.canvas.getBoundingClientRect();
        const canvasX = x - rect.left;
        const canvasY = y - rect.top;

        this.points.push({
            x: canvasX,
            y: canvasY,
            alpha: 1,
            size: 8
        });

        // الحد الأقصى للنقاط
        if (this.points.length > 50) {
            this.points.shift();
        }

        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    },

    animate() {
        if (!this.ctx || !this.canvas) return;

        // مسح الـ canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // رسم النقاط
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];

            // تلاشي تدريجي
            point.alpha -= 0.03;
            point.size *= 0.97;

            if (point.alpha <= 0) {
                this.points.splice(i, 1);
                i--;
                continue;
            }

            // رسم النقطة المتوهجة
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);

            // تدرج لوني للتوهج
            const gradient = this.ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, point.size
            );
            gradient.addColorStop(0, `rgba(34, 211, 238, ${point.alpha})`);
            gradient.addColorStop(0.5, `rgba(99, 102, 241, ${point.alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(34, 211, 238, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }

        // رسم خط بين النقاط
        if (this.points.length > 1) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.points[0].x, this.points[0].y);

            for (let i = 1; i < this.points.length; i++) {
                this.ctx.lineTo(this.points[i].x, this.points[i].y);
            }

            this.ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
            this.ctx.lineWidth = 2;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
        }

        // استمرار الحركة
        if (this.points.length > 0) {
            this.animationFrame = requestAnimationFrame(() => this.animate());
        } else {
            this.isActive = false;
        }
    },

    clear() {
        this.points = [];
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.isActive = false;
    }
};

// تهيئة عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => dragTrail.init(), 500);
});

// ========================================
//  HAND TUTORIAL SYSTEM
// ========================================

const handTutorial = {
    element: null,
    hasPlayed: false,

    init() {
        this.element = document.getElementById('wcHandTutorial');

        // تحقق إذا كان المستخدم قد رأى التلميح من قبل
        this.hasPlayed = localStorage.getItem('wcTutorialSeen') === 'true';

        if (!this.hasPlayed && this.element) {
            // أظهر التلميح بعد 2 ثانية
            setTimeout(() => this.show(), 2000);
        }
    },

    show() {
        if (!this.element || this.hasPlayed) return;
        this.element.classList.add('active');
    },

    hide() {
        if (!this.element) return;
        this.element.classList.remove('active');

        // احفظ أن المستخدم رأى التلميح
        this.hasPlayed = true;
        localStorage.setItem('wcTutorialSeen', 'true');
    }
};

// إخفاء التلميح عند أول سحب
document.addEventListener('touchstart', () => handTutorial.hide(), { once: true });
document.addEventListener('mousedown', () => handTutorial.hide(), { once: true });

// تهيئة عند تحميل اللعبة
const originalInitWC = initWordConnect;
initWordConnect = function () {
    originalInitWC.call(this);
    setTimeout(() => handTutorial.init(), 1000);

    // عرض عجلة الحظ اليومية إذا لم يتم استخدامها اليوم
    setTimeout(() => checkDailyWheel(), 2000);
};

// ========================================
//  DAILY WHEEL SYSTEM
// ========================================

const DAILY_WHEEL_PRIZES = [10, 25, 5, 50, 15, 100];

function checkDailyWheel() {
    const lastSpin = localStorage.getItem('wcLastDailyWheelSpin');
    const today = new Date().toDateString();

    if (lastSpin !== today) {
        // أظهر العجلة بعد تأخير
        showDailyWheel();
    }
}

function showDailyWheel() {
    const modal = document.getElementById('wcDailyWheelModal');
    if (modal) {
        modal.classList.remove('hidden');

        // إعادة تعيين العجلة
        const wheel = document.getElementById('wcDailyWheel');
        if (wheel) {
            wheel.classList.remove('spinning');
            wheel.style.transform = 'rotate(0deg)';
        }

        const spinBtn = document.getElementById('wcSpinBtn');
        if (spinBtn) spinBtn.disabled = false;
    }
}

function closeDailyWheel() {
    const modal = document.getElementById('wcDailyWheelModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function spinDailyWheel() {
    const wheel = document.getElementById('wcDailyWheel');
    const spinBtn = document.getElementById('wcSpinBtn');

    if (!wheel || !spinBtn) return;

    // تعطيل الزر
    spinBtn.disabled = true;

    // اختيار جائزة عشوائية
    const prizeIndex = Math.floor(Math.random() * DAILY_WHEEL_PRIZES.length);
    const prize = DAILY_WHEEL_PRIZES[prizeIndex];

    // حساب الدوران
    // كل قطعة = 60 درجة
    // نريد أن تتوقف العجلة عند القطعة المختارة
    const segmentAngle = 60;
    const targetAngle = prizeIndex * segmentAngle + segmentAngle / 2;
    const fullRotations = 5 * 360; // 5 دورات كاملة
    const finalRotation = fullRotations + (360 - targetAngle);

    // تطبيق الدوران
    wheel.style.setProperty('--spin-degrees', `${finalRotation}deg`);
    wheel.classList.add('spinning');

    // بعد انتهاء الدوران
    setTimeout(() => {
        // إضافة الجائزة
        wcState.coins += prize;
        saveProgress();
        updateCoinDisplay();

        // إظهار رسالة
        showToast(`🎉 فزت بـ ${prize} عملة! / Du vann ${prize} mynt!`, 'success');

        // تشغيل صوت النجاح
        if (typeof soundManager !== 'undefined' && soundManager.playSuccess) {
            soundManager.playSuccess();
        }

        // حفظ تاريخ آخر دوران
        localStorage.setItem('wcLastDailyWheelSpin', new Date().toDateString());

        // إغلاق النافذة بعد تأخير
        setTimeout(() => closeDailyWheel(), 2000);

    }, 4500); // 4.5 ثانية (أطول من مدة الانتقال 4s)
}
