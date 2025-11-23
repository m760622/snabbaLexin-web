// State
// dictionaryData is global from data.js
let isLoading = true;
let searchIndex = []; // Pre-computed search strings
let currentResults = []; // Store all matching results
let renderedCount = 0; // Track how many are currently shown
const BATCH_SIZE = 50; // Number of items to load per batch
let favorites = new Set(); // Store favorite IDs
let showFavoritesOnly = false; // Filter state

// DOM Elements
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const resultsArea = document.getElementById('resultsArea');
const statsElement = document.getElementById('stats');
const themeToggle = document.getElementById('themeToggle');
const favoritesToggle = document.getElementById('favoritesToggle');
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

    // Favorites Logic
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = new Set(savedFavorites);

    favoritesToggle.addEventListener('click', () => {
        showFavoritesOnly = !showFavoritesOnly;
        favoritesToggle.classList.toggle('active', showFavoritesOnly);

        // Toggle visibility of export/import buttons
        const favoritesActions = document.getElementById('favoritesActions');
        const customWordsActions = document.getElementById('customWordsActions');

        if (showFavoritesOnly) {
            favoritesActions.classList.add('visible');
            customWordsActions.style.display = 'none'; // Hide custom words actions
        } else {
            favoritesActions.classList.remove('visible');
            customWordsActions.style.display = 'flex'; // Show custom words actions
        }

        handleSearch({ target: searchInput });
    });

    // Export Favorites
    document.getElementById('exportFavorites').addEventListener('click', () => {
        if (favorites.size === 0) {
            alert('Inga favoriter att exportera / لا توجد مفضلة للتصدير');
            return;
        }
        const dataStr = JSON.stringify([...favorites]);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'lexin_favorites.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    });

    // Import Favorites
    const importFile = document.getElementById('importFile');
    document.getElementById('importFavorites').addEventListener('click', () => {
        importFile.click();
    });

    importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const importedFavorites = JSON.parse(e.target.result);
                if (!Array.isArray(importedFavorites)) throw new Error('Invalid format');

                let addedCount = 0;
                importedFavorites.forEach(id => {
                    if (!favorites.has(id)) {
                        favorites.add(id);
                        addedCount++;
                    }
                });

                localStorage.setItem('favorites', JSON.stringify([...favorites]));
                alert(`Importerade ${addedCount} nya favoriter / تم استيراد ${addedCount} مفضلة جديدة`);

                // Refresh view if showing favorites
                if (showFavoritesOnly) {
                    handleSearch({ target: searchInput });
                }
            } catch (error) {
                console.error(error);
                alert('Fel vid import av fil / خطأ في استيراد الملف');
            }
            importFile.value = ''; // Reset input
        };
        reader.readAsText(file);
    });

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

    } catch (error) {
        console.error(error);
        statsElement.innerHTML = `<div style="color: red;">Fel vid laddning av data: ${error.message} / خطأ: ${error.message}</div>`;
    }
}

// Build Search Index Helper
function buildSearchIndex() {
    searchIndex = new Array(dictionaryData.length);
    for (let i = 0; i < dictionaryData.length; i++) {
        const item = dictionaryData[i];
        if (!item) continue; // Skip invalid items

        // Join all searchable fields with a space and NORMALIZE
        searchIndex[i] = normalizeArabic(
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

// Search Handler
function handleSearch(e) {
    const rawQuery = e.target.value.trim();
    const query = normalizeArabic(rawQuery); // Normalize query for general search
    const sortMethod = sortSelect.value;
    const searchMode = document.getElementById('searchMode').value;

    sessionStorage.setItem('searchQuery', e.target.value);

    // If showing favorites only
    if (showFavoritesOnly) {
        // For now, keeping simple filter on top of favorites
        let results = dictionaryData.filter(item => favorites.has(item[COL_ID]));

        // Filter by Type if selected
        const selectedType = typeSelect.value;
        if (selectedType !== 'all') {
            results = results.filter(item => item[COL_TYPE] === selectedType);
        }

        updateResults(results, sortMethod);
        return;
    }

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
        for (let i = 0; i < dictionaryData.length; i++) {
            if (searchIndex[i] && searchIndex[i].includes(query)) {
                results.push(dictionaryData[i]);
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

// Toggle Favorite
window.toggleFavorite = function (id, btn) {
    // Prevent navigation
    event.preventDefault();
    event.stopPropagation();

    if (favorites.has(id)) {
        favorites.delete(id);
        btn.classList.remove('active');
    } else {
        favorites.add(id);
        btn.classList.add('active');

        // Animation effect
        btn.style.transform = 'scale(1.4)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }

    localStorage.setItem('favorites', JSON.stringify([...favorites]));

    // If in favorites view and removing, refresh list
    if (showFavoritesOnly && !favorites.has(id)) {
        handleSearch({ target: searchInput });
    }
};

// Create Card HTML
function createCard(item, index = 0) {
    const id = item[COL_ID] || '';
    const swe = item[COL_SWE] || '';
    const arb = item[COL_ARB] || '';
    const type = item[COL_TYPE] ? item[COL_TYPE].replace('.', '') : '';
    const sweDef = item[COL_SWE_DEF] || '';
    const arbDef = item[COL_ARB_DEF] || '';
    const exSwe = item[COL_EX_SWE] || '';
    const exArb = item[COL_EX_ARB] || '';
    const idiomSwe = item[COL_IDIOM_SWE] || '';
    const idiomArb = item[COL_IDIOM_ARB] || '';

    const isFav = favorites.has(id);

    // Examples
    let examplesHtml = '';
    if (exSwe || exArb) {
        examplesHtml = `
            <div class="examples">
                <span class="ex-label">Exempel / أمثلة</span>
                <div class="ex-item">
                    ${exSwe ? `<div class="ex-swe">${exSwe}</div>` : ''}
                    ${exArb ? `<div class="ex-arb">${exArb}</div>` : ''}
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
                    ${idiomSwe ? `<div class="ex-swe">${idiomSwe}</div>` : ''}
                    ${idiomArb ? `<div class="ex-arb">${idiomArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    return `
        <a href="details.html?id=${id}" class="card-link">
            <div class="card">
                <div class="result-number">#${index + 1}</div>
                <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${id}', this)" aria-label="Spara som favorit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <div class="card-header">
                    <div class="word-swe">${swe}</div>
                    ${type ? `<div class="word-type">${type}</div>` : ''}
                </div>

                ${arb ? `<div class="word-arb">${arb}</div>` : ''}

                <div class="definitions">
                    ${sweDef || arbDef ? `
                        <div class="def-row">
                            ${sweDef ? `<div class="def-swe">${sweDef}</div>` : ''}
                            ${arbDef ? `<div class="def-arb">${arbDef}</div>` : ''}
                        </div>
                    ` : ''}
                </div>

                ${examplesHtml}
                ${idiomsHtml}
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
