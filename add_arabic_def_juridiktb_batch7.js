/**
 * Add Arabic definitions for JuridikTB terms - Batch 7
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

// Arabic definitions for JuridikTB terms - Batch 7
const arabicDefinitions = {
    "Oredlig": "غير نزيه (محتال)",
    "Organiserad brottslighet": "الجريمة المنظمة",
    "Osann partsutsaga": "إفادة كاذبة من الخصم",
    "Oskiftat bo": "تركة غير مقسمة",
    "Otrogen": "خائن (للأمانة أو الزوجية)",
    "Pantsättning": "رهن (وضع المال كضمان)",
    "Partsinlaga": "لائحة الخصم (مذكرة)",
    "Penninghäleri": "غسيل أموال (أو استلام أموال غير مشروعة)",
    "Personutredning": "تحقيق شخصي (عن المتهم)",
    "Plikt": "واجب",
    "Plädera": "يترافع",
    "Polisutredning": "تحقيق الشرطة",
    "Polygami": "تعدد الزوجات",
    "Praxis": "ممارسة قضائية (اجتهاد المحاكم)",
    "Preskription av brott": "تقادم الجريمة (سقوط الحق العام)",
    "Prisavdrag": "خصم من السعر (عيب في المبيع)",
    "Processrätt": "قانون أصول المحاكمات",
    "Provisoriskt pass": "جواز سفر مؤقت",
    "Pröva ansökan om asyl": "ينظر في طلب اللجوء",
    "Prövningstillstånd": "إذن بالتمييز (قبول الطعن)",
    "Prövotid": "فترة تجربة (مراقبة)",
    "Prövotidens utgång": "انقضاء فترة المراقبة",
    "Psykisk störning": "اضطراب نفسي",
    "Psykiskt lidande": "معاناة نفسية",
    "På bar gärning": "متلبساً (بالجرم المشهود)",
    "På heder och samvete": "بشرفي وضميري (إعلان رسمي)",
    "På obestånd": "في حالة إعسار",
    "På sannolika skäl misstänkt": "مشتبه به لأسباب محتملة (قوية)",
    "Realisationsskatt": "ضريبة الأرباح الرأسمالية (Reavinstskatt)",
    "Recidivfara": "خطر العود (للجريمة)",
    "Registrera ( en handling )": "يسجل (وثيقة)",
    "Regressrätt": "حق الرجوع (على المدين الأصلي)",
    "Reklamation": "شكوى (مطالبة بضمان العيب)",
    "Rekonstruktion": "إعادة هيكلة (للشركة)",
    "Religionsfrihet": "حرية الدين",
    "Remiss": "إحالة (لمراجعة أو استشارة)",
    "Resedokument": "وثيقة سفر (للاجئين)",
    "Reseförbud med": "منع السفر مع (فرض قيود)",
    "Resningsansökan": "طلب إعادة المحاكمة",
    "Restriktioner": "قيود (على السجين)",
    "Revisionsberättelse": "تقرير مدقق الحسابات",
    "Rimligt tvivel": "شك معقول",
    "Risk": "خطر",
    "Rådgivning": "مشورة",
    "Råna": "يسلب (يسرق بالإكراه)",
    "Rättegångsfullmakt": "وكالة قضائية",
    "Rättegångshinder": "مانع إجرائي (من نظر الدعوى)",
    "Rättegångsmissbruk": "إساءة استخدام حق التقاضي (للمماطلة)",
    "Rättelse av dom": "تصحيح الحكم (من أخطاء مادية)",
    "Rättens ordförande": "رئيس المحكمة (أو الجلسة)",
    "Rättens överläggning": "مداولة المحكمة",
    "Rättshaverist": "مشاكس قضائي (مدمن تقاضي)",
    "Rättshjälpsavgift": "رسوم المساعدة القضائية",
    "Rättshjälpsmyndigheten": "سلطة المساعدة القضائية",
    "Rättsintyg": "تقرير طب شرعي (عن الإصابات)",
    "Rättskipning": "القضاء (إقامة العدل)",
    "Rättskraft": "حجية الأمر المقضي به",
    "Rättsligtvist": "نزاع قانوني",
    "Rättspraxis": "السوابق القضائية",
    "Rättspsykiatrisk tvångsvård": "رعاية نفسية جنائية قسرية",
    "Rättsskyddsförsäkring": "تأمين الحماية القانونية",
    "Rättstillämpning": "تطبيق القانون",
    "Rösta": "يصوت",
    "Sakkunnigutlåtande": "تقرير الخبير",
    "Sakskada": "ضرر مادي",
    "Samfällighet": "ملكية مشتركة (للمرافق)",
    "Samhällstjänst": "خدمة المجتمع (عقوبة)",
    "Sannolika skäl": "أسباب محتملة (للظن)",
    "Sekretess": "سرية",
    "Sekretess markering": "علامة السرية (تشفير المعلومات في السجل)",
    "Sekretessbelagda uppgifter": "معلومات سرية",
    "Sekretesskydd": "حماية السرية",
    "Sexualbrott": "جريمة جنسية",
    "Signalement": "أوصاف (للمشتبه به)",
    "Självdeklaration": "إقرار ضريبي ذاتي",
    "Självförvållad": "تسبب فيه لنفسه",
    "Självtäkt": "اقتضاء الحق بالذات",
    "Skadeanmälan": "بلاغ عن ضرر (للتأمين)",
    "Skadeeffekt": "أثر الضرر",
    "Skadelidande": "المتضرر",
    "Skadestånd": "تعويض",
    "Skattebrott": "جريمة ضريبية",
    "Skattepliktig förmån": "ميزة خاضعة للضريبة",
    "Skatteredovisningsbrott": "جريمة الإقرارات الضريبية",
    "Skattesubjekt": "المكلف بالضريبة",
    "Skipa rättvisa": "يقيم العدل",
    "Skuldsanering": "تسوية الديون (للأفراد)",
    "Skyddade personuppgifter": "بيانات شخصية محمية",
    "Skyddande av brottsling": "تستر على مجرم",
    "Skyddsbehövande": "محتاج للحماية (طالب لجوء)",
    "Skyddstillsyn": "المراقبة (عقوبة)",
    "Skyldighet": "التزام أو واجب",
    "Skäligen misstänkt": "مشتبه به لسبب معقول (درجة أدنى من sannolika)",
    "Skälighetsbedömning": "تقدير المعقولية (الإنصاف)",
    "Slutanföranden": "المرافعات الختامية",
    "Sluten ungdomsvård": "رعاية الأحداث المغلقة (سجن الأحداث)",
    "Slutligt beslut": "قرار نهائي",
    "Smuggling": "تهريب",
    "Socialtjänsten": "دائرة الخدمات الاجتماعية (السوسيال)",
    "Specialpedagog": "مشرف تربوي خاص (لذوي الاحتياجات)"
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
