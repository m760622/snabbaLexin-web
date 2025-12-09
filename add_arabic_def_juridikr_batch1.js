/**
 * Add Arabic definitions for JuridikR terms - Batch 1
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

// Arabic definitions for JuridikR terms - Batch 1
const arabicDefinitions = {
    "Andra instans": "محكمة الدرجة الثانية (الاستئناف)",
    "Angrepp på egen rättsfär": "اعتداء على الحقوق الشخصية",
    "Anhålla": "يوقِف (يحتجز)",
    "Anmälningsskyldighet": "واجب الإبلاغ",
    "Anstalt": "مؤسسة إصلاحية (سجن)",
    "Ansvarsfrihetsgrunder": "أسباب الإعفاء من المسؤولية",
    "Argumentera för något som är ohållbart": "يادل لصالح قضية خاسرة (غير مستدامة)",
    "Armbindel": "شريط ذراع (شارة)",
    "Arrest": "توقيف (حجز)",
    "Avlägga vittnesmål": "يدلي بشهادة",
    "Avtjäna sitt straff": "يقضي عقوبته",
    "Beakta": "يراعي",
    "Belastningsregister": "سجل السوابق",
    "Belägger": "يحجز أو يفرض (ختماً أو قيداً)",
    "Benådar": "يعفو (عن عقوبة)",
    "Benådning": "عفو",
    "Beslag": "مُصادَرة (ضبط)",
    "Bestraffar": "يعاقب",
    "Betalningsföreläggande": "أمر أداء (مطالبة بالدفع)",
    "Bli frikänd": "يُبَرّأ",
    "Blir lite pilsk av några linjer": "يصبح مثاراً جنسياً من بضع أسطر (عبارة عامية/سياقية)",
    "Blivit diagnostiserad med gonorré": "تم تشخيصه بمرض السيلان (سياق طبي قانوني؟)",
    "Blodvite": "دم ناتج عن جرح (دية الجرح قديماً، أو أثر العنف)",
    "Blånad ( blåmärke, blodutgjutning, kontusion )": "كدمة (رضوض)",
    "Bouppteckningsblanketten från Skatteverket": "استمارة جرد التركة من مصلحة الضرائب",
    "Braja, Braj, Hasch": "ماريجوانا، حشيش (مخدرات)",
    "Brottsbeskrivning": "وصف الجريمة",
    "Brottsmisstanke": "اشتباه بجريمة",
    "Brottspåföljd efterges eller mildras": "العقوبة تسقط أو تخفف",
    "BrottsRekvisit": "أركان الجريمة",
    "Brottsrubricering": "تصنيف الجريمة (تكييف قانوني)",
    "Brytjärn": "أداة خلع (عتلة - تستخدم في السرقة)",
    "Butterflykniv": "سكين فراشة (سلاح محظور)",
    "Böter": "غرامة",
    "Bötfäller": "يغرم (يفرض غرامة)",
    "Cell": "زنزانة",
    "Dagsböter": "غرامات يومية",
    "Direkt uppsåt, avsiktsuppsåt ( dolus directus )": "قصد مباشر (عمد)",
    "Domen om äktenskapsskillnad": "حكم الطلاق",
    "Effektbrott": "جريمة ذات أثر (مادية)",
    "Eftergift": "تنازل",
    "Egna hemmet": "المنزل الخاص (بيت الزوجية)",
    "Elektronisk fotboja": "سوار إلكتروني",
    "En skrivelse": "مذكرة أو خطاب رسمي",
    "En ynklig liten armbindel": "شارة ذراع صغيرة بائسة (سياقي)",
    "Enkeltintyg": "شهادة بسيطة",
    "Enskild överläggning": "مداولة سرية",
    "Erkänner": "يعترف",
    "Faktisk villfarelse": "غلط في الواقع (جهل بالوقائع)",
    "Familjehem placerad": "مودع لدى أسرة بديلة",
    "Fingeravtryck": "بصمة إصبع",
    "Flyktfara": "خطر الهرب",
    "Fotboja": "سوار المراقبة (بالقدم)",
    "Fotografi": "صورة فوتوغرافية",
    "Friande dom": "حكم بالبراءة",
    "Frigång": "خروج نهار (للعمل أو الدراسة للسجين)",
    "Frihetsberövande straff ( dömde hamnar i Anstalt )": "عقوبة سالبة للحرية (السجن)",
    "Frihetsstraff": "عقوبة السجن",
    "Frivård ( Frivårdskontor )": "مكتب الرعاية الإصلاحية (المراقبة)",
    "Främjat gärningen med råd och dåd": "سهل الجريمة بالقول والفعل (مساعدة وتحريض)",
    "Fullföljdshänvisning": "إرشادات الطعن/الاستئناف",
    "Fyndförseelse": "جنحة عدم الإبلاغ عن لقطة",
    "Fängelse": "سجن",
    "Fängelse ( Finka )": "سجن (نظارة - بالعامية)",
    "Fästa avseende vid utsaga": "يعول على الإفادة (يعتبرها ذات مصداقية)",
    "För intagna": "للنزلاء (السجناء)",
    "Föreläggande av ordningsbot": "أمر غرامة فورية",
    "Förhör med part": "استجواب الخصم",
    "Förhörsvittne": "شاهد التحقيق",
    "Förmans befallning": "أمر الرئيس (في العمل أو الجيش)",
    "Förment brott": "جريمة مزعومة",
    "Förmildrande omständigheter": "ظروف مخففة",
    "Förnekar": "ينكر",
    "Förordna om betänketid": "يقرر مهلة تفكير (في الطلاق)",
    "Första instans": "محكمة الدرجة الأولى (البداية)",
    "Försvårande omständighet": "ظرف مشدد",
    "Försök till brott": "شروع في الجريمة",
    "Förundersökning": "تحقيق أولي",
    "Förvar": "حجز (إداري)",
    "Gemensam ansökan om äktenskapsskillnad": "طلب طلاق مشترك",
    "Gripa": "يقبض على",
    "Grov mordbrand": "حريق عمد جسيم",
    "Grov stöld": "سرقة جسيمة",
    "Grovt rån": "سطو مسلح (سلب جسيم)",
    "Hagelbössa": "بندقية صيد (خرطوش)",
    "Handlingsbrott": "جريمة سلوكية (لا تتطلب نتيجة)",
    "Handlingsrekvisit": "الركن المادي (للفعل)",
    "Havandeskapspenning av försäkringskassan": "بدل حمل (من التأمينات)",
    "Haveri": "تحطم (حادث جسيم)",
    "Hemlig kameraövervakning": "مراقبة سرية بالكاميرات",
    "Hemlig rumsavlyssning": "تنصت سري في الغرف (زرع أجهزة)",
    "Hemlig teleavlyssning": "تنصت هاتفي سري",
    "Hemlig teleövervakning": "مراقبة الاتصالات السرية (بيانات الاتصال)",
    "Henne kan man knappast ta på allvar": "بالكاد يمكن أخذها على محمل الجد (عبارة سياقية)",
    "Hovrätten": "محكمة الاستئناف",
    "Husrannsakan": "تفتيش (منزل/مكان)",
    "Huvudförhandling": "جلسة المحاكمة الرئيسية",
    "HVB - hem, Hem för vård eller boende": "دار رعاية وسكن (HVB)",
    "Hälarbrott": "جريمة التعامل بمسروقات (تستر)",
    "Häleri": "إخفاء مسروقات (تداول مال مسروق)",
    "Häleriförseelse": "جنحة إخفاء مسروقات (بسيطة)",
    "Häktad": "موقوف (محبوس احتياطياً)",
    "Häktad på sannolika skäl misstänkt för": "موقوف للاشتباه القوي بـ",
    "Häktning": "حبس احتياطي",
    "Häktningspromemoria": "مذكرة الحبس الاحتياطي",
    "Häktningsskäl": "موجبات الحبس الاحتياطي",
    "Högtalaranläggning": "نظام مكبرات الصوت",
    "I god tro": "بحسن نية",
    "Identitetskort": "بطاقة هوية",
    "Ingripande": "تدخل (للشرطة)",
    "Inkomma med ansökan": "يتقدم بطلب",
    "Inbrott": "سطو (كسر وخلع)",
    "Inbrottstjuv": "لص منازل",
    "Likviderades": "تمت تصفيته (قتله)",
    "Lullade": "ترنح (مشى بثمامة - سياقي)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
