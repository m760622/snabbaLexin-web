const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const dictFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/new_dictionary.json';

// 1. Read existing file
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// 2. Read new dictionary
const newDictionary = fs.readFileSync(dictFilePath, 'utf8');

// 3. Define simplified WC_THEMES
const WC_THEMES_CLEAN = `const WC_THEMES = [
    {
        id: 'food',
        name: 'Mat & Dryck / الطعام والشراب',
        icon: '🍎',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        accent: '#e11d48'
    },
    {
        id: 'nature',
        name: 'Naturen / الطبيعة',
        icon: '🌲',
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        accent: '#059669'
    },
    {
        id: 'travel',
        name: 'Resor / السفر',
        icon: '✈️',
        background: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
        accent: '#2563eb'
    },
    {
        id: 'daily',
        name: 'Vardag / الحياة اليومية',
        icon: '🏠',
        background: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
        accent: '#d97706'
    },
    {
        id: 'health',
        name: 'Hälsa / الصحة',
        icon: '❤️',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        accent: '#ef4444'
    },
    {
        id: 'work',
        name: 'Arbete / العمل',
        icon: '💼',
        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        accent: '#2563eb'
    },
    {
        id: 'education',
        name: 'Utbildning / التعليم',
        icon: '🎓',
        background: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
        accent: '#7c3aed'
    },
    {
        id: 'transport',
        name: 'Transport / المواصلات',
        icon: '🚌',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
        accent: '#f59e0b'
    },
    {
        id: 'law',
        name: 'Lag & Rätt / القانون',
        icon: '⚖️',
        background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        accent: '#4b5563'
    },
    {
        id: 'islam',
        name: 'Islam / الإسلام',
        icon: '☪️',
        background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
        accent: '#10b981'
    }
];`;

// 4. Extract WC_PREDEFINED_LEVELS
// We assume it starts with "const WC_PREDEFINED_LEVELS =" and ends before "const WC_DICTIONARY ="
// or we can just regex match the block.
// A safer way given the file structure:
// It's between SWEDISH_DATA (which we delete) and WC_DICTIONARY (which we replace).
// Let's find the start of WC_PREDEFINED_LEVELS
const levelsStartRegex = /const WC_PREDEFINED_LEVELS = \{/;
const levelsStartMatch = fileContent.match(levelsStartRegex);

if (!levelsStartMatch) {
    console.error("Could not find WC_PREDEFINED_LEVELS");
    process.exit(1);
}

const levelsStartIndex = levelsStartMatch.index;

// Find the end of WC_PREDEFINED_LEVELS. It ends before WC_DICTIONARY.
const dictStartRegex = /const WC_DICTIONARY =/;
const dictStartMatch = fileContent.match(dictStartRegex);

if (!dictStartMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

const levelsEndIndex = dictStartMatch.index;
const predefinedLevelsContent = fileContent.substring(levelsStartIndex, levelsEndIndex).trim();

// 5. Construct new file content
const newContent = `// ========================================
//  SWEDISH WORD CONNECT DATA
// ========================================

// --- THEMED WORLDS METADATA ---
${WC_THEMES_CLEAN}

// Helper to get theme for a chapter
function getThemeForChapter(chapter) {
    // Cycle through themes: 1->Food, 2->Nature, 3->Travel, 4->Daily, 5->Food...
    const index = (chapter - 1) % WC_THEMES.length;
    return WC_THEMES[index];
}

// ============================================
// WORD CONNECT - 100 STATIC LEVELS
// ============================================

${predefinedLevelsContent}

// --- CENTRALIZED DICTIONARY ---
const WC_DICTIONARY = ${newDictionary};
`;

// 6. Write back to file
fs.writeFileSync(dataFilePath, newContent);
console.log("Successfully updated wordConnectData.js");
