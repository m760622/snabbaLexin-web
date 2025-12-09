/**
 * Add Arabic definitions for MedicinMR terms - Batch 3
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

// Arabic definitions for MedicinMR terms - Batch 3
const arabicDefinitions = {
    "Mastceller": "خلايا بدينة (Mast cells)",
    "Mejas ned": "يُحصد (يُقتل جماعياً)",
    "Ménières sjukdom": "مرض مينيير",
    "Mina känslor helt avtrubbade": "مشاعري متبلدة تماماً",
    "Mjäll eksem": "أكزيما القشرة (التهاب الجلد الدهني)",
    "Mobbing": "تنمر (تحرش)",
    "Mollusker, Molluscum contagiosum": "المليساء المعدية (محارة)",
    "Mongolfläck": "البقعة المنغولية",
    "Montera upp en pump": "تركيب مضخة",
    "Mygg": "بعوض",
    "Myomer": "أورام ليفية (ميوما)",
    "Mänsklig avföring": "براز بشري",
    "Nickel": "نيكل",
    "Nickelallergi": "حساسية النيكل",
    "Närkontakt": "اتصال مباشر (قريب)",
    "Näsan rinner": "سيلان الأنف",
    "Nässelutslag, Urtikaria": "شرى (أرتيكاريا/طفح جلدي)",
    "Näthinnans sinnesceller": "خلايا الشبكية الحسية",
    "Nötter": "مكسرات",
    "Oerhört obehagligt": "مزعج للغاية (فظيع)",
    "Ofräsch": "غير نظيف (كريه)",
    "Omskakad ( Upprörd, uppskakad )": "مصدوم (مضطرب)",
    "Omtumlad ( omskakad av nåt som hänt )": "دايخ (مشوش/مصدوم)",
    "Omvandlas": "يتحول",
    "Ont i magen": "ألم في البطن (المعدة)",
    "Operativa ingrepp": "تدخلات جراحية",
    "Ordinera halv dos": "يصف نصف الجرعة",
    "Orkeslösa": "خائر القوى (متهالك)",
    "Otitis": "التهاب الأذن",
    "Otitis interna": "التهاب الأذن الداخلية",
    "Penicillinkuren": "كورس البنسلين (العلاج)",
    "Pityriasis rosea, medaljongsjuka": "النخالية الوردية",
    "Plaströr": "أنبوب بلاستيكي",
    "Plattor av rostfritt stål": "صفائح فولاذ مقاوم للصدأ",
    "Pollenallergi": "حساسية اللقاح",
    "Polyper": "زوائد لحمية (سلائل)",
    "Posttraumatiskt stressyndrom": "اضطراب كرب ما بعد الصدمة (PTSD)",
    "Prickar": "نقاط (بقع حمراء)",
    "Provtagning - Provtagningar": "أخذ عينات",
    "Psykiskt ansträngande, mödosamt": "مرهق نفسياً",
    "Psykologen": "الأخصائي النفسي",
    "Pärlemorfärgad": "لؤلؤي اللون",
    "Ringorm, Revorm, Tinea corporis": "سعفة الجسد (قوباء حلقية)",
    "Runda fönstret": "النافذة المستديرة (في الأذن)",
    "Rundmaskarter": "أنواع الديدان المستديرة",
    "Runkar ( huvudet )": "يهز رأسه",
    "Ruskar": "يهز بعنف",
    "Ruskig ( ruskigt bra )": "فظيع (جيد بشكل هائل/مخيف)",
    "Ryggmärgsbedövning": "تخدير نصفي (نخاعي)",
    "Sandloppor, Tunga penetrans, Sarcopsylla p., Pulex p.": "براغيث الرمل",
    "Schistosomer": "بلهارسيا (منشقات)",
    "Segelklaff": "صمام أذيني بطيني (شراعي)",
    "Sekundärinfektion": "عدوى ثانوية",
    "Selektiva serotonin återupptagshämmare": "مثبطات استرداد السيروتونين الانتقائية (SSRI)",
    "Sitta still": "الجلوس بلا حراك",
    "Skakad ( starkt upprörd )": "مصدوم (مرتخ)",
    "Skakande ( starkt upprörande ) skakande upplevelse": "تجربة مزلزلة (صادمة)",
    "Skakar": "يهتز (يرتجف)",
    "Skakar i hela kroppen": "يرتجف جسمه بالكامل",
    "Skulle bara fattas att": "هذا ما كان ينقص (للتهكم)",
    "Skäller ut min fru för bagateller": "أوبخ زوجتي لأتفه الأسباب",
    "Slemhinnor": "أغشية مخاطية",
    "Slemlösande medicin, expektorantia, mukolytika": "دواء مذيب/طارد للبلغم",
    "Slutna frakturer": "كسور مغلقة",
    "Släktingar": "أقارب",
    "Smittan överförs genom": "تنتقل العدوى عن طريق",
    "Snurrar i huvudet": "دوار (دوخة)",
    "Sociala liv": "الحياة الاجتماعية",
    "Soldaterna": "الجنود",
    "Somna om": "العودة للنوم",
    "Sova en hel natt i sträck": "النوم لليلة كاملة متواصلة",
    "Sprängs sönder mastceller": "تنفجر الخلايا البدينة",
    "SSRI preparat": "مستحضرات SSRI",
    "Stafylokockinfektion": "عدوى المكورات العنقودية",
    "Storkbett, Naevus flammeus occipitalis": "وحمة (عضة اللقلق)",
    "Strömmar ut i slemhinnan": "يتدفق في الغشاء المخاطي",
    "Stympa liken": "تشويه الجثث",
    "Ständigt närvarande tinnitus": "طنين دائم",
    "Stör koncentrationsförmågan": "يشتت الانتباه (يخل بالتركيز)",
    "Störningar i cirkulation": "اضطرابات الدورة الدموية",
    "Suger blod": "يمتص الدم",
    "Svår upplevelse": "تجربة عصيبة",
    "Symtomen": "الأعراض",
    "Synproblem": "مشاكل البصر",
    "Så blir det full pott ( fått bästa möjliga resultat )": "تحقيق العلامة الكاملة",
    "Sömnmedicin": "دواء منوم",
    "Sömnsvårigheter": "صعوبات النوم",
    "Sötvattensjö": "بحيرة مياه عذبة",
    "Ta fäste i tunntarmen": "تلتصق بالأمعاء الدقيقة",
    "Ta sig in genom huden på människor": "تخترق الجلد البشري",
    "Tappar och stavar": "المخاريط والعصي (للشبكية)",
    "Tapparna": "المخاريط (خلايا الشبكية)",
    "Tar hela kuren": "يأخذ العلاج كاملاً",
    "Tarmen": "الأمعاء",
    "Testet": "الاختبار",
    "Tillfällig tinnitus": "طنين مؤقت",
    "Toxiskt utslag": "طفح جلدي سام (تحسسي)",
    "Tredagarsfeber, Exanthema subitum": "طفح مفاجئ (حمى الأيام الثلاثة)",
    "Trumhinnan perforerades": "اُنثقبت طبلة الأذن",
    "Trumhinnan röd": "طبلة الأذن حمراء"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinMR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
