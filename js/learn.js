
document.addEventListener('DOMContentLoaded', () => {
    initLearnPage();
    initThemeAndMobile();
});

function initThemeAndMobile() {
    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Mobile View
    if (localStorage.getItem('mobileView') === 'true') {
        applyMobileView(true);
    }
}

window.toggleMobileView = function () {
    const isMobile = !document.body.classList.contains('iphone-view');
    applyMobileView(isMobile);
    localStorage.setItem('mobileView', isMobile ? 'true' : 'false');
}

function applyMobileView(isActive) {
    if (isActive) {
        document.documentElement.classList.add('iphone-mode');
        document.body.classList.add('iphone-view');
        document.getElementById('mobileToggle')?.classList.add('active');
    } else {
        document.documentElement.classList.remove('iphone-mode');
        document.body.classList.remove('iphone-view');
        document.getElementById('mobileToggle')?.classList.remove('active');
    }
}


function initLearnPage() {
    renderLessonCards();

    setupModalListeners();
    setupModalListeners();
    initLessonSearch();
    setupModalListeners();
    initLessonSearch();
    updateProgressUI();
    initFilterListeners();
    updateDailyStats();

    // Check for ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('lesson');
    if (lessonId) {
        setTimeout(() => {
            openMethodModal(lessonId);
        }, 500); // Small delay to ensure rendering
    }
}


function initLessonSearch() {
    const searchInput = document.getElementById('lessonSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.lesson-card');

        cards.forEach(card => {
            const lessonId = card.getAttribute('data-lesson');
            const lesson = lessonsData.find(l => l.id === lessonId);

            if (!lesson) return;

            // Search in title and description (simple first pass)
            const titleMatch = lesson.title.toLowerCase().includes(term);
            const descMatch = (lesson.sections[0]?.content[0]?.html || '').toLowerCase().includes(term);

            // Advanced: Search in all content and examples
            const contentMatch = lesson.sections.some(sec =>
                sec.content.some(item => item.html.toLowerCase().includes(term)) ||
                (sec.examples && sec.examples.some(ex =>
                    ex.swe.toLowerCase().includes(term) ||
                    ex.arb.toLowerCase().includes(term)
                ))
            );

            if (titleMatch || descMatch || contentMatch) {
                card.style.display = 'block';
                // Highlight logic could go here
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initFilterListeners() {
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active class from all
            chips.forEach(c => c.classList.remove('active'));
            // Add to clicked
            chip.classList.add('active');

            // Filter
            const filter = chip.getAttribute('data-filter');
            renderLessonCards(filter);
        });
    });
}

function renderLessonCards(filter = 'all') {
    const grid = document.querySelector('.lessons-grid');
    if (!grid) return;

    let html = '';

    // 1. Filter Lessons
    const filteredLessons = lessonsData.filter(lesson => {
        if (filter === 'all') return true;
        return lesson.level === filter;
    });

    // 2. Generate Lesson Cards
    filteredLessons.forEach(lesson => {
        const isCompleted = isLessonCompleted(lesson.id);
        const highScore = parseInt(localStorage.getItem(`lesson_score_${lesson.id}`)) || 0;
        const isNew = ['hospital', 'work', 'bank'].includes(lesson.id);
        const isImportant = ['wordOrder'].includes(lesson.id);

        let badgeHtml = '';
        if (isNew) badgeHtml = '<span class="lesson-badge">Ny</span>';
        if (isImportant) badgeHtml = '<span class="lesson-badge">Viktig</span>';
        if (lesson.id === 'phrases') badgeHtml = '<span class="lesson-badge">Nyttig</span>';
        if (lesson.id === 'falseFriends') badgeHtml = '<span class="lesson-badge warning-badge">Varning</span>';
        if (lesson.id === 'mistakes') badgeHtml = '<span class="lesson-badge tips-badge">Tips</span>';

        // Star rating based on high score
        let starsHtml = '';
        if (isCompleted && highScore > 0) {
            let starCount = 1;
            if (highScore >= 80) starCount = 3;
            else if (highScore >= 50) starCount = 2;

            const filledStars = '⭐'.repeat(starCount);
            const emptyStars = '☆'.repeat(3 - starCount);
            starsHtml = `<div class="lesson-stars">${filledStars}${emptyStars}</div>`;
        }

        // Progress ring for lesson (based on quiz attempts)
        const attempts = parseInt(localStorage.getItem(`lesson_attempts_${lesson.id}`)) || 0;
        let progressClass = '';
        if (attempts >= 5) progressClass = 'mastered';
        else if (attempts >= 3) progressClass = 'practiced';
        else if (attempts >= 1) progressClass = 'started';

        html += `
            <div class="lesson-card ${isCompleted ? 'completed' : ''} ${progressClass}" onclick="openMethodModal('${lesson.id}')" data-lesson="${lesson.id}">
                ${isCompleted ? '<div class="completion-badge">✓</div>' : ''}
                <div class="lesson-header">
                    <span class="lesson-icon">${getIconForLesson(lesson.id)}</span>
                    <div class="lesson-title">
                        <h3>${lesson.title}</h3>
                       ${getSubtitleForLesson(lesson.id) ? `<h4>${getSubtitleForLesson(lesson.id)}</h4>` : ''}
                    </div>
                    ${badgeHtml}
                </div>
                <p class="lesson-desc">${getDescForLesson(lesson.id)}</p>
                ${starsHtml}
            </div>
        `;
    });

    // 3. Add "Cognates / Similar Words" Card (Always visible)
    html += `
        <div class="lesson-card" onclick="window.location.href='cognates.html'" style="border-color: var(--warning); background: rgba(245, 158, 11, 0.1);">
            <div class="lesson-header">
                <span class="lesson-icon">🤝</span>
                <div class="lesson-title">
                    <h3>Liknande Ord</h3>
                    <h4>المتشابهات (كلمات مشتركة)</h4>
                </div>
                <span class="lesson-badge" style="background: var(--warning); color: #000;">Nyhet</span>
            </div>
            <p class="lesson-desc">600+ ord som låter lika på svenska och arabiska.</p>
        </div>
    `;

    // 4. Add "Due for Review" Card (Spaced Repetition) if there are due words
    if (filter === 'all' && typeof SpacedRepetition !== 'undefined') {
        const dueCount = SpacedRepetition.getDueCount();
        if (dueCount > 0) {
            html = `
                <div class="lesson-card review-due" onclick="openSpacedReview()">
                    <div class="lesson-header">
                        <span class="lesson-icon">🔄</span>
                        <div class="lesson-title">
                            <h3>Tid att Repetera!</h3>
                            <h4>حان وقت المراجعة!</h4>
                        </div>
                        <span class="review-count">${dueCount}</span>
                    </div>
                    <p class="lesson-desc">Du har ${dueCount} ord som väntar på repetition.</p>
                    <div class="review-progress">
                        <div class="review-bar"></div>
                    </div>
                </div>
            ` + html;
        }
    }

    // 5. Add "Review Mistakes" Card if filter is 'all'
    if (filter === 'all') {
        html += `
            <div class="lesson-card" onclick="openMistakesReview()">
                <div class="lesson-header">
                    <span class="lesson-icon">⚠️</span>
                    <div class="lesson-title">
                        <h3>Dina Misstag</h3>
                        <h4>أخطاؤك السابقة</h4>
                    </div>
                </div>
                <p class="lesson-desc">Repetera frågor du svarade fel på.</p>
            </div>
        `;
    }

    grid.innerHTML = html;
}

