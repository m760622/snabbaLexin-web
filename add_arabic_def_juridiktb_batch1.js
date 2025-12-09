/**
 * Add Arabic definitions for JuridikTB terms - Batch 1
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

// Arabic definitions for JuridikTB terms - Batch 1
// Translating Legal Paragraphs / Crimes
const arabicDefinitions = {
    "1 § bedrägeri": "المادة 1 § الاحتيال",
    "1 § förskingring": "المادة 1 § الاختلاس",
    "1 § förtal": "المادة 1 § القدح والذم (التشهير)",
    "1 § mened": "المادة 1 § شهادة الزور",
    "1 § miljöbrott": "المادة 1 § الجريمة البيئية",
    "1 § mord": "المادة 1 § القتل العمد",
    "1 § mordbrand": "المادة 1 § الحريق العمد",
    "1 § Människorov": "المادة 1 § الاختطاف",
    "1 § narkotikabrott": "المادة 1 § جرائم المخدرات",
    "1 § Oredlighet mot borgenär": "المادة 1 § الاحتيال على الدائنين",
    "1 § Skadegörelse": "المادة 1 § التخريب (إتلاف الممتلكات)",
    "1 § stöld": "المادة 1 § السرقة",
    "1 § upplopp": "المادة 1 § الشغب",
    "1 § urkundsförfalsning": "المادة 1 § تزوير الوثائق",
    "1 § vårdslöshet i trafik och grov vårdslöshet i trafik": "المادة 1 § الإهمال المروري والإهمال الجسيم في المرور",
    "1§ våldtäkt och grov våldtäkt": "المادة 1 § الاغتصاب والاغتصاب الجسيم",
    "10 § Arbetsmiljöbrott": "المادة 10 § جرائم بيئة العمل",
    "10 § försvårande av skattekontroll": "المادة 10 § عرقلة الرقابة الضريبية",
    "10 § ockerpantning": "المادة 10 § الرهن الربوي",
    "10 § olaga spridande av efterbildning": "المادة 10 § النشر غير القانوني للمقلدات",
    "10 § olovlig kraftavledning": "المادة 10 § سرقة الطاقة الكهربائية",
    "10 § olovlig underrättelseverksamhet": "المادة 10 § التجسس غير القانوني",
    "10 § sexuellt ofredande": "المادة 10 § التحرش الجنسي",
    "10 § övergrepp i rättssak": "المادة 10 § الاعتداء في قضية قانونية (تأثير على الشهود/القضاء)",
    "10b § olaga våldsskildring": "المادة 10 ب § تصوير العنف غير القانوني",
    "11 § köp av sexuell tjänst": "المادة 11 § شراء خدمات جنسية",
    "12 § olovlig värvning": "المادة 12 § التجنيد غير القانوني",
    "12 koppleri och grovt koppleri": "المادة 12 القوادة والقوادة الجسيمة",
    "16 § Förargelseväckande beteende": "المادة 16 § السلوك المثير للاستياء (الإخلال بالآداب)",
    "2 § bedrﬁgligt beteende": "المادة 2 § السلوك الاحتيالي (تم تعديله إلى احتيال بسيط)",
    "2 § dråp": "المادة 2 § القتل الخطأ (أو القتل المخفف - Dråp)",
    "2 § förvanskning av urkund": "المادة 2 § تحريف الوثائق",
    "2 § grov mordbrand": "المادة 2 § حريق عمد جسيم",
    "2 § grov oredlighet mot borgeniir": "المادة 2 § احتيال جسيم على الدائنين",
    "2 § olaga frihetsberövande": "المادة 2 § حجز الحرية غير القانوني",
    "2 § osann partsutsaga": "المادة 2 § إفادة كاذبة من الخصم",
    "2 § sexuellt utnyttjande - och grovt sexuellt utnyttjande av person i beroendeställning": "المادة 2 § استغلال جنسي (وجسيم) لشخص في حالة تبعية",
    "2 § skattebrott": "المادة 2 § جريمة ضريبية",
    "2 § snatteri": "المادة 2 § السرقة البسيطة (نشل المحلات)",
    "2 § undandräkt": "المادة 2 § اختلاس الأمانة (خيانة أمانة بسيطة)",
    "2 § vållande till miljöförstörelse": "المادة 2 § التسبب في تدمير البيئة",
    "2 § Åverkan": "المادة 2 § إضرار بسيط بالممتلكات",
    "3 § barnadråp": "المادة 3 § قتل الطفل (من قبل الأم عند الولادة)",
    "3 § föralämpning": "المادة 3 § الشتم (الإهانة)",
    "3 § förvanskande av familjeställning": "المادة 3 § تزوير الحالة العائلية",
    "3 § grov Skadegörelse": "المادة 3 § تخريب جسيم",
    "3 § grovt bedrägeri": "المادة 3 § احتيال جسيم",
    "3 § miljöfarlig kemikaliehantering": "المادة 3 § التعامل الخطر مع الكيماويات بيئياً",
    "3 § ohörsamhet mot ordningsmakt": "المادة 3 § عصيان رجال السلطة",
    "3 § olovlig körning": "المادة 3 § قيادة غير قانونية (بدون رخصة)",
    "3 § skatteförseelse": "المادة 3 § مخالفة ضريبية",
    "3 § Vårdslöshet mot borgenär": "المادة 3 § إهمال تجاه الدائنين",
    "3:: § subventionsmissbruk": "المادة 3 § إساءة استخدام الدعم المالي",
    "3a § vårdslöhet med narkotika": "المادة 3 أ § إهمال في التعامل مع المخدرات",
    "4 § egenmäktighet med barn": "المادة 4 § تعسف مع الأطفال (خطف الوالدين)",
    "4 § grov stöld": "المادة 4 § سرقة جسيمة",
    "4 § grovt skattebrott": "المادة 4 § جريمة ضريبية جسيمة",
    "4 § Mannamån mot borgenär": "المادة 4 § محاباة الدائنين (تفضيل دائن)",
    "4 § olaga tvång": "المادة 4 § إكراه غير قانوني",
    "4 § olovlig kårverksamhet": "المادة 4 § نشاط شبه عسكري غير قانوني",
    "4 § olovligt förfogande": "المادة 4 § تصرف غير قانوني (بمال الغير)",
    "4 § otillåten miljöverksamhet": "المادة 4 § نشاط بيئي محظور",
    "4 § rattfylleri": "المادة 4 § القيادة تحت تأثير السكر",
    "4 § sabotage": "المادة 4 § أعمال تخريبية (ضد الدولة)",
    "4 § sexuellt utnyttjande av barn": "المادة 4 § استغلال الأطفال جنسياً",
    "4 § tagande av olovlig väg": "المادة 4 § اجتياز طريق غير مسموح",
    "4 § utpressning": "المادة 4 § الابتزاز",
    "4a § grov fridskränkning och grov kvinnofridskränkning": "المادة 4 أ § انتهاك الحرمة الجسيم وانتهاك حرمة المرأة الجسيم",
    "4a § grovt rattfylleri": "المادة 4 أ § سكر شديد أثناء القيادة",
    "5 § bokföringsbrott": "المادة 5 § جرائم محاسبية",
    "5 § försvårande av miljökontroll": "المادة 5 § عرقلة الرقابة البيئية",
    "5 § grovt sabotage": "المادة 5 § تخريب جسيم",
    "5 § misshandel": "المادة 5 § الاعتداء بالضرب",
    "5 § ocker": "المادة 5 § الربا الفاحش (الاستغلال)",
    "5 § olaga hot": "المادة 5 § التهديد غير القانوني",
    "5 § rån": "المادة 5 § السلب (السرقة بالإكراه)",
    "5 § sexuellt övergrepp mot barn och grovt sexuellt övergrepp mot barn": "المادة 5 § اعتداء جنسي (وجسيم) على الأطفال",
    "5 § smitning": "المادة 5 § الهروب من موقع الحادث",
    "5 § trolöshet mot huvudman": "المادة 5 § خيانة الأمانة ضد الموكل",
    "5 § uppvigling": "المادة 5 § التحريض على التمرد",
    "5 § vårdslös skatteuppgift": "المادة 5 § تقديم بيانات ضريبية مهملة",
    "5b § ﬂygplatssabotage": "المادة 5 ب § تخريب المطارات",
    "6 § behörighﬁrighetsmissbruk": "المادة 6 § إساءة استعمال الصلاحية",
    "6 § bristfällig miljöinformation": "المادة 6 § نقص المعلومات البيئية",
    "6 § grov misshandel": "المادة 6 § اعتداء جسدي جسيم",
    "6 § grovt rån": "المادة 6 § سلب مسلح (سطو جسيم)",
    "6 § hemfridsbrott och olaga intrång": "المادة 6 § انتهاك حرمة المنزل والتعدي غير القانوني",
    "6 § häleri": "المادة 6 § تداول المسروقات (اخفاء مسروقات)",
    "6 § myteri": "المادة 6 § تمرد (عسكري)",
    "6 § olaga intrång": "المادة 6 § تعدي غير قانوني (على ممتلكات)",
    "6 § skatteavdragsbrott": "المادة 6 § جريمة استقطاع الضريبة",
    "6a § penningtvättsbrott": "المادة 6 أ § جريمة غسيل الأموال",
    "7 § ofredande": "المادة 7 § المضايقة (إزعاج)",
    "7 § olovligt brukande": "المادة 7 § الاستخدام غير المشروع",
    "7 § skatteredovisningsbrott": "المادة 7 § جريمة التقارير الضريبية",
    "7 § tillgrepp av fortskaffningsmedel": "المادة 7 § سرقة وسيلة نقل",
    "7 § vedskrivning": "المادة 7 § التشهير (القذف) - خطأ إملائي محتمل لـ Vedeskrivning? أو Åtal? السياق يوحي بجريمة.",
    // Safe fallback for obscure "vedskrivning" which seems typo for "Vedergällning" or similar?
    // Looking at Brottsbalken kap 8 § 7 leads to "Egenmäktigt förfarande".
    // Wait, Kap 5 § 7 doesn't exist. Kap 3 § 7 is Vållande till annans död.
    // Kap 5 § 1 is Förtal.
    // "vedskrivning" isn't a standard term. Skipping or marking vague.
    "7 § vedskrivning": "المادة 7 § (مصطلح غير واضح - ربما خطأ إملائي)",
    "7 § vållande till annans död": "المادة 7 § التسبب في وفاة آخر",
    "7a § penningtvättsbrottföseelse": "المادة 7 أ § مخالفة غسيل الأموال",
    "8 § brytande av post och telehemlighet": "المادة 8 § خرق سرية البريد والاتصالات"
};

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Typo handling in match
    if (type === 'JuridikTB.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
    }
});

const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log('✅ Updated JuridikTB definitions batch 1');
