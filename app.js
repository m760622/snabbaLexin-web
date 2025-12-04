// State
// dictionaryData is global from data.js
let isLoading = true;
let searchIndex = []; // Pre-computed search strings
let currentResults = []; // Store all matching results
let renderedCount = 0; // Track how many are currently shown
let favorites = new Set(); // Store favorite IDs
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

    // PWA Install Prompt Logic
    let deferredPrompt;
    const pwaPrompt = document.getElementById('pwa-install-prompt');
    const installBtn = document.getElementById('pwa-install-btn');
    const laterBtn = document.getElementById('pwa-later-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        if (pwaPrompt) {
            pwaPrompt.style.display = 'block';
        }
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (pwaPrompt) {
                pwaPrompt.style.display = 'none';
            }
            // Show the install prompt
            if (deferredPrompt) {
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                // We've used the prompt, and can't use it again, throw it away
                deferredPrompt = null;
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
        sortSelect.addEventListener('change', () => handleSearch({ target: searchInput }));
        typeSelect.addEventListener('change', () => handleSearch({ target: searchInput }));
        document.getElementById('searchMode').addEventListener('change', () => handleSearch({ target: searchInput }));

        // Load data first
        await loadDictionaryData();

        // Initialize Word of the Day
        initWordOfTheDay();

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

        // Load data


        // Initialize Word of the Day


        // Setup Infinite Scroll
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

    updateResults(results, sortMethod, query);
}

