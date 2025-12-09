/**
 * Add Arabic definitions for JuridikS terms - Batch 13
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

// Arabic definitions for JuridikS terms - Batch 13
const arabicDefinitions = {
    "Personskada": "إصابة جسدية",
    "Personuppgift": "بيانات شخصية",
    "Personuppgifter": "بيانات شخصية",
    "Personuppgiftslagen PuL": "قانون البيانات الشخصية (حل محله GDPR)",
    "Personutredning PU": "تحقيق شخصي (عن الوضع الاجتماعي للمتهم)",
    "Plan och bygglagen": "قانون التخطيط والبناء",
    "Plan och byggmål": "قضايا التخطيط والبناء",
    "Plädering": "المرافعة الختامية (في المحكمة)",
    "Plädering": "مرافعة",
    "Pläderingar": "مرافعات",
    "Policydokument": "وثيقة السياسات واللوائح",
    "Polisarrest": "حجز الشرطة (النظارة)",
    "Polisdistrikt": "منطقة (دائرة) الشرطة",
    "Polisen": "الشرطة",
    "Polisens utlandsstyrka": "قوة الشرطة العاملة في الخارج (بعثات دولية)",
    "Polisförordning": "لائحة الشرطة",
    "Polismyndighet": "سلطة الشرطة (الجهاز الشرطي)",
    "Polismästare": "مدير الشرطة (رئيس الدائرة)",
    "Polisnämnd": "مجلس الشرطة (هيئة رقابية مدنية سابقا)",
    "Polisorganisation": "تنظيم الشرطة",
    "Polisrapport": "تقرير الشرطة (محضر)",
    "Polisverksamhet": "العمل الشرطي",
    "Polisväsende": "جهاز الشرطة",
    "Politisk åskådning": "معتقد أو رأي سياسي",
    "Positiv rättskraft": "قوة الحكم الإيجابية (إمكانية التنفيذ والبناء عليه)",
    "Post och inrikes tidningar PoIT": "صحيفة البريد والأنباء الداخلية (الجريدة الرسمية للإعلانات)",
    "Prejudikat": "سابقة قضائية (حكم ملزم للمحاكم الأدنى)",
    "Prejudikatdispens": "إذن بالتمييز لتأسيس سابقة قضائية",
    "Prejudikatinstans": "محكمة النقض (المحكمة التي تضع السوابق)",
    "Preklusionsföreläggande": "إنذار بسقوط الحق (في حال عدم المطالبة)",
    "Preskription": "تقادم (الزمن المسقط للحق أو العقوبة)",
    "Pressens opinionsnämnd PON": "مجلس الرأي للصحافة (لجنة أخلاقيات)",
    "Prevention": "الردع والوقاية",
    "Preventiv": "وقائي (رادع)",
    "Prima vista översättning": "ترجمة فورية للنص المكتوب (من النظرة الأولى)",
    "Principalansvar": "مسؤولية المتبوع عن أعمال تابعه (مسؤولية صاحب العمل)",
    "Prioriterad fordringsägare": "دائن ممتاز (له أولوية)",
    "Prioriterade fordringsägare": "دائنون ممتازون",
    "Prisbasbelopp": "المبلغ الأساسي للأسعار (لتحديد الإعانات والضرائب)",
    "Privat försvarare": "محامي خاص (يختاره ويدفع له المتهم)",
    "Privata aktiebolag": "شركات مساهمة خاصة",
    "Privaträtt": "القانون الخاص",
    "Privaträttsliga associationer": "كيانات القانون الخاص (شركات وجمعيات خاصة)",
    "Privilegier": "امتيازات أو حصانات",
    "Process": "إجراء قضائي (محاكمة)",
    "Processbehörighet": "صلاحية مباشرة الإجراءات (التمثيل القانوني)",
    "Processhabilitet": "أهلية التقاضي (القدرة العقلية للمثول أمام القضاء)",
    "Processledning": "إدارة الدعوى (من قبل القاضي)",
    "Processprincip": "مبدأ إجرائي",
    "Processprinciper": "مبادئ المحاكمات",
    "Processrätt": "قانون أصول المحاكمات",
    "Processuella grundbegrepp": "مفاهيم إجرائية أساسية",
    "Produktansvar": "المسؤولية عن عيوب المنتجات",
    "Produktsäkerhet": "سلامة المنتجات",
    "Produktsäkerhetslagen": "قانون سلامة المنتجات",
    "Promulgation": "إصدار القانون (نشره ليصبح نافذاً)",
    "Promulgera": "يصدر قانوناً",
    "Protokoll": "محضر (جلسة أو اجتماع)",
    "Protokollförare": "كاتب المحضر",
    "Provision": "عمولة",
    "Prövning": "فحص أو نظر (في طلب أو قضية)",
    "Psykiatrimål": "قضايا الطب النفسي القسري",
    "Psykisk och fysisk hälsa": "الصحة النفسية والجسدية",
    "Publicitetsprincipen": "مبدأ العلنية (في التسجيل العقاري مثلاً)",
    "Publika aktiebolag": "شركات مساهمة عامة",
    "Punktskrift": "طريقة برايل (للمكفوفين)",
    "Putativsituationer": "حالات توهم الخطر (دفاع شرعي وهمي)",
    "Påföljdssystem": "نظام العقوبات والجزاءات",
    "Ramavtal": "اتفاقية إطارية",
    "Rapporteftergift": "التغاضي عن رفع تقرير (تنبيه شفوي بدل المخالفة)",
    "Ras": "عرق",
    "Ratificera": "يصادق (على معاهدة)",
    "Ratificerat": "مُصادق عليه",
    "Realavtal": "عقد عيني (يتم بتسليم الشيء كالرهن الحيازي)",
    "Realisationsförlust": "خسارة رأسمالية (عند البيع بأقل من الشراء)",
    "Recidiv fara": "خطر العود (تكرار الجريمة)",
    "Recidivfara": "خطر العود",
    "Redbart liv": "إنقاذ الحياة",
    "Reella bevismedel": "أدلة مادية (مستندات وأشياء)",
    "Reella tvångsmedel": "تدابير قسرية عينية (مصادرة أو تفتيش مكان)",
    "Reformatio in pejus": "تغيير الحكم للأسوأ (في الاستئناف)",
    "Regering": "الحكومة",
    "Regeringschef": "رئيس الحكومة",
    "Regeringsformen RF": "دستور نظام الحكم",
    "Regeringsrätten": "المحكمة الإدارية العليا (سابقاً)",
    "Regionchef": "رئيس الإقليم",
    "Regionförbund": "اتحاد البلديات الإقليمي",
    "Register": "سجل",
    "Registerenhet": "وحدة السجلات",
    "Registerområde": "منطقة التسجيل",
    "Registrerat partnerskap": "شراكة مسجلة (للمثليين سابقاً)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using simple mapping to handle duplicates in list
    if (type === 'JuridikS.' && !currentDef.trim() && arabicDefinitions[word]) {
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
