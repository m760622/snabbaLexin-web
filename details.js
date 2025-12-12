
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

    // Dynamic Font Size Calculation based on Word Length
    const getDynamicFontSize = (text) => {
        const len = text.length;
        if (len < 7) return '3.5rem';
        if (len < 9) return '3.0rem';
        if (len < 11) return '2.5rem';
        if (len < 13) return '2.0rem';
        return '1.8rem';
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

    // Hero Section - Show original type (Substantiv, Verb, etc.)
    const heroHtml = `
        <div class="details-hero">
            <div class="details-hero-content">
                <div class="word-display-main">
                    <div class="word-with-audio">
                        <h1 class="word-swe-hero" style="font-size: ${getDynamicFontSize(swe)}">${swe}</h1>
                    </div>
                    ${arb ? `<div class="word-arb-hero">${arb}</div>` : ''}
                    ${type ? `
                    <div class="word-type-row" style="justify-content: center;">
                        <span class="word-type-badge clickable" onclick="navigateToTypeFilter('${rawType}')" title="اضغط لرؤية جميع الكلمات من هذا النوع">${type}</span>
                    </div>
                    ` : ''}
                </div>
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
                        ${effectiveSweDef ? `<div class="def-swe-detail">${effectiveSweDef}</div>` : ''}
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
                        <span class="section-icon">${getSVGIcon('text')}</span>
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

    const html = `
        ${heroHtml}
        ${definitionsHtml}
        ${formsHtml}
        ${examplesHtml}
        ${idiomsHtml}
        ${dataQualityHtml}
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

init();

