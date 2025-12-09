const fs = require('fs');
const c = fs.readFileSync('data.js', 'utf8');
const m = c.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const d = eval(m[1]);

// Find nouns with gender but no forms
const nounsWithGenderNoForms = d.filter(r => {
    const type = (r[1] || '').toLowerCase();
    const forms = r[6] || '';
    const gender = r[13] || '';

    // Is a noun
    const isNoun = type.includes('subst');
    // Has gender
    const hasGender = gender && gender.trim() !== '';
    // No forms (empty or doesn't contain comma)
    const noForms = !forms || !forms.includes(',');

    return isNoun && hasGender && noForms;
});

console.log('=== الأسماء التي لها جنس ولكن بدون تصريفات ===');
console.log('العدد: ' + nounsWithGenderNoForms.length);
console.log('');

nounsWithGenderNoForms.forEach(r => {
    console.log(r[2] + ' | ' + r[13] + ' | ' + (r[6] || '-'));
});
