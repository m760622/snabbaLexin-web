// Script to add Arabic definitions to ALL prepositions
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_ARB_DEF = 4;

// Arabic definitions for all prepositions without definition
const prepositionDefinitions = {
    "Lexin000131": "بسعر الوحدة، لكل واحد",
    "Lexin000623": "ابتداءً من، من",
    "Lexin001275": "بخصوص، بمناسبة الحديث عن",
    "Lexin001750": "حرف جر للدلالة على المصدر",
    "Lexin001751": "حرف جر للدلالة على المكان",
    "Lexin001752": "حرف جر للدلالة على الأصل",
    "Lexin001753": "فيما يخص، بالنسبة لـ",
    "Lexin003188": "بشأن، فيما يتعلق بـ",
    "Lexin003505": "في وسط، ضمن مجموعة، بالإضافة إلى",
    "Lexin008268": "في المقدمة، قبل",
    "Lexin008559": "حرف جر للدلالة على المصدر",
    "Lexin008560": "حرف جر للدلالة على الأصل",
    "Lexin008561": "حرف جر للدلالة على الموضوع",
    "Lexin008974": "حرف جر للدلالة على السبب",
    "Lexin008975": "في مقابل، بدلاً من",
    "Lexin008976": "حرف جر للدلالة على الهدف",
    "Lexin008977": "بمساعدة، باستخدام",
    "Lexin008978": "بخصوص، فيما يتعلق بـ",
    "Lexin008979": "حرف جر للدلالة على الزمان أو الحال",
    "Lexin009107": "قبل (زمنياً)",
    "Lexin009108": "أمام (مكانياً)",
    "Lexin009834": "باستثناء، ما عدا",
    "Lexin010167": "بواسطة، عن طريق، بسبب",
    "Lexin010205": "بالنسبة لـ، تجاه",
    "Lexin011553": "على هذا الجانب من",
    "Lexin012417": "داخل، في داخل",
    "Lexin012419": "خلال فترة زمنية، عند",
    "Lexin012420": "قبل (عند ذكر الوقت)",
    "Lexin012421": "فيما يخص، بالنظر إلى",
    "Lexin012422": "بصفة، كـ",
    "Lexin012423": "حرف جر للدلالة على المكان",
    "Lexin012424": "حرف جر للدلالة على الوسيلة",
    "Lexin012757": "أمام، وجهاً لوجه مع",
    "Lexin012833": "بما فيها، شاملاً",
    "Lexin012880": "قبل (زمنياً)",
    "Lexin012883": "على الجانب الداخلي، داخل",
    "Lexin012919": "في داخل، ضمن حدود",
    "Lexin012929": "قريباً جداً من، ملاصقاً لـ",
    "Lexin013156": "بجوار، بمحاذاة",
    "Lexin013231": "بجانب، إلى جانب",
    "Lexin013243": "باتجاه الداخل",
    "Lexin013533": "مع، بالإضافة إلى",
    "Lexin013534": "بجانب، إلى جوار",
    "Lexin017395": "مع، بمشاركة",
    "Lexin017396": "باستخدام، عن طريق استعمال",
    "Lexin017397": "فيما يخص، بالنسبة لـ",
    "Lexin017398": "حرف جر للدلالة على الوسيلة أو الحال",
    "Lexin017535": "حرف جر للدلالة على الموقع بين شيئين",
    "Lexin017536": "حرف جر للدلالة على العلاقة بين طرفين",
    "Lexin018039": "حرف جر للدلالة على المعارضة",
    "Lexin018040": "حرف جر للدلالة على الاتجاه",
    "Lexin018041": "حرف جر للدلالة على المقابلة",
    "Lexin018042": "حرف جر للدلالة على المقارنة",
    "Lexin018043": "حرف جر للدلالة على التعامل",
    "Lexin018651": "باتجاه الأسفل",
    "Lexin019143": "بصرف النظر عن، بغض النظر عن",
    "Lexin019596": "حول، دائرياً",
    "Lexin020441": "بواسطة، عن طريق",
    "Lexin020442": "لكل (واحد)، في",
    "Lexin021575": "بخصوص أو في اتجاه",
    "Lexin021576": "بعد (زمنياً)",
    "Lexin021577": "وفقاً لـ، بحسب",
    "Lexin022759": "حول، دائرياً",
    "Lexin023181": "بخصوص، فيما يتعلق بـ",
    "Lexin027467": "أخيراً وأخيراً (تعبير)",
    "Lexin028249": "مرتبط بـ، لـ",
    "Lexin029520": "حرف جر للدلالة على الموضوع",
    "Lexin029809": "صعوداً على، إلى أعلى",
    "Lexin030039": "نحو الأعلى، قريباً من",
    "Lexin030180": "على طول، بمحاذاة",
    "Lexin030299": "على طوال، بامتداد",
    "Lexin030317": "خارج، في الخارج",
    "Lexin030318": "باستثناء، ما عدا",
    "Lexin031884": "على (حرف جر قديم)",
    "Lexin032008": "لـ، نحو",
    "Lexin032475": "فوق، أعلى من",
    "Lexin032476": "في (مكان أو زمان)",
    "Lexin032477": "إلى الجانب الآخر من",
    "Lexin032478": "عبر، مروراً بـ",
    "Lexin032479": "حرف جر للدلالة على العلو",
    "Lexin032480": "عن، بخصوص، فيما يتعلق بـ",
};

// Update prepositions
let updateCount = 0;

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    if (!type.includes('prep')) return;

    const id = entry[COL_ID];

    // Skip if already has definition
    if (entry[COL_ARB_DEF] && entry[COL_ARB_DEF].trim() !== '') return;

    // Add definition
    if (prepositionDefinitions[id]) {
        entry[COL_ARB_DEF] = prepositionDefinitions[id];
        updateCount++;
    }
});

// Write back to file
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
);

fs.writeFileSync('./data.js', newContent);

console.log(`✅ Updated ${updateCount} prepositions with Arabic definitions`);
