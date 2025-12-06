// Verified sort logical fix.
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
const statsElement = document.getElementById('resultCount');
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
// Uses morphological analysis instead of relying on potentially incorrect type field
function getGrammarBadge(type, forms, word) {
    const formsLower = (forms || '').toLowerCase();
    const wordLower = (word || '').toLowerCase();
    const normalizedType = (type || '').toLowerCase().replace('.', '').replace(' ', '');

    // === VERB DETECTION (Priority - check forms for verb patterns) ===
    // Check if forms contain verb-like patterns regardless of type field

    // Group 1: -ar, -ade, -at (talar, talade, talat)
    if (formsLower.match(/\w+ar[,\s]/) && formsLower.match(/\w+ade[,\s]/)) {
        return '<span class="grammar-badge grammar-verb">Gr. 1</span>';
    }

    // Group 2: -er, -de, -t (läser, läste, läst / köper, köpte, köpt)
    if (formsLower.match(/\w+er[,\s]/) && (formsLower.match(/\w+de[,\s]/) || formsLower.match(/\w+te[,\s]/))) {
        return '<span class="grammar-badge grammar-verb">Gr. 2</span>';
    }

    // Group 3: -r, -dde, -tt (bor, bodde, bott)
    if (formsLower.match(/\w+dde[,\s]/)) {
        return '<span class="grammar-badge grammar-verb">Gr. 3</span>';
    }

    // Group 4: Strong/irregular verbs with -it, -its, -ats, -ett supine
    if (formsLower.match(/\w+(it|its|ats|ett)[,\s]/) || formsLower.match(/\w+(it|its|ats|ett)$/)) {
        return '<span class="grammar-badge grammar-verb">Gr. 4</span>';
    }

    // S-passive / Deponent verbs: word ends with -s and has verb-like forms
    if (wordLower.endsWith('s') && formsLower.match(/\w+ades[,\s]|\w+des[,\s]|\w+ades$/)) {
        return '<span class="grammar-badge grammar-verb">Gr. 4</span>';
    }

    // General verb detection: forms contain typical verb patterns
    if (formsLower.match(/\w+ar[,\s]|\w+er[,\s]|\w+r[,\s]/) &&
        formsLower.match(/\w+de[,\s]|\w+ade[,\s]|\w+te[,\s]|\w+dde[,\s]/)) {
        return '<span class="grammar-badge grammar-verb">Verb</span>';
    }

    // === NOUN DETECTION (En/Ett) ===
    // Check for definite singular patterns
    const formParts = formsLower.split(',').map(f => f.trim());
    if (formParts.length >= 2) {
        const definiteSingular = formParts[1];

        // En-words: definite ends with -an, -en, -n (flygvärdinnan, bilen, mannen)
        if (definiteSingular.match(/\w+(an|en)$/) && !definiteSingular.match(/\w+et$/)) {
            return '<span class="grammar-badge grammar-en">En</span>';
        }
        // Ett-words: definite ends with -et (huset, bordet, ögat)
        if (definiteSingular.match(/\w+et$/)) {
            return '<span class="grammar-badge grammar-ett">Ett</span>';
        }
    }

    // Check for explicit "en"/"ett" in forms
    if (formsLower.startsWith('en ') || formsLower.match(/\ben\s+\w+/)) {
        return '<span class="grammar-badge grammar-en">En</span>';
    }
    if (formsLower.startsWith('ett ') || formsLower.match(/\bett\s+\w+/)) {
        return '<span class="grammar-badge grammar-ett">Ett</span>';
    }

    // === ADJECTIVE DETECTION ===
    // Adjectives typically have 3 forms: base, base, base+a (flyhänt, flyhänt, flyhänta)
    // or (stor, stort, stora)
    if (formParts.length >= 3) {
        const form1 = formParts[0];
        const form3 = formParts[2];
        // If third form ends with -a and is longer than first (stora vs stor)
        if (form3.endsWith('a') && form3.length >= form1.length) {
            // Check that forms look adjective-like (not verb-like)
            if (!formsLower.match(/\w+ade[,\s]|\w+de[,\s]/)) {
                return '<span class="grammar-badge grammar-adj">Adj</span>';
            }
        }
    }

    // Check type field as fallback
    if (normalizedType.includes('adj')) {
        return '<span class="grammar-badge grammar-adj">Adj</span>';
    }

    // VerbMN / Phrasal verbs
    if (normalizedType.includes('verbmn') || (wordLower.includes(' ') && normalizedType.includes('verb'))) {
        return '<span class="grammar-badge grammar-phv">Ph.V</span>';
    }

    // Fallback: if type contains "verb", show Verb badge
    if (normalizedType.includes('verb')) {
        return '<span class="grammar-badge grammar-verb">Verb</span>';
    }

    // Fallback: if type contains "subst", show generic noun badge
    if (normalizedType.includes('subst')) {
        return '<span class="grammar-badge grammar-en">Subst</span>';
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
    // Theme Logic handled by utils.js (ThemeManager.init called on DOMContentLoaded)

    // Wire up Theme Toggle in Main Page
    themeToggle.addEventListener('click', () => {
        ThemeManager.toggle();
    });

    // Load Favorites using Manager
    favorites = FavoritesManager.getFavorites();

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

        statsElement.textContent = `${dictionaryData.length.toLocaleString()}`;
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
        showToast(`Fel vid laddning av data: ${error.message}`, 'error');
        statsElement.textContent = "Err";
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
        statsElement.textContent = `${dictionaryData.length.toLocaleString()}`;
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

// State
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // [NEW]

// Filter Logic
const filterToggleBtn = document.getElementById('filterToggleBtn');
const filterChipsContainer = document.getElementById('filterChipsContainer');
const filterChips = document.querySelectorAll('.filter-chip');
let activeFilterMode = 'start'; // Default mode

if (filterToggleBtn && filterChipsContainer) {
    // Toggle Filters
    filterToggleBtn.addEventListener('click', () => {
        const isHidden = filterChipsContainer.style.display === 'none';
        filterChipsContainer.style.display = isHidden ? 'flex' : 'none';
        filterToggleBtn.classList.toggle('active', isHidden);

        // Focus first chip if opening
        if (isHidden) {
            // optional: filterChips[0].focus();
        }
    });

    // Handle Chip Selection
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            // Update mode
            activeFilterMode = chip.dataset.mode;

            // Update search placeholder/hint
            updateSearchPlaceholder(activeFilterMode);

            // Re-run search
            handleSearch({ target: searchInput });
        });
    });
}

