
/* ========================================
   Quiz Manager - Centralized Logic (v2 Expert)
   Handles: Gamification, Question Generation, UI Rendering, Speech
   ======================================== */

class QuizManager {
    constructor() {
        this.session = null;
        this.config = {
            lives: 3,
            enableSpeech: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
            enableHaptics: 'vibrate' in navigator
        };
        this.sounds = {
            correct: new Audio('assets/sounds/correct.mp3'),
            wrong: new Audio('assets/sounds/wrong.mp3'),
            combo: new Audio('assets/sounds/combo.mp3')
        };
    }

    startPracticeMode(item) {
        this.session = {
            item: item,
            questions: this.generateMasteryQuestions(item),
            currentIndex: 0,
            score: 0,
            lives: this.config.lives,
            streak: 0,
            combo: 0
        };
        this.session.total = this.session.questions.length;
        this.renderQuizModal();
        this.renderCurrentQuestion();
    }

    generateMasteryQuestions(item) {
        const questions = [];
        // 1. Listening
        questions.push(this.generateListeningQuestion(item));
        // 2. Context
        const q2 = this.generateContextQuestion(item);
        if (q2) questions.push(q2);
        // 3. Typing
        const q3 = this.generateTypingQuestion(item);
        if (q3) questions.push(q3);
        // 4. Speech (If supported and word is long enough)
        if (this.config.enableSpeech && item[COL_SWE].length > 2) {
            const q4 = this.generateSpeechQuestion(item);
            if (q4) questions.push(q4);
        }
        return questions.filter(q => q !== null);
    }

    generateListeningQuestion(item) {
        const swe = item[COL_SWE];
        const arb = item[COL_ARB];
        const dists = this.generateMeaningDistractors(item);
        const options = this.shuffleArray([arb, ...dists]);
        return {
            type: 'listening',
            inputType: 'choice', // Use choice UI for listening
            icon: '👂',
            category: 'Lyssna & Förstå / استمع وافهم',
            questionText: 'Vad hör du? / ماذا تسمع؟',
            word: null, // Audio plays automatically
            playAudio: true,
            audioWord: swe,
            correctAnswer: arb,
            options: options,
            correctIndex: options.indexOf(arb)
        };
    }

