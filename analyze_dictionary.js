/**
 * تحليل شامل للقاموس مع اقتراحات التحسين
 * Comprehensive dictionary analysis with improvement suggestions
 */

const fs = require('fs');
const dataContent = fs.readFileSync('data.js', 'utf8');
const startIndex = dataContent.indexOf('[');
let data = eval(dataContent.slice(startIndex));

console.log('═'.repeat(60));
console.log('📊 تحليل شامل للقاموس');
console.log('═'.repeat(60));

console.log('\n📚 إحصائيات عامة:');
console.log('  إجمالي المدخلات:', data.length);

// Count by type
const types = {};
for (const e of data) {
    const t = e[1] || 'غير محدد';
    types[t] = (types[t] || 0) + 1;
}
console.log('\n  توزيع أنواع الكلمات:');
Object.entries(types).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([t, c]) => {
    console.log('    ' + t + ': ' + c);
});

// Check empty fields
let emptyArabicTrans = 0;
let emptyArabicExpl = 0;
let emptySwedishExpl = 0;
let emptyForms = 0;
let emptyExamples = 0;

for (const e of data) {
    if (!e[3] || e[3].trim() === '') emptyArabicTrans++;
    if (!e[4] || e[4].trim() === '') emptyArabicExpl++;
    if (!e[5] || e[5].trim() === '') emptySwedishExpl++;
    if (!e[6] || e[6].trim() === '') emptyForms++;
    if (!e[7] || e[7].trim() === '') emptyExamples++;
}

console.log('\n📋 الحقول الفارغة:');
console.log('  الترجمة العربية (field 3):', emptyArabicTrans);
console.log('  الشرح العربي (field 4):', emptyArabicExpl);
console.log('  الشرح السويدي (field 5):', emptySwedishExpl);
console.log('  التصريفات (field 6):', emptyForms);
console.log('  الأمثلة (field 7):', emptyExamples);

// Calculate completeness
console.log('\n📈 نسبة الاكتمال:');
console.log('  الترجمة العربية:', ((data.length - emptyArabicTrans) / data.length * 100).toFixed(1) + '%');
console.log('  الشرح العربي:', ((data.length - emptyArabicExpl) / data.length * 100).toFixed(1) + '%');
console.log('  التصريفات:', ((data.length - emptyForms) / data.length * 100).toFixed(1) + '%');
console.log('  الأمثلة:', ((data.length - emptyExamples) / data.length * 100).toFixed(1) + '%');

// Check for very short translations
let veryShort = 0;
for (const e of data) {
    if (e[3] && e[3].trim().length <= 2) veryShort++;
}
console.log('\n  ترجمات قصيرة جداً (≤2 حرف):', veryShort);

// Suggestions
console.log('\n' + '═'.repeat(60));
console.log('💡 اقتراحات التحسين');
console.log('═'.repeat(60));

const suggestions = [];

if (emptyArabicExpl > 1000) {
    suggestions.push({
        priority: 'عالية',
        issue: 'شروحات عربية ناقصة',
        count: emptyArabicExpl,
        suggestion: 'إضافة شروحات عربية للمدخلات الناقصة'
    });
}

if (emptyForms > 5000) {
    suggestions.push({
        priority: 'متوسطة',
        issue: 'تصريفات ناقصة',
        count: emptyForms,
        suggestion: 'إضافة تصريفات الكلمات (مفرد/جمع، أزمنة الأفعال)'
    });
}

if (emptyExamples > 10000) {
    suggestions.push({
        priority: 'متوسطة',
        issue: 'أمثلة ناقصة',
        count: emptyExamples,
        suggestion: 'إضافة جمل مثال لتوضيح الاستخدام'
    });
}

for (const s of suggestions) {
    console.log('\n🔹 الأولوية:', s.priority);
    console.log('  المشكلة:', s.issue, '(' + s.count + ' مدخل)');
    console.log('  الاقتراح:', s.suggestion);
}

console.log('\n' + '═'.repeat(60));
console.log('✅ نقاط القوة');
console.log('═'.repeat(60));
console.log('• قاموس شامل يحتوي على', data.length, 'مدخل');
console.log('• تغطية جيدة للترجمة العربية الأساسية');
console.log('• تنوع في أنواع الكلمات (أفعال، صفات، أسماء...)');

console.log('\n');
