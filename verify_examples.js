// Verify adjectives examples
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Count adjectives
const allAdj = dict.filter(e => (e[1] || '').toLowerCase().includes('adj'));
const adjWithEx = allAdj.filter(e => e[7] && e[7].trim() !== '');
const adjWithoutEx = allAdj.filter(e => !e[7] || e[7].trim() === '');

console.log('=== التحقق من الصفات ===');
console.log('إجمالي الصفات:', allAdj.length);
console.log('الصفات مع أمثلة:', adjWithEx.length);
console.log('الصفات بدون أمثلة:', adjWithoutEx.length);

// Sample
console.log('\n=== عينة من الصفات مع الأمثلة ===');
adjWithEx.slice(0, 5).forEach(e => {
    console.log(e[2], ':', e[7]);
});

// Check for verbs too
const allVerbs = dict.filter(e => (e[1] || '').toLowerCase().includes('verb'));
const verbsWithEx = allVerbs.filter(e => e[7] && e[7].trim() !== '');
const verbsWithoutEx = allVerbs.filter(e => !e[7] || e[7].trim() === '');

console.log('\n=== التحقق من الأفعال ===');
console.log('إجمالي الأفعال:', allVerbs.length);
console.log('الأفعال مع أمثلة:', verbsWithEx.length);
console.log('الأفعال بدون أمثلة:', verbsWithoutEx.length);