function isLessonCompleted(id) {
    const progress = JSON.parse(localStorage.getItem('completedLessons')) || [];
    return progress.includes(id);
}

// Helpers for missing data in JSON (Temporary until we enrich JSON)
function getIconForLesson(id) {
    const icons = {
        wordOrder: '📝', pronouns: '👤', verbs: '🏃', adjectives: '🎨',
        prepositions: '📍', gender: '⚖️', questions: '❓', numbers: '🔢',
        phrases: '💬', falseFriends: '🎭', hospital: '🏥', work: '💼',
        bank: '🏦', mistakes: '⚠️', airport: '✈️', onlineShopping: '🛒'
    };
    return icons[id] || '📚';
}

function getSubtitleForLesson(id) {
    const subs = {
        wordOrder: 'ترتيب الجملة - قاعدة V2', pronouns: 'الضمائر الشخصية', verbs: 'الأفعال والأزمنة',
        adjectives: 'الصفات', prepositions: 'حروف الجر', gender: 'المذكر والمؤنث',
        questions: 'الأسئلة والنفي', numbers: 'الأرقام والوقت', phrases: 'عبارات شائعة',
        falseFriends: 'أصدقاء مخادعون', hospital: 'في المستشفى', work: 'في العمل',
        bank: 'في البنك', mistakes: 'أخطاء شائعة', airport: 'في المطار', onlineShopping: 'التسوق عبر الإنترنت'
    };
    return subs[id] || '';
}

function getDescForLesson(id) {
    const descs = {
        wordOrder: 'Lär dig hur svenska meningar är uppbyggda och den viktiga V2-regeln.',
        pronouns: 'Personliga pronomen: jag, du, han, hon, vi, ni, de',
        verbs: 'Presens, preteritum, perfekt och futurum',
        adjectives: 'Hur adjektiv böjs: en stor bil, ett stort hus, stora bilar',
        prepositions: 'i, på, till, från, med, utan, för, av...',
        gender: 'Genus i svenska: en bok, ett bord',
        questions: 'Hur man ställer frågor och säger nej på svenska',
        numbers: '1-100, klockan, dagar och månader',
        phrases: 'Hälsningar, artighetsfraser och vardagsuttryck',
        falseFriends: 'Ord som liknar arabiska men har annan betydelse',
        hospital: 'Fraser och ord du behöver på vårdcentralen',
        work: 'Vanliga uttryck på arbetsplatsen',
        bank: 'Ord och fraser för bankärenden',
        mistakes: 'Typiska fel som arabisktalande gör',
        airport: 'Incheckning, säkerhetskontroll, ombord, bagage',
        onlineShopping: 'Beställa, betala, leverans och retur online'
    };
    return descs[id] || '';
}

function updateDailyStats() {
    let stats = JSON.parse(localStorage.getItem('learningStats')) || {
        streak: 0,
        lastDate: '',
        totalXP: 0
    };

    const today = new Date().toISOString().split('T')[0];
    const streakEl = document.getElementById('streakCount');
    const xpEl = document.getElementById('totalXP');

    if (stats.lastDate !== today) {
        // It's a new day or first time
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (stats.lastDate === yesterday) {
            // Continued streak
            // We only increment streak if they actually do something? 
            // Or just logging in counts? Let's say visiting learn page counts.
            stats.streak++;
        } else if (stats.lastDate !== today) {
            // Missed a day (or many), but if first time ever (lastDate empty), start at 1
            // If missed day, reset to 1
            if (stats.lastDate) {
                stats.streak = 1;
            } else {
                stats.streak = 1;
            }
        }
        stats.lastDate = today;
        stats.totalXP += 10; // Login bonus
        localStorage.setItem('learningStats', JSON.stringify(stats));
    }

    // Update UI
    if (streakEl) streakEl.innerText = stats.streak;
    if (xpEl) xpEl.innerText = stats.totalXP;
}

