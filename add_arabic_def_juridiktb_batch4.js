/**
 * Add Arabic definitions for JuridikTB terms - Batch 4
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

// Arabic definitions for JuridikTB terms - Batch 4
const arabicDefinitions = {
    "Franchising": "امتياز تجاري (فرنشايز)",
    "Fredsfrämjande verksamhet": "نشاط حفظ السلام",
    "Frige": "يفرج عن (يطلق سراح)",
    "Frihetsberövad": "مسلوب الحرية (سجين أو معتقل)",
    "Frihetsstraff": "عقوبة سالبة للحرية (سجن)",
    "Frikänd": "مُبرَّأ",
    "Frist": "مهلة",
    "Frivillig": "تطوعي أو طوعي",
    "Frivilligvård": "مصلحة الرعاية غير الاحتجازية (خارج السجن)",
    "Frivården": "مصلحة الرعاية الإصلاحية المفتوحة (Frivården)",
    "Frivårdspåföljd": "عقوبة إصلاحية خارج السجن",
    "Frånskild": "مُطَلَّق",
    "Frånvaro": "غياب",
    "Främja": "يعزز أو يسهل",
    "Främlingspass": "جواز سفر للأجانب",
    "Fullföljdshänvisning": "إرشادات الاستئناف (الطعن في الحكم)",
    "Fullgöra ( fullgörelsetalan )": "أداء (دعوى إلزام بالأداء)",
    "Fällande dom": "حكم بالإدانة",
    "Färdtjänst": "خدمة النقل الخاص (للمسنين والمعاقين)",
    "Föra någons talan": "يمثل شخصاً (يترافع عنه)",
    "Föra talan": "يقيم الدعوى (يترافع)",
    "Förargelseväckande beteende": "سلوك مثير للاستياء (مخل بالآداب)",
    "Förbehåll ( förbehållsbelopp )": "المبلغ المحفوظ (للمعيشة عند الحجز على الراتب)",
    "Förberedelse till brott": "التحضير لجريمة",
    "Förbiseende": "سهو أو غفلة",
    "Förbud": "منع أو حظر",
    "Förebygga": "يمنع أو يقي",
    "Förebyggande åtgärd": "إجراء وقائي",
    "Föredragande": "مقرر (القاضي المقرر أو الموظف)",
    "Föredragare": "مقرر",
    "Föreskrifter": "أنظمة أو لوائح تنظيمية",
    "Föreskriva": "ينص أو يقرر (في القانون)",
    "Företagskoncentration": "اندماج الشركات (التركيز الاقتصادي)",
    "Företräde": "أسبقية أو تمثيل",
    "Förfalla": "يستحق (الدين) أو يسقط (الحق)",
    "Förfallna ränta": "الفائدة المستحقة",
    "Förfallodag": "تاريخ الاستحقاق",
    "Förfallotid": "وقت الاستحقاق",
    "Författning": "دستور أو قانون مكتوب",
    "Förflytta": "ينقل (موظف أو سجين)",
    "Förfogande": "تصرف (استعمال شيء)",
    "Förgripelse mot tjänsteman": "تهجم على موظف عام (اعتداء بسيط)",
    "Förhandling i domstol": "جلسة محاكمة (مداولة علنية)",
    "Förhörsvittne": "شاهد على الاستجواب (كان يحضر التحقيق لضمان النزاهة)",
    "Förköpsrätt": "حق الشفعة (أو الأولوية في الشراء)",
    "Förlikning": "صلح (تسوية ودية)",
    "Förmildrande omständigheter": "ظروف مخففة",
    "Förmynderskap": "وصاية (على قاصر)",
    "Förneka": "ينكر",
    "Förolämpning": "إهانة أو شتم",
    "Förordnas som god man": "يعين كقيم (وصي إداري)",
    "Förpliktas": "يلزم (بحكم المحكمة)",
    "Förskott": "سلفة أو دفعة مقدمة",
    "Förskott på arv": "سلفة على الميراث (تخصم لاحقاً)",
    "Försummelse": "إهمال أو تقصير",
    "Försätta i konkurs ( Försättande i konkurs )": "إشهار الإفلاس",
    "Försörjningsplikt": "واجب الإعالة (النفقة)",
    "Förundersökning": "تحقيق أولي (جنائي)",
    "Förundersökningsprotokoll": "محضر التحقيق الأولي",
    "Förvaltningsdomstol": "محكمة إدارية",
    "Förvar": "حجز (إداري للأجانب)",
    "Förverka egendom": "يصادر الممتلكات",
    "Förverkad egendom": "ممتلكات مصادرة",
    "Förverkande av egendom": "مصادرة الممتلكات",
    "Förvärv i god tro": "اكتساب بحسن نية",
    "Gallra": "يشطب (من السجلات)",
    "Ge fullmakt": "يمنح وكالة (يوكل)",
    "Gemensam vårdnad": "حضانة مشتركة",
    "Gemensamt ansvar": "مسؤولية مشتركة",
    "Generell tolked": "قسم الترجمة العام",
    "Giftorätt": "حق الزوجية المالي (نصف ممتلكات الزوج)",
    "Giltig": "ساري المفعول (صحيح قانوناً)",
    "Gisslan": "رهينة",
    "God man": "قيِّم (وصي قانوني يساعد من يحتاج مساعدة)",
    "Granskning": "تدقيق أو فحص",
    "Gravationsbevis": "شهادة القيود العقارية (خلو العقار من الديون)",
    "Griftefridsbrott": "انتهاك حرمة القبور",
    "Grov kvinnofridskränkning": "انتهاك حرمة المرأة الجسيم (عنف منزلي)",
    "Grov våldtäkt": "اغتصاب جسيم",
    "Grov vårdslöshet i trafik": "إهمال مروري جسيم",
    "Grovt sabotage": "تخريب جسيم",
    "Grund för talan": "سند الدعوى (الأساس القانوني)",
    "Grundlag": "دستور (قانون أساسي)",
    "Grupptalan": "دعوى جماعية",
    "Gåva mellan makar": "هبة بين الزوجين",
    "Gåvobrev": "سند هبة",
    "Gäldenär": "مدين",
    "Gärningsbeskrivning": "وصف الجرم (لائحة الاتهام)",
    "Gärningsman": "جاني (فاعل الجريمة)",
    "Göra gällande": "يتمسك بـ (يدعي حقاً)",
    "Handläggning": "معالجة القضية (الإجراءات الإدارية)",
    "Handpenning": "عربون (دفعة أولى)",
    "Handräckning": "مساعدة تنفيذية (لتحصيل دين أو إخلاء)",
    "Handskriven": "مكتوب بخط اليد",
    "Hatbrott": "جريمة كراهية",
    "Hedersrelaterat våld": "عنف مرتبط بالشرف",
    "Hem för vård eller boende ( HVB - hem )": "دار رعاية وسكن (HVB)",
    "Hemfridsbrott": "انتهاك حرمة المنزل",
    "Hemlandspass ( migration )": "جواز سفر البلد الأصلي",
    "Hemlig teleavlyssning": "تنصت هاتفي سري"
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