function updateResults(results, sortMethod, query) {
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
                if (item[COL_SWE_DEF]) count++;
                if (item[COL_ARB_DEF]) count++;
                if (item[COL_FORMS]) count++;
                if (item[COL_EX_SWE]) count++;
                if (item[COL_EX_ARB]) count++;
                if (item[COL_IDIOM_SWE]) count++;
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

    const isFav = favorites.has(id);
    const starIcon = isFav
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

    return `
        <a href="details.html?id=${id}" class="card-link" onclick="handleCardClick(event, '${id}', this)">
            <div class="card" style="view-transition-name: card-${id}">
                <div class="card-header">
                    <h2 class="word-swe" dir="ltr">${swe}</h2>
                    <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${id}', this)" aria-label="Spara som favorit">
                        ${starIcon}
                    </button>
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

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
// Toggle Favorite
window.toggleFavorite = function (id, btn) {
    // Prevent card click
    event.preventDefault();
    event.stopPropagation();

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
    const wodSwe = wodCard.querySelector('.wod-swe');
    const wodArb = wodCard.querySelector('.wod-arb');
    const wodAction = wodCard.querySelector('.wod-action');

    // Check if closed today (Logic removed as close button is gone)
    const today = new Date().toISOString().split('T')[0];
    // const lastClosed = localStorage.getItem('wodClosedDate');



    // Pick a word based on date seed
    // Simple hash of date string to get index
    console.log('WOD: Calculating hash for date:', today);
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
        hash = ((hash << 5) - hash) + today.charCodeAt(i);
        hash |= 0;
    }

    if (!dictionaryData || dictionaryData.length === 0) {
        console.error('WOD: dictionaryData is empty!');
        return;
    }

    const index = Math.abs(hash) % dictionaryData.length;
    const word = dictionaryData[index];
    console.log('WOD: Selected word index:', index, word);

    if (!word) {
        console.error('WOD: No word found at index', index);
        return;
    }

    // Render
    wodSwe.textContent = word[COL_SWE];
    wodArb.textContent = word[COL_ARB];

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
    const wodModal = document.getElementById('wodModal');
    const closeWod = document.getElementById('closeWod');
    const wodModalContent = document.getElementById('wodModalContent');

    if (wodModal && closeWod && wodModalContent) {
        wodAction.onclick = (e) => {
            e.preventDefault();

            // Render content (reuse createCard logic but without the link wrapper)
            // We want the card look but inside the modal
            const cardHtml = createCard(word);
            // Strip the outer <a> tag to make it static
            const contentHtml = cardHtml.replace(/^<a[^>]*>|<\/a>$/g, '');

            wodModalContent.innerHTML = contentHtml;

            // Remove the hover effect class or style if needed
            const card = wodModalContent.querySelector('.card');
            if (card) {
                card.style.transform = 'none';
                card.style.boxShadow = 'none';
                card.style.border = 'none'; // Clean look inside modal
            }

            wodModal.style.display = 'flex';
        };

        closeWod.onclick = () => {
            wodModal.style.display = 'none';
        };

        window.addEventListener('click', (e) => {
            if (e.target === wodModal) {
                wodModal.style.display = 'none';
            }
        });
    } else {
        // Fallback
        wodAction.onclick = () => {
            window.location.href = `details.html?id=${word[COL_ID]}`;
        };
    }
}

// Quiz Mode Logic
let quizScore = 0;
let currentQuestion = null;

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
        nextQuestionBtn.addEventListener('click', loadQuestion);
    }
}

function startQuiz() {
    const quizModal = document.getElementById('quizModal');
    quizScore = 0;
    comboCount = 0; // Reset combo
    document.getElementById('quizScore').textContent = `Score: 0`;
    quizModal.classList.remove('streak-3', 'streak-5', 'streak-10'); // Reset styles
    quizModal.style.display = 'flex';
    loadQuestion();
}

let comboCount = 0;

function loadQuestion() {
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    // Reset UI
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    nextQuestionBtn.style.display = 'none';

    // Pick random word
    const correctIndex = Math.floor(Math.random() * dictionaryData.length);
    const correctWord = dictionaryData[correctIndex];
    currentQuestion = correctWord;

    // Pick 3 distractors
    const options = [correctWord];
    while (options.length < 4) {
        const randomIdx = Math.floor(Math.random() * dictionaryData.length);
        const randomWord = dictionaryData[randomIdx];
        if (randomWord[COL_ID] !== correctWord[COL_ID] && !options.includes(randomWord)) {
            options.push(randomWord);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    // Render Question (Swedish)
    quizQuestion.textContent = correctWord[COL_SWE];

    // Render Options (Arabic)
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option[COL_ARB];
        btn.onclick = () => checkAnswer(option, btn);
        quizOptions.appendChild(btn);
    });
}

function checkAnswer(selectedOption, btn) {
    const quizFeedback = document.getElementById('quizFeedback');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const options = document.querySelectorAll('.quiz-option');

    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selectedOption[COL_ID] === currentQuestion[COL_ID]) {
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

        let feedbackText = 'Rätt! / صحيح! 🎉';
        if (comboCount > 1) feedbackText += ` (Combo x${comboCount} 🔥)`;

        document.getElementById('quizScore').textContent = `Score: ${quizScore}`;
        quizFeedback.innerHTML = `<span style="color: #10B981; font-weight: bold;">${feedbackText}</span>`;

        // Particles for fun
        const rect = btn.getBoundingClientRect();
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
        // Wrong
        btn.classList.add('wrong');
        comboCount = 0; // Reset combo
        document.getElementById('quizModal').classList.remove('streak-3', 'streak-5', 'streak-10');

        quizFeedback.innerHTML = `<span style="color: #EF4444; font-weight: bold;">Fel! Rätt svar var: ${currentQuestion[COL_ARB]}</span>`;

        // Highlight correct answer
        options.forEach(opt => {
            if (opt.textContent === currentQuestion[COL_ARB]) {
                opt.classList.add('correct');
            }
        });
    }

    nextQuestionBtn.style.display = 'block';
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

                char.style.transform = `translate(${moveX}px, ${moveY}px)`;
                char.style.color = '#F59E0B'; // Highlight color
            } else {
                char.style.transform = 'translate(0, 0)';
                char.style.color = ''; // Reset color
            }
        });
    });
}