// Function to open a lesson modal and populate it dynamically
window.openMethodModal = function (lessonId) {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) {
        console.error('Lesson not found:', lessonId);
        return;
    }

    const modal = document.getElementById('lessonModal');
    const contentDiv = document.getElementById('lessonContent');
    const titleHeader = document.getElementById('modalTitle');

    if (!modal || !contentDiv) return;

    // Set Title
    if (titleHeader) titleHeader.innerText = lesson.title;

    // Build Content HTML
    const highScore = localStorage.getItem(`lesson_score_${lesson.id}`);
    const isCompleted = localStorage.getItem('completedLessons') && JSON.parse(localStorage.getItem('completedLessons')).includes(lesson.id);

    let completionStatus = '';
    if (isCompleted) {
        completionStatus = `<div style="font-size: 0.9rem; color: var(--success); margin-top: 0.5rem; font-weight: 600;">✅ Avklarad ${highScore ? `(Bästa: ${highScore}%)` : ''}</div>`;
    } else {
        completionStatus = `<div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">Ej startad / لم يبدأ</div>`;
    }

    let htmlContent = `
        <div class="lesson-completion" style="margin-bottom: 2rem;">
            <button class="quiz-start-btn" onclick="startQuiz('${lesson.id}')">
                <i class="fas fa-question-circle"></i> ${isCompleted ? 'Gör om Quiz / أعد الاختبار' : 'Starta Quiz / ابدأ الاختبار'}
            </button>
            ${completionStatus}
        </div>
    `;

    lesson.sections.forEach(section => {
        htmlContent += `<div class="lesson-section">`;
        if (section.title) {
            htmlContent += `<h3>${section.title}</h3>`;
        }

        // Add regular content (rules, paragraphs)
        section.content.forEach(item => {
            // Check if it's a rule-highlight to preserve class
            if (item.html.includes('class="rule-highlight"')) {
                // If the extracted HTML already has the div/class structure, use it directly? 
                // Our extraction saved the innerHTML and type.
                // Actually extraction saved: type: 'div'/'p', html: innerHTML.
                // But wait, for rule-highlight we need the class.
                // Let's see the data structure again. 
                // If type is 'div', we might want to check the content or just wrap it.
                // Simplification: just wrap in the tag type.
                // If original had class, we need to know. 
                // Refinement: The extraction might have lost the class info if we only saved tagName.
                // Let's look at the extracted data examples.
                // "type": "p", "html": "..."
                // If it was a rule-highlight div, it might be type "div".
                // For now, let's try generic wrapping.
            }

            // A simple way to handle the "rule-highlight" box style if we lost classes:
            // We can infer or just render as is. 
            // In the extraction code: 
            // modal.querySelectorAll('.lesson-section').forEach...
            // section.querySelectorAll('.rule-highlight, p')
            // So we captured both. 
            // If it was a rule-highlight, it's likely a div with that class. 
            // Our extraction only stored "type" (tagName) and "html" (innerHTML).
            // We unfortunately lost the class name "rule-highlight" in the extraction logic 
            // UNLESS the innerHTML itself contained it (unlikely for the container).
            // Correction: we probably need to identify rule boxes. 
            // BUT, looking at the extracted JSON I saw earlier, the content simple objects.
            // Let's see if we can heuristically re-apply styles or if we need to refine extraction (too late now).
            // Actually, we can style all 'div' in generic content as rule boxes if we want, or just 'p'.
            // Let's just output the tag.

            // Heuristic: if text length is short and 'div', maybe rule? 
            // Or we just add a class 'dynamic-content-item'.
            htmlContent += `<${item.type}>${item.html}</${item.type}>`;
        });

        // Add Examples
        if (section.examples && section.examples.length > 0) {
            section.examples.forEach(ex => {
                htmlContent += `
                <div class="example-box" onclick="playTTS('${escapeSquote(ex.swe)}')">
                    <div class="example-content">
                        <p class="swe">
                            ${ex.swe}
                            <span class="speaker-icon">🔊</span>
                        </p>
                        <p class="arb">${ex.arb}</p>
                    </div>
                </div>`;
            });
        }

        htmlContent += `</div>`; // End lesson-section
    });


    // Add "Start Quiz" button instead of direct completion


    contentDiv.innerHTML = htmlContent;
    modal.style.display = 'block';

    // Push history state to handle back button closing
    const swipeHintShown = localStorage.getItem('swipeHintShown');
    if (!swipeHintShown && window.innerWidth <= 768) {
        const hint = document.createElement('div');
        hint.className = 'swipe-hint';
        hint.innerHTML = '<span class="swipe-hand-icon">👆</span> <span>Svep för att navigera / اسحب للتنقل</span>';
        document.body.appendChild(hint);

        localStorage.setItem('swipeHintShown', 'true');

        setTimeout(() => {
            hint.remove();
        }, 3000);
    }

    history.pushState({ modalOpen: true }, '', '#lesson');
};

// Quiz Logic
let currentQuiz = null;

