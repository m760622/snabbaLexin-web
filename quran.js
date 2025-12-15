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
    const quizLangToggle = document.getElementById('quizLangToggle');
    const quizModeLabel = document.getElementById('quizModeLabel');
    const userXPEl = document.getElementById('userXP');
    const themeSelector = document.getElementById('themeSelector');
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');

    // --- Mobile Toggle ---
    window.toggleMobileView = function () {
        document.body.classList.toggle('iphone-view');
        const isActive = document.body.classList.contains('iphone-view');
        localStorage.setItem('mobileView', isActive ? 'true' : 'false');

        const btn = document.getElementById('mobileToggleBtn');
        if (btn) btn.classList.toggle('active', isActive);

        // Force resize trigger for charts/layout
        window.dispatchEvent(new Event('resize'));
    };

    // Apply saved mobile preference
    if (localStorage.getItem('mobileView') === 'true') {
        document.body.classList.add('iphone-view');
        if (mobileToggleBtn) mobileToggleBtn.classList.add('active');
    }

    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', toggleMobileView);
    }

    // --- State & SRS Data ---
    let currentMode = 'list';
    /* ... existing code ... */

    /* ... (Lines 35-236 skipped in replacement context, keeping structure) ... */

    // --- Audio Logic ---
    window.playTTS = function (text, lang, btn) {
        if (btn) {
            btn.classList.add('playing');
            // Remove playing class after animation
            setTimeout(() => btn.classList.remove('playing'), 2000);
        }

        // Use unified TTSManager from utils.js
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(text, lang);
        } else {
            console.warn('TTSManager not found, using fallback.');
            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            window.speechSynthesis.speak(u);
        }
    };

    // --- Flashcard Logic ---
    let fcDirection = 'ar-sv'; // Default

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

        // Flip Logic
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.audio-btn') || e.target.closest('.fav-btn')) return;

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

        // Toggle Language
        fcLangToggle.addEventListener('change', (e) => {
            fcDirection = e.target.checked ? 'sv-ar' : 'ar-sv';
            fcModeLabel.textContent = e.target.checked ? '🇸🇪 Svenska (Framsida)' : '🇸🇦 Arabiska (Framsida)';
            loadFlashcard(fcIndex);
        });
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
                btn.textContent = isFav ? '★' : '☆';
                btn.classList.toggle('active', isFav);
            });

            document.getElementById('fcSurah').textContent = item.surah;
            document.getElementById('fcWord').textContent = isArFront ? item.word : item.word_sv;

            if (isArFront) {
                document.getElementById('fcMeaning').textContent = item.meaning_ar;
                const arAudio = `<button class="audio-btn" onclick="playTTS('${item.ayah_full}', 'ar-SA', this)">🕌</button>`;
                const svAudio = `<button class="audio-btn" onclick="playTTS('${item.word_sv}', 'sv-SE', this)">🔊</button>`;
                const ayahHtml = item.ayah_full.replace(item.word, `<span class="highlight-word">${item.word}</span>`);
                document.getElementById('fcAyah').innerHTML = ayahHtml + arAudio;
                document.getElementById('fcTrans').innerHTML = `<div style="margin-bottom:5px; font-weight:bold; color:var(--quran-gold)">${item.word_sv} ${svAudio}</div><div>${item.ayah_sv}</div>`;
            } else {
                document.getElementById('fcMeaning').textContent = item.meaning_ar;
                const arAudio = `<button class="audio-btn" onclick="playTTS('${item.ayah_full}', 'ar-SA', this)">🕌</button>`;
                const ayahHtml = item.ayah_full.replace(item.word, `<span class="highlight-word">${item.word}</span>`);
                document.getElementById('fcAyah').innerHTML = `<div style="font-size:1.4rem; margin-bottom:0.5rem; color:var(--quran-gold);">${item.word}</div>${ayahHtml} ${arAudio}`;
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

    function toggleFavorite(id) {
        if (userData.favorites.includes(id)) {
            userData.favorites = userData.favorites.filter(favId => favId !== id);
        } else {
            userData.favorites.push(id);
        }
        saveProgress();
        // Update current card UI immediately
        const isFav = userData.favorites.includes(id);
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.textContent = isFav ? '★' : '☆';
            btn.classList.toggle('active', isFav);
        });
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
