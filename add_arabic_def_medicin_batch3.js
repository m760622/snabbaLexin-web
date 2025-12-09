/**
 * Add Arabic definitions for Medicin terms - Batch 3
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

// Arabic definitions for Medicin terms - Batch 3
const arabicDefinitions = {
    "Bakteriedödande": "قاتل للبكتيريا (مبيد جراثيم)",
    "Bakteriehämmande": "مثبط للبكتيريا",
    "Bakteriell hjärnhinneinflammation, meningit": "التهاب السحايا البكتيري",
    "Bakterieodling": "مزرعة بكتيرية",
    "Bakterier - Bakterieinfektion": "بكتيريا - عدوى بكتيرية",
    "Bakterier, bakterierna": "بكتيريا",
    "Bakteriolog - Bakteriologi": "عالم بكتيريا - علم البكتيريا",
    "Bakteriologisk diagnos": "تشخيص بكتيريولوجي",
    "Baktill": "في الخلف (من الخلف)",
    "Balans": "توازن",
    "Balansnerv": "عصب التوازن (العصب الدهليزي)",
    "Balansorgan": "عضو التوازن",
    "Balansrubbning": "اختلال التوازن",
    "Balanssinnesceller": "خلايا حسية للتوازن",
    "Balanssinnet": "حاسة التوازن",
    "Balanssymtom": "أعراض اختلال التوازن",
    "Ballongvidgning, PCI": "توسيع بالبالون (قسطرة PCI)",
    "Bana": "مسار (عصبي)",
    "Bandmaskar": "ديدان شريطية",
    "Barnafödande": "إنجاب (ولادة)",
    "Barndom": "طفولة",
    "Barnets bästa": "مصلحة الطفل الفضلى",
    "Barnhälsovård": "رعاية صحة الطفل",
    "Barnmorskemottagning": "عيادة القابلات (رعاية الحوامل)",
    "Barnperspektivet": "منظور الطفل",
    "Barnsjukdomar": "أمراض الطفولة",
    "Barnsängsfeber": "حمى النفاس",
    "Basalcellscancer basaliom": "سرطان الخلايا القاعدية",
    "Bearbeta sin sorg": "التغلب على الحزن (معالجة الحزن)",
    "Bearbetning": "معالجة (نفسية أو بيانات)",
    "Befria sig": "يتحرر (يتخلص من)",
    "Befrias": "يتحرر",
    "Befruktad äggcell": "بويضة مخصبة",
    "Befruktad äggcell sid": "بويضة مخصبة (تكرار)",
    "Befruktas": "تُخصَّب",
    "Befruktning": "إخصاب (تلقيح)",
    "Befuktad": "مُرطَّب",
    "Behandla": "يعالج",
    "Behållare": "وعاء (حاوية)",
    "Bekläder": "يبطن أو يغطي",
    "Bekymmer": "قلق أو هم",
    "Belastning": "حمل أو عبء (إجهاد)",
    "Belastningsskador": "إصابات الإجهاد (المتكرر)",
    "Beläggning": "طبقة (على اللسان أو الأسنان)",
    "Belägna": "تقع (موجودة)",
    "Benceller": "خلايا عظمية",
    "Benhinna": "سمحاق (غشاء العظم)",
    "Beninfektion": "عدوى عظمية",
    "Beninflammation": "التهاب العظم",
    "Benlabyrinten": "التيه العظمي (في الأذن الداخلية)",
    "Benmärg": "نخاع العظم",
    "Benmärgstransplantation": "زرع نخاع العظم",
    "Benröta": "نخر العظام تسوس العظم", // Corrected per common usage
    "Bensjukdom": "مرض عظمي",
    "Benskrap": "كشط العظم",
    "Benskörhet, osteoporos": "هشاشة العظام",
    "Bensnäcken": "قوقعة عظمية",
    "Bentumör": "ورم عظمي",
    "Bentäthet": "كثافة العظام",
    "Bentäthetsmätning": "قياس كثافة العظام",
    "Benväv": "نسيج عظمي",
    "Benvävnad": "نسيج عظمي (مكرر)",
    "Benägenhet": "للميل أو الاستعداد (للإصابة)",
    "Benändar": "نهايات العظام",
    "Benändarna": "نهايات العظام (مكرر)",
    "Beprövad erfarenhet": "خبرة مثبتة (ممارسة معتمدة)",
    "Beredskap": "جاهزية أو استعداد",
    // Duplicate "Beredskap" skipped by logic
    "Beskt": "مر (مذاق)",
    "Bestående": "دائم (مستمر)",
    "Bestående hjärnskada": "تلف دماغي دائم",
    "Bestående nedsättning": "عجز دائم (انخفاض دائم في القدرة)",
    "Beståndsdelar": "مكونات",
    "Bestämda tider": "أوقات محددة",
    "Besvikelser": "خيبات أمل",
    "Besvärande": "مزعج أو مضايق",
    "Beta - receptorblockerare": "حاصرات مستقبلات بيتا",
    "Betablockerare": "حاصرات بيتا",
    "Betingat": "مشروط (منعكس شرطي)",
    "Bettskena": "واقي الأسنان (جبيرة العض)",
    "Bibehåller": "يحافظ على",
    "Bihåla": "جيب أنفي",
    "Bikarbonat": "بيكربونات",
    "Bildas": "يتكون",
    "Bildningsplats": "مكان التكون",
    "Bilirubin ( galfärgämnet )": "بيليروبين (صبغة الصفراء)",
    "Bindehinna": "ملتحمة العين",
    "Bindehinneinflammation": "التهاب الملتحمة (الرمد)",
    "Bindesubstansvävnad": "نسيج رابط (ضام)",
    "Bindväv": "نسيج ضام",
    "Bindvävsceller": "خلايا النسيج الضام",
    "Bindvävsfibrer": "ألياف النسيج الضام",
    "Bindvävsfogar": "مفاصل ليفية (التحام)",
    "Bindvävshinna": "غشاء نسيج ضام",
    "Bindvävshinnor": "أغشية نسيج ضام",
    "Bindvävskapsel": "محفظة نسيج ضام",
    "Bindvävslager": "طبقة نسيج ضام",
    "Bindvävssubstans, kallus": "دشبذ (نسيج العظم الملتئم - Callus)",
    "Bindvävstrådar": "خيوط النسيج الضام",
    "Binjurarna": "الغدتان الكظريتان"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Medicin.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
