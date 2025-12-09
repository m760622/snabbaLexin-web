/**
 * Add Arabic definitions for Medicin terms - Batch 7
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

// Arabic definitions for Medicin terms - Batch 7
const arabicDefinitions = {
    "Dysenteri": "زحار (دوسنتاريا)",
    "Dyspepsi, dålig matsmältning": "عسر الهضم",
    "Däggdjur": "ثدييات",
    "Dämpande medel": "مهدئات (أو مواد مخمدة)",
    "Därigenom": "وبذلك (من خلال ذلك)",
    "Därnäst": "بعد ذلك",
    "Dödlig": "مميت (قاتل)",
    "Dödlighet": "معدل الوفيات",
    "Dödlighet en, mortaliteten": "معدل الوفيات (المورتالية)",
    "Dödshjälp": "القتل الرحيم",
    "Dövhet": "صمم",
    "Effektorgan": "عضو مستجيب (منفذ)",
    "Efferenta nerver": "أعصاب صادرة (حركية)",
    "Efterblivenhet": "تخلف (عقلي)",
    "Efterbörd": "خلاص (المشيمة)",
    "Efterbördsskede": "مرحلة خروج المشيمة",
    "Efterdropp": "تقاطر البول (بعد التبول)",
    "Egenskaper": "خصائص",
    "Egenvård": "رعاية ذاتية",
    "Eget boende": "سكن خاص",
    "EKG - elektrokardiografi": "تخطيط القلب الكهربائي (EKG)",
    "EKG - undersökning": "فحص تخطيط القلب",
    "Eko - encefalografi": "تخطيط صدى الدماغ",
    "Eko - kardiografi, ultraljudsundersökning": "تخطيط صدى القلب (إيكو)",
    "Eko - undersökning": "فحص بالصدى (ألتراساوند)",
    "Ekokardiografi": "تخطيط صدى القلب",
    "Elakartad, malign, tumör": "ورم خبيث",
    "Elakartad cellförändring": "تغير خلوي خبيث",
    "Elakartad tumör": "ورم خبيث",
    "Elakartade, maligna": "خبيثة",
    "Elasticitet": "مرونة",
    "Elastisk": "مرن",
    "Elastisk brosk": "غضروف مرن",
    "Elastisk kropp": "جسم مرن",
    "Elastisk trådar": "خيوط مرنة",
    "Elektroencefalografi EEG": "تخطيط كهربائية الدماغ (EEG)",
    "Elektroencefalogram, EEG": "مخطط كهربائية الدماغ",
    "Elektrokardiagram, EKG": "مخطط كهربائية القلب",
    "Elektrolyter": "إلكتراليتات (شوارد)",
    "Elektromyogram ( EMG )": "مخطط كهربائية العضل (EMG)",
    "Emboli": "انسداد وعائي (جلطة متحركة)",
    "Embryo": "جنين (في مراحله الأولى)",
    "Embryonala stadiet": "المرحلة الجنينية",
    "Embryot": "الجنين (المبكر)",
    "Encefalit": "التهاب الدماغ",
    "Encelliga organismer": "كائنات وحيدة الخلية",
    "Endocardit": "التهاب شغاف القلب",
    "Endocardium": "شغاف القلب (البطانة الداخلية)",
    "Endogena psykoser": "ذهان داخلي المنشأ",
    "Endokrin uppgift - Exokrin uppgift": "وظيفة صماء - وظيفة إفرازية خارجية",
    "Endokrina apparaten": "جهاز الغدد الصماء",
    "Endokrina körtlar": "غدد صماء",
    "Endokrinologen": "أخصائي الغدد الصماء",
    "Endolymfa": "اللمف الداخلي (في الأذن)",
    "Endometrios": "بطانة الرحم المهاجرة",
    "Endoplasmatiska nätverk": "شبكة إندوبلازمية",
    "Endoskopi": "تنظير داخلي (ناظور)",
    "Endoskopisk undersökning, gastroskopi": "فحص بالمنظار (تنظير معدة)",
    "Endoskopiska kirurgin": "جراحة المناظير",
    "Endoskopiska undersökningar": "فحوصات بالمنظار",
    "Energiomsättning": "استقلاب الطاقة (الأيض)",
    "Energiutvinning": "استخراج الطاقة",
    "Enkel fraktur": "كسر بسيط (غير مضاعف)",
    "Enkelomättat fett": "دهن أحادي غير مشبع",
    "Ensidig": "أحادي الجانب",
    "Ensidiga arbetsställningar": "وضعيات عمل ثابتةة (جانب واحد)",
    "Enstaka djurart": "نوع حيواني واحد (معين)",
    "Enterit": "التهاب الأمعاء (الدقيقة)",
    "Enterokocker": "مكورات معوية (بكتيريا)",
    "Entydig": "واضح (لا لبس فيه)",
    "Enzym": "إنزيم",
    "Enzymer": "إنزيمات",
    "Enzymet": "الإنزيم",
    "Epidemi": "وباء",
    "Epidemisk": "وبائي",
    "Epidemisk hepatit": "التهاب كبد وبائي",
    "Epidemiska": "وبائية",
    "Epidermis": "البشرة (الطبقة الخارجية للجلد)",
    "Epididymit": "التهاب البربخ",
    "Epifys": "مشاشة (طرف العظم) أو الغدة الصنوبرية",
    "Epiglottis ( gomsegel )": "لسان المزمار *ملاحظة: gomsegel هو شراع الحلق، epiglottis هو لسان المزمار*",
    "Epilepsi": "صرع",
    "Epileptiska anfall": "نوبات صرع",
    "Epitelceller": "خلايا طلائية",
    "Epitelvävnad": "نسيج طلائي",
    "Erektionsproblem": "مشاكل الانتصاب",
    "Erysipelas": "الحمرة (التهاب جلدي بكتيري)",
    "Erytema nödosum": "حمامى عقدة",
    "Esofagus ( matstrupe )": "المريء",
    "Esofagusvaricer": "دوالي المريء",
    "Essentiell hypertoni": "ارتفاع ضغط الدم الأساسي (مجهول السبب)",
    "ESVL, stenkross": "تفتيت الحصوات (بالموجات التصادمية)",
    "EU, EES - land": "دول الاتحاد الأوروبي/المنطقة الاقتصادية",
    "Europeiska sjukförsäkringskortet": "بطاقة التأمين الصحي الأوروبية",
    "Exaltation": "بهاج (نشوة مفرطة)",
    "Exantemssjukdom": "مرض طفحي (يسبب طفح جلد)",
    "Exogena orsaker": "أسباب خارجية",
    "Exogena psykoser": "ذهان خارجي المنشأ",
    "Exokrin uppgift - Endokrin uppgift": "وظيفة إفرازية خارجية - وظيفة صماء"
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
