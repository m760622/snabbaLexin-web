/**
 * Add Arabic definitions for Medicin terms - Batch 19
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

// Arabic definitions for Medicin terms - Batch 19
const arabicDefinitions = {
    "Ryckning": "رعشة (تشنج لاإرادي)",
    "Ryggmärgen": "النخاع الشوكي (الحبل الشوكي)",
    "Ryggmärgskanalen": "القناة الشوكية",
    "Ryggmärgsnerv": "عصب شوكي",
    "Ryggmärgsvätska": "سائل نخاعي",
    "Ryggmärgsvätska likvor": "السائل الدماغي الشوكي (Likvor)",
    "Ryggskott, lumbago": "ألم الظهر المفاجئ (لومباجو)",
    "Ryggstelhet": "تصلب الظهر",
    "Rytmrubbningar": "اضطرابات النظم (القلبي)",
    "Råg": "بُر (جاودار)",
    "Röda blodkroppar": "كريات دم حمراء",
    "Röda blodkroppar, erytrocyter": "كريات الدم الحمراء (الإريثروسيتات)",
    "Rökavvänjning": "الإقلاع عن التدخين",
    "Rökavvänjningsmedel": "وسائل المساعدة للإقلاع عن التدخين",
    "Rökstopp": "التوقف عن التدخين",
    "Röntgenundersökning": "فحص بالأشعة السينية",
    "Rörelseinskränkning": "تقييد الحركة (محدودية الحركة)",
    "Rörlighet": "حركة (قابلية الحركة)",
    "Salivavsöndring": "إفراز اللعاب",
    "Saliven": "اللعاب",
    "Salivkörtel": "غدة لعابية",
    "Samhällsfarliga sjukdomar": "أمراض خطرة على المجتمع",
    "Samlaget": "الجماع",
    "Sammandragning, kontraktion": "انقباض (تقلص)",
    "Sammandragningarna": "الانقباضات (التقلصات)",
    "Sammanflytande ( utslag )": "ملتحم (طفح مندمج)",
    "Samordna rörelser": "ينسق الحركات",
    "Sannolikhetskraven": "متطلبات الاحتمالية",
    "Scintigrafi": "تصوير ومضاني (نووي)",
    "Sekundärurinen": "البول الثانوي (النهائي)",
    "Senkomplikation - Senkomplikationer": "مضاعفات متأخرة",
    "Senorna": "الأوتار",
    "Sensoriska nerver": "أعصاب حسية",
    "Sesammottagning för unga vuxna": "عيادة سيسام (للصحة الجنسية للشباب)",
    "Sexualiteten": "النشاط الجنسي (الجنسانية)",
    "Sexualrådgivning": "استشارة جنسية",
    "Sexuell lust": "رغبة جنسية",
    "Sexuellt överförbar sjukdom": "مرض منقول جنسياً (STD)",
    "Sexuellt överförbara infektioner": "عدوى منقولة جنسياً (STI)",
    "Sinnescell": "خلية حسية",
    "Sinnesintryck": "انطباع حسي (مدركات حسية)",
    "Sinnestämning": "حالة مزاجية",
    "Sinusknutan": "العقدة الجيبية (ناظمة القلب)",
    "Sittbenen": "عظام المقعدة (الورك)",
    "Sjukdomens slutskede": "المرحلة النهائية للمرض",
    "Sjukdomsframkallande, patogena": "مسببة للأمراض (مُمرضة)",
    "Sjukdomsförlopp": "مسار المرض",
    "Sjukdomshistoria - Sjukdomshistorien, anamnes": "تاريخ مرضي (سيرة مرضية)",
    "Sjukdomsinsikt": "استبصار مرضي (وعي بالمرض)",
    "Sjukhussjukan": "عدوى المستشفيات (MRSA وغيرها)",
    "Sjukliga förändringar": "تغيرات مرضية",
    "Sjukvårdsrådgivning": "استشارة طبية (هاتفية)",
    "Sjösjuka": "دوار البحر",
    "Skabb": "جرب",
    "Skallskada": "إصابة بالرأس (الجمجمة)",
    "Skaver": "يحتك (يسبب سحجاً)",
    "Skelettet": "الهيكل العظمي",
    "Skenbenet": "عظم القصبة (الظنبوب)",
    "Skolsköterska": "ممرضة المدرسة",
    "Skorpan": "قشرة (الجرح)",
    "Skrubbsår": "سحجة (كشط جلدي)",
    "Skrumplever, levercirros": "تليف الكبد",
    "Skrumpnar": "ينكمش (يضمر)",
    "Skulderbladet": "لوح الكتف",
    "Skyddsympning": "تطعيم (تحصين)",
    "Sköldkörtel - Sköldkörteln - Sköldkörtlar": "الغدة الدرقية - الغدد الدرقية",
    "Sköldkörtelcancer": "سرطان الغدة الدرقية",
    "Sköldkörtelhormon": "هرمون الغدة الدرقية",
    "Slemmig": "مخاطي (لزج)",
    "Slemmig upphostning": "بصاق مخاطي",
    "Slemmiga upphostningar": "بلغم مخاطي",
    "Slemslösande": "مذيب للبلغم",
    "Slidkransen": "غشاء البكارة",
    "Slipning av glasögon": "صقل النظارات (تفصيل العدسات)",
    "Sluten fraktur": "كسر مغلق (بسيط)",
    "Sluten vård": "رعاية داخلية (إقامة بالمستشفى)",
    "Slätröntgen": "أشعة عادية (بسيطة)",
    "Smaklök": "برعم تذوق",
    "Smaklökar": "براعم التذوق",
    "Smaksinnet": "حاسة التذوق",
    "Smittbärare": "حامل العدوى",
    "Smittkälla": "مصدر العدوى",
    "Smittskyddslagen": "قانون الوقاية من العدوى",
    "Smittskyddsläkare": "طبيب مكافحة العدوى",
    "Smittspårning": "تتبع العدوى (المخالطين)",
    "Smittvägar": "طرق الانتقال (العدوى)",
    "Smittämnen": "عوامل معدية",
    "Smultrontunga": "لسان الفراولة (في الحمى القرمزية)",
    "Smygande förlopp": "مسار مخاتل (تدريجي بطيء)",
    "Småfläckigt ( utslag )": "مرقط (طفح ببقع صغيرة)",
    "Smärta": "ألم",
    "Smärta": "وجع (مكرر)",
    "Smärtbehandling": "علاج الألم",
    "Smärtdebut": "بداية الألم",
    "Smärtfri": "خالٍ من الألم",
    "Smärtimpulser": "إشارات الألم (نبضات)",
    "Smärtlindrande läkemedel": "مسكنات الألم",
    "Smärtlindrande läkemedel analgetika": "مسكنات (Analgetika)",
    "Smärtlindring": "تسكين الألم",
    "Smärtupplevelser": "تجربة الألم (الإحساس بالألم)"
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
