document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const listContainer = document.getElementById('quranList');
    const searchInput = document.getElementById('searchInput');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modeContainers = {
        list: document.getElementById('quranList'),
        flashcards: document.getElementById('flashcardMode'),
        quiz: document.getElementById('quizMode')
    };

    // Filters
    const surahFilter = document.getElementById('surahFilter');
    const filterBar = document.getElementById('filterBar');

    // Quiz Settings & Theme
    // Quiz Settings & Theme
    const quizLangToggle = document.getElementById('quizLangToggle'); // Keep for specific quiz mode override if needed
    const globalFcLangToggle = document.getElementById('globalFcLangToggle');
    const userXPEl = document.getElementById('userXP');
    const themeSelector = document.getElementById('themeSelector');

    // Settings Modal UI
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const mobileViewToggle = document.getElementById('mobileViewToggle');

    // --- Mobile View Logic ---
    function updateMobileView(isMobile) {
        document.body.classList.toggle('iphone-view', isMobile);
        localStorage.setItem('mobileView', isMobile ? 'true' : 'false');
        if (mobileViewToggle) mobileViewToggle.checked = isMobile;
        window.dispatchEvent(new Event('resize'));
    }

    // Apply saved mobile preference
    const savedMobile = localStorage.getItem('mobileView') === 'true';
    updateMobileView(savedMobile);

    if (mobileViewToggle) {
        mobileViewToggle.addEventListener('change', (e) => {
            updateMobileView(e.target.checked);
        });
    }

    // --- Settings Modal Logic ---
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (settingsModal) {
                settingsModal.classList.remove('hidden');
                // Sync theme to modal for CSS variables
                const currentTheme = document.body.getAttribute('data-quran-theme');
                const modalContent = settingsModal.querySelector('.settings-content');
                if (modalContent) {
                    if (currentTheme) {
                        modalContent.setAttribute('data-quran-theme', currentTheme);
                    } else {
                        modalContent.removeAttribute('data-quran-theme');
                    }
                }
            }
        });
    }

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
            if (settingsModal) settingsModal.classList.add('hidden');
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.add('hidden');
        }
    });

    // --- State & SRS Data ---
    let currentMode = 'list';

    // Default User Data
    let userData = {
        xp: 0,
        streak: 0,
        srs: {}, // { wordId: { level: 0, nextReview: timestamp } }
        favorites: [], // [wordId, wordId...]
        theme: 'emerald'
    };

    // Load from LocalStorage
    const savedData = localStorage.getItem('quranUserProgress');
    if (savedData) {
        userData = { ...userData, ...JSON.parse(savedData) };
        // Ensure favorites array exists if loading old data
        if (!userData.favorites) userData.favorites = [];
    }

    // Apply Saved Theme
    applyTheme(userData.theme);
    if (themeSelector) themeSelector.value = userData.theme;

    // Flashcard State
    let fcIndex = 0;
    let fcFlipped = false;
    let filteredData = [...quranData]; // Working dataset

    // Quiz State
    let quizScore = 0;
    let quizStreak = 0; // Session streak
    let currentQuizItem = null;
    let quizDirection = 'sv-ar'; // 'ar-sv' or 'sv-ar'

    // --- Initialization ---
    initFilters();
    initTheme();
    updateXPDisplay();
    renderCards(quranData);
    initTabs();
    initFlashcards();
    initQuiz();

    // Helper: Save Data
    function saveProgress() {
        localStorage.setItem('quranUserProgress', JSON.stringify(userData));
        updateXPDisplay();
    }

    function updateXPDisplay() {
        if (userXPEl) userXPEl.textContent = userData.xp;

        // Update Donut Visuals (Assume 100 XP = 1 Level Circle)
        const donut = document.getElementById('xpDonut');
        if (donut) {
            const percentage = (userData.xp % 100) / 100 * 100; // 0-100 range for current level
            donut.style.setProperty('--p', percentage);
            // Optional: Change color based on total level?
        }
    }

    // --- Theme Logic ---
    function initTheme() {
        themeSelector.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            applyTheme(newTheme);
            userData.theme = newTheme;
            saveProgress();
        });
    }

    function applyTheme(theme) {
        const modalContent = document.querySelector('.settings-content');
        if (theme === 'emerald' || theme === 'default') {
            document.body.removeAttribute('data-quran-theme');
            if (modalContent) modalContent.removeAttribute('data-quran-theme');
        } else {
            document.body.setAttribute('data-quran-theme', theme);
            if (modalContent) modalContent.setAttribute('data-quran-theme', theme);
        }
    }


    // --- Daily Goal Logic ---
    function checkDailyGoal() {
        const today = new Date().toISOString().split('T')[0];
        if (!userData.daily || userData.daily.date !== today) {
            userData.daily = { date: today, count: 0 };
        }
        updateGoalUI();
    }

    function updateGoalUI() {
        const goal = 5;
        const count = userData.daily.count;
        const pct = Math.min((count / goal) * 100, 100);

        document.getElementById('dailyGoalText').textContent = `${count}/${goal}`;
        document.getElementById('dailyGoalFill').style.width = `${pct}%`;
    }

    window.incrementDailyGoal = function () {
        checkDailyGoal();
        userData.daily.count++;
        saveProgress();
        updateGoalUI();
    }

    // --- Filter Logic ---
    function initFilters() {
        // Populate Surah Filter
        // Use trim() to normalize and Set to deduplicate
        const uniqueSurahs = [...new Set(quranData.map(item => item.surah ? item.surah.trim() : ''))]
            .filter(Boolean) // Remove empties
            .sort(); // Optional: Sort alphabetically/numerically

        uniqueSurahs.forEach(surah => {
            const opt = document.createElement('option');
            opt.value = surah;
            opt.textContent = surah;
            surahFilter.appendChild(opt);
        });

        // Event Listeners
        surahFilter.addEventListener('change', filterData);
        document.getElementById('typeFilter').addEventListener('change', filterData); // Add Type Listener
    }

    function filterData() {
        if (!searchInput) return; // Guard
        const query = searchInput.value.toLowerCase();
        const surah = surahFilter.value;
        const type = document.getElementById('typeFilter') ? document.getElementById('typeFilter').value : 'all';

        filteredData = quranData.filter(item => {
            const matchesSearch =
                (item.word && item.word.includes(query)) ||
                (item.word_sv && item.word_sv.toLowerCase().includes(query)) ||
                (item.meaning_ar && item.meaning_ar.includes(query)) ||
                (item.ayah_full && item.ayah_full.includes(query)) ||
                (item.ayah_sv && item.ayah_sv.toLowerCase().includes(query));

            const matchesSurah = surah === 'all'
                ? true
                : surah === 'favorites'
                    ? userData.favorites.includes(item.id)
                    : item.surah === surah;

            const matchesType = type === 'all' || item.type === type;

            return matchesSearch && matchesSurah && matchesType;
        });

        // Re-render based on current mode
        if (currentMode === 'list') renderCards(filteredData);
        if (currentMode === 'flashcards') {
            fcIndex = 0;
            loadFlashcard(fcIndex);
        }
    }

    // --- Audio Helper & Surah Map ---
    // Mapping Arabic Surah Names to 3-digit IDs for EveryAyah API
    const surahMap = {
        "الفاتحة": "001", "البقرة": "002", "آل عمران": "003", "النساء": "004", "المائدة": "005",
        "الأنعام": "006", "الأعراف": "007", "الأنفال": "008", "التوبة": "009", "يونس": "010",
        "هود": "011", "يوسف": "012", "الرعد": "013", "إبراهيم": "014", "الحجر": "015",
        "النحل": "016", "الإسراء": "017", "الكهف": "018", "مريم": "019", "طه": "020",
        "الأنبياء": "021", "الحج": "022", "المؤمنون": "023", "النور": "024", "الفرقان": "025",
        "الشعراء": "026", "النمل": "027", "القصص": "028", "العنكبوت": "029", "الروم": "030",
        "لقمان": "031", "السجدة": "032", "الأحزاب": "033", "سبأ": "034", "فاطر": "035",
        "يس": "036", "الصافات": "037", "ص": "038", "الزمر": "039", "غافر": "040",
        "فصلت": "041", "الشورى": "042", "الزخرف": "043", "الدخان": "044", "الجاثية": "045",
        "الأحقاف": "046", "محمد": "047", "الفتح": "048", "الحجرات": "049", "ق": "050",
        "الذاريات": "051", "الطور": "052", "النجم": "053", "القمر": "054", "الرحمن": "055",
        "الواقعة": "056", "الحديد": "057", "المجادلة": "058", "الحشر": "059", "الممتحنة": "060",
        "الصف": "061", "الجمعة": "062", "المنافقون": "063", "التغابن": "064", "الطلاق": "065",
        "التحريم": "066", "الملك": "067", "القلم": "068", "الحاقة": "069", "المعارج": "070",
        "نوح": "071", "الجن": "072", "المزمل": "073", "المدثر": "074", "القيامة": "075",
        "الإنسان": "076", "المرسلات": "077", "النبأ": "078", "النازعات": "079", "عبس": "080",
        "التكوير": "081", "الإنفطار": "082", "المطففين": "083", "الإنشقاق": "084", "البروج": "085",
        "الطارق": "086", "الأعلى": "087", "الغاشية": "088", "الفجر": "089", "البلد": "090",
        "الشمس": "091", "الليل": "092", "الضحى": "093", "الشرح": "094", "التين": "095",
        "العلق": "096", "القدر": "097", "البينة": "098", "الزلزلة": "099", "العاديات": "100",
        "القارعة": "101", "التكاثر": "102", "العصر": "103", "الهمزة": "104", "الفيل": "105",
        "قريش": "106", "الماعون": "107", "الكوثر": "108", "الكافرون": "109", "النصر": "110",
        "المسد": "111", "الإخلاص": "112", "الفلق": "113", "الناس": "114"
    };

    function getAudioUrl(surahStr) {
        // Expected format: "SurahName (AyahNum)" ex: "المجادلة (21)" or "النبأ (1)"
        try {
            const matches = surahStr.match(/(.+)\s\((\d+)\)/);
            if (matches && matches.length === 3) {
                const name = matches[1].trim();
                const ayah = matches[2].trim().padStart(3, '0');
                const surahID = surahMap[name];

                if (surahID) {
                    // Using Mishary Rashid Alafasy 128kbps
                    return `https://everyayah.com/data/Alafasy_128kbps/${surahID}${ayah}.mp3`;
                }
            }
        } catch (err) {
            console.error("Error parsing audio URL:", err);
        }
        return null;
    }

    // --- Tab Logic ---
    function initTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                switchMode(btn.dataset.mode);
            });
        });
    }

    function switchMode(mode) {
        currentMode = mode;
        Object.values(modeContainers).forEach(el => el.classList.add('hidden'));
        modeContainers[mode].classList.remove('hidden');

        // Toggle Filter Bar Visibility (Show in List/Cards, Hide in Quiz)
        if (mode === 'quiz') {
            filterBar.classList.add('hidden');
            // Check if we need to start quiz
            if (!currentQuizItem) nextQuestion();
        } else {
            filterBar.classList.remove('hidden');
            if (mode === 'flashcards') {
                // Determine sort order? For now just use filtered list
                // SRS Feature: Could sort by 'Level' here
                loadFlashcard(fcIndex);
            }
        }
    }

    // --- List & Search ---
    searchInput.addEventListener('input', filterData);
    // --- Root / Related Words Logic (Heuristic) ---
    window.findRelatedWords = function (currentWord) {
        if (!currentWord) return [];
        const cleanWord = currentWord.replace(/[^\u0621-\u064A]/g, '');
        if (cleanWord.length < 3) return [];
        const rootProxy = cleanWord.substring(0, 3);

        return quranData.filter(item => {
            if (item.word === currentWord) return false;
            const itemClean = item.word.replace(/[^\u0621-\u064A]/g, '');
            return itemClean.includes(rootProxy);
        });
    }

    window.showRelatedList = function (sourceWord) {
        // Switch to list view and filter
        document.querySelector('.tab-btn[data-mode="list"]').click();

        const related = findRelatedWords(sourceWord);

        // Custom rendering for related items
        listContainer.innerHTML = `<div class="related-header" style="padding:1rem; text-align:center;">
            <h3 style="color:var(--quran-gold)">Orden från samma rot "${sourceWord}" (Ungefär)</h3>
            <button onclick="renderCards(quranData)" class="control-btn" style="margin-top:10px">Visa alla</button>
        </div>`;

        renderCards(related); // Use the existing renderCards function
    }

    // --- Audio Recording Logic ---
    let mediaRecorder;
    let audioChunks = [];

    window.startRecording = async function (btn) {
        btn.classList.add('recording');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.start();
        } catch (err) {
            console.error("Mic access denied", err);
            alert("Behöver mikrofon-tillåtelse!");
            btn.classList.remove('recording');
        }
    }

    window.stopRecording = function (btn) {
        if (!mediaRecorder || mediaRecorder.state === 'inactive') return;

        btn.classList.remove('recording');
        mediaRecorder.stop();

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        };
    }


    // --- Share Logic ---


    // --- Modal Logic ---
    window.openInfoModal = function (id) {
        const item = quranData.find(d => d.id == id);
        if (!item) return;

        const modal = document.getElementById('infoModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = `Tafsir: ${item.word}`;
        body.innerHTML = `
            <div class="tafsir-text">
                <strong>📝 Rot/Ursprung (Estimat):</strong> ${item.word.replace(/[^\u0621-\u064A]/g, '').substring(0, 3)}<br><br>
                <strong>📖 Kontext (Svenska):</strong><br> "${item.ayah_sv}"<br><br>
                <strong>💡 Betydelse (Utökad):</strong><br> ${item.meaning_ar}<br><br>
                <em>(Tafsir Al-Jalalayn - Kommer snart)</em>
            </div>
            <button class="control-btn" style="background:var(--quran-green); width:100%" onclick="closeInfoModal()">Stäng</button>
        `;

        modal.classList.remove('hidden');
    }

    window.closeInfoModal = function () {
        document.getElementById('infoModal').classList.add('hidden');
    }

    function renderCards(items) {
        listContainer.innerHTML = '';

        if (items.length === 0) {
            listContainer.innerHTML = '<div style="text-align:center; color:#ccc; padding:2rem;">Inga resultat hittades</div>';
            return;
        }

        // Optimize rendering with fragment
        const fragment = document.createDocumentFragment();

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'quran-card';

            // Highlight
            let displayAyah = item.ayah_full;
            if (item.word && displayAyah.includes(item.word)) {
                displayAyah = displayAyah.replace(item.word, `<span class="highlight-word">${item.word}</span>`);
            }

            // Audio Buttons HTML
            const svAudioBtn = `<button class="audio-btn" onclick="playTTS('${item.word_sv}', 'sv-SE', this)">🔊</button>`;

            // Share Buttons HTML 



            // Arabic Audio (Real Recitation)
            const audioUrl = getAudioUrl(item.surah);
            const arAudioBtn = `<button class="audio-btn" onclick="playTTS('${item.ayah_full}', 'ar-SA', this, '${audioUrl}')">🕌</button>`;
            const micBtn = `<button class="audio-btn mic-btn" onmousedown="startRecording(this)" onmouseup="stopRecording(this)" ontouchstart="startRecording(this)" ontouchend="stopRecording(this)" title="Håll in för att spela in">🎙️</button>`;
            // Root Button (Only show if potential matches exist - optimization: always show but check count on click? Let's just show it)
            const rootBtn = `<button class="audio-btn" onclick="showRelatedList('${item.word}')" style="margin-left:5px" title="Visa relaterade ord">🌱</button>`;

            const infoBtn = `<button class="audio-btn" onclick="openInfoModal('${item.id}')" style="margin-left:5px">ℹ️</button>`;





            // Star logic (SVG)
            const isFav = userData.favorites.includes(item.id);
            const favClass = isFav ? 'fav-btn active' : 'fav-btn';
            const favIcon = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>`;

            card.innerHTML = `
                <div class="card-header">
                    <div class="left-actions">
                        <button class="share-btn" data-item='${JSON.stringify(item).replace(/'/g, "&apos;")}' onclick="shareCard(JSON.parse(this.dataset.item), event)" title="Dela">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                        </button>
                        <span class="badger surah-badge">${item.surah}</span>
                    </div>
                    <button class="${favClass}" onclick="toggleFavorite('${item.id}')" data-id="${item.id}" title="Spara till favoriter">${favIcon}</button>
                </div>
                
                <div class="main-word-section">
                    <span class="target-word">${item.word}</span>
                    <span class="meaning-ar">${item.meaning_ar}</span>
                    <span class="word-sv">${item.word_sv} ${svAudioBtn} ${infoBtn}</span>
                </div>

                <div class="ayah-section">
                    <div class="ayah-full">${displayAyah} ${arAudioBtn} ${micBtn} ${rootBtn}</div>
                    <div class="ayah-sv">${item.ayah_sv}</div>
                </div>
            `;




            fragment.appendChild(card);
        });

        listContainer.appendChild(fragment);
    }

    window.shareCard = async function (item, e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!item) {
            console.error("No item to share");
            return;
        }

        const text = `🔹 ${item.word} (${item.surah})\n\nMeaning: ${item.meaning_ar}\n\n📖 ${item.ayah_full}\n\n🇸🇪 "${item.ayah_sv}"\n\n- Snabbalexin Quran`;
        const shareData = {
            title: 'Koranord - SnabbaLexin',
            text: text,
        };

        try {
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                console.log('Shared successfully');
            } else {
                throw new Error('Web Share API not supported');
            }
        } catch (err) {
            console.warn('Share failed/unsupported, falling back to clipboard', err);
            try {
                await navigator.clipboard.writeText(text);

                // Show a temporary visual feedback instead of alert if possible, or a nice toast
                // For now, simpler alert but maybe styled? Let's use standard alert or custom logic later.
                // Resetting button state or similar could be good.
                const btn = e ? e.currentTarget : null;
                const originalContent = btn ? btn.innerHTML : '';

                if (btn) {
                    btn.innerHTML = '✅';
                    setTimeout(() => btn.innerHTML = originalContent, 2000);
                }

                alert("Text kopierad till urklipp!");
            } catch (clipboardErr) {
                console.error('Clipboard failed', clipboardErr);
                alert("Kunde inte dela eller kopiera texten.");
            }
        }
    }

    window.playTTS = function (text, lang, btn, audioUrl = null) {
        if (btn) {
            btn.classList.add('playing');
            // Remove playing class after animation (backup if audio end event fails)
            setTimeout(() => btn.classList.remove('playing'), 5000); // Increased timeout for real audio

            // --- Karaoke Effect ---
            // Find the closest card container (list or flashcard)
            const card = btn.closest('.quran-card') || btn.closest('.fc-inner');
            if (card) {
                // Find highlighting span
                const highlight = card.querySelector('.highlight-word');
                if (highlight) {
                    highlight.classList.add('highlight-karaoke');
                    // Remove after roughly 5 seconds (matched with audio timeout roughly)
                    setTimeout(() => highlight.classList.remove('highlight-karaoke'), 5000);
                }
            }
        }

        // --- Real Audio Logic ---
        if (lang === 'ar-SA' && audioUrl) {
            const audio = new Audio(audioUrl);
            audio.onended = () => {
                if (btn) btn.classList.remove('playing');
                const card = btn ? (btn.closest('.quran-card') || btn.closest('.fc-inner')) : null;
                if (card) {
                    const highlight = card.querySelector('.highlight-word');
                    if (highlight) highlight.classList.remove('highlight-karaoke');
                }
            };
            audio.onerror = () => {
                console.warn('Audio playback failed, falling back to TTS.');
                speakFallback(text, lang);
            };
            audio.play().catch(e => {
                console.error("Audio play error:", e);
                speakFallback(text, lang);
            });
            return;
        }

        speakFallback(text, lang);
    };

    function speakFallback(text, lang) {
        // Use unified TTSManager from utils.js
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(text, lang);
        } else {
            console.warn('TTSManager not found, using fallback.');
            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            window.speechSynthesis.speak(u);
        }
    }

    // --- Flashcard Logic ---
    let fcDirection = 'sv-ar'; // Default

    function initFlashcards() {
        const cardEl = document.getElementById('quranFlashcard');
        const prevBtn = document.getElementById('prevCardBtn');
        const nextBtn = document.getElementById('nextCardBtn');
        const fcLangToggle = document.getElementById('fcLangToggle');
        const fcModeLabel = document.getElementById('fcModeLabel');
        const ratingControls = document.getElementById('ratingControls');
        const favBtns = document.querySelectorAll('.fav-btn');

        // Rating Buttons
        document.querySelectorAll('.rate-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleRating(btn.dataset.rating);
            });
        });

        // Favorite Buttons
        favBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent flip
                if (!filteredData[fcIndex]) return;
                toggleFavorite(filteredData[fcIndex].id);
            });
        });

        // Share Buttons Logic
        const shareBtns = [document.getElementById('fcShareBtn'), document.getElementById('fcShareBtnBack')];
        shareBtns.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!filteredData[fcIndex]) return;
                shareCard(filteredData[fcIndex], e);
            });
        });

        // Flip Logic
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.audio-btn') || e.target.closest('.fav-btn') || e.target.closest('.share-btn')) return;

            fcFlipped = !fcFlipped;
            cardEl.classList.toggle('flipped', fcFlipped);
            // Show Rating Controls when flipped to Back
            if (fcFlipped) {
                ratingControls.classList.add('visible');
            } else {
                ratingControls.classList.remove('visible');
            }
        });

        // Navigation
        prevBtn.addEventListener('click', () => { if (fcIndex > 0) { fcIndex--; loadFlashcard(fcIndex); } });
        nextBtn.addEventListener('click', () => { if (fcIndex < filteredData.length - 1) { fcIndex++; loadFlashcard(fcIndex); } });

        // Toggle Language (Global Handler)
        if (globalFcLangToggle) {
            globalFcLangToggle.addEventListener('change', (e) => {
                fcDirection = e.target.checked ? 'sv-ar' : 'ar-sv';
                // Update local toggle if it exists
                if (fcLangToggle) fcLangToggle.checked = e.target.checked;

                if (fcModeLabel) fcModeLabel.textContent = e.target.checked ? '🇸🇪 Svenska (Framsida)' : '🇸🇦 Arabiska (Framsida)';
                loadFlashcard(fcIndex);
            });
        }

        // Local Flashcard Toggle (Keep solely for backward compatibility or if user uses that one)
        if (fcLangToggle) {
            fcLangToggle.addEventListener('change', (e) => {
                fcDirection = e.target.checked ? 'sv-ar' : 'ar-sv';
                if (globalFcLangToggle) globalFcLangToggle.checked = e.target.checked;
                fcModeLabel.textContent = e.target.checked ? '🇸🇪 Svenska (Framsida)' : '🇸🇦 Arabiska (Framsida)';
                loadFlashcard(fcIndex);
            });
        }
    }

    function loadFlashcard(index) {
        if (!filteredData[index]) return;

        const cardEl = document.getElementById('quranFlashcard');
        const ratingControls = document.getElementById('ratingControls');

        // Reset State
        fcFlipped = false;
        cardEl.classList.remove('flipped');
        ratingControls.classList.remove('visible');

        setTimeout(() => {
            const item = filteredData[index];
            const isArFront = fcDirection === 'ar-sv';
            const isFav = userData.favorites.includes(item.id);

            // Update Favorite Icons
            document.querySelectorAll('.fav-btn').forEach(btn => {
                btn.textContent = isFav ? '❤️' : '🤍';
                btn.style.filter = isFav ? "drop-shadow(0 0 5px red)" : "none";
                btn.classList.toggle('active', isFav);
            });

            document.getElementById('fcSurah').textContent = item.surah;
            document.getElementById('fcWord').textContent = isArFront ? item.word : item.word_sv;

            if (isArFront) {
                document.getElementById('fcMeaning').textContent = item.meaning_ar;
                const audioUrl = getAudioUrl(item.surah);
                const arAudio = `<button class="audio-btn" onclick="playTTS('${item.ayah_full}', 'ar-SA', this, '${audioUrl}')">🕌</button>`;
                const svAudio = `<button class="audio-btn" onclick="playTTS('${item.word_sv}', 'sv-SE', this)">🔊</button>`;
                // Share button is now in header, removing from here to avoid duplication if user wants clean UI, 
                // BUT user asked "Where is it", maybe they expect it near text?
                // Actually header is better. Let's keep Info button near translation since it adds context.
                const infoBtn = `<button class="audio-btn" onclick="openInfoModal('${item.id}')" style="margin-left:5px" title="Tafsir/Info">ℹ️</button>`;

                const ayahHtml = item.ayah_full.replace(item.word, `<span class="highlight-word">${item.word}</span>`);
                document.getElementById('fcAyah').innerHTML = ayahHtml + arAudio + infoBtn; // Added Info Button
                document.getElementById('fcTrans').innerHTML = `<div style="margin-bottom:5px; font-weight:bold; color:var(--quran-gold)">${item.word_sv} ${svAudio}</div><div>${item.ayah_sv}</div>`;
            } else {
                document.getElementById('fcMeaning').textContent = item.meaning_ar;
                const arAudio = `<button class="audio-btn" onclick="playTTS('${item.ayah_full}', 'ar-SA', this)">🕌</button>`;
                const infoBtn = `<button class="audio-btn" onclick="openInfoModal('${item.id}')" style="margin-left:5px" title="Tafsir/Info">ℹ️</button>`;

                const ayahHtml = item.ayah_full.replace(item.word, `<span class="highlight-word">${item.word}</span>`);
                document.getElementById('fcAyah').innerHTML = `<div style="font-size:1.4rem; margin-bottom:0.5rem; color:var(--quran-gold);">${item.word}</div>${ayahHtml} ${arAudio} ${infoBtn}`; // Added Info Button
                document.getElementById('fcTrans').innerHTML = `<div>${item.ayah_sv}</div>`;
            }

            document.getElementById('fcProgress').textContent = `${index + 1} / ${filteredData.length}`;
        }, 300);
    }

    function handleRating(rating) {
        if (!filteredData[fcIndex]) return;
        const item = filteredData[fcIndex];

        // Simple SRS Logic
        let nextInterval = 1; // Default 1 day
        if (rating === 'easy') nextInterval = 7;
        if (rating === 'good') nextInterval = 3;
        if (rating === 'hard') nextInterval = 1;
        if (rating === 'again') nextInterval = 0; // Review today

        const nextReviewDate = Date.now() + (nextInterval * 24 * 60 * 60 * 1000);

        userData.srs[item.id] = {
            level: (userData.srs[item.id]?.level || 0) + (rating === 'again' ? 0 : 1),
            nextReview: nextReviewDate,
            lastRating: rating
        };

        saveProgress();

        // Auto Advance if Good/Easy
        if (['good', 'easy', 'hard'].includes(rating)) {
            if (fcIndex < filteredData.length - 1) {
                fcIndex++;
                loadFlashcard(fcIndex);
            }
        }
    }

    window.toggleFavorite = function (id) {
        if (userData.favorites.includes(id)) {
            userData.favorites = userData.favorites.filter(favId => favId !== id);
        } else {
            userData.favorites.push(id);
        }
        saveProgress();
        // Update current card UI immediately
        const isFav = userData.favorites.includes(id);
        // Only update buttons correpsonding to THIS id
        document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
            btn.textContent = isFav ? '❤️' : '🤍';
            // btn.classList.toggle('active', isFav); // Optional class for CSS styling if needed
            if (isFav) btn.style.filter = "drop-shadow(0 0 5px red)";
            else btn.style.filter = "none";
        });

        // If in 'favorites' filter mode, re-render to remove un-favorited item visually if desired?
        // For now, let's keep it simple.
    }

    // --- Quiz Logic ---
    function initQuiz() {
        document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);

        quizLangToggle.addEventListener('change', (e) => {
            quizDirection = e.target.checked ? 'sv-ar' : 'ar-sv';
            quizModeLabel.textContent = e.target.checked ?
                '🇸🇪 Svenska ➔ 🇸🇦 Arabiska' :
                '🇸🇦 Arabiska ➔ 🇸🇪 Svenska';
            nextQuestion(); // Restart with new mode
        });
    }

    function nextQuestion() {
        document.getElementById('quizFeedback').className = 'quiz-feedback hidden';
        document.getElementById('nextQuestionBtn').classList.add('hidden');
        document.getElementById('quizOptions').innerHTML = '';

        // Pick random
        const randIndex = Math.floor(Math.random() * quranData.length);
        currentQuizItem = quranData[randIndex];

        // Setup Question Text
        const titleEl = document.querySelector('.quiz-question-type');
        const wordEl = document.getElementById('quizWord');

        if (quizDirection === 'ar-sv') {
            titleEl.textContent = 'ما معنى هذه الكلمة؟';
            wordEl.textContent = currentQuizItem.word;
        } else {
            titleEl.textContent = 'Vad heter detta på Arabiska?';
            wordEl.textContent = currentQuizItem.word_sv;
        }

        // Generate Options
        const options = [currentQuizItem];
        while (options.length < 4) {
            const rand = quranData[Math.floor(Math.random() * quranData.length)];
            if (!options.includes(rand)) options.push(rand);
        }
        options.sort(() => Math.random() - 0.5);

        // Render Options
        const optionsContainer = document.getElementById('quizOptions');
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';

            // Determine Button Text based on Direction
            if (quizDirection === 'ar-sv') {
                // Question: Arabic word -> Ans: Meaning/Swedish
                // Using Arabic Meaning is usually better for Quran focus, but let's show both briefly or just meaning
                // Let's stick to Meaning AR as per request
                btn.textContent = opt.meaning_ar;
                // btn.innerHTML += `<br><small style="opacity:0.6">${opt.word_sv}</small>`; // Optional hint
            } else {
                // Question: Swedish -> Ans: Arabic Word
                btn.textContent = opt.word;
            }

            btn.onclick = () => handleAnswer(opt, btn);
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedItem, btnElement) {
        const allBtns = document.querySelectorAll('.quiz-btn');
        allBtns.forEach(b => b.disabled = true);

        const feedbackEl = document.getElementById('quizFeedback');
        const isCorrect = selectedItem.id === currentQuizItem.id;

        if (isCorrect) {
            btnElement.classList.add('correct');
            feedbackEl.textContent = 'Rätt! الله يفتح عليك!';
            feedbackEl.className = 'quiz-feedback correct';

            // SRS Update
            updateSRS(currentQuizItem.id, true);

            // Gamification
            quizScore += 10;
            userData.xp += 10;
            quizStreak++;
            userData.streak = Math.max(userData.streak, quizStreak); // Track best streak

            saveProgress();

        } else {
            btnElement.classList.add('wrong');
            // Highlight right
            allBtns.forEach(b => {
                const targetText = quizDirection === 'ar-sv' ? currentQuizItem.meaning_ar : currentQuizItem.word;
                if (b.textContent === targetText) b.classList.add('correct');
            });

            feedbackEl.textContent = `Fel. Rätt svar: ${quizDirection === 'ar-sv' ? currentQuizItem.meaning_ar : currentQuizItem.word}`;
            feedbackEl.className = 'quiz-feedback wrong';

            updateSRS(currentQuizItem.id, false);
            quizStreak = 0;
        }

        updateQuizStats();
        updateXPDisplay();
        document.getElementById('nextQuestionBtn').classList.remove('hidden');
    }

    function updateSRS(wordId, isCorrect) {
        if (!userData.srs[wordId]) {
            userData.srs[wordId] = { level: 0, nextReview: Date.now() };
        }

        const item = userData.srs[wordId];

        if (isCorrect) {
            item.level++;
            // Simple intervals: 1d, 3d, 7d, 14d...
            const intervals = [1, 3, 7, 14, 30];
            const daysToAdd = intervals[Math.min(item.level, intervals.length - 1)] || 30;
            item.nextReview = Date.now() + (daysToAdd * 24 * 60 * 60 * 1000);
        } else {
            item.level = 0; // Reset
            item.nextReview = Date.now(); // Review immediately/tomorrow
        }

        saveProgress();
    }

    function updateQuizStats() {
        document.getElementById('quizScore').textContent = quizScore;
        document.getElementById('quizStreak').textContent = quizStreak;
    }
});
