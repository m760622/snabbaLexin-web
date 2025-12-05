// State
// dictionaryData is global from data.js
let isLoading = true;
let searchIndex = []; // Pre-computed search strings
let currentResults = []; // Store all matching results
let renderedCount = 0; // Track how many are currently shown
let favorites = new Set(); // Store favorite IDs
const BATCH_SIZE = 50; // Number of items to load per batch

// Quiz State
let quizQuestions = [];
let currentQuestionIndex = 0;
let currentQuestion = null;

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
const COL_DEF = 5; // Swedish Definition
const COL_FORMS = 6;
const COL_EX = 7; // Swedish Example
const COL_EX_ARB = 8;
const COL_IDIOM = 9; // Swedish Idiom
const COL_IDIOM_ARB = 10;

// Helper: Normalize Arabic (Remove Tashkeel)
function normalizeArabic(text) {
    return text.replace(/[\u064B-\u065F]/g, '').toLowerCase();
}

// Helper: Get Grammar Badge for Swedish words
function getGrammarBadge(type, forms) {
    const normalizedType = (type || '').toLowerCase().replace('.', '');

    // For nouns (Substantiv) - detect En/Ett gender
    if (normalizedType === 'subst' || normalizedType === 'substantiv') {
        const formsLower = (forms || '').toLowerCase();
        if (formsLower.match(/\ben\s+\w+/i) || formsLower.startsWith('en ') || formsLower.includes(', en ')) {
            return '<span class="grammar-badge grammar-en">En</span>';
        } else if (formsLower.match(/\bett\s+\w+/i) || formsLower.startsWith('ett ') || formsLower.includes(', ett ')) {
            return '<span class="grammar-badge grammar-ett">Ett</span>';
        }
        if (formsLower.includes('en,') || formsLower.match(/\w+en[,\s]/)) {
            return '<span class="grammar-badge grammar-en">En</span>';
        }
        if (formsLower.includes('et,') || formsLower.match(/\w+et[,\s]/)) {
            return '<span class="grammar-badge grammar-ett">Ett</span>';
        }
    }

    // For verbs - show verb conjugation pattern
    if (normalizedType === 'verb') {
        const formsLower = (forms || '').toLowerCase();
        if (formsLower.match(/\w+ar[,\s]/i) && formsLower.match(/\w+ade[,\s]/i)) {
            return '<span class="grammar-badge grammar-verb">Gr. 1</span>';
        }
        if (formsLower.match(/\w+er[,\s]/i) && formsLower.match(/\w+de[,\s]/i)) {
            return '<span class="grammar-badge grammar-verb">Gr. 2</span>';
        }
        if (formsLower.match(/\w+dde[,\s]/i)) {
            return '<span class="grammar-badge grammar-verb">Gr. 3</span>';
        }
        if (formsLower.match(/\w+it[,\s]|it$/i)) {
            return '<span class="grammar-badge grammar-verb">Gr. 4</span>';
        }
    }

    return '';
}

// Helper: Get word type category for color-coding
function getWordTypeCategory(type) {
    const normalizedType = (type || '').toLowerCase().replace('.', '');

    if (normalizedType === 'verb') return 'verb';
    if (normalizedType === 'subst' || normalizedType === 'substantiv') return 'noun';
    if (normalizedType === 'adj' || normalizedType === 'adjektiv') return 'adj';
    if (normalizedType === 'adv' || normalizedType === 'adverb') return 'adv';
    if (normalizedType === 'prep' || normalizedType === 'preposition') return 'prep';
    if (normalizedType === 'konj' || normalizedType === 'konjunktion') return 'conj';

    return 'other';
}

// Copy Word Function
window.copyWord = function (word, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    navigator.clipboard.writeText(word).then(() => {
        showToast('Kopierad! / تم النسخ! 📋');
    }).catch(() => {
        showToast('Kunde inte kopiera / فشل النسخ');
    });
};

// Initialize

