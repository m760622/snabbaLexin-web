
// State
// dictionaryData is global from data.js

// DOM Elements
// DOM Elements
const detailsArea = document.getElementById('detailsArea');
const themeToggle = document.getElementById('themeToggle');
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

    // Examples
    let examplesHtml = '';
    if (exSwe || exArb) {
        examplesHtml = `
            <div class="examples">
                <span class="ex-label">Exempel / أمثلة</span>
                <div class="ex-item">
                    ${exSwe ? `<div class="ex-swe" style="font-size: 1.1rem;">${exSwe}</div>` : ''}
                    ${exArb ? `<div class="ex-arb" style="font-size: 1.1rem;">${exArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Idioms
    let idiomsHtml = '';
    if (idiomSwe || idiomArb) {
        idiomsHtml = `
            <div class="examples" style="margin-top: 1rem; background: var(--background);">
                <span class="ex-label">Uttryck / تعبير</span>
                <div class="ex-item">
                    ${idiomSwe ? `<div class="ex-swe" style="font-size: 1.1rem;">${idiomSwe}</div>` : ''}
                    ${idiomArb ? `<div class="ex-arb" style="font-size: 1.1rem;">${idiomArb}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Forms
    let formsHtml = '';
    if (forms) {
        formsHtml = `
            <div style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                <strong>Böjningar / تصريفات:</strong> ${forms}
            </div>
        `;
    }

    const html = `
        <div class="card" style="padding: 2rem;">
            <div class="card-header">
                <div class="word-swe" style="font-size: 2.5rem;">${swe}</div>
                ${type ? `<div class="word-type" style="font-size: 1rem;">${type}</div>` : ''}
            </div>
            
            ${arb ? `<div class="word-arb" style="font-size: 2rem; margin: 1rem 0;">${arb}</div>` : ''}
            
            <div class="definitions" style="margin: 1.5rem 0;">
                ${sweDef || arbDef ? `
                    <div class="def-row">
                        ${sweDef ? `<div class="def-swe" style="font-size: 1.2rem;">${sweDef}</div>` : ''}
                        ${arbDef ? `<div class="def-arb" style="font-size: 1.2rem; margin-top: 0.5rem;">${arbDef}</div>` : ''}
                    </div>
                ` : ''}
            </div>

            ${formsHtml}
            ${examplesHtml}
            ${idiomsHtml}
        </div>
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
        const shareUrl = 'https://snabbalexin-web.netlify.app/';

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
