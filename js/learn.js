
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
    updateProgressUI();
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
    let htmlContent = '';

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
                            <i class="fas fa-volume-up speaker-icon"></i>
                        </p>
                        <p class="arb">${ex.arb}</p>
                    </div>
                </div>`;
            });
        }

        htmlContent += `</div>`; // End lesson-section
    });


    // Add "Start Quiz" button instead of direct completion
    htmlContent += `
        <div class="lesson-completion">
            <button class="quiz-start-btn" onclick="startQuiz('${lesson.id}')">
                <i class="fas fa-question-circle"></i> Starta Quiz / ابدأ الاختبار
            </button>
        </div>
    `;

    contentDiv.innerHTML = htmlContent;
    modal.style.display = 'block';

    // Push history state to handle back button closing
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
    if (isCorrect) currentQuiz.score++;

    // Show feedback (optional, for speed we skip to next or show toast)
    // Let's just go to next for now with a small visual feedback if possible, 
    // but rewriting DOM is expensive. 

    currentQuiz.index++;
    if (currentQuiz.index < currentQuiz.questions.length) {
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const contentDiv = document.getElementById('lessonContent');
    const passed = currentQuiz.score >= Math.ceil(currentQuiz.questions.length * 0.6); // 60% pass

    let html = `
        <div class="quiz-results">
            <div class="result-icon">${passed ? '🎉' : '😕'}</div>
            <h3>${passed ? 'Grattis! / مبروك!' : 'Försök igen / حاول مرة أخرى'}</h3>
            <p>Du fick ${currentQuiz.score} av ${currentQuiz.questions.length} rätt.</p>
            
            <div class="result-actions">
                ${passed ?
            `<button class="result-btn success" onclick="completeLesson('${currentQuiz.lessonId}')">Avsluta & Spara</button>` :
            `<button class="result-btn retry" onclick="startQuiz('${currentQuiz.lessonId}')">Försök igen</button>
                     <button class="result-btn secondary" onclick="openMethodModal('${currentQuiz.lessonId}')">Gå tillbaka till lektionen</button>`
        }
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
}

function escapeSquote(str) {
    return str.replace(/'/g, "\\'");
}
