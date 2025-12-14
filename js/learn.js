
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
    initLessonSearch();
    updateProgressUI();

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

function renderLessonCards() {
    const grid = document.querySelector('.lessons-grid');
    if (!grid) return;

    // Clear existing static cards if any (though we plan to remove them from HTML)
    // grid.innerHTML = ''; 

    // We Assuming HTML structure is already cleaned up or we are appending/replacing.
    // Ideally, the grid container should be empty in HTML.

    // Note: If we are keeping the existing container and just dynamicizing the content, 
    // we should make sure we don't duplicate if called multiple times.
    // For now, let's assume the HTML will be emptied or we strictly control this.
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
        hint.innerHTML = '<span class="swipe-hand-icon">👆</span> <span>Swipe to navigate</span>';
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
        alert("Not enough examples for a quiz! Marking as done.");
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

    // Generate simple wrong answers (randomly picked from other examples in the lesson is best, 
    // but complexity is higher. For simplicity, we can fetch from other lessons or generic placeholders?
    // Better: Pick 2 random wrong answers from the SAME lesson's other examples.

    // Find wrong answers
    const lesson = lessonsData.find(l => l.id === currentQuiz.lessonId);
    let allEx = [];
    lesson.sections.forEach(sec => { if (sec.examples) allEx = allEx.concat(sec.examples); });

    // Filter out current question
    const otherEx = allEx.filter(e => e.swe !== q.swe);
    const wrongAnswers = otherEx.sort(() => 0.5 - Math.random()).slice(0, 2);

    // Prepare options
    const options = [
        { text: q.arb, correct: true },
        { text: wrongAnswers[0]?.arb || 'N/A', correct: false },
        { text: wrongAnswers[1]?.arb || 'N/A', correct: false }
    ].sort(() => 0.5 - Math.random());

    let html = `
        <div class="quiz-container">
            <div class="quiz-header">
                <h3>Fråga ${currentQuiz.index + 1} / ${total}</h3>
                <div class="progress-bar"><div style="width: ${(currentQuiz.index / total) * 100}%"></div></div>
            </div>
            
            <div class="question-card">
                <p class="question-text">${q.swe}</p>
                <div class="options-grid">
                    ${options.map((opt, i) => `
                        <button class="option-btn" onclick="checkAnswer(${opt.correct})">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    contentDiv.innerHTML = html;
}


window.checkAnswer = function (isCorrect) {
    if (isCorrect) {
        currentQuiz.score++;
    } else {
        // Log mistake
        const q = currentQuiz.questions[currentQuiz.index];
        logMistake(q, currentQuiz.lessonId);
    }

    currentQuiz.index++;
    if (currentQuiz.index < currentQuiz.questions.length) {
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
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
    mistakes.splice(index, 1);
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

    // Check Daily Challenge: Complete 1 Quiz
    if (passed && window.handleDailyChallenge) {
        window.handleDailyChallenge('quiz');
    }

    let html = `
        <div class="result-container" style="text-align: center; padding: 2rem;">
            <div class="result-icon">${passed ? '🎉' : '😕'}</div>
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
