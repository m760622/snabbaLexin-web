/**
 * Add Arabic definitions for JuridikTB terms - Batch 8
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

// Arabic definitions for JuridikTB terms - Batch 8
const arabicDefinitions = {
    "Spioneri": "تجسس",
    "Standardavtal": "عقد موحد (معياري)",
    "Statslös": "عديم الجنسية (بدون)",
    "Straffrätt": "قانون العقوبات",
    "Strafftid": "مدة العقوبة (السجن)",
    "Styrka sin identitet": "يثبت هويته",
    "Styvbarn": "ابن الزوج/الزوجة",
    "Ställföreträdare": "ممثل قانوني (نائب)",
    "Ställt utom rimligt tvivel": "مثبت بما لا يدع مجالاً للشك",
    "Stämma": "يرفع دعوى (أو اجتماع جمعية)",
    "Stämningsansökan": "صحيفة الدعوى (طلب الاستدعاء)",
    "Stämpling till brott": "مؤامرة لارتكاب جريمة (تخطيط مشترك)",
    "Stängda dörrar": "أبواب مغلقة (جلسة سرية)",
    "Stöldgods": "مسروقات",
    "Sveda och värk": "ألم ومعاناة (تعويض عن ضرر مؤقت)",
    "Synnerliga skäl": "أسباب خاصة جداً (استثنائية)",
    "Synnerligen ömmande omständigheter": "ظروف مثيرة للشفقة للغاية (في اللجوء)",
    "Säkerhetskontroll": "فحص أمني",
    "Säkerhetspolisen": "شرطة الأمن (SÄPO - المخابرات)",
    "Särkullbarn": "أبناء من زواج سابق (لأحد الزوجين)",
    "Särlevnadsintyg": "شهادة انفصال (معيشي)",
    "Särskild behörighet ( för utbildning på högskola )": "أهلية خاصة (للقبول الجامعي)",
    "Särskild företrädare för barn": "ممثل خاص للطفل (في القضايا)",
    "Särskild handräckning": "مساعدة تنفيذية خاصة (لاستعادة حيازة انتزعت بقوة)",
    "Särskilda skäl": "أسباب خاصة",
    "Sätta i förvar ( migration )": "يضع في الحجز (للمهاجرين)",
    "Taxeringsår": "سنة التقييم الضريبي",
    "Testamentsexekutor": "منفذ الوصية",
    "Tidsfrist": "مهلة زمنية",
    "Tidsspillan": "ضياع الوقت (تعويض عنه)",
    "Tillbakaträdande": "انسحاب (من الجريمة قبل تمامها - عدول)",
    "Tillgrepp": "استيلاء (سرقة)",
    "Tillgreppsbrott": "جرائم الاستيلاء",
    "Tillkännagivande": "إعلان رسمي",
    "Tillstånd": "تصريح أو إذن",
    "Tillstånd för demonstration": "تصريح مظاهرة",
    "Tillsyn": "إشراف أو رقابة",
    "Tillåta": "يسمح",
    "Tillämpa ( lagen )": "يطبق (القانون)",
    "Tillämpligt lagrum": "النص القانوني المنطبق",
    "Tingsnotarie": "كاتب محكمة (متدرب قضائي)",
    "Trafikbrott": "جريمة مرورية",
    "Trafikförseelse": "مخالفة مرورية",
    "Trakasserier": "مضايقات",
    "Tredskodom": "حكم غيابي (بسبب تخلف الخصم)",
    "Treinstansordning": "نظام التقاضي على ثلاث درجات",
    "Trolöshet": "خيانة الأمانة",
    "Träda i kraft": "يدخل حيز التنفيذ",
    "Tvingande": "إلزامي (قواعد آمرة)",
    "Tvång omhändertagande": "رعاية قسرية (سحب الحضانة)",
    "Tvångsgifte": "زواج قسري",
    "Tvångsmedel": "تدابير قسرية (كالحجز، التوقيف)",
    "Umgänge med barn": "التواصل مع الأطفال (حق الزيارة)",
    "Umgängesförälder": "الوالد الزائر (غير الحاضن)",
    "Undanröja ( dom )": "يلغي (حكماً ويعيده للنظر)",
    "Undanröja bevis": "يطمس الأدلة",
    "Undanröjande": "إلغاء",
    "Under sanningsförsäkran": "بموجب إقرار بصحة المعلومات (تحت طائلة العقوبة)",
    "Underhandsackord": "صلح ودي (مع الدائنين)",
    "Underhållsbidrag": "نفقة (للأبناء أو الزوجة)",
    "Underhållsskyldighet": "واجب النفقة",
    "Underhållsstöd": "دعم النفقة (من التأمينات)",
    "Underlåta": "يمتنع أو يغفل",
    "Underrättelse": "إشعار أو إخطار",
    "Underrättelse om avhysning - vräkning": "إخطار بالإخلاء",
    "Undersökning": "تحقيق أو فحص",
    "Undertryckande av upplysningar": "كتمان المعلومات",
    "Ungdomsbrottslighet": "جنوح الأحداث",
    "Uppehållstillstånd": "تصريح إقامة",
    "Uppgivit": "صرّح أو ذكر",
    "Upphovsman": "مؤلف (أو فاعل الجريمة)",
    "Upphävande": "إبطال أو فسخ",
    "Upplåta": "يمنح حقاً (يؤجر)",
    "Upplåtelse": "منح حق الانتفاع",
    "Uppskov": "تأجيل",
    "Uppsägning": "إنهاء عقد (فسخ)",
    "Urkund": "وثيقة رسمية (محرر)",
    "Urkundsförfalskning": "تزوير الوثائق",
    "Utevaro": "غياب",
    "Utfärdande av stämning": "إصدار استدعاء للمحكمة",
    "Utfästelse": "تعهد",
    "Utfästelse ( löfte )": "تعهد (وعد)",
    "Utföra samhällstjänst": "يؤدي خدمة مجتمعية",
    "Utförsel": "تصدير (أو إخراج أموال)",
    "Utlägg": "مصاريف (مدفوعة مقدماً)",
    "Utlämna": "يسلم (مجرماً)",
    "Utlämning för brott": "تسليم المجرمين",
    "Utlänningslagen ( UtlL )": "قانون الأجانب",
    "Utmäta": "يحجز (تنفيذياً)",
    "Utmätningsfri egendom": "أموال معفاة من الحجز",
    "Utsaga": "إفادة (شهادة)",
    "Utskrivningsprövning": "فحص قرار الخروج (من الرعاية)",
    "Utslag": "قرار (حكم)",
    "Utsökning": "التنفيذ الجبري (تحصيل الديون)",
    "Utveckla talan": "يفصل دعواه (يشرح الأسباب)",
    "Utvisa": "يبعد (يطرد أجنبياً)",
    "Utvisning på grund av brott": "ترحيل بسبب جريمة",
    "Utöva tillsyn": "يمارس الرقابة",
    "Vandel": "سيرة وسلوك",
    "Vanvård": "إهمال (في الرعاية)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikTB.' && !currentDef.trim() && arabicDefinitions[word]) {
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
