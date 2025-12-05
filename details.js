
// State
// dictionaryData is global from data.js

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
const COL_SWE_DEF = 5;
const COL_FORMS = 6;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// ========================================
// Text-to-Speech for Swedish Pronunciation
// ========================================
function speakWord(text, lang = 'sv-SE') {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.85; // Slower for learners
        utterance.pitch = 1;

        // Try to find Swedish voice
        const voices = speechSynthesis.getVoices();
        const swedishVoice = voices.find(v => v.lang.startsWith('sv'));
        if (swedishVoice) {
            utterance.voice = swedishVoice;
        }

        speechSynthesis.speak(utterance);
    } else {
        showToast('Ljuduppspelning stöds inte / التشغيل الصوتي غير مدعوم');
    }
}

// Load voices when available
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
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
    const labels = [
        'Obestämd sing. / مفرد نكرة',
        'Bestämd sing. / مفرد معرفة',
        'Obestämd pl. / جمع نكرة',
        'Bestämd pl. / جمع معرفة'
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
    // Theme is now managed globally from index.html via localStorage
    // No need for local theme toggle

    // Check saved mobile view preference from main app
    if (localStorage.getItem('mobileView') === 'true') {
        document.body.classList.add('iphone-view');
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
                renderDetails(item);
                checkCustomWord(id);
                setupShare(item);
                setupFlashcardMode();
            } else {
                detailsArea.innerHTML = '<div class="placeholder-message">Ord hittades inte / لم يتم العثور على الكلمة</div>';
            }
        } else {
            detailsArea.innerHTML = '<div class="placeholder-message">Inget ID angivet / لم يتم تحديد معرف</div>';
        }

    } catch (error) {
        console.error(error);
        detailsArea.innerHTML = '<div class="placeholder-message" style="color: red;">Fel vid laddning / خطأ في التحميل</div>';
    }
}

function renderDetails(item) {
    // Helper to safely get values
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

    // Hero Section with Audio Button
    const heroHtml = `
        <div class="details-hero">
            <div class="details-hero-content">
                <div class="word-display-main">
                    <h1 class="word-swe-hero">${swe}</h1>
                    <button class="audio-btn" onclick="speakWord('${swe.replace(/'/g, "\\'")}')" aria-label="Lyssna / استمع">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                    </button>
                    ${arb ? `<div class="word-arb-hero">${arb}</div>` : ''}
                    ${type ? `<span class="word-type-badge">${type}</span>` : ''}
                </div>
            </div>
        </div>
    `;

    // Definitions Section
    let definitionsHtml = '';
    if (sweDef || arbDef) {
        definitionsHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">📖</span>
                    Definition / تعريف
                </h2>
                <div class="def-content">
                    <div class="def-item">
                        ${sweDef ? `<div class="def-swe-detail">${sweDef}</div>` : ''}
                        ${arbDef ? `<div class="def-arb-detail">${arbDef}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Forms Section with Smart Labels
    let formsHtml = '';
    if (forms) {
        const formsArray = forms.split(',').map(f => f.trim()).filter(f => f);
        if (formsArray.length > 0) {
            const labeledForms = getLabeledForms(formsArray, type);
            const formsChips = labeledForms.map(form => {
                if (form.label) {
                    return `<div class="form-chip-labeled">
                        <span class="form-chip-label">${form.label}</span>
                        <span class="form-chip">${form.word}</span>
                    </div>`;
                }
                return `<span class="form-chip">${form.word}</span>`;
            }).join('');
            formsHtml = `
                <div class="details-section">
                    <h2 class="section-title">
                        <span class="section-icon">🔤</span>
                        Böjningar / تصريفات
                    </h2>
                    <div class="forms-grid">
                        ${formsChips}
                    </div>
                </div>
            `;
        }
    }

    // Examples Section
    let examplesHtml = '';
    if (exSwe || exArb) {
        examplesHtml = `
            <div class="details-section">
                <h2 class="section-title">
                    <span class="section-icon">💡</span>
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
                    <span class="section-icon">💬</span>
                    Uttryck / تعبير
                </h2>
                <div class="example-card">
                    ${idiomSwe ? `<div class="ex-swe-detail">${idiomSwe}</div>` : ''}
                    ${idiomArb ? `<div class="ex-arb-detail">${idiomArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    const html = `
        ${heroHtml}
        ${definitionsHtml}
        ${formsHtml}
        ${examplesHtml}
        ${idiomsHtml}
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

function setupShare(item) {
    shareBtn.style.display = 'flex';

    shareBtn.onclick = async () => {
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
}

function setupFlashcardMode() {
    if (!flashcardBtn) return;

    // Toggle Mode
    flashcardBtn.onclick = () => {
        document.body.classList.toggle('flashcard-active');
        flashcardBtn.classList.toggle('active');

        // Show toast
        const isActive = document.body.classList.contains('flashcard-active');
        showToast(isActive ? 'Flashcard-läge: PÅ / وضع الاختبار: مفعل' : 'Flashcard-läge: AV / وضع الاختبار: معطل');
    };

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

init();
