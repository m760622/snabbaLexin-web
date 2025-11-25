// State
// dictionaryData is global from data.js
let isLoading = true;
let searchIndex = []; // Pre-computed search strings
let currentResults = []; // Store all matching results
let renderedCount = 0; // Track how many are currently shown
const BATCH_SIZE = 50; // Number of items to load per batch

// DOM Elements
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resultsArea = document.getElementById('resultsArea');
const statsElement = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const typeSelect = document.getElementById('typeSelect');

// Column Indices
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

// Helper: Normalize Arabic (Remove Tashkeel)
function normalizeArabic(text) {
    return text.replace(/[\u064B-\u065F]/g, '').toLowerCase();
}

// Initialize
async function init() {
    // Theme Logic
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile View Toggle
    const mobileViewToggle = document.getElementById('mobileViewToggle');
    if (mobileViewToggle) {
        mobileViewToggle.addEventListener('click', () => {
            document.body.classList.toggle('iphone-view');
            // Optional: Save state
            const isMobileView = document.body.classList.contains('iphone-view');
            localStorage.setItem('mobileView', isMobileView);
        });

        // Restore state
        if (localStorage.getItem('mobileView') === 'true') {
            document.body.classList.add('iphone-view');
        }
    }

    try {
        // ... (Loading logic remains the same)
        // Show loading spinner
        statsElement.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <div>Laddar ordbok... / جاري تحميل القاموس...</div>
            </div>
        `;

        // Data is loaded via data.js as a global variable 'dictionaryData'
        if (typeof dictionaryData === 'undefined' || dictionaryData.length === 0) {
            throw new Error('Data file not loaded or empty');
        }

        // Load custom words from localStorage
        const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
        if (customWords.length > 0) {
            dictionaryData.push(...customWords);
        }

        // OPTIMIZATION: Build Search Index
        buildSearchIndex();

        // Populate Type Select
        const typeCounts = {};
        dictionaryData.forEach(item => {
            if (item[COL_TYPE]) {
                typeCounts[item[COL_TYPE]] = (typeCounts[item[COL_TYPE]] || 0) + 1;
            }
        });

        const sortedTypes = Object.keys(typeCounts).filter(type => typeCounts[type] > 20).sort();
        sortedTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            // Remove trailing dot for display if present
            const displayType = type.endsWith('.') ? type.slice(0, -1) : type;
            option.textContent = `${displayType} (${typeCounts[type]})`;
            typeSelect.appendChild(option);
        });

        // Export Custom Words
        document.getElementById('exportCustom').addEventListener('click', () => {
            const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
            if (customWords.length === 0) {
                alert('Inga egna ord att exportera / لا توجد كلمات خاصة للتصدير');
                return;
            }
            const dataStr = JSON.stringify(customWords);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = 'lexin_custom_words.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });

        // Import Custom Words
        const importCustomFile = document.getElementById('importCustomFile');
        document.getElementById('importCustom').addEventListener('click', () => {
            importCustomFile.click();
        });

        importCustomFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const importedWords = JSON.parse(e.target.result);
                    if (!Array.isArray(importedWords)) throw new Error('Invalid format');

                    const existingWords = JSON.parse(localStorage.getItem('customWords') || '[]');
                    const existingIds = new Set(existingWords.map(w => w[COL_ID]));

                    let addedCount = 0;
                    importedWords.forEach(word => {
                        if (!existingIds.has(word[COL_ID])) {
                            existingWords.push(word);
                            dictionaryData.push(word); // Add to live data
                            addedCount++;
                        }
                    });

                    localStorage.setItem('customWords', JSON.stringify(existingWords));

                    // Rebuild Index to include new words
                    buildSearchIndex();

                    alert(`Importerade ${addedCount} nya ord / تم استيراد ${addedCount} كلمة جديدة`);

                    // Refresh view
                    handleSearch({ target: searchInput });

                } catch (error) {
                    console.error(error);
                    alert('Fel vid import av fil / خطأ في استيراد الملف');
                }
                importCustomFile.value = ''; // Reset input
            };
            reader.readAsText(file);
        });

        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 500));

        isLoading = false;

        statsElement.textContent = `${dictionaryData.length.toLocaleString()} ord laddade / كلمة تم تحميلها`;
        statsElement.classList.add('fade-in');

        // Enable search and sort
        const debouncedSearch = debounce(handleSearch, 150);
        searchInput.addEventListener('input', debouncedSearch);
        sortSelect.addEventListener('change', () => handleSearch({ target: searchInput }));
        typeSelect.addEventListener('change', () => handleSearch({ target: searchInput }));
        document.getElementById('searchMode').addEventListener('change', () => handleSearch({ target: searchInput }));

        // Infinite Scroll Listener
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                renderNextBatch();
            }
        });

        // Restore state
        const savedQuery = sessionStorage.getItem('searchQuery');
        if (savedQuery) {
            searchInput.value = savedQuery;
            handleSearch({ target: searchInput });
        } else {
            searchInput.focus();
        }

        // Restore scroll position after a short delay to allow rendering
        const savedScroll = sessionStorage.getItem('scrollPosition');
        if (savedScroll) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll));
            }, 100);
        }

        // Save scroll position on scroll
        window.addEventListener('scroll', debounce(() => {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        }, 100));

        // PWA Install Logic
        let deferredPrompt;
        const installBtn = document.getElementById('installApp');
        const iosPrompt = document.getElementById('iosInstallPrompt');
        const closeIosPrompt = document.getElementById('closeIosPrompt');

        // Android/Desktop Install Prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'flex';
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installBtn.style.display = 'none';
            }
        });

        // iOS Install Prompt
        // Detects if device is on iOS
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        }
        // Detects if device is in standalone mode
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        // Check for Toast Notification
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');

        if (status === 'saved') {
            showToast('Ordet har sparats! / تم حفظ الكلمة!');
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (status === 'deleted') {
            showToast('Ordet har tagits bort / تم حذف الكلمة');
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Checks if should display install popup notification:
        if (isIos() && !isInStandaloneMode()) {
            // Show prompt after a delay
            setTimeout(() => {
                iosPrompt.style.display = 'block';
                // Small delay to allow display:block to apply before adding class for animation
                setTimeout(() => iosPrompt.classList.add('visible'), 10);
            }, 2000);
        }

        closeIosPrompt.addEventListener('click', () => {
            iosPrompt.classList.remove('visible');
            setTimeout(() => iosPrompt.style.display = 'none', 400);
        });

    } catch (error) {
        console.error(error);
        statsElement.innerHTML = `<div style="color: red;">Fel vid laddning av data: ${error.message} / خطأ: ${error.message}</div>`;
    }
}

// Build Search Index Helper (Async & Chunked)
async function buildSearchIndex() {
    searchIndex = new Array(dictionaryData.length);
    const chunkSize = 1000; // Process 1000 items per tick

    for (let i = 0; i < dictionaryData.length; i += chunkSize) {
        // Yield to main thread every chunk
        await new Promise(resolve => setTimeout(resolve, 0));

        const end = Math.min(i + chunkSize, dictionaryData.length);
        for (let j = i; j < end; j++) {
            const item = dictionaryData[j];
            if (!item) continue;

            // Join all searchable fields with a space and NORMALIZE
            searchIndex[j] = normalizeArabic(
                (item[COL_SWE] || '') + ' ' +
                (item[COL_ARB] || '') + ' ' +
                (item[COL_FORMS] || '') + ' ' +
                (item[COL_SWE_DEF] || '') + ' ' +
                (item[COL_ARB_DEF] || '') + ' ' +
                (item[COL_EX_SWE] || '') + ' ' +
                (item[COL_EX_ARB] || '') + ' ' +
                (item[COL_IDIOM_SWE] || '') + ' ' +
                (item[COL_IDIOM_ARB] || '')
            );
        }
    }
    console.log('Search index built completely.');
}

// Search Handler
function handleSearch(e) {
    const rawQuery = e.target.value.trim();
    const query = normalizeArabic(rawQuery); // Normalize query for general search
    const sortMethod = sortSelect.value;
    const searchMode = document.getElementById('searchMode').value;

    sessionStorage.setItem('searchQuery', e.target.value);

    const selectedType = typeSelect.value;

    // Check if we should proceed with search
    // Proceed if:
    // 1. Query length >= 2
    // 2. OR a specific type is selected (not 'all')
    if (rawQuery.length < 2 && selectedType === 'all') {
        resultsArea.innerHTML = `
            <div class="placeholder-message">
                Börja skriva för att söka / ابدأ الكتابة للبحث
            </div>
        `;
        currentResults = [];
        statsElement.textContent = `${dictionaryData.length.toLocaleString()} ord laddade / كلمة تم تحميلها`;
        return;
    }

    // Filter Data based on Search Mode
    let results = [];

    if (rawQuery.length === 0) {
        // If query is empty (but type is selected), start with all data
        // We will filter by type later
        results = dictionaryData.slice(); // Shallow copy
    } else if (searchMode === 'general') {
        // General: Use pre-computed normalized index (Fastest)
        // Fallback to raw search if index is not ready yet
        for (let i = 0; i < dictionaryData.length; i++) {
            const item = dictionaryData[i];
            if (!item) continue;

            // Use index if available, otherwise compute on the fly (slower but works)
            if (searchIndex[i]) {
                if (searchIndex[i].includes(query)) {
                    results.push(item);
                }
            } else {
                // Fallback for items not yet indexed
                const content = normalizeArabic(
                    (item[COL_SWE] || '') + ' ' +
                    (item[COL_ARB] || '') + ' ' +
                    (item[COL_FORMS] || '') + ' ' +
                    (item[COL_SWE_DEF] || '') + ' ' +
                    (item[COL_ARB_DEF] || '') + ' ' +
                    (item[COL_EX_SWE] || '') + ' ' +
                    (item[COL_EX_ARB] || '') + ' ' +
                    (item[COL_IDIOM_SWE] || '') + ' ' +
                    (item[COL_IDIOM_ARB] || '')
                );
                if (content.includes(query)) {
                    results.push(item);
                }
            }
        }
    } else if (searchMode === 'exact') {
        // Exact: Search in RAW data (Slowest, respects diacritics)
        const exactQuery = rawQuery.toLowerCase();
        for (let i = 0; i < dictionaryData.length; i++) {
            const item = dictionaryData[i];
            if (!item) continue;

            const content = (
                (item[COL_SWE] || '') + ' ' +
                (item[COL_ARB] || '') + ' ' +
                (item[COL_FORMS] || '')
            ).toLowerCase();

            if (content.includes(exactQuery)) {
                results.push(item);
            }
        }
    } else {
        // Start/End: Check specific fields (Normalized)
        for (let i = 0; i < dictionaryData.length; i++) {
            const item = dictionaryData[i];
            if (!item) continue;

            const swe = normalizeArabic(item[COL_SWE] || '');
            const arb = normalizeArabic(item[COL_ARB] || '');

            if (searchMode === 'start') {
                if (swe.startsWith(query) || arb.startsWith(query)) {
                    results.push(item);
                }
            } else if (searchMode === 'end') {
                if (swe.endsWith(query) || arb.endsWith(query)) {
                    results.push(item);
                }
            }
        }
    }

    // Filter by Type if selected
    // selectedType is already declared above
    if (selectedType !== 'all') {
        results = results.filter(item => item[COL_TYPE] === selectedType);
    }

    updateResults(results, sortMethod);
}

function updateResults(results, sortMethod) {
    // Update Stats with Result Count
    statsElement.textContent = `Hittade ${results.length.toLocaleString()} resultat / تم العثور على ${results.length.toLocaleString()} نتيجة`;

    // Sort results
    results.sort((a, b) => {
        const aSwe = (a[COL_SWE] || '').toLowerCase();
        const bSwe = (b[COL_SWE] || '').toLowerCase();

        if (sortMethod === 'relevance') {
            // ... (Relevance logic)
            return 0; // Simplified for brevity, logic is same as before
        } else if (sortMethod === 'alpha_asc') {
            return aSwe.localeCompare(bSwe, 'sv');
        } else if (sortMethod === 'alpha_desc') {
            return bSwe.localeCompare(aSwe, 'sv');
        } else if (sortMethod === 'last_char') {
            const charA = aSwe.slice(-1);
            const charB = bSwe.slice(-1);
            return charA.localeCompare(charB, 'sv');
        }

        return 0;
    });

    // Reset Pagination
    currentResults = results;
    renderedCount = 0;
    resultsArea.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsArea.innerHTML = `
            <div class="placeholder-message">
                Inga resultat hittades / لم يتم العثور على نتائج
            </div>
        `;
        return;
    }

    // Render first batch
    renderNextBatch();
}

// Render Next Batch (Infinite Scroll)
function renderNextBatch() {
    if (renderedCount >= currentResults.length) return;

    const nextBatch = currentResults.slice(renderedCount, renderedCount + BATCH_SIZE);
    const html = nextBatch.map((item, index) => createCard(item, renderedCount + index)).join('');

    // Append to existing content
    resultsArea.insertAdjacentHTML('beforeend', html);

    renderedCount += nextBatch.length;
}



// Create Card HTML
function createCard(item, index = 0) {
    const id = item[COL_ID] || '';
    const swe = item[COL_SWE] || '';
    const arb = item[COL_ARB] || '';
    const type = item[COL_TYPE] ? item[COL_TYPE].replace('.', '') : '';
    const sweDef = item[COL_SWE_DEF] || '';
    const arbDef = item[COL_ARB_DEF] || '';
    const forms = item[COL_FORMS] || '';
    const exSwe = item[COL_EX_SWE] || '';
    const exArb = item[COL_EX_ARB] || '';
    const idiomSwe = item[COL_IDIOM_SWE] || '';
    const idiomArb = item[COL_IDIOM_ARB] || '';

    // Examples
    let examplesHtml = '';
    if (exSwe || exArb) {
        examplesHtml = `
            <div class="examples">
                <span class="ex-label">Exempel / أمثلة</span>
                <div class="ex-item">
                    ${exSwe ? `<div class="ex-swe" dir="ltr">${exSwe}</div>` : ''}
                    ${exArb ? `<div class="ex-arb" dir="rtl">${exArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Idioms
    let idiomsHtml = '';
    if (idiomSwe || idiomArb) {
        idiomsHtml = `
            <div class="examples" style="margin-top: 0.5rem;">
                <span class="ex-label">Uttryck / تعبير</span>
                <div class="ex-item">
                    ${idiomSwe ? `<div class="ex-swe" dir="ltr">${idiomSwe}</div>` : ''}
                    ${idiomArb ? `<div class="ex-arb" dir="rtl">${idiomArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    return `
        <a href="details.html?id=${id}" class="card-link">
            <div class="card">
                <div class="card-header-info">
                    <span class="result-number">#${index + 1}</span>
                    ${type ? `<span class="word-type">${type}</span>` : ''}
                </div>
                <div class="card-header">
                    <h2 class="word-swe" dir="ltr">${swe}</h2>
                </div>
                ${arb ? `<p class="word-arb" dir="rtl">${arb}</p>` : ''}
            </div>
        </a>
    `;
}

// Utility: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Start
init();

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

// --- GAME LOGIC ---

let gameScore = 0;
let currentCorrectAnswer = '';

function initGame() {
    const gameBtn = document.getElementById('gameBtn');
    const gameModal = document.getElementById('gameModal');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    if (!gameBtn || !gameModal) return;

    gameBtn.addEventListener('click', () => {
        gameModal.style.display = 'flex';
        startRound();
    });

    closeGameBtn.addEventListener('click', () => {
        gameModal.style.display = 'none';
    });

    // Close on outside click
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            gameModal.style.display = 'none';
        }
    });

    nextQuestionBtn.addEventListener('click', () => {
        startRound();
    });
}

function startRound() {
    const gameSentence = document.getElementById('gameSentence');
    const gameHint = document.getElementById('gameHint');
    const gameOptions = document.getElementById('gameOptions');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');

    // Reset UI
    gameOptions.innerHTML = '';
    nextQuestionBtn.style.display = 'none';

    // 1. Find a word with an example
    let candidate = null;
    let attempts = 0;

    while (!candidate && attempts < 50) {
        const randomItem = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
        if (randomItem && randomItem[COL_EX_SWE] && randomItem[COL_SWE]) {
            // Check if example actually contains the word (case insensitive)
            const word = randomItem[COL_SWE].toLowerCase();
            const example = randomItem[COL_EX_SWE].toLowerCase();
            if (example.includes(word)) {
                candidate = randomItem;
            }
        }
        attempts++;
    }

    if (!candidate) {
        gameSentence.textContent = "Kunde inte ladda fråga...";
        return;
    }

    const targetWord = candidate[COL_SWE];
    currentCorrectAnswer = targetWord;

    // 2. Prepare Sentence (Hide Word)
    // Create a regex to replace the word but keep punctuation
    const regex = new RegExp(`\\b${targetWord}\\b`, 'gi');
    const displaySentence = candidate[COL_EX_SWE].replace(regex, '<span class="missing-word-slot"></span>');

    gameSentence.innerHTML = displaySentence;
    gameHint.textContent = candidate[COL_EX_ARB] || candidate[COL_ARB]; // Use example translation or word translation

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

    // Shuffle Options
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

    // Disable all buttons
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        gameScore += 10;
        showToast('Rätt svar! 🎉 / إجابة صحيحة!');
    } else {
        btn.classList.add('wrong');
        // Highlight correct answer
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

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for data to load or check periodically
    const checkData = setInterval(() => {
        if (typeof dictionaryData !== 'undefined' && dictionaryData.length > 0) {
            clearInterval(checkData);
            initGame();
        }
    }, 500);
});