function updateSearchPlaceholder(mode) {
    const placeholders = {
        'start': 'Sök ord (börjar med...) / ابحث (يبدأ بـ...)',
        'exact': 'Sök exakt (känslig) / بحث دقيق (مع التشكيل)',
        'synonym': 'Sök efter betydelse / ابحث في المعاني العربية',
        'type': 'Sök efter ordklass (t.ex. verb) / ابحث بنوع الكلمة',
        'end': 'Sök efter slut (t.ex. -ning) / ابحث بالنهايات',
        'all': 'Sök i allt... / بحث شامل في الوصف والأمثلة'
    };
    searchInput.placeholder = placeholders[mode] || placeholders['start'];
}

// Search Handler
// Search Handler
function handleSearch(e) {
    const rawQuery = e.target.value.trim();
    // Normalize for general search
    const query = normalizeArabic(rawQuery);
    const lowerQuery = rawQuery.toLowerCase(); // For exact/end

    sessionStorage.setItem('searchQuery', e.target.value);

    // Get Filter Values (Restore missing vars)
    const selectedType = typeSelect.value;
    const sortMethod = sortSelect.value;

    // If query is empty -> show all (or limit?)
    if (rawQuery.length === 0) {
        // Show all (lazy load handled by render)
        currentResults = dictionaryData.slice(); // Copy all

        // Filter by Type even if query is empty
        if (selectedType !== 'all') {
            currentResults = currentResults.filter(item => {
                const typeLower = (item[COL_TYPE] || '').toLowerCase();
                if (selectedType === 'abbrev') return typeLower.includes('förk') || typeLower.includes('abbrev');
                return typeLower.includes(selectedType);
            });
        }

        currentPage = 1;
        renderResults();

        // [NEW] Toggle Empty State
        const emptyState = document.getElementById('emptyState');
        const resultsGrid = document.getElementById('searchResults');

        if (currentResults.length === 0 && rawQuery.length === 0) {
            // Show Empty State (Landing)
            if (emptyState) {
                renderHistory(); // Refresh history
                emptyState.style.display = 'block';
            }
            if (resultsGrid) resultsGrid.style.display = 'none';
            statsElement.textContent = ""; // Hide stats on empty
            if (document.getElementById('resultCount')) document.getElementById('resultCount').textContent = "";
        } else {
            // Show Results
            if (emptyState) emptyState.style.display = 'none';
            if (resultsGrid) resultsGrid.style.display = 'grid';
            statsElement.textContent = `${currentResults.length.toLocaleString()} träffar / نتيجة`;
            if (document.getElementById('resultCount')) document.getElementById('resultCount').textContent = currentResults.length.toLocaleString();
        }

        return;
    }

    // Hide Empty State when searching
    const emptyState = document.getElementById('emptyState');
    const resultsGrid = document.getElementById('searchResults');
    if (emptyState) emptyState.style.display = 'none';
    if (resultsGrid) resultsGrid.style.display = 'grid';

    let results = [];
    const data = dictionaryData;

    // Filter Logic Switch
    switch (activeFilterMode) {
        case 'favorites':
            results = data.filter(item => {
                if (!favorites.has(String(item[COL_ID]))) return false;
                if (query.length === 0) return true; // Show all favorites if no query

                // Filter favorites by query
                const swe = normalizeArabic(item[COL_SWE] || '');
                const arb = normalizeArabic(item[COL_ARB] || '');
                return swe.includes(query) || arb.includes(query);
            });
            break;

        case 'start': // Default: Starts With (Normalized)
            results = data.filter(item => {
                const swe = normalizeArabic(item[COL_SWE] || '');
                const arb = normalizeArabic(item[COL_ARB] || '');
                return swe.startsWith(query) || arb.startsWith(query);
            });
            break;

        case 'exact': // Case & Diacritic Sensitive Start
            results = data.filter(item => {
                const swe = item[COL_SWE] || '';
                const arb = item[COL_ARB] || '';
                // Check startsWith raw
                return swe.startsWith(rawQuery) || arb.startsWith(rawQuery);
            });
            break;

        case 'synonym': // Search in Arabic Meanings Only
            results = data.filter(item => {
                const arb = normalizeArabic(item[COL_ARB] || '');
                return arb.includes(query);
            });
            break;

        case 'type': // Search in Word Type
            results = data.filter(item => {
                const type = (item[COL_TYPE] || '').toLowerCase();
                return type.includes(lowerQuery);
            });
            break;

        case 'end': // Ends With
            results = data.filter(item => {
                const swe = (item[COL_SWE] || '').toLowerCase();
                return swe.endsWith(lowerQuery);
            });
            break;

        case 'all': // Deep Search
            results = data.filter((item, index) => {
                if (searchIndex[index]) {
                    return searchIndex[index].includes(query);
                } else {
                    const content = normalizeArabic(
                        (item[COL_SWE] || '') + ' ' +
                        (item[COL_ARB] || '') + ' ' +
                        (item[COL_FORMS] || '') + ' ' +
                        (item[COL_DEF] || '') + ' ' +
                        (item[COL_EX] || '')
                    );
                    return content.includes(query);
                }
            });
            break;

        default:
            results = data.filter(item => {
                const swe = normalizeArabic(item[COL_SWE] || '');
                return swe.startsWith(query);
            });
    }

    // Update Type Dropdown Counts (Before applying type filter)
    // Only update if we are NOT in 'type' search mode (to avoid confusion)
    if (activeFilterMode !== 'type') {
        updateTypeDropdown(results);
    }

    // Secondary Type Filter (if user used dropdown + another mode)
    // Note: If mode is 'type', we already filtered by query as type.
    // But if mode is 'start' and they ALSO selected a type from dropdown...
    if (selectedType !== 'all' && activeFilterMode !== 'type') {
        results = results.filter(item => {
            const typeLower = (item[COL_TYPE] || '').toLowerCase();
            if (activeFilterMode === 'start' && selectedType === 'abbrev') return typeLower.includes('förk') || typeLower.includes('abbrev');
            // Exact match for common types to prevent "s" matching "subst" broadly if logic was loose,
            // but here we use includes. Let's make it robust.
            if (selectedType === 'subst') return typeLower.includes('subst');
            if (selectedType === 'verb') return typeLower.includes('verb');
            return typeLower.includes(selectedType);
        });
    }

    currentResults = results;
    currentPage = 1;

    // Sort Results
    results.sort((a, b) => {
        const aSwe = (a[COL_SWE] || '').toLowerCase();
        const bSwe = (b[COL_SWE] || '').toLowerCase();

        if (sortMethod === 'relevance') {
            // Relevance: Exact match > Starts with > Contains
            // (Only relevant if there is a query)
            if (query.length > 0) {
                const aExact = aSwe === query;
                const bExact = bSwe === query;
                if (aExact && !bExact) return -1;
                if (!aExact && bExact) return 1;

                const aStart = aSwe.startsWith(query);
                const bStart = bSwe.startsWith(query);
                if (aStart && !bStart) return -1;
                if (!aStart && bStart) return 1;
            }
            // Fallback to alphabetical
            return aSwe.localeCompare(bSwe, 'sv');
        } else if (sortMethod === 'richness') {
            // Richness: Sort by number of non-empty fields
            const countFields = (item) => {
                let count = 0;
                if (item[COL_DEF]) count++;
                if (item[COL_ARB_DEF]) count++;
                if (item[COL_FORMS]) count++;
                if (item[COL_EX]) count++;
                if (item[COL_IDIOM]) count++;
                return count;
            };
            return countFields(b) - countFields(a); // Descending
        } else if (sortMethod === 'alpha_asc' || sortMethod === 'az') { // Handle both just in case
            return aSwe.localeCompare(bSwe, 'sv');
        } else if (sortMethod === 'alpha_desc' || sortMethod === 'za') {
            return bSwe.localeCompare(aSwe, 'sv');
        } else if (sortMethod === 'last_char') {
            const charA = aSwe.slice(-1);
            const charB = bSwe.slice(-1);
            return charA.localeCompare(charB, 'sv');
        }
        return 0;
    });

    renderResults();

    // Update Stats
    statsElement.textContent = `${currentResults.length.toLocaleString()}`;
}