    generateContextQuestion(item) {
        const swe = item[COL_SWE];
        const example = item[COL_EX_SWE];
        if (!example) return null;

        const formsStr = (item[COL_FORMS] || swe).toLowerCase();
        const formsList = formsStr.split(',').map(f => f.trim());
        if (!formsList.includes(swe.toLowerCase())) formsList.push(swe.toLowerCase());

        // Find word in sentence
        const words = example.split(' ');
        let foundWordOriginal = null;
        let foundClean = null;
        for (const w of words) {
            const cleanW = w.replace(/[.,!?;:"]/g, '').toLowerCase();
            if (formsList.includes(cleanW)) {
                foundWordOriginal = w;
                foundClean = cleanW;
                break;
            }
        }
        if (!foundWordOriginal) return null;

        const blankedSentence = example.replace(foundWordOriginal, '_______');
        const correctOption = foundWordOriginal.replace(/[.,!?;:"]/g, '');

        // Distractors
        let wrong = formsList.filter(f => f !== foundClean);
        const lookalikes = this.findLookalikeWords(swe, 3);
        wrong = [...wrong, ...lookalikes];

        if (wrong.length < 3) {
            const smartFakes = this.generateSmartDistractors(correctOption);
            wrong = [...wrong, ...smartFakes];
        }

        wrong = [...new Set(wrong)];
        wrong = this.shuffleArray(wrong).slice(0, 3);
        const options = this.shuffleArray([correctOption, ...wrong]);

        return {
            type: 'context',
            inputType: 'choice',
            icon: '✍️',
            category: 'Kontext / السياق',
            questionText: 'Fyll i luckan / أكمل الجملة',
            word: blankedSentence,
            correctAnswer: correctOption,
            options: options,
            correctIndex: options.indexOf(correctOption)
        };
    }

    generateTypingQuestion(item) {
        const swe = item[COL_SWE];
        const arb = item[COL_ARB];
        if (!swe || swe.length < 2) return null;
        return {
            type: 'typing',
            inputType: 'text',
            icon: '⌨️',
            category: 'Stavning / الكتابة',
            questionText: 'Skriv ordet / اكتب الكلمة',
            word: arb,
            correctAnswer: swe,
            placeholder: `${swe.length} bokstäver`,
            scrambled: this.shuffleArray(swe.split('')).join('  '),
            playAudio: false
        };
    }

    generateSpeechQuestion(item) {
        return {
            type: 'speech',
            inputType: 'speech',
            icon: '🎤',
            category: 'Uttal / النطق',
            questionText: 'Säg ordet högt! / انطق الكلمة!',
            word: item[COL_SWE], // Show Swedish word
            correctAnswer: item[COL_SWE],
            playAudio: true
        };
    }

    /* Helpers */
    generateMeaningDistractors(item) {
        const dists = [];
        if (typeof dictionaryData === 'undefined') return ['N/A', 'N/A', 'N/A'];
        for (let i = 0; i < 50 && dists.length < 3; i++) {
            const r = dictionaryData[Math.floor(Math.random() * dictionaryData.length)];
            if (r[COL_ARB] && r[COL_ARB] !== item[COL_ARB] && !dists.includes(r[COL_ARB])) {
                dists.push(r[COL_ARB]);
            }
        }
        return dists;
    }

    generateSmartDistractors(word) {
        const typos = [];
        const chars = word.split('');
        if (chars.length > 2) {
            const c = [...chars];
            c[1] = chars[2]; c[2] = chars[1]; // Swap 2nd/3rd
            typos.push(c.join(''));
        }
        // Vowels simple
        return typos;
    }

    findLookalikeWords(targetWord, count = 3) {
        if (typeof dictionaryData === 'undefined') return [];
        const T = targetWord.toLowerCase();
        const res = [];
        // Opt: Scan first 2000 items only for speed
        let scanned = 0;
        for (const item of dictionaryData) {
            scanned++;
            if (scanned > 5000) break;
            const w = (item[COL_SWE] || '').toLowerCase();
            if (w && w !== T && Math.abs(w.length - T.length) <= 1 && w[0] === T[0]) {
                const d = this.levenshteinDistance(T, w);
                if (d <= 2) res.push(item[COL_SWE]);
            }
            if (res.length >= 20) break;
        }
        return res.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    levenshteinDistance(a, b) {
        if (!a || !b) return (a || b).length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
                else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
        return matrix[b.length][a.length];
    }

    shuffleArray(arr) { return arr.sort(() => Math.random() - 0.5); }

    /* UI Rendering */
    renderQuizModal() {
        if (document.getElementById('practiceModal')) document.getElementById('practiceModal').remove();

        // Inject Styles Once
        if (!document.getElementById('quizStyles')) {
            const style = document.createElement('style');
            style.id = 'quizStyles';
            style.innerHTML = `
                @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
                .mic-active { animation: pulse-red 1.5s infinite; background: #ef4444 !important; transform: scale(1.1); }
                .quiz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
                .quiz-btn { background: rgba(59, 130, 246, 0.05); border: 2px solid rgba(59, 130, 246, 0.15); border-radius: 16px; padding: 1rem; font-size: 1rem; color: var(--text-primary); cursor: pointer; transition: all 0.2s; font-weight: 600; min-height: 60px; display: flex; align-items: center; justify-content: center; word-break: break-word; }
                .quiz-btn:hover { background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.4); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); }
                .quiz-btn:active { transform: translateY(0); }
                .quiz-btn.correct { background: #dcfce7 !important; border-color: #22c55e !important; color: #15803d !important; transform: scale(1.02); }
                .quiz-btn.wrong { background: #fee2e2 !important; border-color: #ef4444 !important; color: #b91c1c !important; opacity: 0.7; }
            `;
            document.head.appendChild(style);
        }

        const html = `
        <div id="practiceModal" class="modal-overlay" style="display: flex; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1000; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);">
            <div class="modal-content" style="background: var(--surface, #fff); padding: 1.5rem; border-radius: 24px; width: 90%; max-width: 400px; text-align: center; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
                <div id="quizHeader" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; color: var(--text-secondary);">
                     <div id="quizLives" style="font-size: 1.2rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"></div>
                     <div id="quizProgress" style="font-weight: 800; opacity: 0.7;"></div>
                     <div id="quizStreak" style="color: #f59e0b; font-weight: 800;"></div>
                </div>
                <button onclick="document.getElementById('practiceModal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.05); width: 32px; height: 32px; border-radius: 50%; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-secondary);">&times;</button>
                <div id="quizBody"></div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    renderCurrentQuestion() {
        const q = this.session.questions[this.session.currentIndex];
        const body = document.getElementById('quizBody');
        if (!body) return;

        // Update Header
        document.getElementById('quizLives').innerHTML = '❤️'.repeat(this.session.lives) + '<span style="opacity:0.3">🖤</span>'.repeat(3 - this.session.lives);
        document.getElementById('quizProgress').innerText = `${this.session.currentIndex + 1} / ${this.session.total}`;
        document.getElementById('quizStreak').innerText = this.session.streak > 1 ? `🔥 ${this.session.streak}` : '';

        // Content
        let inputHTML = '';
        if (q.inputType === 'choice') {
            inputHTML = `<div class="quiz-grid" id="optionsGrid">${q.options.map(opt => `<button class="quiz-btn" onclick="quizManager.checkAnswer('${escapeHtml(opt)}', this)">${opt}</button>`).join('')}</div>`;
        } else if (q.inputType === 'text') {
            inputHTML = `
            <input type="text" id="qInput" placeholder="${q.placeholder}" autocomplete="off" style="width:100%; padding:1rem; font-size:1.2rem; border:2px solid #e2e8f0; border-radius:16px; text-align:center; margin-bottom:1rem; outline:none;" onfocus="this.style.borderColor='#3b82f6'" onkeypress="if(event.key==='Enter') quizManager.checkAnswer(this.value)">
            <button id="submitBtn" onclick="quizManager.checkAnswer(document.getElementById('qInput').value)" style="width:100%; padding:1rem; background:#3b82f6; color:white; border:none; border-radius:16px; font-weight:bold; font-size:1rem; cursor:pointer;">Klara / تم</button>
            `;
        } else if (q.inputType === 'speech') {
            inputHTML = `
            <button id="micBtn" onclick="quizManager.startListening()" style="width:80px; height:80px; border-radius:50%; background:#3b82f6; border:none; color:white; font-size:2rem; cursor:pointer; box-shadow:0 10px 30px rgba(59,130,246,0.3); transition:all 0.3s;">🎤</button>
            <p id="speechText" style="margin-top:1rem; color:var(--text-secondary); font-weight:500;">Tryck för att tala</p>
            `;
        }

        body.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">${q.icon}</div>
            <h3 style="color:var(--text-secondary); font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">${q.category}</h3>
            <h2 style="font-size:1.4rem; font-weight:800; margin-bottom:1.5rem; color:var(--text-primary);">${q.questionText}</h2>
            ${q.word ? `<div style="font-size:1.8rem; font-weight:900; color:#3b82f6; margin-bottom:1.5rem;">${q.word}</div>` : ''}
            ${q.scrambled ? `<div style="background:#f8fafc; padding:0.5rem 1rem; border-radius:12px; border:2px dashed #cbd5e1; display:inline-block; font-family:monospace; font-size:1.2rem; letter-spacing:3px; margin-bottom:1.5rem; color:#64748b; font-weight:bold;">${q.scrambled}</div>` : ''}
            ${inputHTML}
            <div id="quizFeedback" style="min-height: 80px; margin-top: 1rem; display: flex; align-items: center; justify-content: center;"></div>
        `;

        if (q.playAudio) {
            setTimeout(() => { if (typeof speakWord === 'function') speakWord(q.audioWord || q.word || q.correctAnswer); }, 500);
        }
        if (q.inputType === 'text') setTimeout(() => document.getElementById('qInput')?.focus(), 400);
    }

    startListening() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) { alert("Web Speech API not supported"); return; }
        const recognition = new SpeechRecognition();
        recognition.lang = 'sv-SE';
        recognition.start();
        const btn = document.getElementById('micBtn');
        const txt = document.getElementById('speechText');
        btn.classList.add('mic-active');
        txt.innerText = "Lyssnar... / جاري الاستماع";

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            btn.classList.remove('mic-active');
            txt.innerText = transcript;
            setTimeout(() => this.checkAnswer(transcript, null), 1000);
        };
        recognition.onerror = () => {
            btn.classList.remove('mic-active');
            txt.innerText = "Hörde inte. Försök igen. / لم أسمعك";
        };
    }

    checkAnswer(ans, btnElement) {
        if (!ans) return;

        // Disable Interactions
        const opts = document.getElementById('optionsGrid');
        if (opts) opts.style.pointerEvents = 'none';
        const inp = document.getElementById('qInput');
        if (inp) inp.disabled = true;
        const sub = document.getElementById('submitBtn');
        if (sub) sub.disabled = true;

        const q = this.session.questions[this.session.currentIndex];
        const rect = q.correctAnswer.toLowerCase().trim().replace(/[.,!?;:]/g, '');
        const usr = ans.toLowerCase().trim().replace(/[.,!?;:]/g, '');

        let isCorrect = rect === usr;
        // Fuzzy
        if (!isCorrect) {
            const dist = this.levenshteinDistance(rect, usr);
            const tolerance = q.type === 'speech' ? 2 : (rect.length > 5 ? 1 : 0);
            if (dist <= tolerance) isCorrect = true;
        }

        if (isCorrect) {
            this.session.score++;
            this.session.streak++;
            this.session.combo++;

            // Visual Feedback
            if (btnElement) btnElement.classList.add('correct');
            else if (inp) inp.style.borderColor = '#22c55e';

            setTimeout(() => this.nextQuestion(), 500);
        } else {
            this.session.lives--;
            this.session.streak = 0;
            if (btnElement) btnElement.classList.add('wrong');
            else if (inp) inp.style.borderColor = '#ef4444';

            this.showFeedback(false, q.correctAnswer);
            // Longer delay for user to read feedback
            if (this.session.lives <= 0) setTimeout(() => this.endGame(false), 3000);
            else setTimeout(() => this.nextQuestion(), 3500);
        }
    }

    showFeedback(isWin, correctAns) {
        if (isWin) return;

        const feedback = document.getElementById('quizFeedback');
        if (feedback) {
            feedback.innerHTML = `
                <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 12px; padding: 0.75rem 1.5rem; color: #b91c1c; animation: fadeIn 0.3s; width: 100%;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                         <span style="font-size: 1.2rem;">❌</span> 
                         <span style="font-weight: bold;">Tyvärr / خطأ</span>
                    </div>
                    <div style="font-size: 0.95rem;">Rätt svar: <span style="font-weight: 800; color: #991b1b;">${correctAns}</span></div>
                </div>
            `;
        }
        if (navigator.vibrate) navigator.vibrate(200);
    }

    nextQuestion() {
        this.session.currentIndex++;
        if (this.session.currentIndex >= this.session.questions.length) this.endGame(true);
        else this.renderCurrentQuestion();
    }

    endGame(win) {
        // No confetti
        const modal = document.querySelector('.modal-content');
        modal.innerHTML = `
             <div style="font-size:5rem; margin-bottom:1rem;">${win ? '🏆' : '💀'}</div>
             <h2 style="font-size:2rem; margin-bottom:0.5rem;">${win ? 'Klar!' : 'Game Over'}</h2>
             <p style="color:var(--text-secondary); margin-bottom:2rem;">${win ? 'Bra jobbat!' : 'Försök igen!'}</p>
             <button onclick="document.getElementById('practiceModal').remove()" style="width:100%; padding:1rem; background:var(--surface,#f1f5f9); color:var(--text-primary); border:none; border-radius:16px; font-weight:bold; cursor:pointer;">Stäng / إغلاق</button>
         `;
    }
}
window.quizManager = new QuizManager();
