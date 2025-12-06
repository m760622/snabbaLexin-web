const fs = require('fs');

// HBTQI translations to add
const translations = {
    'Dragqueen': 'ملكة السحب',
    'Gender blind': 'عدم اعتبار الجنس',
    'Gender fluid': 'متغير الهوية الجنسية',
    'Genderqueer': 'كوير الهوية الجنسية',
    'Gynosexuell': 'منجذب للأنوثة',
    'Hbtiqa+': 'مجتمع الميم+',
    'Heteroqueer': 'كوير مغاير الجنس',
    'Intergenderperson': 'شخص بين الجنسين',
    'Interkönad': 'ثنائي الجنس',
    'Intersektionalitet': 'التقاطعية',
    'Litrosexuell': 'منجذب عاطفياً فقط',
    'Lumbersexuell': 'لمبرسيكشوال',
    'Metrosexuell': 'ميتروسكشوال',
    'MSM': 'رجال يمارسون الجنس مع رجال',
    'Nongender': 'بدون هوية جنسية',
    'Omnisexuell': 'منجذب لجميع الأجناس',
    'Oromantisk person': 'شخص غير رومانسي',
    'Outa': 'الكشف عن الهوية الجنسية',
    'Poly': 'متعدد العلاقات',
    'Polyamorös': 'متعدد العلاقات العاطفية',
    'Polysexualitet': 'تعدد الانجذاب الجنسي',
    'Skolisexuell': 'منجذب لمماثلي الجنس فقط',
    'WSW': 'نساء يمارسن الجنس مع نساء'
};

let content = fs.readFileSync('./data.js', 'utf-8');
let changes = 0;

for (const [word, translation] of Object.entries(translations)) {
    // Find pattern: "WORD",\n        "",  and replace with "WORD",\n        "TRANSLATION",
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('("' + escaped + '",\\s*\\n\\s*)"",', 'g');
    const newContent = content.replace(regex, '$1"' + translation + '",');
    if (newContent !== content) {
        changes++;
        console.log('Fixed: ' + word);
    }
    content = newContent;
}

fs.writeFileSync('./data.js', content);
console.log('\nTotal changes: ' + changes);
