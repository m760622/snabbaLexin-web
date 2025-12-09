/**
 * Add Arabic definitions for MedicinR terms - Batch 3
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

// Arabic definitions for MedicinR terms - Batch 3
const arabicDefinitions = {
    "Knät plötsligt låser sig": "الركبة تنقفل فجأة (تعلق)",
    "Kolhydrater": "كربوهيدرات",
    "Kolikinfektion": "عدوى قولونية (تسبب مغص)",
    "Kombinationspreparat, Kombinationspreparatet": "مستحضر مركب (أقراص مركبة)",
    "Konvexa glas ( utåtbuktad )": "عدسات محدبة (للخارج)",
    "Koronarangiografi": "تصوير الشرايين التاجية",
    "Korsbandsoperation": "عملية الرباط الصليبي",
    "Korsbandsskada": "إصابة الرباط الصليبي",
    "Korsben, Os sacrum": "عظم العجز",
    "Kotutskott, processus transversus vertebrae": "نتوء المستعرض للفقرة",
    "Kotutskott, processus transversus vertebrarum": "النتوءات المستعرضة للفقرات",
    "Kraftigt nedsatt": "منخفض بشدة",
    "Kramper i vaderna": "تشنجات في بطة الساق",
    "Kranskärlskirurgi": "جراحة الشرايين التاجية",
    "Kranskärlsröntgen": "أشعة الشرايين التاجية (قسطرة)",
    "Kronisk hosta": "سعال مزمن",
    "Kulled": "مفصل كروي",
    "Kyla": "برودة (تبريد)",
    "Känsla av upprymdhet": "شعور بالابنهاج",
    "Känslolöshet": "فقدان الإحساس (خدر)",
    "Kärlnystan": "كُبيبة وعائية (تشابك أوعية)",
    "Langerhanska öarna": "جزر لانجرهانس (في البنكرياس)",
    "Laryngit, Laryngitis": "التهاب الحنجرة",
    "Lateral, yttre menisk": "الغضروف الهلالي الوحشي (الخارجي)",
    "Lateral meniscus, yttre menisken, meniscus lateralis": "الغضروف الهلالي الوحشي",
    "Ledband": "أربطة",
    "Ledbrosk": "غضروف مفصلي",
    "Leden kan röras med minsta möjliga motstånd.": "يمكن تحريك المفصل بأقل مقاومة ممكنة",
    "Ledkapsel": "محفظة المفصل",
    "Ledkula": "رأس المفصل (الكرة)",
    "Ledsjukdom - Ledsjukdomar": "أمراض المفاصل",
    "Ledspringa": "شِق المفصل (الفراغ المفصلي)",
    "Ledspringor": "شقوق مفصلية",
    "Ledvätska": "سائل مفصلي (زلالي)",
    "Ledytor": "سطوح مفصلية",
    "Ligga inne på": "يرقد في (مستشفى)",
    "Likgiltighet": "لامبالاة",
    "Lindas in i sterila pappersdukar": "يلف بمناشف ورقية معقمة",
    "Liniment": "دهان (مرهم سائل)",
    "Livmodertappen, Portio vaginalis": "عنق الرحم (الجزء المهبلي - Portio)",
    "Lugnande läkemedel": "أدوية مهدئة",
    "Lungkliniken": "عيادة الأمراض الصدرية",
    "Lungsäcksinflammation, pleurit": "التهاب غشاء الجنب (ذات الجنب)",
    "Lungtuberkolos, Tbc": "سل رئوي (درن - TB)",
    "Lymfkärl, lymphaticum": "أوعية لمفاوية",
    "Lymfocyter - Lymfocyterna": "خلايا لمفاوية",
    "Lårben, femur": "عظم الفخذ",
    "Lårbenshuvud, caput femoris": "رأس عظم الفخذ",
    "Låsning": "انقفال (تشنج)",
    "Låsningsfenomen": "ظاهرة القفل (في المفصل)",
    "Läbbig ( otäck, äcklig, läskig, kuslig, ruskig, ruggig )": "مخيف (أو مقرف/مقزز)",
    "Lägg is - kylförband på knät": "ضع ثلجاً أو ضمادة باردة على الركبة",
    "Lägg på tryckförband runt knät.": "ضغ ضمادة ضاغطة حول الركبة",
    "Ländkotor, Vertebrae Lumbales": "فقرات قطنية",
    "Ländkotor 5, Vertebrae Lumbales": "الفقرات القطنية الخمسة",
    "Magnetkamera": "جهاز الرنين المغناطيسي",
    "Magont": "ألم البطن (مغص)",
    "Makroangiopati, Blodkärlsförändringar i stora kärl": "اعتلال الأوعية الدقيقة (في الواقع Makro هو للأوعية الكبيرة، النص السويدي صحيح: اعتلال الأوعية الكبيرة)",
    "Makrofager": "الخلايا البلعمية (البالعات)",
    "Malignt melanom": "ورم ميلانيني خبيث",
    "Mano depression tidigare": "الهوس الاكتئابي سابقاً (اضطراب ثنائي القطب)",
    "Mantouxprov": "إختبار مانتو (للسل)",
    "Maskeringsapparat": "جهاز حجب (للسمع)",
    "Mastceller, mastocyter": "خلايا بدينة (Mast cells)",
    "Medeltungt arbete": "عمل متوسط الشدة",
    "Medial, inre menisk": "الغضروف الهلالي الإنسي (الداخلي)",
    "Medial meniscus, inre menisken, meniscus medialis": "الغضروف الهلالي الإنسي",
    "Medicinsk diagnos": "تشخيص طبي",
    "Medvetandetillstånd": "حالة الوعي",
    "Mekanisk låsning": "قفل ميكانيكي (إعاقة حركة ميكانيكية)",
    "Mellanfotsben": "عظام مشط القدم",
    "Mellanhandsben, Metacarpus": "عظام مشط اليد",
    "Menisken går sönder igen": "تمزق الغضروف الهلالي مرة أخرى",
    "Menisker": "غضاريف هلالية",
    "Meniskoperation": "عملية الغضروف الهلالي",
    "Metabola syndromet": "متلازمة التمثيل الغذائي (الأيضية)",
    "Metallskaft": "ساق معدنية (للمفصل الصناعي)",
    "Meticillin": "ميثيسيلين (مضاد حيوي)",
    "Mikroangiopati, Blodkärlsförändringar i mindre kärl": "اعتلال الأوعية الدقيقة (Dumb vessels)",
    "Mikroskopisk undersökning": "فحص مجهري",
    "Milda manier": "نوبات هوس خفيفة",
    "Molande värk": "وجع كليل (مستمر)",
    "Motorik": "وظائف حركية (مهارات حركية)",
    "MRSA - resistenta bakterier": "بكتيريا مقاومة (MRSA)",
    "Multiresistenta bakteriestammar": "سلالات بكتيرية متعددة المقاومة",
    "Muskelkramp": "تشنج عضلي",
    "Muskelstyrka": "قوة العضلات",
    "Myrkrypningar": "تنميل (دبيب النمل)",
    "Mått på blodsockernivå under 8 - 10 veckor": "قياس مستوى السكر خلال 8-10 أسابيع (تراكمي)",
    "Nackbenet": "عظم القذالي (مؤخر الرأس)",
    "Nattlig svettning": "تعرق ليلي",
    "Nedbrutet brosk ( degenererats )": "غضروف متآكل (متنكس)",
    "Nedgång av insulinproduktion": "انخفاض إنتاج الأنسولين",
    "Nedsatt förmåga": "قدرة منخفضة (عجز جزئي)",
    "Neuropati, nedsatt känsel": "اعتلال عصبي (نقص الإحساس)",
    "Nickeleksem": "إكزيما النيكل",
    "Njurtröskel": "العتبة الكلوية",
    "Nyckelben, clavicula": "عظم الترقوة",
    "Närsynthet, Kortsynthet": "قصر النظر",
    "Näsbenet, Os nasale": "عظم الأنف"
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
