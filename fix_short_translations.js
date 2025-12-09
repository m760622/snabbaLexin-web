/**
 * إصلاح الترجمات القصيرة
 * Fix Short Translations
 * 
 * This script fixes the 11 short translations that need improvement
 */

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');
const startMarker = 'const dictionaryData = ';
const startIndex = dataContent.indexOf(startMarker);
const arrayStart = dataContent.indexOf('[', startIndex);

let dictionaryData;
try {
    dictionaryData = eval(dataContent.slice(arrayStart));
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`\n📚 Total entries: ${dictionaryData.length}\n`);

// Fixes for the 11 short translations
// Format: ID -> { arabic: new translation, explanation: updated explanation }
const fixes = {
    // "حي" should be more descriptive
    'Lexin000924': {
        arabic: 'حيوي',
        explanation: 'حيوي، نشيط، مفعم بالحياة'
    },

    // "فظ" - these are fine but let's make them slightly more descriptive
    'Lexin004298': {
        arabic: 'فظّ',
        explanation: 'قاسٍ، غليظ، وحشي'
    },
    'Lexin020758': {
        arabic: 'فظّ',
        explanation: 'جلف، غير مهذب، خشن'
    },
    'Lexin022863': {
        arabic: 'فظّ',
        explanation: 'قاسٍ، جِلْف، غليظ'
    },

    // "أي" - make more descriptive
    'Lexin000632': {
        arabic: 'إذاً',
        explanation: 'بالتالي، وبناءً على ذلك، أي'
    },
    'Lexin011352': {
        arabic: 'أياً',
        explanation: 'الأفضل، أي كان، أياً يكن'
    },

    // "حث" - construction term
    'Lexin001140': {
        arabic: 'تثبيت',
        explanation: 'حثّ، تركيب (مصطلح بناء وتشييد)'
    },

    // "ضد" - this is actually valid, but let's keep consistent
    'Lexin018039': {
        arabic: 'ضدّ',
        explanation: 'حرف جر للدلالة على المعارضة'
    },

    // "فخ" - valid but let's enhance
    'Lexin007203': {
        arabic: 'فخّ',
        explanation: 'مصيدة، كمين، صعوبة'
    },

    // "بج" - Mops (pug dog) - needs proper Arabic
    'Lexin017992': {
        arabic: 'كلب صغير',
        explanation: 'بَج، نوع من أنواع الكلاب الصغيرة ذات الوجه المسطح'
    },

    // "شب" - Sejdel (beer mug) - needs proper Arabic
    'Lexin023640': {
        arabic: 'كوب بمقبض',
        explanation: 'كوب جعة (بيرة) بمقبض'
    }
};

let fixedCount = 0;

console.log('🔧 Fixing short translations:\n');

for (const entry of dictionaryData) {
    const id = entry[0];

    if (fixes[id]) {
        const fix = fixes[id];
        const oldArabic = entry[3];
        const oldExplanation = entry[4];

        console.log(`ID: ${id}`);
        console.log(`  Swedish: ${entry[2]}`);
        console.log(`  Old Arabic: "${oldArabic}" → New: "${fix.arabic}"`);
        console.log(`  Old Explanation: "${oldExplanation}"`);
        console.log(`  New Explanation: "${fix.explanation}"`);
        console.log();

        // Apply fix
        entry[3] = fix.arabic;
        entry[4] = fix.explanation;

        fixedCount++;
    }
}

console.log(`\n✅ Fixed ${fixedCount} entries\n`);

// Backup original
const backupName = `data.js.backup_short_fix_${Date.now()}`;
fs.writeFileSync(backupName, dataContent, 'utf8');
console.log(`📦 Backup saved to: ${backupName}`);

// Generate new data.js content
const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;

// Write fixed data
fs.writeFileSync('data.js', newContent, 'utf8');
console.log('💾 Fixed data saved to: data.js');

// Verify the fixes
console.log('\n🔍 Verifying fixes...\n');
for (const id of Object.keys(fixes)) {
    const entry = dictionaryData.find(e => e[0] === id);
    if (entry) {
        console.log(`  ✓ ${id}: "${entry[2]}" → "${entry[3]}"`);
    }
}

console.log('\n✨ All fixes applied successfully!\n');
