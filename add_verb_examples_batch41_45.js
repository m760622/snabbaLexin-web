/**
 * دفعات 41-45: إضافة أمثلة للأفعال المتبقية من القائمة الحالية
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

const verbExamples = {
    // الأفعال من القائمة الحالية
    "Smörjer": { exSwe: "Han smörjer kedjan på cykeln.", exArb: "يزيت سلسلة الدراجة." },
    "Snyltar": { exSwe: "Han snyltar på sina vänner.", exArb: "يتطفل على أصدقائه." },
    "Spinner": { exSwe: "Spindeln spinner sitt nät.", exArb: "العنكبوت ينسج شبكته." },
    "Sprejar": { exSwe: "Hon sprejar parfym.", exArb: "ترش العطر." },
    "Spurtar": { exSwe: "Löparen spurtar mot mål.", exArb: "العداء يندفع نحو الهدف." },
    "Stadgar": { exSwe: "Riksdagen stadgar lagen.", exArb: "البرلمان يسن القانون." },
    "Stansar": { exSwe: "Hon stansar hål i papperet.", exArb: "تخرم ثقوباً في الورق." },
    "Staplar": { exSwe: "De staplar lådor.", exArb: "يكومون الصناديق." },
    "Strövar": { exSwe: "Hunden strövar omkring.", exArb: "الكلب يتجول." },
    "Stultar": { exSwe: "Bebisen stultar fram.", exArb: "الرضيع يدرج." },
    "Styrker": { exSwe: "Övningen styrker musklerna.", exArb: "التمرين يقوي العضلات." },

    // المزيد من الأفعال المتخصصة
    "Svallar": { exSwe: "Havet svallar.", exArb: "البحر يموج." },
    "Svettas": { exSwe: "Han svettas efter träningen.", exArb: "يتعرق بعد التمرين." },
    "Svider": { exSwe: "Såret svider.", exArb: "الجرح يحرق." },
    "Sviktar": { exSwe: "Benen sviktar.", exArb: "الساقان تضعفان." },
    "Svimmar": { exSwe: "Hon svimmar av värmen.", exArb: "تغمى عليها من الحر." },
    "Svirrar": { exSwe: "Myggor svirrar.", exArb: "البعوض يدور." },
    "Svischsar": { exSwe: "Bilen svischsar förbi.", exArb: "السيارة تمر بسرعة." },
    "Svischar": { exSwe: "Pilarna svischar genom luften.", exArb: "السهام تصفر في الهواء." },
    "Svordas": { exSwe: "Han svordas högt.", exArb: "يقسم بصوت عال." },
    "Symblar": { exSwe: "Katten symblar på kudden.", exArb: "القطة تلعق الوسادة." },
    "Synger": { exSwe: "Bränderna synger tyget.", exArb: "الحرائق تحرق القماش." },
    "Synkar": { exSwe: "De synkar sina telefoner.", exArb: "يزامنون هواتفهم." },
    "Sysselsätter": { exSwe: "Fabriken sysselsätter hundra personer.", exArb: "المصنع يشغل مائة شخص." },
    "Sågar": { exSwe: "Han sågar ved.", exArb: "ينشر الحطب." },
    "Sårar": { exSwe: "Orden sårar henne.", exArb: "الكلمات تجرحها." },
    "Säjer": { exSwe: "Kärnan säjer.", exArb: "اللب يتسرب." },
    "Sällar": { exSwe: "Han sällar sig till gruppen.", exArb: "ينضم للمجموعة." },
    "Sändar": { exSwe: "TV:n sänder live.", exArb: "التلفزيون يبث مباشرة." },
    "Sänker": { exSwe: "De sänker priset.", exArb: "يخفضون السعر." },
    "Sörjer": { exSwe: "Familjen sörjer den döde.", exArb: "العائلة تحزن على الميت." },

    // T-U verbs
    "Tackar": { exSwe: "Hon tackar för hjälpen.", exArb: "تشكر على المساعدة." },
    "Tager": { exSwe: "Han tager emot gäster.", exArb: "يستقبل الضيوف." },
    "Tallar": { exSwe: "Det tallar ut sig.", exArb: "الأمور تستقر." },
    "Tappar": { exSwe: "Hon tappar glaset.", exArb: "تسقط الكأس." },
    "Tarvar": { exSwe: "Arbetet tarvar tid.", exArb: "العمل يستلزم وقتاً." },
    "Tätnar": { exSwe: "Dimman tätnar.", exArb: "الضباب يتكاثف." },
    "Telar": { exSwe: "Växten telar.", exArb: "النبات يتفرع." },
    "Tiger": { exSwe: "Han tiger om sanningen.", exArb: "يسكت عن الحقيقة." },
    "Tillagar": { exSwe: "Kocken tillagar maten.", exArb: "الطاهي يعد الطعام." },
    "Tillar": { exSwe: "Hon tillar sina ögonbryn.", exArb: "تنظف حواجبها." },
    "Tillhör": { exSwe: "Boken tillhör mig.", exArb: "الكتاب يخصني." },
    "Tillkallar": { exSwe: "De tillkallar läkaren.", exArb: "يستدعون الطبيب." },
    "Tillkommer": { exSwe: "Mer arbete tillkommer.", exArb: "يضاف المزيد من العمل." },
    "Tillreder": { exSwe: "Kocken tillreder såsen.", exArb: "الطاهي يحضر الصلصة." },
    "Tillskriver": { exSwe: "De tillskriver honom äran.", exArb: "ينسبون له الفضل." },
    "Tillstår": { exSwe: "Han tillstår sina fel.", exArb: "يعترف بأخطائه." },
    "Tilltar": { exSwe: "Smärtan tilltar.", exArb: "الألم يزداد." },
    "Tillvaratar": { exSwe: "De tillvaratar resurserna.", exArb: "يستغلون الموارد." },
    "Tillverkar": { exSwe: "Fabriken tillverkar bilar.", exArb: "المصنع يصنع السيارات." },
    "Tillåter": { exSwe: "Lagen tillåter det.", exArb: "القانون يسمح بذلك." },
    "Tittar": { exSwe: "Barnet tittar på TV.", exArb: "الطفل يشاهد التلفزيون." },
    "Tjänar": { exSwe: "Han tjänar pengar.", exArb: "يكسب المال." },
    "Tjuvar": { exSwe: "Pojken tjuvar godis.", exArb: "الولد يسرق الحلوى." },
    "Tockar": { exSwe: "Bilen tockar av.", exArb: "السيارة تتباطأ." },
    "Tonar": { exSwe: "Musiken tonar bort.", exArb: "الموسيقى تخفت." },
    "Torpederar": { exSwe: "De torpederar förslaget.", exArb: "ينسفون الاقتراح." },
    "Torstar": { exSwe: "Marken torstar efter regn.", exArb: "الأرض تعطش للمطر." },
    "Tramsar": { exSwe: "Barnen tramsar.", exArb: "الأطفال يمزحون." },
    "Trevar": { exSwe: "Han trevar i mörkret.", exArb: "يتحسس في الظلام." },
    "Trivsam": { exSwe: "Han trivs på jobbet.", exArb: "يرتاح في العمل." },
    "Trotts": { exSwe: "Han trotsar varningarna.", exArb: "يتحدى التحذيرات." },
    "Trugar": { exSwe: "Hon trugar honom att äta.", exArb: "تلح عليه ليأكل." },
    "Trumpetar": { exSwe: "Elefanten trumpetar.", exArb: "الفيل يبوق." },
    "Trånger": { exSwe: "Hundarna trånger sig fram.", exArb: "الكلاب تتزاحم للأمام." },
    "Träffas": { exSwe: "De träffas varje dag.", exArb: "يلتقون كل يوم." },
    "Tränar": { exSwe: "Han tränar hårt.", exArb: "يتدرب بجد." },
    "Tröstar": { exSwe: "Mamma tröstar barnet.", exArb: "الأم تواسي الطفل." },
    "Tuggar": { exSwe: "Han tuggar maten.", exArb: "يمضغ الطعام." },
    "Tullar": { exSwe: "Han tullar på reglerna.", exArb: "يتحايل على القواعد." },
    "Tummar": { exSwe: "Han tummar på reglerna.", exArb: "يتساهل مع القواعد." },
    "Turnar": { exSwe: "Ungdomarna turnar på gymmet.", exArb: "الشباب يؤدون التمارين في النادي." },
    "Tussar": { exSwe: "Barnet tussar iväg.", exArb: "الطفل يهرول بعيداً." },
    "Tuttar": { exSwe: "Hunden tuttar på bollen.", exArb: "الكلب يدفع الكرة." },
    "Tvingar": { exSwe: "De tvingar honom att gå.", exArb: "يجبرونه على الذهاب." },
    "Tvättar": { exSwe: "Hon tvättar kläder.", exArb: "تغسل الملابس." },
    "Tycker": { exSwe: "Jag tycker det är bra.", exArb: "أعتقد أنه جيد." },
    "Tyder": { exSwe: "Tecknen tyder på problem.", exArb: "العلامات تشير لمشاكل." },
    "Tyllar": { exSwe: "Barnen tyllar i gräset.", exArb: "الأطفال يتدحرجون في العشب." },
    "Tyngdar": { exSwe: "Ansvaret tyngdar honom.", exArb: "المسؤولية تثقل عليه." },
    "Tystar": { exSwe: "Hon tystar barnet.", exArb: "تسكت الطفل." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 41-45');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✅ ${entry[2]}`); }
            break;
        }
    }
    if (!found) notFound++;
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