async function init() {
    // Theme Logic
    const savedTheme = localStorage.getItem('theme') || 'dark';

    // Load Favorites
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = new Set(JSON.parse(savedFavorites));
    }
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

    // PWA Install Prompt Logic (consolidated)
    let deferredPrompt;
    const pwaPrompt = document.getElementById('pwa-install-prompt');
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const laterBtn = document.getElementById('pwa-later-btn');
    const installAppBtn = document.getElementById('installApp');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        if (pwaPrompt) {
            pwaPrompt.style.display = 'block';
        }
        if (installAppBtn) {
            installAppBtn.style.display = 'flex';
        }
    });

    // PWA Install Button Handler
    if (pwaInstallBtn) {
        pwaInstallBtn.addEventListener('click', async () => {
            if (pwaPrompt) {
                pwaPrompt.style.display = 'none';
            }
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                if (installAppBtn) {
                    installAppBtn.style.display = 'none';
                }
            }
        });
    }

    // Alternative install button (for header)
    if (installAppBtn) {
        installAppBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
                installAppBtn.style.display = 'none';
            }
        });
    }

    if (laterBtn) {
        laterBtn.addEventListener('click', () => {
            if (pwaPrompt) {
                pwaPrompt.style.display = 'none';
            }
        });
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

        // Show Favorites Button
        document.getElementById('showFavoritesBtn').addEventListener('click', () => {
            const searchModeSelect = document.getElementById('searchMode');
            searchModeSelect.value = 'favorites';
            handleSearch({ target: searchInput });

            // Close settings menu
            const settingsMenu = document.querySelector('.settings-menu');
            if (settingsMenu) {
                settingsMenu.style.display = 'none';
                setTimeout(() => settingsMenu.style.display = '', 100); // Reset after delay to allow re-opening
            }
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

        // Delight: Pulse Search Bar on Load
        setTimeout(() => {
            searchInput.classList.add('pulse-on-load');
        }, 500);

        // Clear Button Logic
        const clearSearch = document.getElementById('clearSearch');
        if (clearSearch) {
            searchInput.addEventListener('input', () => {
                clearSearch.style.display = searchInput.value ? 'flex' : 'none';
            });

            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
                clearSearch.style.display = 'none';
                updateResults();
            });
        }

        // Search Listener
        searchInput.addEventListener('input', debounce(() => {
            updateResults();
        }, 300));

        // Sort Listener
        sortSelect.addEventListener('change', () => {
            updateResults();
        });

        // Type Filter Listener
        typeSelect.addEventListener('change', () => {
            updateResults();
        });

        // Initialize Word of the Day
        initWordOfTheDay();

        // Infinite Scroll Listener
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                renderNextBatch();
            }
        });

        // Save scroll position (debounced)
        window.addEventListener('scroll', debounce(() => {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        }, 100));

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

        // iOS Install Prompt
        const iosPrompt = document.getElementById('iosInstallPrompt');
        const closeIosPrompt = document.getElementById('closeIosPrompt');

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
        if (iosPrompt && closeIosPrompt && isIos() && !isInStandaloneMode()) {
            // Show prompt after a delay
            setTimeout(() => {
                iosPrompt.style.display = 'block';
                // Small delay to allow display:block to apply before adding class for animation
                setTimeout(() => iosPrompt.classList.add('visible'), 10);
            }, 2000);

            closeIosPrompt.addEventListener('click', () => {
                iosPrompt.classList.remove('visible');
                setTimeout(() => iosPrompt.style.display = 'none', 400);
            });
        }

    } catch (error) {
        console.error(error);
        statsElement.innerHTML = `<div style="color: red;">Fel vid laddning av data: ${error.message} / خطأ: ${error.message}</div>`;
    }
}

