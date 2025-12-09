/**
 * Add Arabic definitions for JuridikTB terms - Batch 2
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

// Arabic definitions for JuridikTB terms - Batch 2
const arabicDefinitions = {
    "8 § egenmäktigt förfarande": "المادة 8 § انتزاع الحيازة (تصرف تعسفي)",
    "8 § fyndförseele": "المادة 8 § جنحة عدم الإبلاغ عن لقطة",
    "8 § hets mot folk grupp": "المادة 8 § التحريض ضد جماعة عرقية",
    "8 § oredligt förfarande": "المادة 8 § تصرف غير نزيه (احتيال)",
    "8 § Otillbörligt verkande vid röstning och tagande av otillbörlig belöning vid röstning": "المادة 8 § التأثير غير المشروع على التصويت والرشوة الانتخابية",
    "8 § utnyttjande av barn for sexuell posering och grovt utnyttjande av barn for sexuell posering": "المادة 8 § استغلال الأطفال في التصوير الجنسي (والاستغلال الجسيم)",
    "8 § vållande till kroppsskada eller sjukdom": "المادة 8 § التسبب في أذى جسدي أو مرض",
    "8 § vårdslös skatteredovisning": "المادة 8 § إقرار ضريبي متهور",
    "9 § framkallande av fara fﬁr annan": "المادة 9 § تعريض حياة الآخرين للخطر",
    "9 § intrång i förvar": "المادة 9 § التعدي على المحفوظات (كسر الختم)",
    "9 § olaga diskriminering": "المادة 9 § التمييز غير القانوني",
    "9 § självtäkt": "المادة 9 § استيفاء الحق بالذات (اقتضاء الحق شخصياً)",
    "9 § svidleri": "المادة 9 § النصب والاحتيال (Svindleri)",
    "9§ kop av sexuell handling av barn": "المادة 9 § شراء فعل جنسي من طفل",
    "911 § olovlig avlyssning": "المادة 9 أ § التنصت غير القانوني (إشارة قديمة أو خطأ في الرقم ولكن المفهوم واضح)",
    "9c § Dataintrång": "المادة 9 ج § اختراق البيانات (قرصنة إلكترونية)",
    "Acceptfrist": "مهلة القبول (للعرض)",
    "Acklamation": "تزكية (تصويت بالهتاف/الموافقة العامة دون فرز)",
    "Ackord": "صلح واق (تسوية ديون)",
    "Adoptivförälder": "والد بالتبني",
    "Affektionsvärde": "قيمة عاطفية (معنوية)",
    "Affärsverksamhet": "نشاط تجاري",
    "Allmänfarlig vårdslöshet": "إهمال يعرض العامة للخطر",
    "Allmänna handlingar": "وثائق عامة (رسمية)",
    "Allmänt åtal": "دعوى الحق العام",
    "Alternativt": "بدلاً من ذلك (خيار بديل)",
    "Alternativt straff": "عقوبة بديلة",
    "Amnesti": "عفو عام",
    "Amorteringstid": "فترة السداد (للقرض)",
    "Analysbevis": "شهادة تحليل (مخبري)",
    "Anbud": "عطاء أو عرض (في مناقصة)",
    "Andrahandsuthyrning": "تأجير من الباطن (تأجير ثانوي)",
    "Angivelsebrott": "جرائم الشكوى (تتطلب بلاغاً من المجني عليه)",
    "Anhålla": "يوقِف (يحتجز على ذمة التحقيق)",
    "Ankomstboende ( migration )": "سكن وصول (للاجئين)",
    "Anmoda": "يطلب رسمياً أو يأمر",
    "Anmälan": "بلاغ (للشرطة) أو تسجيل",
    "Anmälningsplikt": "واجب الإبلاغ (عن الجرائم أو التغييرات)",
    "Anmälningsskyldighet": "إلزامية التبليغ",
    "Anonymitetsskydd": "حماية الهوية (المجهولية)",
    "Anspråk": "مطالبة (بحق)",
    "Anstiftan till brott": "التحريض على الجريمة",
    "Anstånd med betalning": "مهلة للدفع (تأجيل الدفع)",
    "Anställningsavtal": "عقد عمل",
    "Ansvar": "مسؤولية",
    "Ansvarsfrihet": "إبراء الذمة (من المسؤولية المالية)",
    "Ansvarsfrågan": "مسألة المسؤولية (من المسؤول)",
    "Ansvarsyrkande": "المطالبة بتحميل المسؤولية",
    "Ansöka om": "يقدم طلباً لـ",
    "Ansöka om konkurs": "يطلب إشهار الإفلاس",
    "Ansöka om stämning": "يرفع دعوى (يطلب استدعاء للمحكمة)",
    "Arbetsskadeersättning": "تعويض إصابة العمل",
    "Arvskifte": "قسمة التركة",
    "Assistansersättning": "بدل المساعدة الشخصية",
    "Asylutredning": "تحقيق اللجوء",
    "Avbetalningsköp": "شراء بالتقسيط",
    "Avhysning": "إخلاء (قسري من المسكن)",
    "Avkunna dom": "ينطق بالحكم",
    "Avlägga generell tolk ed": "أداء قسم الترجمة العام",
    "Avskriva": "يشطب أو يحفظ (القضية دون حكم)",
    "Avslå": "يرفض (الطلب)",
    "Avtalsvillkor": "شروط العقد",
    "Avtjäna sitt straff": "يقضي عقوبته",
    "Bakom stängda dörrar": "خلف أبواب مغلقة (جلسة سرية)",
    "Bar gärning": "الجرم المشهود (التلبس)",
    "Beakta": "يراعي أو يأخذ بعين الاعتبار",
    "Beaktande": "مراعاة",
    "Bedrägligt beteende": "سلوك احتيالي (احتيال بسيط)",
    "Befintligt skick": "الحالة الراهنة (كما هو)",
    "Befogenhet": "صلاحية أو سلطة",
    "Begravningsavgift": "رسوم الدفن (الضريبة الكنسية)",
    "Begå ett brott": "يرتكب جريمة",
    "Begå övergrepp": "يرتكب اعتداء",
    "Begära omprövning": "يطلب إعادة النظر (في القرار)",
    "Begäran": "طلب",
    "Behovspröva": "يفحص الحاجة (للإعانة)",
    "Behörighet": "أهلية أو اختصاص (صلاحية)",
    "Behörighetskrav": "متطلبات الأهلية",
    "Behörighetsmissbruk": "إساءة استعمال السلطة",
    "Belastningsregister - Belastningsregistret": "السجل العدلي (سجل السوابق)",
    "Bemyndigande": "تفويض أو توكيل",
    "Benåda": "يعفو عن (عقوبة)",
    "Benådning": "عفو (ملكي أو حكومي)",
    "Berått mod": "سبق الإصرار (عن عمد)",
    "Besittningsskydd": "حماية الحيازة (للمستأجر)",
    "Beskatta": "يفرض ضريبة",
    "Beslag": "مُصادَرة (حجز تحفظي على الأشياء)",
    "Beslagsprotokoll": "محضر الضبط (للمصادرات)",
    "Bestrida": "ينكر أو يعترض (على دعوى أو فاتورة)",
    "Bestridande": "إنكار أو اعتراض",
    "Bestämmelse": "حكم قانوني أو بند",
    "Besvärande omständighet": "ظرف مشدِّد (في غير صالح المتهم)",
    "Besöksförbud": "قـرار منـع الزيارة (أمر عدم التعرض - Kontaktförbud حالياً)",
    "Betala in natura": "الدفع العيني (ببضاعة بدل النقد)",
    "Betala uppehälle": "دفع نفقة المعيشة",
    "Betalningsanmärkning": "ملاحظة التخلف عن الدفع (في السجل الائتماني)",
    "Betalningsansvarig": "مسؤول عن الدفع",
    "Betalningsföreläggande": "أمر أداء (من جباية الديون)",
    "Betalningsförmåga": "ملاءة مالية (القدرة على الدفع)",
    "Betalningsinställelse": "توقف عن الدفع (إعسار قبل الإفلاس)"
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