// Global variable to debounce dropdown updates slightly if needed, or just run sync
// Helper to formatted type label
const TYPE_LABELS = {
    'subst': 'Substantiv',
    'verb': 'Verb',
    'adj': 'Adjektiv',
    'adv': 'Adverb',
    'prep': 'Preposition',
    'konj': 'Konjunktion',
    'pron': 'Pronomen',
    'interj': 'Interjektion',
    'räkne': 'Räkneord',
    'part': 'Partikel'
};

function updateTypeDropdown(items) {
    const counts = {};
    const currentVal = typeSelect.value;

    // 1. Count types
    items.forEach(item => {
        let t = (item[COL_TYPE] || 'Övrigt').toLowerCase().replace('.', '').trim();
        // Normalize common abbreviations
        if (t.startsWith('subst')) t = 'substantiv';
        else if (t.startsWith('adj')) t = 'adjektiv';
        // Group by cleaner keys

        counts[t] = (counts[t] || 0) + 1;
    });

    // 2. Define standard types to always show (pinned)
    const pinnedTypes = ['substantiv', 'verb', 'adjektiv', 'adverb', 'preposition'];

    // 3. Build Options HTML
    let html = `<option value="all">Alla (${items.length})</option>`;

    // Function to generate option line
    const createOption = (key, label, count) => {
        // Find a raw value that matches this key for the value attribute?
        // Actually the value attribute is used for filtering.
        // My filtering logic uses `includes`. So 'subst' matches 'substantiv'.
        // Let's use clean keys as values.
        // Wait, my HTML had 'subst', 'verb'.
        // Let's stick to standard keys: 'subst', 'verb', 'adj', 'adv', 'prep' for pinned.

        // Map full key back to short code for value if it's a pinned one
        let val = key;
        if (key === 'substantiv') val = 'subst';
        if (key === 'adjektiv') val = 'adj';
        // verbs are just 'verb'

        const isSelected = currentVal === val ? 'selected' : '';
        return `<option value="${val}" ${isSelected}>${label} (${count})</option>`;
    };

    // Add Pinned Types
    pinnedTypes.forEach(type => {
        const key = type; // e.g. 'substantiv'
        const count = counts[key] || 0;
        // Also check for short code in counts if data is messy
        // But I normalized to full names above?
        // Let's robustly sum counts?
        // Actually, let's keep it simple. Normalize `t` to `substantiv` if it is `subst`.

        const label = type.charAt(0).toUpperCase() + type.slice(1);
        html += createOption(key, label, count);
        delete counts[key]; // Remove from pool so we don't duplicate
    });

    // Add Separator
    html += `<option disabled>──────────</option>`;

    // Add Remaining Types (Sorted by count desc)
    const sortedRemaining = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    sortedRemaining.forEach(([key, count]) => {
        const label = (TYPE_LABELS[key] || key).charAt(0).toUpperCase() + (TYPE_LABELS[key] || key).slice(1);
        html += `<option value="${key}" ${currentVal === key ? 'selected' : ''}>${label} (${count})</option>`;
    });

    typeSelect.innerHTML = html;
}

