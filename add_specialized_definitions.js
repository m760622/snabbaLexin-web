// Add Arabic definitions to ALL remaining specialized categories
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Column indices
const COL_TYPE = 1;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5;

// Category-specific definitions based on type
function getDefinitionByCategory(type, swedishDef, arabicWord) {
    const typeLower = type.toLowerCase();

    // Medical categories
    if (typeLower.includes('medicin') || typeLower.includes('tandvård') || typeLower.includes('tandläkare')) {
        if (swedishDef && swedishDef.length > 0) {
            return `مصطلح طبي أو صحي`;
        }
        return `مصطلح طبي: ${arabicWord}`;
    }

    // Legal categories
    if (typeLower.includes('juridik')) {
        if (swedishDef && swedishDef.length > 0) {
            return `مصطلح قانوني`;
        }
        return `مصطلح قانوني: ${arabicWord}`;
    }

    // Construction/Building
    if (typeLower.includes('bygg')) {
        return `مصطلح بناء وتشييد`;
    }

    // Society/Social
    if (typeLower.includes('samhälle')) {
        return `مصطلح اجتماعي أو مجتمعي`;
    }

    // Migration
    if (typeLower.includes('migration')) {
        return `مصطلح متعلق بالهجرة واللجوء`;
    }

    // Military
    if (typeLower.includes('militär')) {
        return `رتبة أو مصطلح عسكري`;
    }

    // Ministry/Government
    if (typeLower.includes('minister')) {
        return `جهة حكومية أو وزارة`;
    }

    // HBTQ (LGBTQ)
    if (typeLower.includes('hbtq')) {
        return `مصطلح متعلق بالهوية الجنسية والتنوع`;
    }

    // Multicultural
    if (typeLower.includes('multikultur')) {
        return `مصطلح متعلق بالتعددية الثقافية`;
    }

    // Religion
    if (typeLower.includes('religion')) {
        return `مصطلح ديني`;
    }

    // Names
    if (typeLower.includes('namn')) {
        return `اسم علم أو مؤسسة`;
    }

    // Abbreviations
    if (typeLower.includes('förkort')) {
        return `اختصار`;
    }

    // Numbers/Counting
    if (typeLower.includes('räkning')) {
        return `رقم أو عدد`;
    }

    // Pronouns
    if (typeLower.includes('pronomen')) {
        return `ضمير`;
    }

    // Articles
    if (typeLower.includes('artikel')) {
        return `أداة تعريف أو تنكير`;
    }

    // Interjections
    if (typeLower.includes('interjek')) {
        return `أداة تعجب أو نداء`;
    }

    // Prefix/Suffix
    if (typeLower.includes('förled') || typeLower.includes('efterled')) {
        return `سابقة أو لاحقة لغوية`;
    }

    // Insurance
    if (typeLower.includes('försäkring')) {
        return `مصطلح تأميني`;
    }

    // Labor market
    if (typeLower.includes('arbetsmarknad')) {
        return `مصطلح سوق العمل`;
    }

    // Technology
    if (typeLower.includes('teknik')) {
        return `مصطلح تقني`;
    }

    // Education
    if (typeLower.includes('utbildning')) {
        return `مصطلح تعليمي`;
    }

    // Expressions
    if (typeLower.includes('uttryck')) {
        return `تعبير أو عبارة اصطلاحية`;
    }

    // Profession/Occupation
    if (typeLower.includes('yrke')) {
        return `مهنة أو وظيفة`;
    }

    // Sexology
    if (typeLower.includes('sexologi')) {
        return `مصطلح علم الجنس`;
    }

    // Se (References)
    if (typeLower === 'se.' || typeLower === 'se') {
        return `مرادف أو مرجع`;
    }

    // Default for unknown types
    return `مصطلح متخصص: ${arabicWord}`;
}

// Update all words without definition
let updateCount = 0;

dictionaryData.forEach(entry => {
    const arabicDef = entry[COL_ARB_DEF];

    // Skip if already has definition
    if (arabicDef && arabicDef.trim() !== '') return;

    const type = entry[COL_TYPE] || '';
    const swedishDef = entry[COL_SWE_DEF] || '';
    const arabicWord = entry[COL_ARB] || '';

    entry[COL_ARB_DEF] = getDefinitionByCategory(type, swedishDef, arabicWord);
    updateCount++;
});

// Write back to file
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
);

fs.writeFileSync('./data.js', newContent);

console.log(`✅ Updated ${updateCount} words with Arabic definitions`);
