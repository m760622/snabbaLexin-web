/**
 * Add Arabic definitions for MedicinR terms - Batch 2
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

// Arabic definitions for MedicinR terms - Batch 2
const arabicDefinitions = {
    "Ett Sanatorium": "مصحة (لعلاج السل أو النقاهة)",
    "Euforisk": "مبتهج (نشوة/انشراح)",
    "Fastblodsocker ( blodprov på morgon före frukost )": "سكر الدم الصائم",
    "Felaktiga matvanor": "عادات غذائية خاطئة",
    "Fibromyalgi, fibromyositis": "فيبروميالغيا (ألم عضلي ليفي)",
    "Filaria, Filarier, Filariasis, Filarios": "دودة الفيلاريا (داء الخيطيات)",
    "Fingerben, Digiti manus": "سلاميات أصابع اليد",
    "Fjädrande metallnät": "شبكة معدنية مرنة (دعامة/Stent)",
    "Fleromättad fett": "دهن متعدد غير مشبع",
    "Flodblindhet, Onkocerciasis, Onchocerciasis": "عمى النهر (داء كلابية الذنب)",
    "Foglossning, symfyseolys, symfyseolysis": "ارتخاء الحوض (تحلل الارتفاق)",
    "Frisk och hel meniskvävnad finns kvar": "بقاء نسيج الغضروف الهلالي سليماً وكاملاً",
    "Frossa": "قشعريرة (رجفة)",
    "Främre korsband": "الرباط الصليبي الأمامي",
    "Fräsljud": "صوت هسهسة (أزيز)",
    "Fullkornsprodukter": "منتجات الحبوب الكاملة",
    "Fysioterapeut ( sjukgymnast )": "أخصائي علاج طبيعي",
    "Fördela ledvätska": "توزيع السائل المفصلي",
    "Förhudsförträngning": "تضيق القلفة (شبم)",
    "Förhöjda blodfetter": "ارتفاع دهون الدم",
    "Försämrad livskvalitet": "تدهور جودة الحياة",
    "Gangrän, sår med dödvävnad": "غرغرينا (جرح بنسيج ميت)",
    "Genom svalget": "عبر البلعوم",
    "Genomföra en operation": "إجراء عملية جراحية",
    "Ginkgo biloba": "جينكو بيلوبا (عشبة)",
    "Glaskroppen": "الخلط الزجاجي",
    "Glukos - Druvsocker": "جلوكوز - سكر العنب",
    "Glukosbelastning": "تحميل الجلوكوز",
    "Glukosuri, Glycosuria, Mellituria ( socker i urinen )": "بيلة سكرية (سكر في البول)",
    "Glukosutsöndring ( mäts i urinen )": "إفراز الجلوكوز (معدل في البول)",
    "Gluten intolerans": "عدم تحمل الغلوتين (حساسية)",
    "Gombenet, Os palatinum": "عظم الحنك",
    "Granulom": "ورم حبيبي",
    "Grå starr, Cataract ( grumling av linsen )": "إعتام عدسة العين (المياه البيضاء/الساد)",
    "Grön starr, Glaukum ( högt tryck i ögat )": "المياه الزرقاء (جلوكوما)",
    "Gula fläcken, Macula lutea": "البقعة الصفراء (في الشبكية)",
    "Gångjärnsled": "مفصل رزي (مفصلي)",
    "Går ur led ( knäledsurvridning )": "يُخلع (انخلاع الركبة)",
    "Hakmask": "دودة خطافية",
    "Hakmasksjuka, Ancylostomiasis": "داء الديدان الخطافية",
    "Halitosis, dålig andedräkt": "بخر الفم (رائحة فم كريهة)",
    "Hallucinationer": "هلاوس",
    "Halskotor, vertebrae cervicales": "فقرات عنقية",
    "Halskotor 7, vertebrae cervicales": "الفقرات العنقية السبعة",
    "Handen, manus": "اليد",
    "Handlovsben, Carpus": "عظام الرسغ",
    "HBA1C, Långtidssockerprov": "السكر التراكمي (HbA1c)",
    "Herbalism, Herbal medicine, Phytotherapy": "تداوي بالأعشاب",
    "Heterolog insemination": "تلقيح غير متماثل (من متبرع)",
    "Hetshunger": "نهام (جوع شديد)",
    "Hjärt - och kärlsjukdomar": "أمراض القلب والأوعية الدموية",
    "Hjärtflimmer": "رجفان قلبي",
    "Hjärtklappning": "خفقان القلب",
    "Hjärtstillestånd, asystoli": "توقف القلب",
    "Hjässbenet": "عظم الجداري",
    "Homolog insemination": "تلقيح متماثل (من الزوج)",
    "Hungerkänslor": "مشاعر الجوع",
    "Huvudet, kraniet, kranium": "الرأس، الجمجمة",
    "Hyperglykemi ( Hög blodsockernivå )": "فرط سكر الدم",
    "Hypofys - hypofysen": "الغدة النخامية",
    "Hypoglykemi ( låg blodsockernivå )": "نقص سكر الدم",
    "Hypomanisk": "هوس خفيف (هوسي بسيط)",
    "Hypothalamus": "الوطاء (تحت المهاد)",
    "Hypotoni, Hypotension": "انخفاض ضغط الدم",
    "Hälkoppsinlägg": "بطانة للكعب (في الحذاء)",
    "Höftben, ilium": "عظم الحرقفة (في الحوض)",
    "Höftfraktur": "كسر الورك",
    "Höftledsoperation": "عملية مفصل الورك",
    "Höftledsprotes": "مفصل ورك صناعي",
    "Högt blodtryck": "ارتفاع ضغط الدم",
    "Hörselben - Hörselbennen": "عظيمات السمع",
    "Hörselgång - hörselgången": "قناة السمع",
    "Hösnuva, Rhinitis allergica": "حمى القش (التهاب أنف تحسسي)",
    "Idrottsutövare": "ممارس للرياضة (رياضي)",
    "Immunförsvar - Immunförsvaret": "الجهاز المناعي",
    "Infibulation": "ختان تضييقي (خياطة الفرج)",
    "Inflammationer i innerörat": "التهابات الأذن الداخلية",
    "Insemination, Inseminatio": "تلقيح (إخصاب)",
    "Insomning": "استغراق في النوم",
    "Insulin injiceras i": "يحقن الأنسولين في",
    "Insulindos": "جرعة أنسولين",
    "Insulinkoma ( Medvetandesänkning och medvetslöshet )": "غيبوبة الأنسولين (فقدان الوعي)",
    "Insulinkänning ( blodsockernivå under 4, 0 mmol/l )": "أعراض نقص السكر (تحت 4 مليمول)",
    "Insulinpenna": "قلم أنسولين",
    "Insulinproducerande celler": "خلايا منتجة للأنسولين",
    "Insulinprokuktion": "إنتاج الأنسولين",
    "Insulinpump": "مضخة أنسولين",
    "Insulinresistens": "مقاومة الأنسولين",
    "Kallsvett, blekhet": "عرق بارد، شحوب",
    "Kan aldrig förträngas": "لا يمكن كبته أبداً (أو تضييقه)",
    "Kan förträngas dagtid": "يمكن كبته نهاراً",
    "KBT - kognitiv beteendeterapi": "العلاج السلوكي المعرفي",
    "Ketoner": "كيتونات",
    "Kilbenet, Os sphenoidale": "العظم الوتدي",
    "Klitoridektomi, Infibulation": "استئصال البظر، الختان التضييقي",
    "Klåda i underlivet ( pga högre blodsocker nivå )": "حكة تناسلية (بسبب ارتفاع السكر)",
    "Knakande ljud": "صوت طقطقة",
    "Knakar": "يطقطق",
    "Knastrar": "يقرقع (يخشخش)",
    "Knäskål, patella": "الرضفة (صابونة الركبة)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
