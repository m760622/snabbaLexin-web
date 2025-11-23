
// State
// dictionaryData is global from data.js

// DOM Elements
const detailsArea = document.getElementById('detailsArea');
const themeToggle = document.getElementById('themeToggle');

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
            const item = dictionaryData.find(entry => entry[COL_ID] === id);
            if (item) {
                renderDetails(item);
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

init();