// Load Dictionary Data
async function loadDictionaryData() {
    try {
        if (typeof dictionaryData === 'undefined') {
            throw new Error('dictionaryData is not defined. Check data.js');
        }

        // Load Custom Words
        const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
        const existingIds = new Set(dictionaryData.map(w => w[COL_ID]));

        customWords.forEach(word => {
            if (!existingIds.has(word[COL_ID])) {
                dictionaryData.push(word);
            }
        });

        await buildSearchIndex();

        isLoading = false;
        statsElement.textContent = `${dictionaryData.length.toLocaleString()} ord laddade / كلمة تم تحميلها`;
        statsElement.classList.add('fade-in');

        // Initial Search if query exists
        if (searchInput.value) {
            handleSearch({ target: searchInput });
        }

    } catch (error) {
        console.error('Error loading data:', error);
        statsElement.innerHTML = `<div style="color: red;">Fel vid laddning: ${error.message}</div>`;
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
                (item[COL_DEF] || '') + ' ' +
                (item[COL_ARB_DEF] || '') + ' ' +
                (item[COL_EX] || '') + ' ' +
                (item[COL_EX_ARB] || '') + ' ' +
                (item[COL_IDIOM] || '') + ' ' +
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
    // 1. Query length >= 2
    // 2. OR a specific type is selected (not 'all')
    // 3. OR search mode is 'favorites'
    if (rawQuery.length < 2 && selectedType === 'all' && searchMode !== 'favorites') {
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

    if (searchMode === 'favorites') {
        // Favorites Mode: Start with ONLY favorites
        results = dictionaryData.filter(item => favorites.has(String(item[COL_ID])));

        // If there is a query, filter the favorites
        if (rawQuery.length > 0) {
            const lowerQuery = query.toLowerCase(); // Normalized
            results = results.filter(item => {
                const content = normalizeArabic(
                    (item[COL_SWE] || '') + ' ' +
                    (item[COL_ARB] || '')
                );
                return content.includes(lowerQuery);
            });
        }
    } else if (rawQuery.length === 0) {
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
                    (item[COL_DEF] || '') + ' ' +
                    (item[COL_ARB_DEF] || '') + ' ' +
                    (item[COL_EX] || '') + ' ' +
                    (item[COL_EX_ARB] || '') + ' ' +
                    (item[COL_IDIOM] || '') + ' ' +
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

    updateResults(results, sortMethod, query);
}

function updateResults(results = null, sortMethod = null, query = null) {
    // If no results provided, perform search based on current state
    if (results === null) {
        const rawQuery = searchInput.value.trim();
        query = normalizeArabic(rawQuery);
        sortMethod = sortSelect.value;
        const searchMode = document.getElementById('searchMode').value;
        const selectedType = typeSelect.value;

        // Perform search
        if (rawQuery.length < 2 && selectedType === 'all' && searchMode !== 'favorites') {
            resultsArea.innerHTML = `
                <div class="placeholder-message">
                    Börja skriva för att söka / ابدأ الكتابة للبحث
                </div>
            `;
            currentResults = [];
            statsElement.textContent = `${dictionaryData.length.toLocaleString()} ord laddade / كلمة تم تحميلها`;
            return;
        }

        // Use handleSearch logic to get results
        results = [];
        if (searchMode === 'favorites') {
            results = dictionaryData.filter(item => favorites.has(String(item[COL_ID])));
            if (rawQuery.length > 0) {
                const lowerQuery = query.toLowerCase();
                results = results.filter(item => {
                    const content = normalizeArabic(
                        (item[COL_SWE] || '') + ' ' +
                        (item[COL_ARB] || '')
                    );
                    return content.includes(lowerQuery);
                });
            }
        } else if (rawQuery.length === 0) {
            results = dictionaryData.slice();
        } else if (searchMode === 'general') {
            for (let i = 0; i < dictionaryData.length; i++) {
                const item = dictionaryData[i];
                if (!item) continue;
                if (searchIndex[i] && searchIndex[i].includes(query)) {
                    results.push(item);
                }
            }
        } else if (searchMode === 'exact') {
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

        // Filter by Type
        if (selectedType !== 'all') {
            results = results.filter(item => item[COL_TYPE] === selectedType);
        }
    }

    // Update Stats with Result Count
    statsElement.textContent = `Hittade ${results.length.toLocaleString()} resultat / تم العثور على ${results.length.toLocaleString()} نتيجة`;

    // Sort results
    results.sort((a, b) => {
        const aSwe = (a[COL_SWE] || '').toLowerCase();
        const bSwe = (b[COL_SWE] || '').toLowerCase();

        if (sortMethod === 'relevance') {
            // Relevance: Exact match > Starts with > Contains
            const aExact = aSwe === query;
            const bExact = bSwe === query;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            const aStart = aSwe.startsWith(query);
            const bStart = bSwe.startsWith(query);
            if (aStart && !bStart) return -1;
            if (!aStart && bStart) return 1;

            // Fallback to alphabetical if relevance is equal
            return aSwe.localeCompare(bSwe, 'sv');
        } else if (sortMethod === 'richness') {
            // Richness: Sort by number of non-empty fields
            const countFields = (item) => {
                let count = 0;
                if (item[COL_DEF]) count++;
                if (item[COL_ARB_DEF]) count++;
                if (item[COL_FORMS]) count++;
                if (item[COL_EX]) count++;
                if (item[COL_EX_ARB]) count++;
                if (item[COL_IDIOM]) count++;
                if (item[COL_IDIOM_ARB]) count++;
                return count;
            };
            const countA = countFields(a);
            const countB = countFields(b);
            return countB - countA; // Descending
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

    // Re-attach Tilt Listeners for new cards
    attachTiltListeners();
}



// Create Card HTML
function createCard(item, index = 0) {
    const id = item[COL_ID] || '';
    const swe = item[COL_SWE] || '';
    const arb = item[COL_ARB] || '';
    const type = item[COL_TYPE] ? item[COL_TYPE].replace('.', '') : '';
    const sweDef = item[COL_DEF] || '';
    const arbDef = item[COL_ARB_DEF] || '';
    const forms = item[COL_FORMS] || '';
    const exSwe = item[COL_EX] || '';
    const exArb = item[COL_EX_ARB] || '';
    const idiomSwe = item[COL_IDIOM] || '';
    const idiomArb = item[COL_IDIOM_ARB] || '';

    // Get grammar badge and word type category for color-coding
    const grammarBadge = getGrammarBadge(item[COL_TYPE], forms);
    const wordTypeCategory = getWordTypeCategory(item[COL_TYPE]);

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

    const isFav = favorites.has(id);
    const starIcon = isFav
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

    // Copy button icon
    const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    return `
        <a href="details.html?id=${id}" class="card-link" onclick="handleCardClick(event, '${id}', this)">
            <div class="card" data-type="${wordTypeCategory}" style="view-transition-name: card-${id}">
                <div class="card-header">
                    <div class="word-header-group">
                        <h2 class="word-swe" dir="ltr">${swe}</h2>
                        ${grammarBadge}
                    </div>
                    <div class="card-actions">
                        <button class="copy-btn" onclick="copyWord('${swe.replace(/'/g, "\\'")}', event)" aria-label="Kopiera / نسخ">
                            ${copyIcon}
                        </button>
                        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${id}', this, event)" aria-label="Spara som favorit">
                            ${starIcon}
                        </button>
                    </div>
                </div>
                ${arb ? `<p class="word-arb" dir="rtl">${arb}</p>` : ''}
            </div>
        </a>
    `;
}


// View Transition Handler
window.handleCardClick = function (e, id, link) {
    if (!document.startViewTransition) return; // Fallback for older browsers

    e.preventDefault();
    const href = link.getAttribute('href');

    // Set transition name dynamically for the clicked card
    // Note: We already set it inline, but this ensures it's the *only* active one if we were doing more complex logic
    // For now, the inline style is sufficient.

    document.startViewTransition(async () => {
        window.location.href = href;
        // We await a promise that never resolves to keep the old state visible 
        // until the browser handles the navigation (which will be a full page load).
        // However, for MPA (Multi-Page App) View Transitions, we rely on the browser's 
        // cross-document view transition support (Chrome 111+).
        // If not supported, it falls back to normal navigation.

        // Wait a bit to ensure the snapshot is taken
        await new Promise(r => setTimeout(r, 50));
    });
};

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

// --- GAME LOGIC MOVED TO games.js ---


// Toggle Favorite
window.toggleFavorite = function (id, btn, event) {
    // Prevent card click
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (favorites.has(id)) {
        favorites.delete(id);
        btn.classList.remove('active');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    } else {
        favorites.add(id);
        btn.classList.add('active');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

        // Animation effect
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);

        // Trigger Magic Particles
        const rect = btn.getBoundingClientRect();
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, '#F59E0B'); // Gold particles
    }

    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify([...favorites]));

    // If currently viewing favorites, refresh list
    const searchMode = document.getElementById('searchMode').value;
    if (searchMode === 'favorites') {
        updateResults();
    }
};

// Particle Effect
function createParticles(x, y, specificColor = null) {
    const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random color or specific color
        const color = specificColor || colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        // Random size
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';

        // Set initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(particle);

        // Cleanup
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


function initWordOfTheDay() {
    const wodCard = document.getElementById('wordOfTheDay');
    if (!wodCard) {
        console.warn('Word of the Day element not found');
        return;
    }

    // Get all elements
    const wodSwe = wodCard.querySelector('.wod-swe');
    const wodArb = wodCard.querySelector('.wod-arb');
    const wodAction = wodCard.querySelector('.wod-action');
    const wodTypeBadge = wodCard.querySelector('.wod-type-badge');

    // Forms elements
    const wodFormsPreview = wodCard.querySelector('.wod-forms-preview');
    const wodFormsChips = wodCard.querySelector('.wod-forms-chips');

    // Definition elements - Bilingual
    const wodDefPreview = wodCard.querySelector('.wod-def-preview');
    const wodDefSwe = wodCard.querySelector('.wod-def-swe');
    const wodDefArbPreview = wodCard.querySelector('.wod-def-arb-preview');
    const wodDefArbText = wodCard.querySelector('.wod-def-arb-text');

    // Example elements - Bilingual
    const wodExamplePreview = wodCard.querySelector('.wod-example-preview');
    const wodExSwe = wodCard.querySelector('.wod-ex-swe');
    const wodExampleArbPreview = wodCard.querySelector('.wod-example-arb-preview');
    const wodExArb = wodCard.querySelector('.wod-ex-arb');

    // Idiom elements
    const wodIdiomPreview = wodCard.querySelector('.wod-idiom-preview');
    const wodIdiomSwe = wodCard.querySelector('.wod-idiom-swe');
    const wodIdiomArb = wodCard.querySelector('.wod-idiom-arb');

    // Pick a NEW random word every time (not daily)
    // Use timestamp for randomness
    const timestamp = Date.now();
    console.log('WOD: Generating random word for timestamp:', timestamp);

    if (!dictionaryData || dictionaryData.length === 0) {
        console.error('WOD: dictionaryData is empty!');
        return;
    }

    // Random index based on current timestamp
    const index = Math.floor(Math.random() * dictionaryData.length);
    const word = dictionaryData[index];
    console.log('WOD: Selected word index:', index, word);

    if (!word) {
        console.error('WOD: No word found at index', index);
        return;
    }

    // Render main words
    wodSwe.textContent = word[COL_SWE];
    wodArb.textContent = word[COL_ARB];

    // Apply dynamic font sizing based on Swedish word length (same as Snabbtest)
    wodSwe.classList.remove('long-text', 'very-long-text', 'extra-long-text');
    const sweText = word[COL_SWE] || '';
    if (sweText.length > 12) {
        wodSwe.classList.add('extra-long-text');
    } else if (sweText.length > 9) {
        wodSwe.classList.add('very-long-text');
    } else if (sweText.length > 5) {
        wodSwe.classList.add('long-text');
    }

    // Render word type badge
    if (word[COL_TYPE] && wodTypeBadge) {
        wodTypeBadge.textContent = word[COL_TYPE].replace('.', '');
    }

    // Render forms preview with chips
    if (word[COL_FORMS] && wodFormsPreview && wodFormsChips) {
        const formsArray = word[COL_FORMS].split(',').map(f => f.trim()).filter(f => f);
        if (formsArray.length > 0) {
            // Show max 5 forms in preview
            const previewForms = formsArray.slice(0, 5);
            wodFormsChips.innerHTML = previewForms.map(form =>
                `<span class="wod-form-chip">${form}</span>`
            ).join('');
            if (formsArray.length > 5) {
                wodFormsChips.innerHTML += `<span class="wod-form-chip">+${formsArray.length - 5}</span>`;
            }
            wodFormsPreview.style.display = 'block';
        }
    }

    // Show Swedish definition preview if available
    if (word[COL_DEF] && wodDefPreview && wodDefSwe) {
        const defText = word[COL_DEF];
        const truncated = defText.length > 150 ? defText.substring(0, 150) + '...' : defText;
        wodDefSwe.textContent = truncated;
        wodDefPreview.style.display = 'block';
    }

    // Show Arabic definition preview if available
    if (word[COL_ARB_DEF] && wodDefArbPreview && wodDefArbText) {
        const defText = word[COL_ARB_DEF];
        const truncated = defText.length > 150 ? defText.substring(0, 150) + '...' : defText;
        wodDefArbText.textContent = truncated;
        wodDefArbPreview.style.display = 'block';
    }

    // Show Swedish example preview if available
    if (word[COL_EX] && wodExamplePreview && wodExSwe) {
        const exText = word[COL_EX];
        const truncated = exText.length > 120 ? exText.substring(0, 120) + '...' : exText;
        wodExSwe.textContent = truncated;
        wodExamplePreview.style.display = 'block';
    }

    // Show Arabic example preview if available
    if (word[COL_EX_ARB] && wodExampleArbPreview && wodExArb) {
        const exText = word[COL_EX_ARB];
        const truncated = exText.length > 120 ? exText.substring(0, 120) + '...' : exText;
        wodExArb.textContent = truncated;
        wodExampleArbPreview.style.display = 'block';
    }

    // Show idioms preview if available
    if ((word[COL_IDIOM] || word[COL_IDIOM_ARB]) && wodIdiomPreview) {
        if (word[COL_IDIOM] && wodIdiomSwe) {
            const idiomText = word[COL_IDIOM];
            const truncated = idiomText.length > 100 ? idiomText.substring(0, 100) + '...' : idiomText;
            wodIdiomSwe.textContent = truncated;
        }
        if (word[COL_IDIOM_ARB] && wodIdiomArb) {
            const idiomText = word[COL_IDIOM_ARB];
            const truncated = idiomText.length > 100 ? idiomText.substring(0, 100) + '...' : idiomText;
            wodIdiomArb.textContent = truncated;
        }
        wodIdiomPreview.style.display = 'block';
    }


    // Add Save Button if not already there
    let saveBtn = wodCard.querySelector('.wod-save-btn');
    if (!saveBtn) {
        saveBtn = document.createElement('button');
        saveBtn.className = 'wod-save-btn';
        saveBtn.innerHTML = '💾 Spara / حفظ';
        wodCard.querySelector('.wod-content').appendChild(saveBtn);
    }

    // Update Save Button State
    const updateSaveBtn = () => {
        const isFav = favorites.has(word[COL_ID]);
        saveBtn.textContent = isFav ? '✅ Sparad / محفوظ' : '💾 Spara / حفظ';
        saveBtn.classList.toggle('saved', isFav);
    };
    updateSaveBtn();

    saveBtn.onclick = (e) => {
        e.stopPropagation();
        if (favorites.has(word[COL_ID])) {
            favorites.delete(word[COL_ID]);
        } else {
            favorites.add(word[COL_ID]);
            createParticles(e.clientX, e.clientY, '#F59E0B');
        }
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
        updateSaveBtn();
        if (document.getElementById('searchMode').value === 'favorites') updateResults();
    };

    console.log('WOD: Displaying card');
    wodCard.style.display = 'block';

    // Actions
    // Direct navigation to details page
    if (wodAction) {
        wodAction.onclick = (e) => {
            e.preventDefault();
            // Navigate directly to the details page
            window.location.href = `details.html?id=${word[COL_ID]}`;
        };
    }
}

// Quiz Mode Logic
let quizScore = 0;

function initQuiz() {
    const quizBtn = document.getElementById('quizBtn');
    const gameBtn = document.getElementById('gameBtn');
    const quizModal = document.getElementById('quizModal');
    const closeQuiz = document.getElementById('closeQuiz');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    if (quizBtn) {
        quizBtn.addEventListener('click', startQuiz);
    }

    if (gameBtn) {
        gameBtn.addEventListener('click', () => {
            window.location.href = 'games.html';
        });
    }

    if (closeQuiz) {
        closeQuiz.addEventListener('click', () => {
            quizModal.style.display = 'none';
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });
    }
}

function startQuiz() {
    const quizModal = document.getElementById('quizModal');
    const quizEndScreen = document.getElementById('quizEndScreen');
    const questionCard = document.querySelector('.question-card');
    const quizOptions = document.getElementById('quizOptions');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    quizScore = 0;
    comboCount = 0; // Reset combo
    currentQuestionIndex = 0; // Reset question index
    document.getElementById('quizScore').textContent = '0';
    quizModal.classList.remove('streak-3', 'streak-5', 'streak-10'); // Reset styles

    // Hide end screen, show quiz elements
    if (quizEndScreen) quizEndScreen.style.display = 'none';
    if (questionCard) questionCard.style.display = 'block';
    if (quizOptions) quizOptions.style.display = 'flex';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';

    quizModal.style.display = 'flex';

    // Populate quizQuestions with a random subset of dictionaryData
    quizQuestions = [];
    const numQuestions = Math.min(10, dictionaryData.length); // Max 10 questions or less if dictionary is small
    const shuffledData = [...dictionaryData].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numQuestions; i++) {
        quizQuestions.push(shuffledData[i]);
    }

    loadQuestion();
}

let comboCount = 0;

function loadQuestion() {
    const quizEndScreen = document.getElementById('quizEndScreen');
    const questionCard = document.querySelector('.question-card');
    const quizOptions = document.getElementById('quizOptions');

    if (currentQuestionIndex >= quizQuestions.length) {
        // Quiz finished - show end screen instead of alert
        if (questionCard) questionCard.style.display = 'none';
        if (quizOptions) quizOptions.style.display = 'none';
        document.getElementById('nextQuestion').style.display = 'none';

        // Show end screen
        if (quizEndScreen) {
            quizEndScreen.style.display = 'flex';
            document.getElementById('endScoreValue').textContent = quizScore;
            document.querySelector('.end-score-total').textContent = `/ ${quizQuestions.length}`;

            // Set message based on score
            const percentage = (quizScore / quizQuestions.length) * 100;
            let message = 'Bra jobbat!';
            if (percentage === 100) {
                message = 'Perfekt! 🌟';
            } else if (percentage >= 80) {
                message = 'Utmärkt! 👏';
            } else if (percentage >= 60) {
                message = 'Bra jobbat! 💪';
            } else if (percentage >= 40) {
                message = 'Fortsätt öva! 📚';
            } else {
                message = 'Ge inte upp! 💡';
            }
            document.getElementById('endMessage').textContent = message;

            // Restart button
            document.getElementById('restartQuiz').onclick = () => {
                startQuiz();
            };
        }
        return;
    }

    currentQuestion = quizQuestions[currentQuestionIndex];
    const quizQuestion = document.getElementById('quizQuestion');
    const quizExample = document.getElementById('quizExample');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const quizFavBtn = document.getElementById('quizFavBtn');

    // Reset UI
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    nextQuestionBtn.style.display = 'none';

    // Display question (Swedish word)
    const questionText = currentQuestion[COL_SWE];
    quizQuestion.textContent = questionText;

    // Display example sentence if available
    if (quizExample) {
        const exampleText = currentQuestion[COL_EX] || '';
        if (exampleText) {
            quizExample.textContent = exampleText;
            quizExample.style.display = 'block';
        } else {
            quizExample.style.display = 'none';
        }
    }

    // Handle favorite button
    if (quizFavBtn) {
        const isFav = favorites.has(currentQuestion[COL_ID]);
        quizFavBtn.classList.toggle('is-favorite', isFav);
        if (isFav) {
            quizFavBtn.querySelector('svg').setAttribute('fill', '#F59E0B');
        } else {
            quizFavBtn.querySelector('svg').setAttribute('fill', 'none');
        }

        quizFavBtn.onclick = (e) => {
            e.stopPropagation();
            if (favorites.has(currentQuestion[COL_ID])) {
                favorites.delete(currentQuestion[COL_ID]);
                quizFavBtn.classList.remove('is-favorite');
                quizFavBtn.querySelector('svg').setAttribute('fill', 'none');
            } else {
                favorites.add(currentQuestion[COL_ID]);
                quizFavBtn.classList.add('is-favorite');
                quizFavBtn.querySelector('svg').setAttribute('fill', '#F59E0B');
                createParticles(e.clientX, e.clientY, '#F59E0B');
            }
            localStorage.setItem('favorites', JSON.stringify([...favorites]));
        };
    }

    // Apply dynamic font sizing based on text length
    quizQuestion.classList.remove('long-text', 'very-long-text', 'extra-long-text');
    if (questionText.length > 12) {
        quizQuestion.classList.add('extra-long-text');
    } else if (questionText.length > 9) {
        quizQuestion.classList.add('very-long-text');
    } else if (questionText.length > 5) {
        quizQuestion.classList.add('long-text');
    }

    // Generate 4 Arabic options (1 correct + 3 random wrong)
    const correctAnswer = currentQuestion[COL_ARB];
    const wrongAnswers = [];

    // Get 3 random wrong answers
    while (wrongAnswers.length < 3) {
        const randomIdx = Math.floor(Math.random() * dictionaryData.length);
        const randomWord = dictionaryData[randomIdx];
        // Ensure wrong answer is not the correct one and not already in wrongAnswers
        if (randomWord[COL_ID] !== currentQuestion[COL_ID] && !wrongAnswers.includes(randomWord[COL_ARB])) {
            wrongAnswers.push(randomWord[COL_ARB]);
        }
    }

    // Shuffle and display options
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    quizOptions.innerHTML = '';

    allOptions.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;

        // Apply dynamic font sizing based on text length
        if (option.length > 60) {
            btn.classList.add('very-long-text');
        } else if (option.length > 40) {
            btn.classList.add('long-text');
        }

        btn.onclick = () => checkAnswer(option, btn);
        quizOptions.appendChild(btn);
    });
}

function checkAnswer(selectedOptionText, btn) {
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const options = document.querySelectorAll('.quiz-option');

    // Disable all options from answering
    options.forEach(opt => opt.style.pointerEvents = 'none');

    // Compare with correct answer (Arabic text)
    const correctAnswer = currentQuestion[COL_ARB];

    if (selectedOptionText === correctAnswer) {
        // Correct
        btn.classList.add('correct', 'correct-shake'); // Add shake animation
        quizScore++;
        comboCount++;

        // Combo Effects
        const modal = document.getElementById('quizModal');
        modal.classList.remove('streak-3', 'streak-5', 'streak-10');

        if (comboCount >= 10) {
            modal.classList.add('streak-10');
            createParticles(window.innerWidth / 2, window.innerHeight / 2); // Massive explosion
        } else if (comboCount >= 5) {
            modal.classList.add('streak-5');
        } else if (comboCount >= 3) {
            modal.classList.add('streak-3');
        }

        let feedbackText = '';
        // Don't show success message - just update score

        document.getElementById('quizScore').textContent = quizScore;
        quizFeedback.textContent = '';

        // Particles for fun
        const rect = btn.getBoundingClientRect();
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
        // Wrong
        btn.classList.add('wrong');
        comboCount = 0; // Reset combo
        document.getElementById('quizModal').classList.remove('streak-3', 'streak-5', 'streak-10');

        // Don't show the wrong answer - just clear feedback
        quizFeedback.textContent = '';

        // Highlight correct answer silently
        options.forEach(opt => {
            if (opt.textContent === correctAnswer) {
                opt.classList.add('correct');
            }
        });
    }

    // After answering, make options clickable to show word info
    options.forEach(opt => {
        opt.style.pointerEvents = 'auto';
        opt.style.cursor = 'pointer';

        // Find the word data for this Arabic text
        const arabicText = opt.textContent;
        const wordData = dictionaryData.find(w => w[COL_ARB] === arabicText);

        if (wordData) {
            opt.onclick = (e) => {
                e.stopPropagation();
                showWordInfoTooltip(opt, wordData);
            };
        }
    });

    nextQuestionBtn.style.display = 'block';
}

// Show word info tooltip
function showWordInfoTooltip(element, wordData) {
    // Remove any existing tooltip
    const existingTooltip = document.querySelector('.quiz-word-tooltip');
    if (existingTooltip) existingTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.className = 'quiz-word-tooltip';

    const swedishWord = wordData[COL_SWE] || '';
    const arabicWord = wordData[COL_ARB] || '';
    const arabicDef = wordData[COL_ARB_DEF] || '';
    const swedishExample = wordData[COL_EX] || '';

    tooltip.innerHTML = `
        <div class="tooltip-header">${swedishWord}</div>
        <div class="tooltip-arabic-word">${arabicWord}</div>
        ${arabicDef ? `<div class="tooltip-arabic-def"><span class="def-label">المعنى:</span> ${arabicDef}</div>` : ''}
        ${swedishExample ? `<div class="tooltip-example"><span class="example-label">🇸🇪</span> "${swedishExample}"</div>` : ''}
        <div class="tooltip-close">×</div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;

    // If tooltip goes off screen top, show below
    if (parseFloat(tooltip.style.top) < 10) {
        tooltip.style.top = `${rect.bottom + 10}px`;
    }

    // Close on click
    tooltip.querySelector('.tooltip-close').onclick = () => tooltip.remove();

    // Close on clicking anywhere else
    const closeOnClick = (e) => {
        if (!tooltip.contains(e.target) && e.target !== element) {
            tooltip.remove();
            document.removeEventListener('click', closeOnClick);
        }
    };
    setTimeout(() => document.addEventListener('click', closeOnClick), 100);

    // Auto close after 8 seconds
    setTimeout(() => {
        if (tooltip.parentNode) tooltip.remove();
    }, 8000);
}

// Initialize Quiz
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initPhysicsLogo();
});

// 3D Tilt Logic
function attachTiltListeners() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Prevent double attachment
        if (card.dataset.tiltAttached) return;
        card.dataset.tiltAttached = 'true';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (max 10deg)
            const xPct = x / rect.width;
            const yPct = y / rect.height;

            const xRot = (yPct - 0.5) * 20; // -10 to 10
            const yRot = (xPct - 0.5) * -20; // 10 to -10

            card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Physics Logo Logic
function initPhysicsLogo() {
    const title = document.getElementById('physicsTitle');
    if (!title) return;

    const chars = title.querySelectorAll('.physics-char');

    // Only enable on desktop (to avoid issues on mobile)
    if (window.innerWidth < 768) return;

    let resetTimeout;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        chars.forEach(char => {
            const rect = char.getBoundingClientRect();
            const charX = rect.left + rect.width / 2;
            const charY = rect.top + rect.height / 2;

            const dist = Math.sqrt(Math.pow(mouseX - charX, 2) + Math.pow(mouseY - charY, 2));
            const maxDist = 100; // Interaction radius

            if (dist < maxDist) {
                // Repel effect
                const force = (maxDist - dist) / maxDist;
                const angle = Math.atan2(mouseY - charY, mouseX - charX);

                const moveX = Math.cos(angle) * force * -20; // Move away
                const moveY = Math.sin(angle) * force * -20;

                char.style.transition = 'transform 0.1s ease-out, color 0.2s';
                char.style.transform = `translate(${moveX}px, ${moveY}px)`;
                char.style.color = '#F59E0B'; // Highlight color
            } else {
                char.style.transition = 'transform 0.3s ease-out, color 0.3s';
                char.style.transform = 'translate(0, 0)';
                char.style.color = ''; // Reset color
            }
        });

        // Clear any existing timeout
        clearTimeout(resetTimeout);

        // Reset all characters after 2 seconds of no mouse movement
        resetTimeout = setTimeout(() => {
            chars.forEach(char => {
                char.style.transition = 'transform 0.5s ease-out, color 0.5s';
                char.style.transform = 'translate(0, 0)';
                char.style.color = '';
            });
        }, 2000);
    });
}
