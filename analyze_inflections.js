const fs = require('fs');

// قراءة ملف البيانات
console.log('🔍 جاري قراءة ملف البيانات...');
const dataFileContent = fs.readFileSync('./data.js', 'utf8');

// استخراج البيانات باستخدام Function constructor
const dictionaryData = new Function(dataFileContent + '; return dictionaryData;')();

console.log(`✅ تم تحميل ${dictionaryData.length.toLocaleString()} سجل\n`);

// تحليل عمود التصريفات للكلمات التي لها جنس نحوي
function analyzeInflections() {
    const stats = {
        totalWithGender: 0,           // إجمالي الكلمات التي لها جنس نحوي
        withInflections: 0,            // كلمات لها تصريفات
        withoutInflections: 0,         // كلمات بدون تصريفات
        emptyInflections: 0,           // تصريفات فارغة تماماً
        wordsWithoutInflections: [],   // قائمة الكلمات بدون تصريفات
        genderBreakdown: {             // تفصيل حسب الجنس النحوي
            en: { total: 0, withInflections: 0, withoutInflections: 0 },
            ett: { total: 0, withInflections: 0, withoutInflections: 0 },
            other: { total: 0, withInflections: 0, withoutInflections: 0 }
        },
        wordTypeBreakdown: {}          // تفصيل حسب نوع الكلمة
    };

    dictionaryData.forEach((entry, index) => {
        const lexinId = entry[0];
        const wordType = entry[1];
        const swedishWord = entry[2];
        const inflections = entry[6];  // العمود السابع (index 6)
        const gender = entry[13];       // العمود الرابع عشر (index 13)

        // فقط الكلمات التي لها جنس نحوي (en أو ett أو أي قيمة أخرى غير فارغة)
        if (gender && gender.trim() !== '') {
            stats.totalWithGender++;

            // تحديد الجنس النحوي
            let genderCategory = 'other';
            if (gender.trim() === 'en') {
                genderCategory = 'en';
            } else if (gender.trim() === 'ett') {
                genderCategory = 'ett';
            }
            stats.genderBreakdown[genderCategory].total++;

            // تتبع نوع الكلمة
            if (!stats.wordTypeBreakdown[wordType]) {
                stats.wordTypeBreakdown[wordType] = {
                    total: 0,
                    withInflections: 0,
                    withoutInflections: 0
                };
            }
            stats.wordTypeBreakdown[wordType].total++;

            // فحص التصريفات
            if (!inflections || inflections.trim() === '') {
                stats.withoutInflections++;
                stats.emptyInflections++;
                stats.genderBreakdown[genderCategory].withoutInflections++;
                stats.wordTypeBreakdown[wordType].withoutInflections++;

                stats.wordsWithoutInflections.push({
                    index: index,
                    lexinId: lexinId,
                    wordType: wordType,
                    word: swedishWord,
                    gender: gender,
                    inflections: inflections
                });
            } else {
                stats.withInflections++;
                stats.genderBreakdown[genderCategory].withInflections++;
                stats.wordTypeBreakdown[wordType].withInflections++;
            }
        }
    });

    return stats;
}

// تشغيل التحليل
console.log('🔍 جاري تحليل عمود التصريفات...\n');
const results = analyzeInflections();

// طباعة النتائج
console.log('═══════════════════════════════════════════════════════════');
console.log('📊 إحصائيات عامة');
console.log('═══════════════════════════════════════════════════════════');
console.log(`إجمالي الكلمات التي لها جنس نحوي: ${results.totalWithGender.toLocaleString()}`);
console.log(`كلمات لها تصريفات: ${results.withInflections.toLocaleString()} (${((results.withInflections / results.totalWithGender) * 100).toFixed(2)}%)`);
console.log(`كلمات بدون تصريفات: ${results.withoutInflections.toLocaleString()} (${((results.withoutInflections / results.totalWithGender) * 100).toFixed(2)}%)`);
console.log(`منها تصريفات فارغة تماماً: ${results.emptyInflections.toLocaleString()}`);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📈 تفصيل حسب الجنس النحوي');
console.log('═══════════════════════════════════════════════════════════');
Object.keys(results.genderBreakdown).forEach(gender => {
    const data = results.genderBreakdown[gender];
    if (data.total > 0) {
        console.log(`\n${gender.toUpperCase()}:`);
        console.log(`  - الإجمالي: ${data.total.toLocaleString()}`);
        console.log(`  - لها تصريفات: ${data.withInflections.toLocaleString()} (${((data.withInflections / data.total) * 100).toFixed(2)}%)`);
        console.log(`  - بدون تصريفات: ${data.withoutInflections.toLocaleString()} (${((data.withoutInflections / data.total) * 100).toFixed(2)}%)`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📋 تفصيل حسب نوع الكلمة');
console.log('═══════════════════════════════════════════════════════════');
const sortedWordTypes = Object.entries(results.wordTypeBreakdown)
    .sort((a, b) => b[1].withoutInflections - a[1].withoutInflections);

sortedWordTypes.forEach(([wordType, data]) => {
    if (data.withoutInflections > 0) {
        console.log(`\n${wordType}:`);
        console.log(`  - الإجمالي: ${data.total.toLocaleString()}`);
        console.log(`  - لها تصريفات: ${data.withInflections.toLocaleString()} (${((data.withInflections / data.total) * 100).toFixed(2)}%)`);
        console.log(`  - بدون تصريفات: ${data.withoutInflections.toLocaleString()} (${((data.withoutInflections / data.total) * 100).toFixed(2)}%)`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📝 أمثلة على الكلمات بدون تصريفات (أول 20 كلمة)');
console.log('═══════════════════════════════════════════════════════════');
results.wordsWithoutInflections.slice(0, 20).forEach((item, idx) => {
    console.log(`${idx + 1}. ${item.word} (${item.wordType}) - Gender: ${item.gender} - ID: ${item.lexinId}`);
});

if (results.wordsWithoutInflections.length > 20) {
    console.log(`\n... و ${(results.wordsWithoutInflections.length - 20).toLocaleString()} كلمة أخرى`);
}

// حفظ القائمة الكاملة في ملف
const reportContent = {
    timestamp: new Date().toISOString(),
    summary: {
        totalWithGender: results.totalWithGender,
        withInflections: results.withInflections,
        withoutInflections: results.withoutInflections,
        emptyInflections: results.emptyInflections
    },
    genderBreakdown: results.genderBreakdown,
    wordTypeBreakdown: results.wordTypeBreakdown,
    wordsWithoutInflections: results.wordsWithoutInflections
};

fs.writeFileSync(
    'inflections_analysis_report.json',
    JSON.stringify(reportContent, null, 2),
    'utf8'
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ تم حفظ التقرير الكامل في: inflections_analysis_report.json');
console.log('═══════════════════════════════════════════════════════════\n');