function renderResults() {
    // Reset Pagination
    renderedCount = 0;
    resultsArea.innerHTML = ''; // Clear previous results

    if (currentResults.length === 0) {
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

function updateResults() {
    handleSearch({ target: searchInput });
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
    const grammarBadge = getGrammarBadge(item[COL_TYPE], forms, swe);
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
        <a href="details.html?id=${id}" class="card-link" onclick="handleCardClick(event, '${id}', '${swe.replace(/'/g, "\\'")}', this)">
            <div class="card" data-type="${wordTypeCategory}" style="view-transition-name: card-${id}">
                <div class="card-header">
                    <div class="word-header-group">
                        <h2 class="word-swe" dir="ltr">${swe}</h2>
                    </div>
                    <div class="card-actions">
                        ${grammarBadge}
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
window.handleCardClick = function (e, id, word, link) {
    if (word && typeof addToHistory === 'function') {
        addToHistory(word);
    }

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

// Toast Notification System moved to utils.js


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

    // Elements
    const wodTitle = wodCard.querySelector('.wod-title-col span'); // Title element
    const wodSwe = wodCard.querySelector('.wod-swe');
    const wodArb = wodCard.querySelector('.wod-arb');
    const wodDetailsBtn = wodCard.querySelector('#wodDetailsBtn');
    const wodFavBtn = wodCard.querySelector('#wodFavBtn');
    const wodLoopBtn = wodCard.querySelector('#wodLoopBtn'); // New Button
    const wodTypeBadge = wodCard.querySelector('.wod-type-badge');

    // Section Elements
    const wodFormsPreview = wodCard.querySelector('.wod-forms-preview');
    const wodFormsChips = wodCard.querySelector('.wod-forms-chips');

    const wodDefPreview = wodCard.querySelector('.wod-def-preview');
    const wodDefSwe = wodCard.querySelector('.wod-def-swe');

    const wodDefArbPreview = wodCard.querySelector('.wod-def-arb-preview');
    const wodDefArbText = wodCard.querySelector('.wod-def-arb-text');

    const wodExamplePreview = wodCard.querySelector('.wod-example-preview');
    const wodExSwe = wodCard.querySelector('.wod-ex-swe');

    const wodExampleArbPreview = wodCard.querySelector('.wod-example-arb-preview');
    const wodExArb = wodCard.querySelector('.wod-ex-arb');

    const wodIdiomPreview = wodCard.querySelector('.wod-idiom-preview');
    const wodIdiomSwe = wodCard.querySelector('.wod-idiom-swe');
    const wodIdiomArb = wodCard.querySelector('.wod-idiom-arb');

    // State
    let currentWodWord = null;

    if (!dictionaryData || dictionaryData.length === 0) {
        console.error('WOD: dictionaryData is empty!');
        return;
    }

    // Helper: Find a word with long example or idiom
    const generateRandomSentenceWord = () => {
        let attempts = 0;
        let foundWord = null;
        while (attempts < 500) { // Safety break
            const idx = Math.floor(Math.random() * dictionaryData.length);
            const w = dictionaryData[idx];

            const hasIdiom = (w[COL_IDIOM] && w[COL_IDIOM].length > 0) || (w[COL_IDIOM_ARB] && w[COL_IDIOM_ARB].length > 0);

            let hasLongEx = false;
            if (w[COL_EX]) {
                const wordCount = w[COL_EX].split(' ').length;
                if (wordCount > 5) hasLongEx = true;
            }

            if (hasIdiom || hasLongEx) {
                foundWord = w;
                break;
            }
            attempts++;
        }
        return foundWord || dictionaryData[Math.floor(Math.random() * dictionaryData.length)]; // Fallback
    };

    // Helper: Update UI
    const renderWod = (word, titleText = '📅 Dagens Ord') => {
        currentWodWord = word;
        if (wodTitle) wodTitle.textContent = titleText;

        // Reset Displays
        wodFormsPreview.style.display = 'none';
        wodDefPreview.style.display = 'none';
        wodDefArbPreview.style.display = 'none';
        wodExamplePreview.style.display = 'none';
        wodExampleArbPreview.style.display = 'none';
        wodIdiomPreview.style.display = 'none';

        // Main Words
        wodSwe.textContent = word[COL_SWE];
        wodArb.textContent = word[COL_ARB];

        // Font Sizing
        wodSwe.classList.remove('long-text', 'very-long-text', 'extra-long-text');
        const sweText = word[COL_SWE] || '';
        if (sweText.length > 12) wodSwe.classList.add('extra-long-text');
        else if (sweText.length > 9) wodSwe.classList.add('very-long-text');
        else if (sweText.length > 5) wodSwe.classList.add('long-text');

        // Badge
        if (word[COL_TYPE] && wodTypeBadge) {
            wodTypeBadge.textContent = word[COL_TYPE].replace('.', '');
        }

        // Forms
        if (word[COL_FORMS] && wodFormsPreview && wodFormsChips) {
            const formsArray = word[COL_FORMS].split(',').map(f => f.trim()).filter(f => f);
            if (formsArray.length > 0) {
                const previewForms = formsArray.slice(0, 5);
                wodFormsChips.innerHTML = previewForms.map(form => `<span class="wod-form-chip">${form}</span>`).join('');
                if (formsArray.length > 5) wodFormsChips.innerHTML += `<span class="wod-form-chip">+${formsArray.length - 5}</span>`;
                wodFormsPreview.style.display = 'block';
            }
        }

        // Definitions
        if (word[COL_DEF] && wodDefPreview && wodDefSwe) {
            let t = word[COL_DEF];
            if (t.length > 150) t = t.substring(0, 150) + '...';
            wodDefSwe.textContent = t;
            wodDefPreview.style.display = 'block';
        }
        if (word[COL_ARB_DEF] && wodDefArbPreview && wodDefArbText) {
            let t = word[COL_ARB_DEF];
            if (t.length > 150) t = t.substring(0, 150) + '...';
            wodDefArbText.textContent = t;
            wodDefArbPreview.style.display = 'block';
        }

        // Examples
        if (word[COL_EX] && wodExamplePreview && wodExSwe) {
            let t = word[COL_EX];
            if (t.length > 120) t = t.substring(0, 120) + '...';
            wodExSwe.textContent = t;
            wodExamplePreview.style.display = 'block';
        }
        if (word[COL_EX_ARB] && wodExampleArbPreview && wodExArb) {
            let t = word[COL_EX_ARB];
            if (t.length > 120) t = t.substring(0, 120) + '...';
            wodExArb.textContent = t;
            wodExampleArbPreview.style.display = 'block';
        }

        // Idioms
        if ((word[COL_IDIOM] || word[COL_IDIOM_ARB]) && wodIdiomPreview) {
            if (word[COL_IDIOM] && wodIdiomSwe) {
                let t = word[COL_IDIOM];
                if (t.length > 100) t = t.substring(0, 100) + '...';
                wodIdiomSwe.textContent = t;
            } else { wodIdiomSwe.textContent = ''; }

            if (word[COL_IDIOM_ARB] && wodIdiomArb) {
                let t = word[COL_IDIOM_ARB];
                if (t.length > 100) t = t.substring(0, 100) + '...';
                wodIdiomArb.textContent = t;
            } else { wodIdiomArb.textContent = ''; }

            wodIdiomPreview.style.display = 'block';
        }

        updateFavState();
    };

    // Update Fav Button State
    const updateFavState = () => {
        if (!currentWodWord || !wodFavBtn) return;
        const isFav = favorites.has(String(currentWodWord[COL_ID]));
        wodFavBtn.classList.toggle('active', isFav);
    };

    // Event Listeners
    if (wodFavBtn) {
        wodFavBtn.onclick = (e) => {
            e.stopPropagation();
            if (!currentWodWord) return;
            const idStr = String(currentWodWord[COL_ID]);

            if (favorites.has(idStr)) {
                favorites.delete(idStr);
            } else {
                favorites.add(idStr);
                createParticles(e.clientX, e.clientY, '#ff4757');
            }
            localStorage.setItem('favorites', JSON.stringify([...favorites]));
            updateFavState();
            if (typeof activeFilterMode !== 'undefined' && activeFilterMode === 'favorites') updateResults();
        };
    }

    if (wodDetailsBtn) {
        wodDetailsBtn.onclick = (e) => {
            e.preventDefault();
            if (!currentWodWord) return;
            window.location.href = `details.html?id=${currentWodWord[COL_ID]}`;
        };
    }

    if (wodLoopBtn) {
        wodLoopBtn.onclick = (e) => {
            e.preventDefault();
            // Animation/Spin Effect?
            const newWord = generateRandomSentenceWord();
            renderWod(newWord, '🎲 Slumpmässig');
        };
    }

    // Initialize with Daily Word
    // Use timestamp for randomness per session/day
    // To make it truly Daily, we should use Today's Date hash.
    // But current implementation was random per reload (Date.now()). 
    // I'll stick to random per reload as before, but maybe seed it?
    // "Date.now()" acts as random seed.
    const initialIndex = Math.floor(Math.random() * dictionaryData.length);
    const initialWord = dictionaryData[initialIndex];

    renderWod(initialWord, '📅 Dagens Ord');

    console.log('WOD: Displaying card');
    wodCard.style.display = 'block';
}

// Quiz Mode Logic
let quizScore = 0;

function initQuiz() {
    const quizBtn = document.getElementById('quizBtn');
    // gameBtn is a link, no listener needed if href is set, but kept if we want analytics
    const quizContainer = document.getElementById('quizInlineContainer');
    const closeQuiz = document.getElementById('closeQuiz');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    if (quizBtn && quizContainer) {
        quizBtn.addEventListener('click', (e) => {
            // Close settings menu if open
            const settingsMenu = document.getElementById('settingsMenu');
            if (settingsMenu) settingsMenu.style.display = 'none';

            // Toggle Quiz
            if (quizContainer.style.display === 'none') {
                quizContainer.style.display = 'block';
                startQuiz();
                // Smooth scroll to quiz
                quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                quizContainer.style.display = 'none';
            }
        });
    }

    if (closeQuiz && quizContainer) {
        closeQuiz.addEventListener('click', () => {
            quizContainer.style.display = 'none';
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
    // Modified: Target inline container
    const quizContainer = document.getElementById('quizInlineContainer');
    const quizEndScreen = document.getElementById('quizEndScreen');
    const questionCard = document.querySelector('.question-card');
    const quizOptions = document.getElementById('quizOptions');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    quizScore = 0;
    comboCount = 0; // Reset combo
    currentQuestionIndex = 0; // Reset question index
    if (document.getElementById('quizScore')) document.getElementById('quizScore').textContent = '0';

    if (quizContainer) {
        quizContainer.classList.remove('streak-3', 'streak-5', 'streak-10'); // Reset styles
    }

    // Hide end screen, show quiz elements
    if (quizEndScreen) quizEndScreen.style.display = 'none';
    if (questionCard) questionCard.style.display = 'block';
    if (quizOptions) quizOptions.style.display = 'flex';
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';

    // Core display logic is handled by initQuiz's toggle, so we don't force 'flex' here

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
        const quizContainer = document.getElementById('quizInlineContainer');
        if (quizContainer) {
            quizContainer.classList.remove('streak-3', 'streak-5', 'streak-10');

            if (comboCount >= 10) {
                quizContainer.classList.add('streak-10');
                createParticles(window.innerWidth / 2, window.innerHeight / 2); // Massive explosion
            } else if (comboCount >= 5) {
                quizContainer.classList.add('streak-5');
            } else if (comboCount >= 3) {
                quizContainer.classList.add('streak-3');
            }
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
        const quizContainer = document.getElementById('quizInlineContainer');
        if (quizContainer) {
            quizContainer.classList.remove('streak-3', 'streak-5', 'streak-10');
        }

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

// --- Smart Empty State Logic ---

function renderHistory() {
    // History feature disabled by user request
    return;
}

function addToHistory(term) {
    if (!term || term.length < 2) return;
    // Remove if exists (to move to top)
    searchHistory = searchHistory.filter(t => t.toLowerCase() !== term.toLowerCase());
    // Add to front
    searchHistory.unshift(term);
    // Limit to 10
    if (searchHistory.length > 10) searchHistory.pop();

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Global function for onclick
window.setSearch = function (term) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = term;
        // Trigger generic input event
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        addToHistory(term); // Save this click
    }
};

// Initialize Quiz
document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initPhysicsLogo();

    // Init Empty State
    renderHistory();
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim() === '' && emptyState) {
        emptyState.style.display = 'block';
        if (document.getElementById('searchResults')) document.getElementById('searchResults').style.display = 'none';
    }
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

// Mobile Device Orientation Tilt Effect
let deviceTiltEnabled = false;
let lastBeta = 0;
let lastGamma = 0;

function initDeviceTilt() {
    console.log('[DeviceTilt] Initializing...');

    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
        console.log('[DeviceTilt] DeviceOrientationEvent not supported');
        return;
    }

    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log('[DeviceTilt] Is Mobile:', isMobile);
    if (!isMobile) return;

    // Request permission for iOS 13+
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        console.log('[DeviceTilt] iOS detected - needs permission');

        // Check if permission was already granted
        const permissionGranted = localStorage.getItem('tiltPermissionGranted');
        if (permissionGranted === 'true') {
            console.log('[DeviceTilt] Permission already granted, enabling directly');
            enableDeviceTilt();
            return;
        }

        // Create a button to request permission (iOS requirement)
        const permissionBtn = document.createElement('button');
        permissionBtn.id = 'tiltPermissionBtn';
        permissionBtn.innerHTML = '📱 تفعيل تأثير الإمالة';
        permissionBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 14px 28px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            z-index: 99999;
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
            animation: pulse 2s ease-in-out infinite;
        `;
        document.body.appendChild(permissionBtn);

        // Show button after delay
        setTimeout(() => {
            permissionBtn.style.display = 'block';
            console.log('[DeviceTilt] Permission button shown');
        }, 1500);

        permissionBtn.addEventListener('click', async () => {
            console.log('[DeviceTilt] Permission button clicked');
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                console.log('[DeviceTilt] Permission result:', permission);
                if (permission === 'granted') {
                    localStorage.setItem('tiltPermissionGranted', 'true');
                    enableDeviceTilt();
                    showToast('تم تفعيل تأثير الإمالة! 📱✨');
                } else {
                    showToast('تم رفض الإذن ❌');
                }
            } catch (error) {
                console.error('[DeviceTilt] Permission error:', error);
                showToast('خطأ في طلب الإذن');
            }
            permissionBtn.remove();
        });
    } else {
        // Android and older iOS - permission not needed
        console.log('[DeviceTilt] Android detected - enabling directly');
        enableDeviceTilt();

        // Test if it's actually working
        setTimeout(() => {
            if (deviceTiltEnabled) {
                showToast('تأثير الإمالة مفعّل! 📱');
            }
        }, 2000);
    }
}

function enableDeviceTilt() {
    if (deviceTiltEnabled) return;
    deviceTiltEnabled = true;
    console.log('[DeviceTilt] Enabled!');

    window.addEventListener('deviceorientation', (e) => {
        // Get device orientation
        const beta = e.beta || 0;   // Front-to-back tilt (-180 to 180)
        const gamma = e.gamma || 0; // Left-to-right tilt (-90 to 90)

        // Smooth the values (reduce jitter)
        // Smooth the values (less smoothing = more responsive)
        lastBeta = lastBeta * 0.5 + beta * 0.5;
        lastGamma = lastGamma * 0.5 + gamma * 0.5;

        // Normalize values (device held at ~45 degrees is "neutral")
        const neutralBeta = 45;
        const normalizedBeta = (lastBeta - neutralBeta) * 0.6;  // Increased from 0.2
        const normalizedGamma = lastGamma * 0.6;  // Increased from 0.2

        // Clamp values (increased range for more dramatic effect)
        const xRot = Math.max(-25, Math.min(25, normalizedBeta));
        const yRot = Math.max(-25, Math.min(25, normalizedGamma));



        // Apply to all visible cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            // Only apply if card is in viewport
            const rect = card.getBoundingClientRect();
            const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

            if (inViewport) {
                card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            }
        });
    }, { passive: true });
}

// Initialize device tilt on load
document.addEventListener('DOMContentLoaded', initDeviceTilt);

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