window.startQuiz = function (lessonId) {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (!lesson) return;

    // Collect all examples
    let allExamples = [];
    lesson.sections.forEach(sec => {
        if (sec.examples) allExamples = allExamples.concat(sec.examples);
    });

    if (allExamples.length < 3) {
        alert("Inte tillräckligt med exempel för quiz! / لا توجد أمثلة كافية للاختبار!");
        completeLesson(lessonId);
        return;
    }

    // Shuffle and pick 3-5 questions
    const selected = allExamples.sort(() => 0.5 - Math.random()).slice(0, 5);

    currentQuiz = {
        lessonId: lessonId,
        questions: selected,
        index: 0,
        score: 0
    };

    renderQuizQuestion();
};


function renderQuizQuestion() {
    const contentDiv = document.getElementById('lessonContent');
    const q = currentQuiz.questions[currentQuiz.index];
    const total = currentQuiz.questions.length;
    const lesson = lessonsData.find(l => l.id === currentQuiz.lessonId);

    // Determine Question Type (randomly, but weighted)
    // types: 'text' (default), 'audio', 'reverse', 'writing', 'sentenceFill', 'wordOrder'
    const rand = Math.random();
    let type = 'text';
    if (rand > 0.85) type = 'audio';
    else if (rand > 0.70) type = 'reverse';
    else if (rand > 0.55) type = 'writing';
    else if (rand > 0.40) type = 'sentenceFill';
    else if (rand > 0.25) type = 'wordOrder';

    // Prepare Question & Answer
    let questionHtml = '';
    let correctAnswer = '';
    let options = [];
    let isWritingQuiz = false;

    // Common: Get Wrong Answers
    let allEx = [];
    lesson.sections.forEach(sec => { if (sec.examples) allEx = allEx.concat(sec.examples); });
    const otherEx = allEx.filter(e => e.swe !== q.swe);
    const wrongAnswers = otherEx.sort(() => 0.5 - Math.random()).slice(0, 3);

    if (type === 'audio') {
        // Audio Question: Listen and pick Arabic translation
        questionHtml = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <button class="quiz-start-btn" onclick="playTTS('${escapeSquote(q.swe)}')" style="width: 80px; height: 80px; border-radius: 50%; padding: 0; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                    <span style="font-size: 2.5rem;">🔊</span>
                </button>
                <p style="margin-top: 1rem; color: var(--text-muted);">Lyssna och välj rätt översättning</p>
            </div>
        `;
        correctAnswer = q.arb;
        options = [
            { text: q.arb, correct: true },
            { text: wrongAnswers[0]?.arb || 'N/A', correct: false },
            { text: wrongAnswers[1]?.arb || 'N/A', correct: false },
            { text: wrongAnswers[2]?.arb || 'N/A', correct: false }
        ];
        // Auto-play audio
        setTimeout(() => playTTS(q.swe), 500);

    } else if (type === 'writing') {
        // Writing Quiz: Show Arabic, type Swedish
        isWritingQuiz = true;
        questionHtml = `
            <div class="writing-quiz">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">✍️ Skriv ordet på svenska / اكتب الكلمة بالسويدية</p>
                <p class="question-text" dir="rtl" style="font-family: 'IBM Plex Sans Arabic'; font-size: 1.8rem;">${q.arb}</p>
                <div class="writing-input-container">
                    <input type="text" id="writingAnswer" class="writing-input" placeholder="Skriv här..." autocomplete="off" autocapitalize="off" spellcheck="false">
                    <button class="check-writing-btn" onclick="checkWritingAnswer('${escapeSquote(q.swe)}')">
                        Kontrollera ➜
                    </button>
                </div>
                <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.5rem;">Tips: ${q.swe.charAt(0)}...</p>
            </div>
        `;
        correctAnswer = q.swe;

    } else if (type === 'reverse') {
        // Reverse: Show Arabic, pick Swedish
        questionHtml = `<p class="question-text" dir="rtl" style="font-family: 'IBM Plex Sans Arabic'">${q.arb}</p>`;
        correctAnswer = q.swe;
        options = [
            { text: q.swe, correct: true },
            { text: wrongAnswers[0]?.swe || 'N/A', correct: false },
            { text: wrongAnswers[1]?.swe || 'N/A', correct: false },
            { text: wrongAnswers[2]?.swe || 'N/A', correct: false }
        ];

    } else if (type === 'sentenceFill') {
        // Sentence Fill: Show sentence with blank, pick the missing word
        const word = q.swe;
        const blank = '______';
        // Create a simple sentence using the word
        const sentences = [
            `Jag kan se ${blank} där borta.`,
            `Det är en vacker ${blank}.`,
            `Vi använder ${blank} varje dag.`,
            `${blank} är mycket viktigt.`
        ];
        const sentence = sentences[Math.floor(Math.random() * sentences.length)];

        questionHtml = `
            <div class="sentence-fill-quiz">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">📝 Välj rätt ord / اختر الكلمة الصحيحة</p>
                <p class="question-text" style="font-size: 1.2rem; line-height: 1.6;">${sentence.replace(blank, '<span class="fill-blank">' + blank + '</span>')}</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;" dir="rtl">المعنى: ${q.arb}</p>
            </div>
        `;
        correctAnswer = word;
        options = [
            { text: word, correct: true },
            { text: wrongAnswers[0]?.swe || 'ord', correct: false },
            { text: wrongAnswers[1]?.swe || 'sak', correct: false },
            { text: wrongAnswers[2]?.swe || 'det', correct: false }
        ];

    } else if (type === 'wordOrder') {
        // Word Order: Scramble letters of the word, user picks correct order
        const word = q.swe.toUpperCase();
        const letters = word.split('').sort(() => 0.5 - Math.random());

        questionHtml = `
            <div class="word-order-quiz">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">🔤 Ordna bokstäverna / رتب الحروف</p>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1rem;" dir="rtl">المعنى: ${q.arb}</p>
                <div class="scrambled-letters">
                    ${letters.map(l => `<span class="letter-tile">${l}</span>`).join('')}
                </div>
                <div class="word-order-input-container">
                    <input type="text" id="wordOrderAnswer" class="writing-input" placeholder="Skriv ordet..." autocomplete="off" autocapitalize="characters" spellcheck="false" style="text-transform: uppercase;">
                    <button class="check-writing-btn" onclick="checkWordOrderAnswer('${escapeSquote(q.swe)}')">
                        Kontrollera ➜
                    </button>
                </div>
            </div>
        `;
        correctAnswer = q.swe;
        isWritingQuiz = true; // Use writing quiz flow

    } else {
        // Default Text: Show Swedish, pick Arabic
        questionHtml = `<p class="question-text">${q.swe}</p>`;
        correctAnswer = q.arb;
        options = [
            { text: q.arb, correct: true },
            { text: wrongAnswers[0]?.arb || 'N/A', correct: false },
            { text: wrongAnswers[1]?.arb || 'N/A', correct: false },
            { text: wrongAnswers[2]?.arb || 'N/A', correct: false }
        ];
    }

    // Shuffle options
    options = options.sort(() => 0.5 - Math.random()); // Keep 4 options? Original had 3. Let's use 3 or 4. 
    // Wait, original code usage had 3. Let's stick to 3 options to fit screen better or user preference.
    // Previous code: slice(0, 2) wrong answers -> total 3.
    // Let's keep total 3 for consistency.
    options = options.slice(0, 3).sort(() => 0.5 - Math.random());

    // Store correct answer for feedback
    currentQuiz.currentCorrectAnswer = correctAnswer;

    let html = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>Fråga ${currentQuiz.index + 1} / ${total}</h3>
                <div class="progress-bar"><div style="width: ${(currentQuiz.index / total) * 100}%"></div></div>
            </div>
            
            <div class="question-card">
                ${questionHtml}
                <div class="options-grid" id="quizOptions">
                    ${options.map((opt, i) => `
                        <button class="option-btn" data-correct="${opt.correct}" onclick="checkAnswer(${opt.correct}, this, '${escapeSquote(correctAnswer)}')">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
                <div id="answerFeedback" class="answer-feedback" style="display: none;"></div>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;
}


window.checkAnswer = function (isCorrect, clickedBtn, correctAnswer) {
    // Prevent multiple clicks
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    // Show feedback on buttons
    allBtns.forEach(btn => {
        const btnIsCorrect = btn.getAttribute('data-correct') === 'true';
        if (btnIsCorrect) {
            btn.classList.add('correct-answer');
        } else if (btn === clickedBtn && !isCorrect) {
            btn.classList.add('wrong-answer');
        }
    });

    // Show feedback message
    const feedbackDiv = document.getElementById('answerFeedback');
    if (feedbackDiv) {
        feedbackDiv.style.display = 'block';
        if (isCorrect) {
            feedbackDiv.innerHTML = `<span class="feedback-correct">✅ Rätt! / صحيح!</span>`;
            feedbackDiv.className = 'answer-feedback feedback-correct-box';
        } else {
            feedbackDiv.innerHTML = `<span class="feedback-wrong">❌ Fel! / خطأ!</span><br><small>Rätt svar: ${correctAnswer}</small>`;
            feedbackDiv.className = 'answer-feedback feedback-wrong-box';
        }
    }

    if (isCorrect) {
        currentQuiz.score++;
    } else {
        // Log mistake
        const q = currentQuiz.questions[currentQuiz.index];
        logMistake(q, currentQuiz.lessonId);
    }

    // Wait 1.5 seconds then move to next question
    setTimeout(() => {
        currentQuiz.index++;
        if (currentQuiz.index < currentQuiz.questions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 1500);
}

// Check Writing Answer
window.checkWritingAnswer = function (correctAnswer) {
    const input = document.getElementById('writingAnswer');
    if (!input) return;

    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();

    // Check exact match or close match (allow 1 char difference for typos)
    const isCorrect = userAnswer === correct ||
        levenshteinDistance(userAnswer, correct) <= 1;

    // Visual feedback
    input.disabled = true;
    const btn = document.querySelector('.check-writing-btn');
    if (btn) btn.disabled = true;

    // Create feedback
    const container = document.querySelector('.writing-input-container');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'writing-feedback';

    if (isCorrect) {
        input.classList.add('correct-input');
        feedbackDiv.innerHTML = `<span style="color: #22c55e;">✅ Rätt! / صحيح!</span>`;
        currentQuiz.score++;
    } else {
        input.classList.add('wrong-input');
        feedbackDiv.innerHTML = `
            <span style="color: #ef4444;">❌ Fel! / خطأ!</span><br>
            <small>Rätt svar: <strong>${correctAnswer}</strong></small>
        `;
        // Log mistake
        const q = currentQuiz.questions[currentQuiz.index];
        logMistake(q, currentQuiz.lessonId);
    }

    container.after(feedbackDiv);

    // Move to next question
    setTimeout(() => {
        currentQuiz.index++;
        if (currentQuiz.index < currentQuiz.questions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 2000);
};

// Check Word Order Answer
window.checkWordOrderAnswer = function (correctAnswer) {
    const input = document.getElementById('wordOrderAnswer');
    if (!input) return;

    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();

    // Check exact match or close match
    const isCorrect = userAnswer === correct ||
        levenshteinDistance(userAnswer, correct) <= 1;

    // Visual feedback
    input.disabled = true;
    const btn = document.querySelector('.check-writing-btn');
    if (btn) btn.disabled = true;

    // Create feedback
    const container = document.querySelector('.word-order-input-container');
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'writing-feedback';

    if (isCorrect) {
        input.classList.add('correct-input');
        feedbackDiv.innerHTML = `<span style="color: #22c55e;">✅ Rätt! / صحيح!</span>`;
        currentQuiz.score++;
        // Highlight all letter tiles as correct
        document.querySelectorAll('.letter-tile').forEach(tile => {
            tile.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        });
    } else {
        input.classList.add('wrong-input');
        feedbackDiv.innerHTML = `
            <span style="color: #ef4444;">❌ Fel! / خطأ!</span><br>
            <small>Rätt svar: <strong>${correctAnswer}</strong></small>
        `;
        // Log mistake
        const q = currentQuiz.questions[currentQuiz.index];
        logMistake(q, currentQuiz.lessonId);
    }

    container.after(feedbackDiv);

    // Move to next question
    setTimeout(() => {
        currentQuiz.index++;
        if (currentQuiz.index < currentQuiz.questions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 2000);
};

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function logMistake(question, lessonId) {
    let mistakes = JSON.parse(localStorage.getItem('mistakesLog')) || [];
    // Avoid duplicates
    if (!mistakes.some(m => m.swe === question.swe)) {
        mistakes.push({
            swe: question.swe,
            arb: question.arb,
            lessonId: lessonId,
            date: new Date().toISOString()
        });
        localStorage.setItem('mistakesLog', JSON.stringify(mistakes));
    }

    // Also add to spaced repetition review system
    addToReviewQueue(question, false);
}

// ========================================
// Spaced Repetition System
// ========================================
const SpacedRepetition = {
    // Get all words due for review
    getDueWords: function () {
        const reviewData = JSON.parse(localStorage.getItem('spacedRepetitionData')) || {};
        const now = new Date();
        const dueWords = [];

        Object.keys(reviewData).forEach(key => {
            const word = reviewData[key];
            const nextReview = new Date(word.nextReview);
            if (nextReview <= now) {
                dueWords.push({ id: key, ...word });
            }
        });

        // Sort by urgency (most overdue first)
        return dueWords.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
    },

    // Get count of due words
    getDueCount: function () {
        return this.getDueWords().length;
    },

    // Update word after review
    updateWord: function (wordId, wasCorrect) {
        const reviewData = JSON.parse(localStorage.getItem('spacedRepetitionData')) || {};
        const word = reviewData[wordId];

        if (!word) return;

        if (wasCorrect) {
            // Increase interval using SM-2 principles
            word.correctStreak = (word.correctStreak || 0) + 1;
            word.easeFactor = Math.max(1.3, word.easeFactor + 0.1);

            // Calculate next review interval (1, 3, 7, 14, 30 days progression)
            const intervals = [1, 3, 7, 14, 30, 60];
            const intervalIndex = Math.min(word.correctStreak, intervals.length - 1);
            word.interval = intervals[intervalIndex];
        } else {
            // Reset on wrong answer
            word.correctStreak = 0;
            word.easeFactor = Math.max(1.3, word.easeFactor - 0.2);
            word.interval = 1; // Review tomorrow
        }

        // Set next review date
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + word.interval);
        word.nextReview = nextDate.toISOString();
        word.lastReview = new Date().toISOString();

        reviewData[wordId] = word;
        localStorage.setItem('spacedRepetitionData', JSON.stringify(reviewData));
    }
};

// Add word to review queue
function addToReviewQueue(question, wasCorrect) {
    const wordId = question.swe.toLowerCase().replace(/\s+/g, '_');
    const reviewData = JSON.parse(localStorage.getItem('spacedRepetitionData')) || {};

    if (!reviewData[wordId]) {
        // New word - schedule for tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        reviewData[wordId] = {
            swe: question.swe,
            arb: question.arb,
            nextReview: tomorrow.toISOString(),
            interval: 1,
            easeFactor: 2.5,
            correctStreak: 0,
            addedDate: new Date().toISOString()
        };
    } else if (!wasCorrect) {
        // Wrong answer - reset to review tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        reviewData[wordId].nextReview = tomorrow.toISOString();
        reviewData[wordId].correctStreak = 0;
    }

    localStorage.setItem('spacedRepetitionData', JSON.stringify(reviewData));
}

// Make SpacedRepetition available globally
window.SpacedRepetition = SpacedRepetition;

// Open Spaced Repetition Review
window.openSpacedReview = function () {
    const dueWords = SpacedRepetition.getDueWords();
    if (dueWords.length === 0) return;

    const modal = document.getElementById('lessonModal');
    const contentDiv = document.getElementById('lessonContent');
    const title = document.getElementById('lessonModalTitle');

    if (!modal || !contentDiv) return;

    modal.classList.add('active');
    title.textContent = 'Tid att Repetera! / حان وقت المراجعة!';

    // Start review quiz with due words
    currentQuiz = {
        lessonId: 'spaced_review',
        questions: dueWords.slice(0, 10).map(w => ({ swe: w.swe, arb: w.arb, wordId: w.id })),
        index: 0,
        score: 0
    };

    renderSpacedReviewQuestion();
};

function renderSpacedReviewQuestion() {
    const contentDiv = document.getElementById('lessonContent');
    const q = currentQuiz.questions[currentQuiz.index];
    const total = currentQuiz.questions.length;

    const rand = Math.random();
    let questionHtml = '';
    let correctAnswer = '';
    let options = [];

    // Simple: Show Swedish, pick Arabic (can expand later)
    if (rand > 0.5) {
        questionHtml = `<p class="question-text">${q.swe}</p>`;
        correctAnswer = q.arb;
        // Get wrong answers from other due words
        const otherWords = currentQuiz.questions.filter(w => w.swe !== q.swe);
        options = [
            { text: q.arb, correct: true, wordId: q.wordId },
            { text: otherWords[0]?.arb || 'N/A', correct: false },
            { text: otherWords[1]?.arb || 'N/A', correct: false }
        ].sort(() => 0.5 - Math.random());
    } else {
        questionHtml = `<p class="question-text" dir="rtl" style="font-family: 'IBM Plex Sans Arabic'">${q.arb}</p>`;
        correctAnswer = q.swe;
        const otherWords = currentQuiz.questions.filter(w => w.swe !== q.swe);
        options = [
            { text: q.swe, correct: true, wordId: q.wordId },
            { text: otherWords[0]?.swe || 'N/A', correct: false },
            { text: otherWords[1]?.swe || 'N/A', correct: false }
        ].sort(() => 0.5 - Math.random());
    }

    currentQuiz.currentWordId = q.wordId;

    let html = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>🔄 Repetition ${currentQuiz.index + 1} / ${total}</h3>
                <div class="progress-bar"><div style="width: ${(currentQuiz.index / total) * 100}%"></div></div>
            </div>
            
            <div class="question-card">
                ${questionHtml}
                <div class="options-grid" id="quizOptions">
                    ${options.map(opt => `
                        <button class="option-btn" data-correct="${opt.correct}" onclick="checkSpacedAnswer(${opt.correct}, this, '${escapeSquote(correctAnswer)}')">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
                <div id="answerFeedback" class="answer-feedback" style="display: none;"></div>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;
}

window.checkSpacedAnswer = function (isCorrect, clickedBtn, correctAnswer) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    allBtns.forEach(btn => {
        if (btn.getAttribute('data-correct') === 'true') {
            btn.classList.add('correct-answer');
        } else if (btn === clickedBtn && !isCorrect) {
            btn.classList.add('wrong-answer');
        }
    });

    // Update spaced repetition data
    SpacedRepetition.updateWord(currentQuiz.currentWordId, isCorrect);

    if (isCorrect) currentQuiz.score++;

    setTimeout(() => {
        currentQuiz.index++;
        if (currentQuiz.index < currentQuiz.questions.length) {
            renderSpacedReviewQuestion();
        } else {
            showSpacedResults();
        }
    }, 1500);
};

function showSpacedResults() {
    const contentDiv = document.getElementById('lessonContent');
    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);

    contentDiv.innerHTML = `
        <div class="result-container" style="text-align: center; padding: 2rem;">
            <div class="result-icon">🔄</div>
            <h3>Repetition Klar! / انتهت المراجعة!</h3>
            <p>Du fick ${currentQuiz.score} av ${currentQuiz.questions.length} rätt (${percentage}%)</p>
            <button class="quiz-primary-btn" onclick="closeLessonModal()">Stäng / إغلاق</button>
        </div>
    `;
}
window.openMistakesReview = function () {
    let mistakes = JSON.parse(localStorage.getItem('mistakesLog')) || [];
    const modal = document.getElementById('lessonModal');
    const contentDiv = document.getElementById('lessonContent');
    const titleHeader = document.getElementById('modalTitle');

    if (!modal || !contentDiv) return;

    if (titleHeader) titleHeader.innerText = "Dina Misstag / أخطاؤك";

    if (mistakes.length === 0) {
        contentDiv.innerHTML = `
            <div class="lesson-section" style="text-align: center; padding: 2rem;">
                <h3>Bra jobbat! 🎉</h3>
                <p>Du har inga registrerade misstag just nu.</p>
                <p>لا توجد أخطاء مسجلة حالياً.</p>
            </div>
        `;
        modal.style.display = 'block';
        return;
    }

    let html = `
        <div class="lesson-section">
            <p>Här är orden och fraserna du behöver öva mer på:</p>
            <div class="mistakes-list">
    `;

    mistakes.forEach((m, index) => {
        html += `
            <div class="example-box" id="mistake-${index}">
                <div class="example-content">
                    <p class="swe">${m.swe}</p>
                    <p class="arb">${m.arb}</p>
                    <small style="color: var(--text-muted)">Från lektion: ${lessonsData.find(l => l.id === m.lessonId)?.title || 'Okänd'}</small>
                </div>
                <button class="remove-mistake-btn" onclick="removeMistake(${index})" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">❌</button>
            </div>
        `;
    });

    html += `
            </div>
            <div style="text-align: center; margin-top: 2rem;">
                 <button class="quiz-start-btn" onclick="clearAllMistakes()">
                    Rensa alla / مسح الكل
                </button>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;
    modal.style.display = 'block';

    history.pushState({ modalOpen: true }, '', '#mistakes');
}

window.removeMistake = function (index) {
    let mistakes = JSON.parse(localStorage.getItem('mistakesLog')) || [];
    // Helpers
    window.playTTS = function (text) {
        if (typeof TTSManager !== 'undefined') {
            TTSManager.speak(text, 'sv');
        } else {
            // Fallback
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'sv-SE';
            window.speechSynthesis.speak(u);
        }
    };

    window.escapeSquote = function (str) {
        return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    };
    localStorage.setItem('mistakesLog', JSON.stringify(mistakes));
    openMistakesReview(); // Re-render
}

window.clearAllMistakes = function () {
    if (confirm("Är du säker? / هل أنت متأكد؟")) {
        localStorage.removeItem('mistakesLog');
        openMistakesReview();
    }
}

function showQuizResults() {
    const contentDiv = document.getElementById('lessonContent');
    const passed = currentQuiz.score >= Math.ceil(currentQuiz.questions.length * 0.6); // 60% pass
    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);

    // Save Score
    const currentHigh = parseInt(localStorage.getItem(`lesson_score_${currentQuiz.lessonId}`) || '0');
    if (percentage > currentHigh) {
        localStorage.setItem(`lesson_score_${currentQuiz.lessonId}`, percentage);
    }

    // Track attempts for progress states
    const currentAttempts = parseInt(localStorage.getItem(`lesson_attempts_${currentQuiz.lessonId}`) || '0');
    localStorage.setItem(`lesson_attempts_${currentQuiz.lessonId}`, currentAttempts + 1);

    // Check Daily Challenge: Complete 1 Quiz
    if (passed && window.handleDailyChallenge) {
        window.handleDailyChallenge('quiz');
    }

    // Calculate stars for display
    let starDisplay = '';
    if (passed) {
        let stars = 1;
        if (percentage >= 80) stars = 3;
        else if (percentage >= 50) stars = 2;
        starDisplay = '<div class="result-stars">' + '⭐'.repeat(stars) + '☆'.repeat(3 - stars) + '</div>';
    }

    let html = `
        <div class="result-container" style="text-align: center; padding: 2rem;">
            <div class="result-icon">${passed ? '🎉' : '😕'}</div>
            ${starDisplay}
            <h3>${passed ? 'Grattis! / مبروك!' : 'Försök igen / حاول مرة أخرى'}</h3>
            <p>Du fick ${currentQuiz.score} av ${currentQuiz.questions.length} rätt (${percentage}%)</p>
            
            <div class="result-actions" style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
                ${passed ?
            `<button class="quiz-primary-btn" onclick="completeLesson('${currentQuiz.lessonId}')">Avsluta & Spara / إنهاء وحفظ</button>` :
            `<button class="quiz-primary-btn" onclick="startQuiz('${currentQuiz.lessonId}')">Försök igen / حاول مرة أخرى</button>`
        }
                <button class="quiz-secondary-btn" onclick="openMethodModal('${currentQuiz.lessonId}')">Gå tillbaka till lektionen / العودة للدرس</button>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;

    // Integare ProgressManager
    if (typeof ProgressManager !== 'undefined') {
        ProgressManager.trackGame('lesson_quiz', currentQuiz.score);
    }
}

function closeLessonModal() {
    const modal = document.getElementById('lessonModal');
    if (modal) {
        modal.style.display = 'none';
        // Remove hash if exists or ensure history is consistent
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    }
}

window.completeLesson = function (lessonId) {
    let progress = JSON.parse(localStorage.getItem('completedLessons')) || [];
    if (!progress.includes(lessonId)) {
        progress.push(lessonId);
        localStorage.setItem('completedLessons', JSON.stringify(progress));

        // Show celebration or feedback?
        // simple alert or toast
        // alert('Bra jobbat! Lesson completed.'); 
    }
    closeLessonModal();
    updateProgressUI();
}

function updateProgressUI() {
    const progress = JSON.parse(localStorage.getItem('completedLessons')) || [];

    document.querySelectorAll('.lesson-card').forEach(card => {
        const lessonId = card.getAttribute('data-lesson');
        if (progress.includes(lessonId)) {
            card.classList.add('completed');
            if (!card.querySelector('.completion-badge')) {
                const badge = document.createElement('div');
                badge.className = 'completion-badge';
                badge.innerHTML = '<i class="fas fa-check"></i>';
                card.appendChild(badge);
            }
        }
    });
}

function setupModalListeners() {
    // Close button
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        closeLessonModal();
    });

    // Click outside to close
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('lessonModal');
        if (event.target === modal) {
            closeLessonModal();
        }
    });

    // Handle Back Button
    window.addEventListener('popstate', (event) => {
        const modal = document.getElementById('lessonModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Swipe Navigation
    const modalContent = document.getElementById('lessonContent') || document.querySelector('.lesson-modal');
    let touchStartX = 0;
    let touchEndX = 0;

    if (modalContent) {
        modalContent.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalContent.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        if (!document.getElementById('lessonModal') || document.getElementById('lessonModal').style.display === 'none') return;

        const SWIPE_THRESHOLD = 50;
        if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
            // Swipe Left -> Next Lesson
            navigateLesson(1);
        }
        if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
            // Swipe Right -> Prev Lesson
            navigateLesson(-1);
        }
    }
}

function navigateLesson(direction) {
    const currentTitle = document.getElementById('modalTitle').innerText;
    const currentIndex = lessonsData.findIndex(l => l.title === currentTitle);

    if (currentIndex === -1) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < lessonsData.length) {
        const nextLesson = lessonsData[nextIndex];
        openMethodModal(nextLesson.id);
    }
}

function escapeSquote(str) {
    return str.replace(/'/g, "\\'");
}
