/**
 * Add Arabic definitions for MigrationTB terms - Final Batch (33 remaining)
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

// Arabic definitions for MigrationTB terms - Final Batch
const arabicDefinitions = {
    "Uppgiftsskyldi ghet, additionsplikt": "واجب تقديم المعلومات المطلوبة",
    "Verkställighet": "تنفيذ الحكم أو القرار الرسمي",
    "Verkställighetshinder": "عوائق تمنع تنفيذ قرار الترحيل",
    "Viseringskodexen": "قانون الاتحاد الأوروبي الموحد للتأشيرات",
    "Vistelsetid": "مدة الإقامة أو التواجد في البلد",
    "Vite": "غرامة مالية للإجبار على تنفيذ أمر",
    "Våldtäkt": "جريمة الاغتصاب الجنسي",
    "Vård enligt smittskyddslagen": "رعاية إلزامية لمنع انتشار العدوى",
    "Vårdnadshavare": "ولي الأمر المسؤول قانونياً عن الطفل",
    "Yttranden": "آراء أو تعليقات رسمية مكتوبة",
    "Åberopa": "الاستناد إلى شيء كدليل أو حجة",
    "Åläggas": "يُفرض عليه القيام بشيء",
    "Återetableringsstöd": "دعم مالي للعودة الطوعية للوطن",
    "Återförenas": "الاجتماع مجدداً مع أفراد العائلة",
    "Återförvisa ärendet": "إعادة القضية لهيئة أدنى للمراجعة",
    "Återinvandring": "العودة للعيش في البلد الأصلي",
    "Återvinning": "استعادة ممتلكات أو حقوق، أو إعادة تدوير",
    "Återvändarförbud": "قرار بمنع دخول البلاد لفترة محددة",
    "Äktenskapsbevis": "وثيقة رسمية تثبت عقد الزواج",
    "Överförmyndare": "المسؤول البلدي عن مراقبة الأوصياء",
    "Överförmyndarnämnd": "اللجنة البلدية المشرفة على الأوصياء",
    "Överförs": "يُنقل إلى مكان أو جهة أخرى",
    "Överlämnas": "يُسلّم إلى سلطة أخرى أو قضاء",
    "Överträdelse": "مخالفة للقانون أو القواعد",
    "Övrig skyddsstatusförklaring": "قرار حماية لمن لا تنطبق عليهم صفة اللاجئ",
    "Etableringsinsatser": "إجراءات لدعم اندماج القادمين الجدد",
    "Etableringsplan": "خطة فردية للترسيخ والعمل",
    "Etableringsprogram": "برنامج حكومي لاندماج اللاجئين الجدد",
    "Etableringssamtal": "محادثة لتخطيط مسار الترسيخ",
    "Indrivning ( av skatteskuld )": "تحصيل الديون الضريبية جبراً",
    "Bevilja asyl": "الموافقة على منح اللجوء",
    "Etableringslots": "مرشد لمساعدة المهاجرين في الاندماج",
    "Etiska ställningstaganden": "قرارات مبنية على اعتبارات أخلاقية"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Check for exact match or match with slight variations if needed
    if (type === 'MigrationTB.' && !currentDef.trim()) {
        if (arabicDefinitions[word]) {
            entry[COL_ARB_DEF] = arabicDefinitions[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        } else {
            // Fallback to check trimmed keys just in case of whitespace issues
            const trimmedWord = word.trim();
            const cleanKey = Object.keys(arabicDefinitions).find(k => k.trim() === trimmedWord);
            if (cleanKey) {
                entry[COL_ARB_DEF] = arabicDefinitions[cleanKey];
                updatedCount++;
                console.log(`✅ ${word} (matched via trim)`);
            }
        }
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} كلمة`);
console.log('✅ تم حفظ التغييرات في data.js');
