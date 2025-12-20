
// State
// dictionaryData is global from data.js

// iOS Audio Unlock - Must happen on first user touch/click
let audioUnlockHandled = false;
const unlockAudioOnFirstTouch = () => {
    if (audioUnlockHandled) return;
    audioUnlockHandled = true;

    // Use TTSManager's unlock function if available
    if (typeof TTSManager !== 'undefined' && TTSManager.unlockAudio) {
        TTSManager.unlockAudio();
    }

    // Remove listeners after first touch
    document.removeEventListener('touchstart', unlockAudioOnFirstTouch);
    document.removeEventListener('click', unlockAudioOnFirstTouch);
    console.log('[Audio] Unlocked on first user interaction');
};
document.addEventListener('touchstart', unlockAudioOnFirstTouch, { once: true, passive: true });
document.addEventListener('click', unlockAudioOnFirstTouch, { once: true });

// DOM Elements
const detailsArea = document.getElementById('detailsArea');
const flashcardBtn = document.getElementById('flashcardBtn');
const shareBtn = document.getElementById('shareBtn');
const customActions = document.getElementById('customActions');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

// Column Indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5; // Swedish Definition (or simplified Arabic def for specialized categories)
const COL_FORMS = 6; // Forms for regular words, Swedish def for specialized categories
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;
// Columns 11-12 are empty/reserved
const COL_GENDER = 13; // Noun gender (en/ett)

// ========================================
// Grammar Badge Generator (Unified with main page)
// Returns abbreviated badge like: En, Ett, Gr.1, Adj, Adv, Verb
// ========================================
function getGrammarBadgeText(type, forms, word) {
    const formsLower = (forms || '').toLowerCase();
    const wordLower = (word || '').toLowerCase();
    const normalizedType = (type || '').toLowerCase().replace('.', '').replace(' ', '');

    // === VERB DETECTION ===
    if (formsLower.match(/\w+ar[,\s]/) && formsLower.match(/\w+ade[,\s]/)) return 'Gr. 1';
    if (formsLower.match(/\w+er[,\s]/) && (formsLower.match(/\w+de[,\s]/) || formsLower.match(/\w+te[,\s]/))) return 'Gr. 2';
    if (formsLower.match(/\w+dde[,\s]/)) return 'Gr. 3';
    if (formsLower.match(/\w+(it|its|ats|ett)[,\s]/) || formsLower.match(/\w+(it|its|ats|ett)$/)) return 'Gr. 4';
    if (wordLower.endsWith('s') && formsLower.match(/\w+ades[,\s]|\w+des[,\s]|\w+ades$/)) return 'Gr. 4';

    // S-passive verbs
    if (wordLower.match(/\w+(tas|kas|las|nas|ras|sas|vas)$/) ||
        (wordLower.endsWith('as') && wordLower.length > 4)) return 'S-passiv';

    // General verb from forms
    if (formsLower.match(/\w+ar[,\s]|\w+er[,\s]|\w+r[,\s]/) &&
        formsLower.match(/\w+de[,\s]|\w+ade[,\s]|\w+te[,\s]|\w+dde[,\s]/)) return 'Verb';

    // === NOUN DETECTION (En/Ett) ===
    const formParts = formsLower.split(',').map(f => f.trim());
    if (formParts.length >= 2) {
        const definiteSingular = formParts[1];
        if (definiteSingular.match(/\w+(an|en)$/) && !definiteSingular.match(/\w+et$/)) return 'En';
        if (definiteSingular.match(/\w+et$/)) return 'Ett';
    }
    if (formsLower.startsWith('en ') || formsLower.match(/\ben\s+\w+/)) return 'En';
    if (formsLower.startsWith('ett ') || formsLower.match(/\bett\s+\w+/)) return 'Ett';

    // === ADJECTIVE DETECTION ===
    if (formParts.length >= 3) {
        const form1 = formParts[0];
        const form3 = formParts[2];
        if (form3.endsWith('a') && form3.length >= form1.length && !formsLower.match(/\w+ade[,\s]|\w+de[,\s]/)) {
            return 'Adj';
        }
    }
    if (normalizedType.includes('adj')) return 'Adj';

    // === TYPE FIELD FALLBACKS ===
    if (normalizedType.includes('adverb') || normalizedType === 'adv') return 'Adv';
    if (normalizedType.includes('verb') && !normalizedType.includes('adverb')) return 'Verb';
    if (normalizedType.includes('subst')) return 'Subst';
    if (normalizedType.includes('prep')) return 'Prep';
    if (normalizedType.includes('konj')) return 'Konj';
    if (normalizedType.includes('pron')) return 'Pron';
    if (normalizedType.includes('interj')) return 'Interj';

    // Fallback to type without dot
    return type ? type.replace('.', '') : '';
}

// ========================================
// Visual Fingerprint Generator
// Returns a consistent dark navy gradient (clean design)
// ========================================
function generateWordPattern(word) {
    // Return consistent dark navy gradient for all words
    return 'linear-gradient(145deg, #1e2a47 0%, #1a2540 50%, #16203a 100%)';
}

// ========================================
// Word Type Color Class Generator
// Returns a CSS class based on word type for colored border
// ========================================
function getWordTypeColorClass(type) {
    if (!type) return 'type-default';

    const typeLower = type.toLowerCase();

    // Nouns (Substantiv) - Blue
    if (typeLower.includes('subst')) return 'type-noun';

    // Phrasal Verbs - Cyan (Same as Medical)
    // Phrasal Verbs - Cyan (Same as Medical)
    if (typeLower.includes('verbmn') || (typeLower.includes('verb') && typeof currentItem !== 'undefined' && currentItem && currentItem.Swe && currentItem.Swe.includes(' '))) return 'type-phrasal';

    // Verbs - Purple
    if (typeLower.includes('verb') && !typeLower.includes('adverb')) return 'type-verb';

    // Adjectives - Yellow
    if (typeLower.includes('adj') && !typeLower.includes('adverb')) return 'type-adjective';

    // Adverbs - Orange
    if (typeLower.includes('adverb') || typeLower === 'adv') return 'type-adverb';

    // Legal/Juridik - Dark Red
    if (typeLower.includes('jurid') || typeLower.includes('juridik')) return 'type-legal';

    // Medical - Teal
    if (typeLower.includes('medic') || typeLower.includes('läkar')) return 'type-medical';

    // Prepositions - Gray
    if (typeLower.includes('prep')) return 'type-preposition';

    // Pronouns - Cyan
    if (typeLower.includes('pron')) return 'type-pronoun';

    // Conjunctions - Pink
    if (typeLower.includes('konj')) return 'type-conjunction';

    // Interjections - Pale Orange
    if (typeLower.includes('interj')) return 'type-interjection';

    // Numbers - Pale Green
    if (typeLower.includes('räkn')) return 'type-number';

    // Abbreviations - Pale Lavender
    if (typeLower.includes('förk')) return 'type-abbreviation';

    // Default
    return 'type-default';
}


// ========================================
// Text-to-Speech for Swedish Pronunciation
// Uses Unified TTSManager from utils.js
// ========================================

// Main speak function
function speakWord(text, lang = 'sv') {
    TTSManager.speak(text, lang);
}

// Initialize voices on page load (via Manager)
// This ensures voices are ready when user clicks
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        TTSManager.cachedSwedishVoice = null;
    };
}

// ========================================
// Toggle Favorite with Pulse Animation
// ========================================
// Toggle Favorite with Pulse Animation
function toggleFavorite(id) {
    const isAdded = FavoritesManager.toggle(id); // Handles storage and Toast

    // UI Updates
    const btn = document.querySelector('.favorite-btn-badge');
    const svg = btn ? btn.querySelector('svg') : null;

    if (isAdded) {
        if (btn) {
            btn.classList.add('active', 'pulse');
            if (svg) svg.setAttribute('fill', 'currentColor');
            setTimeout(() => btn.classList.remove('pulse'), 500);
        }
    } else {
        if (btn) {
            btn.classList.remove('active');
            if (svg) svg.setAttribute('fill', 'none');
        }
    }
}

// ========================================
// Smart Copy - Copy formatted content with Visual Feedback
// ========================================
let currentItem = null; // Store current item for copy function
let copyButtonOriginalHTML = ''; // Store original button HTML

