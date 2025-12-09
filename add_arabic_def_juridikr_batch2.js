/**
 * Add Arabic definitions for JuridikR terms - Batch 2
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

// Arabic definitions for JuridikR terms - Batch 2
const arabicDefinitions = {
    "Häkte, Häktet": "مركز التوقيف (السجن الاحتياطي)",
    "Hävdar": "يدعي (يزعم)",
    "Högsta Domstolen - HD": "المحكمة العليا",
    "I den där röran": "في تلك الفوضى (عبارة سياقية)",
    "Incident": "حادثة (عارضة)",
    "Indirekt uppsåt, insiktsuppsåt ( dolus indirectus )": "قصد غير مباشر (علم احتمالي)",
    "Individuell Behandlingsplan": "خطة علاج فردية",
    "Informera Dig": "استعلم (احصل على المعلومات)",
    "Intagen ( i fängelse )": "نزيل (في السجن)",
    "IÖV Lag om intensivövervakning med elektronisk kontroll": "قانون المراقبة المكثفة بالرقابة الإلكترونية (IÖV)",
    "Jag beklagar sorgen": "أشاطركم الأحزان (تعزية)",
    "Jurist kandidaten": "مرشح قانوني (طالب حقوق متدرب)",
    "Kalabalik": "فوضى عارمة (شغب)",
    "Kamouflage mönstrade": "مموهة (منقوشة بنمط التمويه)",
    "Kan misstänkas": "يمكن الاشتباه به",
    "Kollusionsfara": "خطر طمس الأدلة (التواطؤ)",
    "Konditionsbesiktning": "فحص اللياقة (حالة الشيء)",
    "Kontokortsbedrägeri": "احتيال البطاقات المصرفية",
    "Kontraktsvård": "رعاية تعاقدية (علاج بدل السجن)",
    "Kravallpolis": "شرطة مكافحة الشغب",
    "Kravbrev": "رسالة مطالبة (بالدفع)",
    "Kriminalvård ( Kriminalvårdsanstalt )": "الرعاية الجنائية (إصلاحية)",
    "Kriminalvård i frihet": "رعاية جنائية غير احتجازية",
    "Kroppsvisitation, kroppsbesiktning": "تفتيش جسدي (خارجي/داخلي)",
    "Kvarstad": "حجز تحفظي",
    "Kyrklig ceremoni": "مراسم كنسية",
    "Kåkfarare": "سجين سابق (معتاد السجون)",
    // "Kåkfarare" duplicate handled by script logic if distinct entry
    "Laga befogenhet": "صلاحية قانونية",
    "Lagliga medel": "وسائل قانونية",
    "Lider av diabetes": "يعاني من السكري (سياق طبي)",
    "Ligist": "جانح (مشاغب)",
    "Likgiltighetsuppsåt, eventuellt uppsåt": "قصد احتمالي (لا مبالاة بالنتيجة)",
    "Lokalanstalt": "سجن محلي",
    "LUL Lag om särskild bestraffning av unga lagöverträdare": "قانون عقوبات الأحداث (LUL)",
    "LVM - anmälan ( från Socialtjänsten till förvaltningsrätten )": "بلاغ رعاية المدمنين (LVM)",
    "LVM - hem": "دار رعاية المدمنين (LVM-hem)",
    "Lydnadsbrott ( Myteri )": "جريمة عصيان (تمرد)",
    "Läkararvode": "أتعاب الطبيب",
    "Läkarkontroll": "فحص طبي",
    "Läkarrecept": "وصفة طبية",
    "Läkarteam": "فريق طبي",
    "Läkarvårdsersättning": "تعويض الرعاية الطبية",
    "Läkarvårdstaxa": "تسعيرة الرعاية الطبية",
    "Läkemedelsindustri": "صناعة الأدوية",
    "Medelst intrång ( genom intrång )": "عن طريق الاقتحام",
    "Medger": "يقر (أو يسمح)",
    "Medverkan till brott": "مساهمة في الجريمة",
    "Mimiken": "تعابير الوجه",
    "Missdådare": "فاعل شر (مجرم)",
    "Misstänkte": "المشتبه به",
    "Morakniv": "سكين مورا (نوع سكاكين سويدي)",
    "Målsägande": "المجني عليه (المدعي)",
    "Narkotika innehav": "حيازة المخدرات",
    "Narkotikainnehav": "حيازة مخدرات",
    "Neka ( han nekar till brottet men han förnekar att han har begått brottet )": "ينفي (ينكر التهمة)",
    "Normerade böter": "غرامات محددة (مقننة)",
    "Nåd": "عفو",
    "Nödvärnaccess": "تجاوز حد الدفاع الشرعي",
    "Nödvärnsrätt": "حق الدفاع الشرعي",
    "Nöjdförklara sig": "يعلن قبوله بالحكم",
    "Oaktsamhet, vårdslöshet ( Culpa )": "إهمال (خطأ غير عمدي)",
    "Objektiva rekvisit": "أركان مادية (موضوعية)",
    "Och kopplat ett grepp på mig": "وأمسك بي بقوة (خنقني/ثبتني - سياقي)",
    "Ocker": "ربا (استغلال فاحش)",
    "Oeftergivlig": "لا يمكن التنازل عنه (إلزامي)",
    "Olovligt förfogande": "تصرف غير قانوني",
    "Omhänderta": "يتحفظ على (يحتجز أو يسحب رعاية)",
    "Omhändertagande av körkort": "سحب رخصة القيادة",
    "Omhändertagande av pass": "مصادرة جواز السفر",
    "Ostridigt": "غير متنازع عليه (مُسلَّم به)",
    "Otidigheter": "بذاءات (شتائم)",
    "Patrullbil": "دورية شرطة (سيارة)",
    "Patrullerade": "قام بدورية",
    "Pengakassett": "خزنة نقود (صندوق)",
    "Penningböter": "غرامة مالية (مبلغ ثابت)",
    "Pensionera": "يحيل للتقاعد",
    "Pensionsavgift": "رسوم التقاعد",
    "Pensionsberättigad": "مستحق للتقاعد",
    "Pensionsförmån": "مزايا التقاعد",
    "Pensionsförsäkring": "تأمين التقاعد",
    "Pensionskapital": "رأس مال التقاعد",
    "Pensionspoäng": "نقاط التقاعد",
    "Pensionssparande": "ادخار التقاعد",
    "Pensionssparkonto": "حساب توفير التقاعد",
    "Pensionsstftelse": "صندوق التقاعد",
    "Pensionstillskott": "إعانة التقاعد",
    "Pensionstillägg": "علاوة التقاعد",
    "Pensionärshem": "دار المسنين",
    "Personalian": "البيانات الشخصية",
    "Personella bevismedel": "أدلة شخصية (شهادات)",
    "Personella tvångsmedel": "تدابير قسرية شخصية (توقيف/قبض)",
    "Personutredning": "تحقيق اجتماعي (عن المتهم)",
    "Plädering": "مرافعة",
    "Polispatrull": "دورية شرطة",
    "Prövotid": "فترة مراقبة (تجربة)",
    "Putativt samtycke ( inbillat samtycke )": "موافقة مفترضة (ظنية)",
    "På Sannolika skäl misstänkt": "مشتبه به لأسباب قوية",
    "Påföljderna enligt BrB": "العقوبات وفق القانون الجنائي (BrB)",
    "Razzia ( överraskande ingripande av polis )": "مداهمة (كبسة شرطة)"
};

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikR.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
    }
});

const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log('✅ Updated JuridikR definitions batch 2');
