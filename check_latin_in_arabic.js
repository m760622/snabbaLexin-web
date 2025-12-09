// البحث المتقدم عن نص سويدي في الحقول العربية
// Advanced search for Swedish text in Arabic fields

const fs = require('fs');
const dataContent = fs.readFileSync('data.js', 'utf8');
const startIndex = dataContent.indexOf('[');

let data;
try {
    data = eval(dataContent.slice(startIndex));
} catch (e) {
    console.error('Error:', e);
    process.exit(1);
}

console.log('🔍 البحث عن نص سويدي/لاتيني في الحقول العربية...\n');
console.log(`إجمالي المدخلات: ${data.length}\n`);

let foundEntries = [];

// Check Arabic fields (index 3, 4, 8, 10) for Latin characters
for (const entry of data) {
    const id = entry[0];
    const arabicFields = [
        { idx: 3, name: 'الترجمة العربية' },
        { idx: 4, name: 'الشرح العربي' },
        { idx: 8, name: 'المثال العربي' },
        { idx: 10, name: 'حقل إضافي' }
    ];

    for (const field of arabicFields) {
        const value = entry[field.idx];
        if (!value || typeof value !== 'string') continue;

        // Check for Latin letters (a-z, A-Z) or Swedish characters
        // Exclude common abbreviations and symbols
        const latinMatch = value.match(/[a-zA-ZåäöÅÄÖ]+/g);
        if (latinMatch) {
            // Filter out single letters and very short words
            const significantMatches = latinMatch.filter(m => m.length > 2);
            if (significantMatches.length > 0) {
                foundEntries.push({
                    id,
                    swedish: entry[2],
                    fieldName: field.name,
                    fieldIdx: field.idx,
                    value: value,
                    latinText: significantMatches
                });
            }
        }
    }
}

console.log(`عدد المدخلات التي تحتوي على نص لاتيني: ${foundEntries.length}\n`);

if (foundEntries.length > 0) {
    console.log('='.repeat(60));
    console.log('النتائج (أول 30):');
    console.log('='.repeat(60));

    for (const item of foundEntries.slice(0, 30)) {
        console.log(`\nID: ${item.id}`);
        console.log(`  الكلمة السويدية: ${item.swedish}`);
        console.log(`  الحقل: ${item.fieldName} (index ${item.fieldIdx})`);
        console.log(`  القيمة: "${item.value}"`);
        console.log(`  النص اللاتيني: ${item.latinText.join(', ')}`);
    }

    if (foundEntries.length > 30) {
        console.log(`\n... و ${foundEntries.length - 30} مدخلات أخرى`);
    }

    // Save to file
    fs.writeFileSync('found_latin_in_arabic.json', JSON.stringify(foundEntries, null, 2), 'utf8');
    console.log('\n📁 تم حفظ النتائج في: found_latin_in_arabic.json');
} else {
    console.log('✅ لا يوجد نص لاتيني/سويدي في الحقول العربية!');
}

// Also check why the original script didn't find anything
console.log('\n' + '='.repeat(60));
console.log('تحليل طريقة الكشف الأصلية:');
console.log('='.repeat(60));

const swedishPatterns = [
    /\bär\b/,      // är
    /\boch\b/,     // och
    /\batt\b/,     // att
    /\bdet\b/,     // det
    /\bsom\b/,     // som
    /\bpå\b/,      // på
    /\bmed\b/,     // med
    /\bför\b/,     // för
    /[åäöÅÄÖ]/,    // Swedish special characters
];

let patternMatches = 0;
for (const entry of data) {
    const arabicFields = [entry[3], entry[4], entry[8], entry[10]].filter(Boolean);
    for (const field of arabicFields) {
        for (const pattern of swedishPatterns) {
            if (pattern.test(field)) {
                patternMatches++;
                break;
            }
        }
    }
}

console.log(`\nالطريقة الأصلية تبحث عن كلمات سويدية محددة مثل:`);
console.log(`  är, och, att, det, som, på, med, för`);
console.log(`  والحروف السويدية: å ä ö`);
console.log(`\nعدد التطابقات مع الأنماط السويدية: ${patternMatches}`);