function handleSmartCopy() {
    if (!currentItem) {
        showToast('Inget att kopiera / لا يوجد شيء للنسخ');
        return;
    }

    const swe = currentItem[COL_SWE] || '';
    const arb = currentItem[COL_ARB] || '';
    const type = currentItem[COL_TYPE] ? currentItem[COL_TYPE].replace('.', '') : '';
    const sweDef = currentItem[COL_SWE_DEF] || '';
    const arbDef = currentItem[COL_ARB_DEF] || '';
    const exSwe = currentItem[COL_EX_SWE] || '';
    const exArb = currentItem[COL_EX_ARB] || '';
    const forms = currentItem[COL_FORMS] || '';

    let content = `🇸🇪 ${swe}`;
    if (type) content += `  (${type})`;
    content += `\n`;

    if (arb) content += `🇸🇦 ${arb}\n`;
    content += `\n`;

    if (sweDef || arbDef) {
        content += `📖 Definition:\n`;
        if (sweDef) content += `${sweDef}\n`;
        if (arbDef) content += `${arbDef}\n`;
        content += `\n`;
    }

    if (exSwe || exArb) {
        content += `💡 Exempel:\n`;
        if (exSwe) content += `- ${exSwe}\n`;
        if (exArb) content += `  "${exArb}"\n`;
        content += `\n`;
    }

    if (forms) {
        content += `🔤 Former: ${forms}\n\n`;
    }

    content += `🔗 ${window.location.href}`;

    const smartCopyBtn = document.getElementById('smartCopyBtn');

    navigator.clipboard.writeText(content).then(() => {
        showToast('تم نسخ البطاقة بنجاح! / Kopierat!');

        // Visual Feedback: Change icon to checkmark
        if (smartCopyBtn) {
            if (!copyButtonOriginalHTML) {
                copyButtonOriginalHTML = smartCopyBtn.innerHTML;
            }

            smartCopyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                    style="color: #10b981;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style="color: #10b981;">تم النسخ! / Kopierat!</span>
            `;

            smartCopyBtn.style.transform = 'scale(1.05)';

            // Revert after 2 seconds
            setTimeout(() => {
                if (smartCopyBtn) {
                    smartCopyBtn.innerHTML = copyButtonOriginalHTML;
                    smartCopyBtn.style.transform = 'scale(1)';
                }
            }, 2000);
        }
    }).catch(() => {
        showToast('Kunde inte kopiera / فشل النسخ');
    });
}

// ========================================
// Skeleton Loading State
// ========================================
function showSkeletonLoading() {
    detailsArea.innerHTML = `
        <div class="details-loading">
            <div class="skeleton skeleton-hero"></div>
            <div class="skeleton skeleton-section"></div>
            <div class="skeleton skeleton-section"></div>
            <div class="skeleton skeleton-section"></div>
        </div>
    `;
}

// ========================================
// SVG Icon Generator
// ========================================
function getSVGIcon(iconName) {
    const icons = {
        book: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
        text: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>`,
        lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>`,
        message: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`
    };
    return icons[iconName] || '';
}

// ========================================
// Smart Grammar Labels for Conjugations
// ========================================
function getLabeledForms(formsArray, wordType) {
    const type = (wordType || '').toLowerCase();

    // Verb patterns: presens, (noun forms), preteritum, supinum, infinitiv
    if (type.includes('verb')) {
        return parseVerbForms(formsArray);
    }

    // Noun patterns: singular indefinite, singular definite, plural indefinite, plural definite
    if (type.includes('subst') || type.includes('noun')) {
        return parseNounForms(formsArray);
    }

    // Adjective patterns: utrum, neutrum, plural/definite
    if (type.includes('adj')) {
        return parseAdjectiveForms(formsArray);
    }

    // Default: no labels
    return formsArray.map(word => ({ word, label: null }));
}

// ========================================
// Personal Notes Manager
// ========================================
const NotesManager = {
    STORAGE_KEY: 'lexin_user_notes',

    getNotes() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
        } catch (e) { return {}; }
    },

    getNote(wordId) {
        const notes = this.getNotes();
        return notes[wordId] || '';
    },

    saveNote(wordId, text) {
        const notes = this.getNotes();
        if (text && text.trim()) {
            notes[wordId] = text.trim();
            showToast('Anteckning sparad / تم حفظ الملاحظة');
        } else {
            delete notes[wordId];
            showToast('Anteckning borttagen / تم حذف الملاحظة');
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
    }
};


// ========================================
// Smart Linking - Make words clickable
// ========================================
function linkifyText(text) {
    if (!text) return '';
    // Split by spaces but preserve punctuation
    // Simple regex to find words > 3 chars that are likely Swedish words
    // We avoid replacing HTML tags if any (though usually text is plain)

    return text.split(' ').map(word => {
        // Clean word of punctuation for checking
        const cleanWord = word.replace(/[.,!?;:()"']/g, '');
        if (cleanWord.length > 3 && /^[a-zA-ZåäöÅÄÖ]+$/.test(cleanWord)) {
            // Check if word exists in dictionary (optional for performance, but better UX)
            // For now, we link blindly or we could do a quick Bloom filter check if we had one.
            // Let's link blindly for exploration, user will see 404/search if not found, 
            // or we could check dictionaryData if it's not too heavy.
            // checking dictionaryData might be slow if 100k entries.
            // Let's just make it a link.
            return `<a href="index.html?q=${cleanWord}" class="smart-link">${word}</a>`;
        }
        return word;
    }).join(' ');
}

// ========================================
// Smart Practice Mode - Multiple Choice Quiz
// Questions are based on word type for better learning
// ========================================

let currentQuizSession = null;

function startPracticeMode(wordId) {
    if (window.quizManager) {
        // Find item first (logic preserved)
        let item = dictionaryData.find(entry => entry[COL_ID] === wordId);
        if (!item) {
            const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
            item = customWords.find(entry => entry[COL_ID] === wordId);
        }
        if (item) {
            window.quizManager.startPracticeMode(item);
        }
    } else {
        console.error("QuizManager not loaded");
        showToast("Ett fel uppstod. Ladda om sidan. / حدث خطأ، قم بتحديث الصفحة");
    }
}

function renderQuizQuestion(question) {
    const progress = `${currentQuizSession.currentIndex + 1}/${currentQuizSession.total}`;

    let interactionHtml = '';

    if (question.inputType === 'text') {
        // Text Input for Typing Challenge
        interactionHtml = `
            <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
                <input type="text" id="quizTextInput" placeholder="${question.placeholder || 'Skriv här...'}" autocomplete="off"
                       style="width: 100%; padding: 1rem; font-size: 1.2rem; border: 2px solid #e2e8f0; border-radius: 12px; text-align: center; outline: none; transition: border-color 0.2s;"
                       onfocus="this.style.borderColor='#3b82f6'" onblur="this.style.borderColor='#e2e8f0'"
                       onkeypress="if(event.key === 'Enter') checkTextInputAnswer('${escapeHtml(question.correctAnswer)}')" />
                
                <button onclick="checkTextInputAnswer('${escapeHtml(question.correctAnswer)}')" 
                        style="width: 100%; padding: 1rem; background: var(--primary, #3b82f6); color: white; border: none; border-radius: 12px; font-weight: bold; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);">
                    Svara / إجابة
                </button>
            </div>
        `;
    } else {
        // Multiple Choice Buttons - Clean Grid Style
        interactionHtml = `
            <div class="quiz-options-grid">
                ${question.options.map((opt, idx) => `
                    <button class="quiz-option-clean" onclick="checkSmartQuizAnswer(${idx}, ${question.correctIndex}, '${escapeHtml(question.correctAnswer)}')"
                            onmouseover="this.style.transform='translateY(-2px)'"
                            onmouseout="this.style.transform='translateY(0)'">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
    }

    const modalHtml = `
        <div id="practiceModal" class="modal-overlay" style="display: flex; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1000; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);">
            <div class="modal-content" style="background: var(--surface, #fff); padding: 1.5rem; border-radius: 20px; width: 90%; max-width: 400px; text-align: center; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: -50px; left: -50px; width: 100px; height: 100px; background: rgba(59, 130, 246, 0.05); border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -30px; right: -30px; width: 80px; height: 80px; background: rgba(236, 72, 153, 0.05); border-radius: 50%;"></div>

                <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Fråga ${progress}</div>
                <button onclick="document.getElementById('practiceModal').remove()" style="position: absolute; top: 0.75rem; right: 0.75rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary); z-index: 10;">&times;</button>
                
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem; animation: floatIcon 3s ease-in-out infinite;">${question.icon}</div>
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1rem; color: var(--text-secondary); font-weight: 500;">${question.category}</h3>
                <h2 style="margin: 0 0 1rem 0; font-size: 1.3rem; font-weight: 700; color: var(--text-primary); direction: ltr;">${question.questionText}</h2>
                
                ${question.word ? `<div style="font-size: ${question.word.length > 25 ? '1.2rem' : '1.8rem'}; font-weight: 800; margin-bottom: 1.5rem; color: var(--primary, #3b82f6); line-height: 1.4; text-shadow: 0 2px 4px rgba(59,130,246,0.1);">${question.word}</div>` : ''}
                
                ${question.scrambled ? `<div style="margin-bottom: 1.5rem; font-size: 1.4rem; color: var(--text-primary); letter-spacing: 4px; font-family: monospace; background: #f8fafc; padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 700; border: 2px dashed #cbd5e1; display: inline-block;">${question.scrambled}</div>` : ''}

                <div id="quizOptions" style="margin-top: 1rem;">
                    ${interactionHtml}
                </div>
                
                <div id="quizFeedback" style="margin-top: 1rem; min-height: 24px;"></div>
            </div>
        </div>
        <style>
            @keyframes floatIcon { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
            .quiz-options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; width: 100%; }
            .quiz-option-clean {
                background: rgba(99, 102, 241, 0.05);
                border: 2px solid rgba(99, 102, 241, 0.2);
                border-radius: 12px;
                padding: 1rem;
                font-size: 1rem;
                color: var(--text-primary, #1e293b);
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 600;
                min-height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                word-break: break-word;
            }
            .quiz-option-clean:hover {
                background: rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.5);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
            }
        </style>
    `;

    // Remove existing
    const existing = document.getElementById('practiceModal');
    if (existing) existing.remove();

    // Append new
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    if (question.inputType === 'text') {
        setTimeout(() => {
            const el = document.getElementById('quizTextInput');
            if (el) el.focus();
        }, 300);
    }

    // Play Audio logic 
    if (question.playAudio && question.wordForAudio) {
        setTimeout(() => speakWord(question.wordForAudio), 500);
    }
}

function checkTextInputAnswer(correctAnswer) {
    const input = document.getElementById('quizTextInput');
    const feedback = document.getElementById('quizFeedback');
    const answer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();

    input.disabled = true;

    if (answer === correct) {
        input.style.borderColor = '#22c55e';
        input.style.background = '#f0fdf4';
        feedback.innerHTML = '<span style="color: #22c55e; font-weight: bold; font-size: 1.1rem;">✅ Rätt! / صحيح!</span>';
        if (typeof SoundManager !== 'undefined') SoundManager.play('success');
        currentQuizSession.score++;
        setTimeout(() => nextQuestion(), 1500);
    } else {
        input.style.borderColor = '#ef4444';
        input.style.background = '#fef2f2';
        feedback.innerHTML = `<span style="color: #ef4444; font-weight: bold;">❌ Fel! / خطأ! <br> Rätt svar: <span style="color: #22c55e">${correctAnswer}</span></span>`;
        if (typeof SoundManager !== 'undefined') SoundManager.play('error');
        setTimeout(() => nextQuestion(), 3000);
    }
}

function nextQuestion() {
    currentQuizSession.currentIndex++;
    if (currentQuizSession.currentIndex < currentQuizSession.questions.length) {
        renderQuizQuestion(currentQuizSession.questions[currentQuizSession.currentIndex]);
    } else {
        showQuizSummary();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateSmartQuestion(item) {
    const swe = item[COL_SWE] || '';
    const arb = item[COL_ARB] || '';
    const type = (item[COL_TYPE] || '').toLowerCase();
    const forms = item[COL_FORMS] || '';
    const gender = item[COL_GENDER] || '';

    const questionTypes = [];

    // Always available: Reverse Translation (Arabic → Swedish)
    if (arb && swe) {
        questionTypes.push({
            type: 'reverseTranslation',
            weight: 1
        });
    }

    // Nouns: En/Ett question
    if (type.includes('subst') && (gender || forms)) {
        questionTypes.push({
            type: 'enEtt',
            weight: 2  // Higher weight for grammatical questions
        });
    }

    // Verbs: Conjugation question
    if (type.includes('verb') && forms) {
        questionTypes.push({
            type: 'verbConjugation',
            weight: 2
        });
    }

    // Word type question
    if (type) {
        questionTypes.push({
            type: 'wordType',
            weight: 1
        });
    }

    if (questionTypes.length === 0) return null;

    // Weighted random selection
    const totalWeight = questionTypes.reduce((sum, q) => sum + q.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedType = questionTypes[0].type;

    for (const q of questionTypes) {
        random -= q.weight;
        if (random <= 0) {
            selectedType = q.type;
            break;
        }
    }

    // Generate question based on type
    switch (selectedType) {
        case 'reverseTranslation':
            return generateReverseTranslationQuestion(item);
        case 'enEtt':
            return generateEnEttQuestion(item);
        case 'verbConjugation':
            return generateVerbConjugationQuestion(item);
        case 'wordType':
            return generateWordTypeQuestion(item);
        default:
            return generateReverseTranslationQuestion(item);
    }
}

function generateReverseTranslationQuestion(item) {
    const swe = item[COL_SWE];
    const arb = item[COL_ARB];

    // Get similar words for wrong answers
    const wrongAnswers = getRandomWords(3, swe);
    const options = shuffleArray([swe, ...wrongAnswers]);
    const correctIndex = options.indexOf(swe);

    return {
        icon: '🔤',
        category: 'ترجمة عكسية / Omvänd översättning',
        questionText: 'Vad betyder detta ord på svenska?',
        word: arb,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: swe,
        playAudio: false
    };
}

function generateEnEttQuestion(item) {
    const swe = item[COL_SWE];
    const gender = item[COL_GENDER] || '';
    const forms = item[COL_FORMS] || '';

    // Detect gender from forms if not provided
    let correctGender = '';
    if (gender) {
        correctGender = gender.toLowerCase().includes('en') ? 'En' : 'Ett';
    } else if (forms) {
        const formParts = forms.split(',').map(f => f.trim());
        if (formParts.length >= 2) {
            const definiteSingular = formParts[1].toLowerCase();
            if (definiteSingular.endsWith('en') || definiteSingular.endsWith('an')) {
                correctGender = 'En';
            } else if (definiteSingular.endsWith('et')) {
                correctGender = 'Ett';
            }
        }
    }

    if (!correctGender) return generateReverseTranslationQuestion(item);

    const options = ['En', 'Ett'];
    const correctIndex = options.indexOf(correctGender);

    return {
        icon: '📝',
        category: 'جنس الاسم / Substantivets genus',
        questionText: 'En eller Ett?',
        word: swe,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: correctGender,
        playAudio: true
    };
}

function generateVerbConjugationQuestion(item) {
    const swe = item[COL_SWE];
    const forms = item[COL_FORMS] || '';

    if (!forms) return generateReverseTranslationQuestion(item);

    const formParts = forms.split(',').map(f => f.trim()).filter(f => f);
    if (formParts.length < 2) return generateReverseTranslationQuestion(item);

    // Ask about preteritum (past tense)
    const presens = formParts[0];
    const preteritum = formParts[1];

    // Generate wrong answers by modifying the correct one
    const wrongAnswers = [
        preteritum.replace(/de$/, 'te').replace(/ade$/, 'de'),
        preteritum + 's',
        preteritum.slice(0, -1) + 'a'
    ].filter(w => w !== preteritum);

    const options = shuffleArray([preteritum, ...wrongAnswers.slice(0, 3)]);
    const correctIndex = options.indexOf(preteritum);

    return {
        icon: '⏳',
        category: 'تصريف الفعل / Verbböjning',
        questionText: 'Vad är preteritum (dåtid) av detta verb?',
        word: swe,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: preteritum,
        playAudio: true
    };
}

function generateWordTypeQuestion(item) {
    const swe = item[COL_SWE];
    const rawType = item[COL_TYPE] || '';

    // Map to display names
    const typeMap = {
        'substantiv': 'Substantiv (اسم)',
        'verb': 'Verb (فعل)',
        'adjektiv': 'Adjektiv (صفة)',
        'adverb': 'Adverb (حال)',
        'preposition': 'Preposition (حرف جر)',
        'pronomen': 'Pronomen (ضمير)',
        'konjunktion': 'Konjunktion (حرف عطف)'
    };

    const typeLower = rawType.toLowerCase().replace('.', '');
    let correctType = 'Substantiv (اسم)';

    for (const [key, value] of Object.entries(typeMap)) {
        if (typeLower.includes(key)) {
            correctType = value;
            break;
        }
    }

    const allTypes = Object.values(typeMap);
    const wrongTypes = allTypes.filter(t => t !== correctType);
    const options = shuffleArray([correctType, ...shuffleArray(wrongTypes).slice(0, 3)]);
    const correctIndex = options.indexOf(correctType);

    return {
        icon: '📚',
        category: 'نوع الكلمة / Ordklass',
        questionText: 'Vad för typ av ord är detta?',
        word: swe,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: correctType,
        playAudio: true
    };
}

function getRandomWords(count, exclude) {
    const words = dictionaryData
        .map(d => d[COL_SWE])
        .filter(w => w && w !== exclude);

    const shuffled = shuffleArray(words);
    return shuffled.slice(0, count);
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function checkSmartQuizAnswer(selectedIndex, correctIndex, correctAnswer) {
    const buttons = document.querySelectorAll('#quizOptions button');
    const feedback = document.getElementById('quizFeedback');

    // Disable all buttons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
    });

    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
        // Correct!
        buttons[selectedIndex].style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        buttons[selectedIndex].style.color = 'white';
        buttons[selectedIndex].style.borderColor = '#22c55e';
        buttons[selectedIndex].style.transform = 'scale(1.02)';
        buttons[selectedIndex].style.opacity = '1';

        feedback.innerHTML = '<span style="color: #22c55e; font-weight: bold; font-size: 1.1rem;">✅ Rätt! / صحيح!</span>';

        if (typeof SoundManager !== 'undefined') SoundManager.play('success');
        currentQuizSession.score++;

    } else {
        // Wrong
        buttons[selectedIndex].style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        buttons[selectedIndex].style.color = 'white';
        buttons[selectedIndex].style.borderColor = '#ef4444';
        buttons[selectedIndex].style.opacity = '1';

        // Highlight correct answer
        buttons[correctIndex].style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        buttons[correctIndex].style.color = 'white';
        buttons[correctIndex].style.borderColor = '#22c55e';
        buttons[correctIndex].style.opacity = '1';

        feedback.innerHTML = `<span style="color: #ef4444; font-weight: bold;">❌ Fel! / خطأ! <br> Rätt svar: ${correctAnswer}</span>`;

        if (typeof SoundManager !== 'undefined') SoundManager.play('error');
    }

    // Sequence Logic
    setTimeout(() => {
        currentQuizSession.currentIndex++;
        if (currentQuizSession.currentIndex < currentQuizSession.questions.length) {
            renderQuizQuestion(currentQuizSession.questions[currentQuizSession.currentIndex]);
        } else {
            showQuizSummary();
        }
    }, isCorrect ? 1500 : 3000);
}

function showQuizSummary() {
    const modal = document.getElementById('practiceModal');
    if (!modal) return;

    const content = modal.querySelector('.modal-content');
    const percent = Math.round((currentQuizSession.score / currentQuizSession.total) * 100);

    let msg = 'Bra jobbat!';
    let icon = '🎉';
    if (percent === 100) { msg = 'Fantastiskt! Du är en mästare! 🏆'; icon = '🌟'; }
    else if (percent >= 50) { msg = 'Bra försök! Fortsätt öva.'; }
    else { msg = 'Fortsätt kämpa!'; icon = '💪'; }

    content.innerHTML = `
        <button onclick="document.getElementById('practiceModal').remove()" style="position: absolute; top: 0.75rem; right: 0.75rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">&times;</button>
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <h2 style="margin-bottom: 0.5rem; color: var(--text-primary);">Test Slutfört!</h2>
        <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 1rem;">
            ${currentQuizSession.score} / ${currentQuizSession.total}
        </div>
        <div style="font-size: 1rem; background: var(--background); padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1.5rem;">
            ${percent}% Rätt
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-weight: 500;">${msg}</p>
        <button onclick="document.getElementById('practiceModal').remove()" class="quiz-option-btn" style="width: 100%; padding: 1rem; border-radius: 12px; background: var(--primary); color: white; border: none; font-weight: bold; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            Stäng / إغلاق
        </button>
    `;

    if (percent === 100 && typeof SoundManager !== 'undefined') SoundManager.play('levelUp');
}

// ========================================
// Mastery Questions Generators
// ========================================
function generateMasteryQuestions(item) {
    const questions = [];

    // 1. Listening (Lyssna)
    const listeningQ = generateListeningQuestion(item);
    if (listeningQ) questions.push(listeningQ);

    // 2. Grammar Challenge (Grammatik)
    const type = (item[COL_TYPE] || '').toLowerCase();
    let grammarQ = null;

    if (type.includes('verb') && item[COL_FORMS]) {
        grammarQ = generateVerbConjugationQuestion(item);
    } else if (type.includes('subst') && !type.includes('namn')) {
        grammarQ = generateEnEttQuestion(item);
    }

    if (grammarQ) {
        questions.push(grammarQ);
    } else {
        const meaningQ = generateReverseTranslationQuestion(item);
        if (meaningQ) questions.push(meaningQ);
    }

    // 3. Context Challenge (Kontext)
    const contextQ = generateContextQuestion(item);
    if (contextQ) questions.push(contextQ);

    // 4. Typing / Spelling Challenge (Hardest Level)
    const typingQ = generateTypingQuestion(item);
    if (typingQ) questions.push(typingQ);

    return questions;
}

function generateListeningQuestion(item) {
    const swe = item[COL_SWE];
    if (!swe) return null;

    const wrongAnswers = getRandomWords(2, swe);
    const options = shuffleArray([swe, ...wrongAnswers]);
    const correctIndex = options.indexOf(swe);

    return {
        type: 'listening',
        icon: '👂',
        category: 'Lyssna / استمع',
        questionText: 'Vilket ord hörde du? / ما الكلمة التي سمعتها؟',
        word: '🔊 Lyssna',
        options: options,
        correctIndex: correctIndex,
        correctAnswer: swe,
        playAudio: true,
        wordForAudio: swe
    };
}

function generateContextQuestion(item) {
    const swe = item[COL_SWE];
    const example = item[COL_EX_SWE];
    if (!example) return null;

    const formsStr = (item[COL_FORMS] || swe).toLowerCase();
    const formsList = formsStr.split(',').map(f => f.trim());
    if (!formsList.includes(swe.toLowerCase())) formsList.push(swe.toLowerCase());

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

    let wrong = formsList.filter(f => f !== foundClean);

    // 1. Add Real Lookalikes (Advanced Difficulty)
    const lookalikes = findLookalikeWords(swe, 3);
    wrong = [...wrong, ...lookalikes];

    // 2. Add Typos/Fakes if still needed
    if (wrong.length < 3) {
        const smartFakes = generateSmartDistractors(correctOption);
        const base = swe.toLowerCase();
        const suffixes = ['er', 'ar', 'en', 'et', 'na', 's', 'de', 't'];
        const fakes = suffixes.map(s => base + s).filter(f => f !== foundClean && !formsList.includes(f));
        wrong = [...wrong, ...smartFakes, ...fakes];
    }

    wrong = [...new Set(wrong)];
    wrong = shuffleArray(wrong).slice(0, 3);

    const options = shuffleArray([correctOption, ...wrong]);
    const correctIndex = options.indexOf(correctOption);

    return {
        type: 'context',
        icon: '✍️',
        category: 'Kontext & Grammatik / السياق والقواعد',
        questionText: 'Fyll i luckan med rätt form / اختر الشكل الصحيح',
        word: blankedSentence,
        options: options,
        correctIndex: correctIndex,
        correctAnswer: correctOption,
        playAudio: false
    };
}



// ========================================
// Render Conjugation Table
// ========================================
function renderConjugationTable(forms, type) {
    if (!forms || forms.length === 0) return '';

    const parsedForms = getLabeledForms(forms.split(',').map(f => f.trim()).filter(f => f), type);
    const isVerb = type.toLowerCase().includes('verb');
    const isNoun = type.toLowerCase().includes('subst') || type.toLowerCase().includes('noun');

    if (!isVerb && !isNoun) {
        // Fallback for other types (Adjectives etc) -> Chips
        return `
            <div class="forms-chips-container">
                ${parsedForms.map(f => `
                    <div class="form-chip">
                        <span class="form-word">${f.word}</span>
                        ${f.label ? `<span class="form-label">${f.label}</span>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Grid Layout for Verbs and Nouns
    let headers = [];
    let items = [];

    if (isVerb) {
        // Standard Swedish Verb order: Imperativ? (not in data), Indefinite? 
        // Data usually: Presens, Preteritum, Supinum, Infinitiv
        // Let's try to map the parsed forms to specific slots if possible, otherwise list them

        // We want 4 columns if possible: Infinitiv, Presens, Preteritum, Supinum
        // The parser returns standard labels.

        // Let's rely on the parser's labels to sort them into a nice grid
        // Order: Infinitiv -> Presens -> Preteritum -> Supinum
        const order = ['Infinitiv', 'Presens', 'Preteritum', 'Supinum'];

        // Sort items based on order
        items = parsedForms.sort((a, b) => {
            const labelA = a.label ? a.label.split('/')[0].trim() : '';
            const labelB = b.label ? b.label.split('/')[0].trim() : '';
            return order.indexOf(labelA) - order.indexOf(labelB);
        });

    } else if (isNoun) {
        // Noun Table: Singular (Obest/Best), Plural (Obest/Best)
        // Order: Obestämd, Bestämd, Plural obestämd, Plural bestämd
        items = parsedForms;
    }

    return `
        <div class="conjugation-table-container">
            <div class="conjugation-grid ${isVerb ? 'verb-grid' : 'noun-grid'}">
                ${items.map((item, index) => `
                    <div class="conjugation-cell">
                        <div class="cell-label">${item.label ? item.label.split('/')[0] : '&nbsp;'}</div>
                        <div class="cell-value" onclick="speakWord('${item.word}')">
                            ${item.word}
                            <svg class="cell-audio-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                        </div>
                        <div class="cell-label-ar">${item.label ? (item.label.split('/')[1] || '') : ''}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}


// ========================================
// Detect Noun Gender (En/Ett) from Forms
// DISABLED: Now using pre-populated COL_GENDER column
// Kept for future use if needed
// ========================================
/*
function detectNounGender(forms) {
    if (!forms || forms.trim() === '') return null;
 
    // Split and clean forms
    const formsArray = forms.split(',').map(f => f.trim()).filter(f => f);
    if (formsArray.length < 2) return null;
 
    const baseWord = formsArray[0].toLowerCase();
 
    // Scan all forms to find the definite singular
    // We look for forms that start with the base word and end in specific suffixes
    for (const form of formsArray) {
        const lower = form.toLowerCase();
 
        // Skip the base word itself and any compound words that are just longer variations at the start
        // We want a form that is baseWord + suffix
        if (lower === baseWord) continue;
 
        // Check for Ett-word patterns (strongest signals first)
        // 1. Ends in 'et' (huset, kärlet) - most common ett-signal
        if (lower.endsWith('et') && !lower.endsWith('het')) {
            // 'het' is usually en-word (svårighet -> svårigheten), but check if it matches base + et
            if (lower === baseWord + 'et' || lower === baseWord + 't') {
                return 'ett';
            }
            // If the form is just ...et without matching base length, be careful, but high likely ett
            if (lower.length > baseWord.length && (lower.endsWith('et') || lower.endsWith('t'))) {
                // Double check it's not a plural like "äpplen" (ends in n) -> wait, we check 'et' here.
                // If it ends in 'et', it's almost certainly definite singular neutrum
                return 'ett';
            }
        }
 
        // 2. Ends in 't' (bordet -> bordet?, no, bord -> bordet). 
        // Some words end in vowel + t (äpple -> äpplet)
        if (lower.endsWith('t') && lower.length === baseWord.length + 1) {
            return 'ett';
        }
    }
 
    // If no 'ett' pattern found, scan for 'en' patterns
    for (const form of formsArray) {
        const lower = form.toLowerCase();
        if (lower === baseWord) continue;
 
        // En-word patterns
        if (lower.endsWith('en') || lower.endsWith('an') || lower.endsWith('n')) {
            // Check if it's likely definite form
            if (lower.length >= baseWord.length) {
                return 'en';
            }
        }
    }
 
    // Fallback: Check specific forms by index if scanning failed (standard clean data)
    // But since we had "Kärl, ..., kärlet", the scan above should catch it.
 
    // Default to en if uncertain but we have forms? 
    // Better to return null if we really can't tell, but 'en' is safe 75% bet.
    return 'en';
}
*/


// ========================================
// Detect Verb Group (1-4) from Forms
// ========================================
function detectVerbGroup(forms) {
    if (!forms || forms.trim() === '') return null;

    const formsArray = forms.split(',').map(f => f.trim()).filter(f => f);
    if (formsArray.length < 1) return null;

    // Find Presens form (usually ends in -ar, -er, -r)
    // In our data, presens is often the first form for verbs
    // Standard order: presens, preteritum, supinum, infinitiv

    let presens = formsArray[0];
    let preteritum = formsArray[1];
    let supinum = formsArray[2];

    if (!presens) return null;

    // Group 1: Presens ends in -ar (talar, jobbar)
    if (presens.endsWith('ar')) {
        return 'Gr. 1';
    }

    // Group 2: Presens ends in -er (stänger, läser, ringer)
    if (presens.endsWith('er')) {
        // Group 2a: Preteritum ends in -de (ringde)
        // Group 2b: Preteritum ends in -te (köpte, läste)
        // Distinguishing 2a/2b is nice but just "Gr. 2" is often enough.
        // Let's try to be precise if we have preteritum
        if (preteritum) {
            if (preteritum.endsWith('te')) return 'Gr. 2b';
            if (preteritum.endsWith('de')) return 'Gr. 2a';
        }
        return 'Gr. 2';
    }

    // Group 3: Short verbs, Presens ends in -r (bor, syr, ror)
    // Often monosyllabic base (bo, sy, ro)
    if (presens.endsWith('r') && !presens.endsWith('ar') && !presens.endsWith('er')) {
        return 'Gr. 3';
    }

    // Group 4: Strong verbs (irregular vowel change) - dricker, skriver
    // Presens often ends in -er (but not always weak conjugation)
    // Preteritum is key: strong verbs change vowel and NO ending (drack, skrev)
    if (preteritum && !preteritum.endsWith('de') && !preteritum.endsWith('te') && !preteritum.endsWith('ade')) {
        return 'Gr. 4'; // Strong verb
    }

    return null;
}

function parseVerbForms(formsArray) {
    // Swedish verb pattern: presens, (optional nouns), preteritum (-de/-te/-dde), supinum (-t/-tt/-it), infinitiv (-a)
    const result = [];
    let foundPresens = false;
    let foundPreteritum = false;
    let foundSupinum = false;
    let foundInfinitiv = false;

    for (const form of formsArray) {
        const word = form.trim();

        // Skip compound nouns (words with capitalized starts that aren't the first)
        if (word.match(/^[A-ZÅÄÖ][a-zåäö]+$/) && result.length > 0) {
            result.push({ word, label: null });
            continue;
        }

        // Infinitiv ends with -a (and usually last in list)
        if (!foundInfinitiv && word.endsWith('a') && !word.endsWith('ade')) {
            // Check if this could be infinitiv (usually at the end)
            const remaining = formsArray.slice(formsArray.indexOf(form) + 1);
            if (remaining.length === 0 || !remaining.some(f => f.endsWith('a') && !f.endsWith('ade'))) {
                result.push({ word, label: 'Infinitiv / مصدر' });
                foundInfinitiv = true;
                continue;
            }
        }

        // Supinum ends with -t, -tt, -it
        if (!foundSupinum && (word.endsWith('at') || word.endsWith('t') || word.endsWith('it') || word.endsWith('tt'))) {
            if (!word.endsWith('het') && !word.endsWith('ighet')) { // Exclude nouns
                result.push({ word, label: 'Supinum / التصريف الثالث' });
                foundSupinum = true;
                continue;
            }
        }

        // Preteritum ends with -de, -te, -dde
        if (!foundPreteritum && (word.endsWith('ade') || word.endsWith('de') || word.endsWith('te') || word.endsWith('dde'))) {
            result.push({ word, label: 'Preteritum / الماضي' });
            foundPreteritum = true;
            continue;
        }

        // Presens ends with -ar, -er, -r (first verb form usually)
        if (!foundPresens && (word.endsWith('ar') || word.endsWith('er') || word.endsWith('r'))) {
            result.push({ word, label: 'Presens / المضارع' });
            foundPresens = true;
            continue;
        }

        // Other forms without label
        result.push({ word, label: null });
    }

    return result;
}

function parseNounForms(formsArray) {
    // Swedish noun declension: obestämd singular, bestämd singular, obestämd plural, bestämd plural
    const labels = [
        'Obestämd / نكرة',           // en bok
        'Bestämd / معرفة',            // boken
        'Plural obestämd / جمع نكرة', // böcker
        'Plural bestämd / جمع معرفة'  // böckerna
    ];

    return formsArray.map((word, i) => ({
        word,
        label: i < labels.length ? labels[i] : null
    }));
}

function parseAdjectiveForms(formsArray) {
    // Common pattern: utrum, neutrum, plural/definite
    const labels = ['Utrum', 'Neutrum', 'Plural/Bestämd'];

    return formsArray.map((word, i) => ({
        word,
        label: i < labels.length ? labels[i] : null
    }));
}

// Initialize
async function init() {
    // Show skeleton loading first
    showSkeletonLoading();

    // Theme Logic handled by utils.js (ThemeManager.init called on DOMContentLoaded)

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            ThemeManager.toggle();
        });
    }

    // Check saved mobile view preference from main app
    if (localStorage.getItem('mobileView') === 'true') {
        document.body.classList.add('iphone-view');
    }

    // Wire up header buttons
    const smartCopyBtn = document.getElementById('smartCopyBtn');
    const headerShareBtn = document.getElementById('headerShareBtn');

    if (smartCopyBtn) {
        smartCopyBtn.addEventListener('click', handleSmartCopy);
    }

    // Load Data
    try {
        // Data is loaded via data.js as a global variable 'dictionaryData'
        if (typeof dictionaryData === 'undefined') {
            throw new Error('Data file not loaded');
        }

        // Get ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id) {
            let item = dictionaryData.find(entry => entry[COL_ID] === id);

            // If not found in main dictionary, check custom words
            if (!item) {
                const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
                item = customWords.find(entry => entry[COL_ID] === id);
            }
            if (item) {
                currentItem = item; // Store for smart copy
                renderDetails(item);
                checkCustomWord(id);
                setupShare(item, headerShareBtn);
                setupFlashcardMode();

                // Track word view in ProgressManager
                if (typeof ProgressManager !== 'undefined') {
                    ProgressManager.trackWordView(id, item[COL_SWE]);
                }

                // تحديث تقدم الصفحة الرئيسية والتحدي اليومي
                if (typeof window.incrementDailyProgress === 'function') {
                    window.incrementDailyProgress();
                } else {
                    // Fallback: تحديث مباشر في localStorage
                    const today = new Date().toDateString();
                    const progressData = JSON.parse(localStorage.getItem('homepageProgress') || '{}');
                    if (progressData.date !== today) {
                        progressData.date = today;
                        progressData.count = 0;
                    }
                    progressData.count = (progressData.count || 0) + 1;
                    localStorage.setItem('homepageProgress', JSON.stringify(progressData));

                    // تحديث التحدي اليومي أيضاً
                    let challengeData = JSON.parse(localStorage.getItem('dailyChallenge') || '{}');
                    if (challengeData.date === today && !challengeData.completed && !challengeData.claimed) {
                        if (challengeData.type === 'words') {
                            challengeData.current = progressData.count;
                            if (challengeData.current >= challengeData.target) {
                                challengeData.completed = true;
                            }
                            localStorage.setItem('dailyChallenge', JSON.stringify(challengeData));
                        }
                    }
                }
            } else {
                detailsArea.innerHTML = '<div class="placeholder-message">Ord hittades inte / لم يتم العثور على الكلمة</div>';
            }
        } else {
            detailsArea.innerHTML = '<div class="placeholder-message">Inget ID angivet / لم يتم تحديد معرف</div>';
        }

    } catch (error) {
        console.error('Initial Load Error:', error);

        // Debug info
        const dataStatus = typeof dictionaryData === 'undefined' ? 'undefined' : 'loaded (' + dictionaryData.length + ')';
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        detailsArea.innerHTML = `
            <div class="placeholder-message" style="color: #ef4444; flex-direction: column; gap: 1rem;">
                <div style="font-size: 1.2rem; font-weight: bold;">Fel vid laddning / خطأ في التحميل</div>
                <div style="font-size: 0.9rem; opacity: 0.8; font-family: monospace; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: 8px;">
                    ${error.message}<br>
                    Data Status: ${dataStatus}<br>
                    ID: ${id}
                </div>
                <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Försök igen / حاول مرة أخرى
                </button>
            </div>
        `;
    }
}

function renderDetails(item) {
    // Helper to safely get values
    const swe = item[COL_SWE] || '';
    const arb = item[COL_ARB] || '';
    const rawType = item[COL_TYPE] || ''; // Keep original with dot for filtering
    const type = rawType ? rawType.replace('.', '') : ''; // Display without dot
    const sweDef = item[COL_SWE_DEF] || '';
    const arbDef = item[COL_ARB_DEF] || '';
    const rawForms = item[COL_FORMS] || '';
    const exSwe = item[COL_EX_SWE] || '';
    const exArb = item[COL_EX_ARB] || '';
    const idiomSwe = item[COL_IDIOM_SWE] || '';
    const idiomArb = item[COL_IDIOM_ARB] || '';
    // Main grammatical categories that have proper forms/conjugations
    const GRAMMATICAL_CATEGORIES = [
        'substantiv', 'verb', 'adjektiv', 'adverb',
        'pronomen', 'preposition', 'konjunktion',
        'interjektion', 'räkning', 'räkneord'
    ];

    // Check if this is a main grammatical category
    const typeLower = type.toLowerCase();
    const isGrammaticalCategory = GRAMMATICAL_CATEGORIES.some(cat => typeLower.includes(cat));

    // For grammatical categories: field 6 contains forms
    // For specialized categories: field 6 may contain Swedish definition, validate before use
    let forms = '';
    let effectiveSweDef = sweDef;

    if (isGrammaticalCategory) {
        // Main categories - field 6 is forms
        forms = rawForms;
    } else {
        // Specialized categories - check if field 6 is definition or forms
        // Forms: contain commas, no colon, doesn't end with period
        const looksLikeForms = rawForms &&
            rawForms.includes(',') &&
            !rawForms.includes(':') &&
            !rawForms.endsWith('.');

        if (looksLikeForms) {
            forms = rawForms;
        } else if (rawForms) {
            // It's a Swedish definition, use it
            effectiveSweDef = effectiveSweDef || rawForms;
        }
    }

    // --- FIX: SPLIT MIXED DEFINITIONS ---
    // Some specialized words (like Bygg terms) have mixed content in the Swedish field
    // Example: "term | translation"
    if (effectiveSweDef && effectiveSweDef.includes('|') && !arbDef) {
        const parts = effectiveSweDef.split('|').map(s => s.trim());
        if (parts.length === 2) {
            // Assume Part 1 is Arb/Trans and Part 2 is Swe/Desc, OR vice versa based on detection
            // In the user's screenshot: "en av två... | نصف..."
            // Often format is: "Swedish Term | Arabic Translation" OR "Context | Translation"

            // Heuristic: Check for Arabic chars
            const hasArabicPart1 = /[\u0600-\u06FF]/.test(parts[0]);
            const hasArabicPart2 = /[\u0600-\u06FF]/.test(parts[1]);

            if (hasArabicPart1 && !hasArabicPart2) {
                arbDef = parts[0];
                effectiveSweDef = parts[1];
            } else if (!hasArabicPart1 && hasArabicPart2) {
                effectiveSweDef = parts[0];
                arbDef = parts[1];
            } else {
                // Both or neither have Arabic, just split them for display cleanly?
                // For now, keep as is but replace pipe with break if needed, 
                // but cleaner to assign to fields if we can guess.
                // Fallback: Assign to Swe and Arb blindly? No, risky.
                // Let's just trust the pipe separation for visual distinction
            }
        }
    }


    // Check if word is in favorites (moved up for header buttons)
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(item[COL_ID]);

    // Detect verb group for verbs (moved up for heroHtml)
    const isVerb = type.toLowerCase().includes('verb');
    const verbGroup = isVerb ? detectVerbGroup(forms) : null;

    // Detect noun gender for substantiv - now using pre-populated column
    const isNoun = type.toLowerCase().includes('subst');
    // Use COL_GENDER if available, fallback to detection (disabled, see detectNounGender below)
    const nounGender = isNoun ? (item[COL_GENDER] || null) : null;

    // Dynamic Font Size using TextSizeManager (from utils.js)
    // Returns CSS font-size value based on text length for details page
    const getDynamicFontSize = (text) => {
        const len = text.length;
        // Details page uses larger base sizes
        if (len <= 6) return '3.5rem';
        if (len <= 10) return '2.8rem';
        if (len <= 15) return '2.3rem';
        if (len <= 20) return '1.9rem';
        if (len <= 30) return '1.5rem';
        return '1.2rem';
    };

    // Arabic text size (slightly smaller due to character density)
    const getArabicFontSize = (text) => {
        const len = text.length;
        if (len <= 8) return '2.5rem';
        if (len <= 15) return '2rem';
        if (len <= 25) return '1.6rem';
        if (len <= 40) return '1.3rem';
        return '1.1rem';
    };



    // Initialize Header Buttons
    const headerAudioBtn = document.getElementById('headerAudioBtn');
    const headerFavoriteBtn = document.getElementById('headerFavoriteBtn');

    // Update Header Audio Button
    if (headerAudioBtn) {
        headerAudioBtn.style.display = 'flex';
        headerAudioBtn.onclick = () => speakWord(swe.replace(/'/g, "\\'"));
    }

    // Update Header Favorite Button
    if (headerFavoriteBtn) {
        headerFavoriteBtn.style.display = 'flex';
        const svg = headerFavoriteBtn.querySelector('svg');
        const isActive = isFavorite;

        // Initial State
        if (isActive) {
            headerFavoriteBtn.classList.add('active');
            if (svg) svg.setAttribute('fill', 'currentColor');
            // Change icon to filled heart 
            headerFavoriteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        } else {
            headerFavoriteBtn.classList.remove('active');
            if (svg) svg.setAttribute('fill', 'none');
            headerFavoriteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
        }

        headerFavoriteBtn.onclick = () => {
            toggleFavorite(item[COL_ID]);
            // Re-check state after toggle (toggleFavorite updates localStorage)
            const newFavs = JSON.parse(localStorage.getItem('favorites') || '[]');
            const nowActive = newFavs.includes(item[COL_ID]);
            if (nowActive) {
                headerFavoriteBtn.classList.add('active');
                headerFavoriteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            } else {
                headerFavoriteBtn.classList.remove('active');
                headerFavoriteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
            }
        };
    }

    // Generate unique visual fingerprint
    const heroBackground = generateWordPattern(swe);
    const typeColorClass = getWordTypeColorClass(type);

    // Hero Section - Show original type (Substantiv, Verb, etc.) with dynamic background
    const heroHtml = `
        <div class="details-hero ${typeColorClass}" style="background: ${heroBackground};">
            <div class="details-hero-content">
                <div class="word-display-main">
                    <div class="word-with-audio">
                        <h1 class="word-swe-hero" style="font-size: ${getDynamicFontSize(swe)}">${swe}</h1>
                    </div>
                    ${arb ? `<div class="word-arb-hero" style="font-size: ${getArabicFontSize(arb)}">${arb}</div>` : ''}
                    ${type ? `
                    <div class="word-type-row" style="justify-content: center;">
                        <span class="word-type-badge clickable" onclick="navigateToTypeFilter('${rawType}')" title="اضغط لرؤية جميع الكلمات من هذا النوع">${type}</span>
                    </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;


    // Personal Notes Section
    const userNote = NotesManager.getNote(item[COL_ID]);
    const notesHtml = `
        <div class="details-section notes-section">
            <h2 class="section-title">
                <span class="section-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </span>
                Mina anteckningar / ملاحظاتي
            </h2>
            <div class="notes-container">
                <textarea id="wordNoteInput" class="notes-input" placeholder="Skriv en anteckning här... / اكتب ملاحظة هنا...">${userNote}</textarea>
                <button id="saveNoteBtn" class="notes-save-btn" onclick="saveCurrentNote('${item[COL_ID]}')">
                    Spara / حفظ
                </button>
            </div>
        </div>
    `;

    // Definitions Section
    let definitionsHtml = '';
    if (effectiveSweDef || arbDef) {
        definitionsHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">${getSVGIcon('book')}</span>
                    Definition / تعريف
                </h2>
                <div class="def-content">
                    <div class="def-item">
                        ${effectiveSweDef ? `<div class="def-swe-detail">${linkifyText(effectiveSweDef)}</div>` : ''}
                        ${arbDef ? `<div class="def-arb-detail">${arbDef}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }


    // Forms Section
    let formsHtml = '';
    if (forms) {
        // Use new Table Renderer
        const tableHtml = renderConjugationTable(forms, type);

        formsHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">${getSVGIcon('text')}</span>
                    Böjningar / التصريفات
                </h2>
                ${tableHtml}
            </div>
        `;
    }

    // Examples Section
    let examplesHtml = '';
    if (exSwe || exArb) {
        examplesHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">${getSVGIcon('lightbulb')}</span>
                    Exempel / أمثلة
                </h2>
                <div class="example-card">
                    ${exSwe ? `<div class="ex-swe-detail">${exSwe}</div>` : ''}
                    ${exArb ? `<div class="ex-arb-detail">${exArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Idioms Section
    let idiomsHtml = '';
    if (idiomSwe || idiomArb) {
        idiomsHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">${getSVGIcon('message')}</span>
                    Uttryck / تعبير
                </h2>
                <div class="example-card">
                    ${idiomSwe ? `<div class="ex-swe-detail">${idiomSwe}</div>` : ''}
                    ${idiomArb ? `<div class="ex-arb-detail">${idiomArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Check for missing data and show quality indicator
    const missingData = [];
    if (!forms && (isNoun || type.toLowerCase().includes('verb'))) {
        missingData.push('تصريفات / Böjningar');
    }
    if (!exSwe && !exArb) {
        missingData.push('أمثلة / Exempel');
    }
    if (!sweDef && !arbDef) {
        missingData.push('تعريف / Definition');
    }

    let dataQualityHtml = '';
    if (missingData.length > 0) {
        dataQualityHtml = `
            <div class="data-quality-notice">
                <div class="notice-icon">ℹ️</div>
                <div class="notice-content">
                    <strong>Saknas / معلومات ناقصة:</strong>
                    <span>${missingData.join(' • ')}</span>
                </div>
            </div>
        `;
    }

    // Related Words Section
    let relatedWordsHtml = '';
    if (typeof dictionaryData !== 'undefined' && swe) {
        const firstLetter = swe.charAt(0).toLowerCase();
        const currentId = item[COL_ID];
        const relatedWords = dictionaryData
            .filter(w => w[COL_SWE] &&
                w[COL_SWE].charAt(0).toLowerCase() === firstLetter &&
                w[COL_ID] !== currentId &&
                w[COL_TYPE] === rawType)
            .slice(0, 5);

        if (relatedWords.length > 0) {
            relatedWordsHtml = `
                <div class="details-section related-section">
                    <h2 class="section-title">
                        <span class="section-icon">🔗</span>
                        Relaterade ord / كلمات مشابهة
                    </h2>
                    <div class="related-words-grid">
                        ${relatedWords.map(w => `
                            <a href="details.html?id=${w[COL_ID]}" class="related-word-chip">
                                <span class="related-swe">${w[COL_SWE]}</span>
                                <span class="related-arb">${w[COL_ARB] || ''}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    // Quick Quiz Section
    let quizHtml = '';
    if (arb) {
        // Generate 3 wrong answers from dictionary
        let wrongAnswers = [];
        if (typeof dictionaryData !== 'undefined') {
            const filteredData = dictionaryData.filter(w =>
                w[COL_ARB] &&
                w[COL_ID] !== item[COL_ID] &&
                w[COL_ARB] !== arb
            );
            for (let i = 0; i < 3 && filteredData.length > 0; i++) {
                const idx = Math.floor(Math.random() * filteredData.length);
                wrongAnswers.push(filteredData.splice(idx, 1)[0][COL_ARB]);
            }
        }

        if (wrongAnswers.length >= 3) {
            const allOptions = [arb, ...wrongAnswers].sort(() => Math.random() - 0.5);
            quizHtml = `
                <div class="details-section quiz-section">
                    <h2 class="section-title">
                        <span class="section-icon">🧠</span>
                        Snabbtest / اختبار سريع
                    </h2>
                    <div class="mini-quiz" id="miniQuiz">
                        <p class="quiz-question">Vad betyder <strong>${swe}</strong>?</p>
                        <div class="quiz-options-mini">
                            ${allOptions.map(opt => `
                                <button class="quiz-option-mini" data-correct="${opt === arb}" onclick="checkMiniQuiz(this, '${opt === arb}')">
                                    ${opt}
                                </button>
                            `).join('')}
                        </div>
                        <div class="quiz-result" id="quizResult" style="display: none;"></div>
                    </div>
                </div>
            `;
        }
    }

    const html = `
        ${heroHtml}
        ${definitionsHtml}
        ${formsHtml}
        ${notesHtml}
        ${examplesHtml}
        ${idiomsHtml}
        ${relatedWordsHtml}
        ${quizHtml}
        ${dataQualityHtml}
        
        <!-- Practice FAB -->
        <button id="practiceFab" class="practice-fab" onclick="startPracticeMode('${item[COL_ID]}')" aria-label="Öva / تدرب">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            <span class="fab-label">Öva</span>
        </button>
    `;

    detailsArea.innerHTML = html;
}

function checkCustomWord(id) {
    const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
    const isCustom = customWords.some(word => word[COL_ID] === id);

    if (isCustom) {
        customActions.style.display = 'flex';

        // Setup Edit
        editBtn.onclick = () => {
            window.location.href = `add.html?edit=${id}`;
        };

        // Setup Delete
        deleteBtn.onclick = () => {
            if (confirm('Är du säker på att du vill ta bort detta ord? / هل أنت متأكد أنك تريد حذف هذه الكلمة؟')) {
                const newCustomWords = customWords.filter(word => word[COL_ID] !== id);
                localStorage.setItem('customWords', JSON.stringify(newCustomWords));
                window.location.href = 'index.html?status=deleted';
            }
        };
    }
}

function setupShare(item, headerShareBtn) {
    // Use header share button if provided, otherwise fallback to old shareBtn
    const shareButton = headerShareBtn || shareBtn;
    if (shareButton) {
        shareButton.style.display = 'flex';
    }

    const handleShare = async () => {
        // Extract Data
        const id = item[COL_ID];
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

        // Use the specific app URL provided by user
        const shareUrl = 'https://aiaps.xyz/';


        // Build Message
        let text = `${swe} ${type ? `(${type})` : ''}\n`;
        text += `${arb}\n\n`;

        if (sweDef || arbDef) {
            text += `📖 Definition / تعريف:\n`;
            if (sweDef) text += `${sweDef}\n`;
            if (arbDef) text += `${arbDef}\n`;
            text += `\n`;
        }

        if (exSwe || exArb) {
            text += `💡 Exempel / أمثلة:\n`;
            if (exSwe) text += `${exSwe}\n`;
            if (exArb) text += `${exArb}\n`;
            text += `\n`;
        }

        if (idiomSwe || idiomArb) {
            text += `💬 Uttryck / تعبير:\n`;
            if (idiomSwe) text += `${idiomSwe}\n`;
            if (idiomArb) text += `${idiomArb}\n`;
            text += `\n`;
        }

        if (forms) {
            text += `🔤 Former / تصريفات:\n${forms}\n\n`;
        }

        // Footer
        const now = new Date();
        const dateStr = now.toLocaleDateString('sv-SE');
        const timeStr = now.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });

        text += `-------------------\n`;
        text += `📅 ${dateStr} ${timeStr}\n`;
        text += `📱 Snabba Lexin\n`;
        text += `👋 Med vänliga hälsningar / مع تحيات\n`;
        text += `🔗 ${shareUrl}`;

        const shareData = {
            title: `Snabba Lexin: ${swe}`,
            text: text
            // url: shareUrl // Removed to force text sharing on iOS/Android
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(text);
                showToast('Text kopierad till urklipp / تم نسخ النص');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    if (headerShareBtn) {
        headerShareBtn.addEventListener('click', handleShare);
    }
    if (shareBtn) {
        shareBtn.onclick = handleShare;
    }
}

function setupFlashcardMode() {
    const headerFlashcardBtn = document.getElementById('headerFlashcardBtn');

    // Toggle function that syncs both buttons
    const toggleFlashcard = () => {
        document.body.classList.toggle('flashcard-active');
        const isActive = document.body.classList.contains('flashcard-active');

        // Sync both buttons' active states
        if (flashcardBtn) flashcardBtn.classList.toggle('active', isActive);
        if (headerFlashcardBtn) headerFlashcardBtn.classList.toggle('active', isActive);

        // Show toast
        showToast(isActive ? 'Flashcard-läge: PÅ / وضع الاختبار: مفعل' : 'Flashcard-läge: AV / وضع الاختبار: معطل');
    };

    // Wire up both buttons
    if (flashcardBtn) {
        flashcardBtn.onclick = toggleFlashcard;
    }
    if (headerFlashcardBtn) {
        headerFlashcardBtn.onclick = toggleFlashcard;
    }

    // Event Delegation for revealing items
    detailsArea.addEventListener('click', (e) => {
        if (!document.body.classList.contains('flashcard-active')) return;

        const target = e.target;
        if (target.classList.contains('word-arb-hero') ||
            target.classList.contains('def-arb-detail') ||
            target.classList.contains('ex-arb-detail')) {

            target.classList.toggle('revealed');
        }
    });
}

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

// Check for Toast Notification
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('status') === 'saved') {
    showToast('Ordet har sparats! / تم حفظ الكلمة!');
    // Clean URL
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?id=' + urlParams.get('id');
    window.history.replaceState({ path: newUrl }, '', newUrl);
}

// Navigate to Type Filter - Redirect to main page with type filter
// ========================================
function navigateToTypeFilter(type) {
    // Pass the original type directly to main page
    // The main page will handle matching with dropdown options
    const filterValue = type.toLowerCase().replace('.', '');

    // Navigate to main page with filter parameter
    window.location.href = `index.html?filterType=${encodeURIComponent(filterValue)}`;
}

// ========================================
// Mini Quiz Checker
// ========================================
function checkMiniQuiz(button, isCorrect) {
    const miniQuiz = document.getElementById('miniQuiz');
    if (!miniQuiz) return;

    // Disable all buttons
    const allBtns = miniQuiz.querySelectorAll('.quiz-option-mini');
    allBtns.forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        } else if (btn === button && isCorrect === 'false') {
            btn.classList.add('wrong');
        }
    });

    // Show result
    const result = document.getElementById('quizResult');
    if (result) {
        if (isCorrect === 'true') {
            result.innerHTML = '<span style="color: #22c55e;">✅ Rätt! / صحيح!</span>';
            // Track XP
            const stats = JSON.parse(localStorage.getItem('learningStats') || '{}');
            stats.totalXP = (stats.totalXP || 0) + 5;
            localStorage.setItem('learningStats', JSON.stringify(stats));
        } else {
            result.innerHTML = '<span style="color: #ef4444;">❌ Fel! / خطأ - حاول مرة أخرى</span>';
        }
        result.style.display = 'block';
    }
}

init();


function generateTypingQuestion(item) {
    const swe = item[COL_SWE];
    const arb = item[COL_ARB];
    if (!swe || swe.length < 3) return null;

    // Scramble letters for hint
    const scrambled = shuffleArray(swe.split('')).join('  ');

    return {
        type: 'typing',
        inputType: 'text',
        icon: '⌨️',
        category: 'Stavning / الكتابة',
        questionText: 'Skriv ordet på svenska / اكتب الكلمة بالسويدية',
        word: arb,
        correctAnswer: swe,
        placeholder: `Ordet har ${swe.length} bokstäver`,
        scrambled: scrambled,
        playAudio: false
    };
}

function generateSmartDistractors(word) {
    const typos = [];
    if (word.length < 3) return typos;
    const chars = word.split('');
    const len = chars.length;

    // 1. Swap adjacent letters (common typo)
    if (len > 2) {
        const c = [...chars];
        // Try to find a good swap (not first letter if possible)
        let idx = Math.floor(Math.random() * (len - 1));
        if (idx === 0) idx = 1; // Keep first letter correct to fool user
        [c[idx], c[idx + 1]] = [c[idx + 1], c[idx]];
        typos.push(c.join(''));
    }

    // 2. Double letter confusion (very common in Swedish)
    const doubles = word.match(/(.)\1/);
    if (doubles) {
        // Remove one (mellan -> melan)
        typos.push(word.replace(doubles[0], doubles[1]));
    } else {
        // Add double (spela -> spella) if consonant
        const candidates = [];
        for (let i = 1; i < len - 1; i++) {
            if (/[bdfglmnprst]/.test(chars[i])) candidates.push(i);
        }
        if (candidates.length > 0) {
            const idx = candidates[Math.floor(Math.random() * candidates.length)];
            const c = [...chars];
            c.splice(idx, 0, c[idx]);
            typos.push(c.join(''));
        }
    }

    // 3. Vowel confusion (phonetic)
    const vowels = { 'e': 'ä', 'ä': 'e', 'o': 'å', 'å': 'o', 'ö': 'o', 'i': 'e', 'ck': 'k', 'k': 'ck' };

    // Try to replace a random vowel or ck
    for (let k = 0; k < 3; k++) { // Try multiple times
        const i = Math.floor(Math.random() * len);
        const char = word[i].toLowerCase();
        if (vowels[char]) {
            typos.push(word.substring(0, i) + vowels[char] + word.substring(i + 1));
        } else if (char === 'c' && word[i + 1] === 'k') { // ck
            typos.push(word.substring(0, i) + 'k' + word.substring(i + 2)); // ck -> k
        }
    }

    return [...new Set(typos)];
}

/* ========================================
   Advanced Distractors - Levenshtein 
   ======================================== */
function findLookalikeWords(targetWord, count = 3) {
    if (typeof dictionaryData === 'undefined') return [];

    const target = targetWord.toLowerCase();
    const targetLen = target.length;
    const candidates = [];
    const startChar = target[0];

    // Optimization: Only scan words starting with same letter
    // and similar length (+/- 2)

    // We assume dictionaryData is present
    for (const item of dictionaryData) {
        const w = (item[COL_SWE] || '').toLowerCase();
        if (!w || w === target || w.length < 2) continue;
        if (w[0] !== startChar) continue;
        if (Math.abs(w.length - targetLen) > 2) continue;

        candidates.push({ w: item[COL_SWE], score: 0 }); // Store original case

        // Limit candidates to avoid heavy Levenshtein?
        if (candidates.length > 500) break;
    }

    // Score
    candidates.forEach(c => {
        c.score = levenshteinDistance(target, c.w.toLowerCase());
    });

    // Sort
    candidates.sort((a, b) => a.score - b.score);

    // Take Top N unique
    const result = [];
    const seen = new Set();
    for (const c of candidates) {
        if (seen.has(c.w.toLowerCase())) continue;
        seen.add(c.w.toLowerCase());
        result.push(c.w);
        if (result.length >= count) break;
    }
    return result;
}

function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1  // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
}
