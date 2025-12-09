/**
 * Add Arabic definitions for JuridikTB terms - Batch 3
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

// Arabic definitions for JuridikTB terms - Batch 3
const arabicDefinitions = {
    "Bevakat besök i häktet": "زيارة مراقبة في الحبس الاحتياطي",
    "Bevakning": "مراقبة أو حراسة (أو مطالبة بالحق في الإفلاس)",
    "Bevilja permission": "منح إجازة (للسجين)",
    "Bevisa": "يثبت (يقدم الدليل)",
    "Bevisbörda": "عبء الإثبات",
    "Bevisförvanskning": "تزييف الأدلة (أو تحريفها)",
    "Bevismedel": "وسيلة إثبات (دليل)",
    "Bevisupptagning": "جمع الأدلة (أو تقديمها في المحكمة)",
    "Bevisvärde": "قيمة الدليل (قوة الإثبات)",
    "Bevisvärdering": "تقييم الأدلة",
    "Bifall": "قبول (الدعوى أو الطلب) أو تأييد",
    "Bindande bevis": "دليل ملزم (قاطع)",
    "Bokföringsbrott": "جريمة محاسبية (تلاعب في الدفاتر)",
    "Borgen": "كفالة (مالية أو شخصية)",
    "Borgensman": "كفيل (ضامن)",
    "Borgenär, Borgenärer": "دائن، دائنون",
    "Bortovaro": "غياب (عن الجلسة)",
    "Bouppteckning": "جرد التركة (قائمة بالأصول والخصوم)",
    "Brott mot allmän ordning": "جريمة ضد النظام العام",
    "Brott mot tystnadsplikt": "انتهاك واجب السرية",
    "Brottskonkurrens": "تعدد الجرائم (تزاحم الجرائم)",
    "Brottsoffer": "ضحية جريمة (المجني عليه)",
    "Brottsofferfond - Brottsofferfonden": "صندوق ضحايا الجرائم",
    "Bröstarvinge": "وارث مباشر (ابن/بنت أو أحفاد)",
    "Bulvan": "واجهة (شخص صوري لإخفاء المالك الحقيقي)",
    "Dagsbot": "غرامة يومية (تحسب حسب الدخل)",
    "Deklarationsblankett": "استمارة الإقرار الضريبي",
    "Delad vårdnad": "حضانة مشتركة",
    "Deldom": "حكم جزئي (في جزء من الدعوى)",
    "Delgivning": "تبليغ (رسمي)",
    "Diarieförd handling": "وثيقة مسجلة في اليومية (الأرشيف)",
    "Direkt uppsåt": "قصد مباشر",
    "Diskriminera": "يميز (بشكل غير عادل)",
    "Dobbleri": "القمار (غير المشروع)",
    "Dolda fel": "عيوب خفية (في المبيع)",
    "Domskäl": "حيثيات الحكم (الأسباب)",
    "Domslut": "منطوق الحكم (القرار النهائي)",
    "Domvilla": "خطأ إجرائي جسيم (يوجب النقض)",
    "Domvillobesvär": "طعن بسبب الخطأ الإجرائي الجسيم",
    "Dröjsmålsränta": "فائدة تأخيرية (غرامة تأخير)",
    "Dubbelbeskattningsavtal": "اتفاقية منع الازدواج الضريبي",
    "Dödligt våld": "عنف مميت (قاتل)",
    "Dödsbo": "التركة (الشخصية المعنوية للمتوفى قبل القسمة)",
    "Edgångssammanträdet": "جلسة أداء القسم (في الإفلاس لجرد الديون)",
    "Editionsplikt": "واجب إبراز المستندات (إلزام الخصم بتقديم وثيقة)",
    "Efterlevande": "الباقي على قيد الحياة (من الزوجين)",
    "Efterlysa": "يعمم عن (مطلوب أو مفقود)",
    "Egendom": "ممتلكات أو أموال",
    "Egenhändig namnteckning": "توقيع شخصي (بخط اليد)",
    "Egenmäktighet med barn": "التعسف مع الأطفال (خطف أحد الوالدين للطفل)",
    "Egenmäktigt förfarande": "تصرف تعسفي (انتزاع حيازة أو إزعاج حيازة)",
    "Eget kapital": "رأس المال الذاتي (حقوق الملكية)",
    "Ekobrott": "جريمة اقتصادية",
    "Ekobrottsmyndigheten": "هيئة مكافحة الجرائم الاقتصادية (EBM)",
    "Ekonomisk brottslighet": "إجرام اقتصادي",
    "Elektronisk fotboja": "سوار إلكتروني (للمراقبة)",
    "Enhällig": "بالإجماع",
    "Ensamkommande barn ( migration )": "أطفال قصر غير مصحوبين بذويهم (طالبي لجوء)",
    "Enskild överläggning": "مداولة سرية (للقضاة)",
    "Enskilt åtal": "دعوى خاصة (يرفعها الفرد لا المدعي العام)",
    "Entlediga": "يعزل أو يقيل (من منصب)",
    "Erkänna": "يعترف (بالجرم أو الحق)",
    "Erkännande": "اعتراف",
    "Ersätta för skada": "يعوض عن الضرر",
    "Ersättning av rättegångskostnader": "تعويض مصاريف المحاكمة",
    "Ersättningsskyldig": "ملزم بالتعويض",
    "Ertappa": "يضبط (متلبساً)",
    "Etnisk diskriminering": "تمييز عرقي",
    "Exekutionstitel": "سند تنفيذي",
    "Exekutiv försäljning": "بيع جبري (بالمزاد العلني)",
    "Expedierat beslut": "قرار صادر (مرسل للأطراف)",
    "Expropriationslagen": "قانون الاستملاك (للمنفعة العامة)",
    "Exstinktiva": "مسقطة (للتقادم)",
    "Extensiv tolkning": "تفسير موسع",
    "Faderskapsmål": "دعوى إثبات الأبوة",
    "Faderskapsutredning": "تحقيق الأبوة",
    "Faktiska omständigheter": "وقائع فعلية",
    "Familjeanknytning": "لم الشمل (ارتباط عائلي)",
    "Familjehem": "أسرة بديلة (حاضنة)",
    "Familjehemsplacering": "الإيداع لدى أسرة بديلة",
    "Familjemål": "قضايا الأسرة",
    "Fastighetsbeteckning": "رقم العقار (التسمية الرسمية)",
    "Fastighetsdeklaration": "إقرار ضريبي عقاري",
    "Fastställa": "يقرر أو يثبت",
    "Fastställa belopp": "يحدد المبلغ",
    "Fastställa dom": "يؤيد الحكم (في الاستئناف) أو يثبت الحكم",
    "Fastställelse": "تثبيت أو إقرار",
    "Fel i fastighet": "عيب في العقار",
    "Fel och vårdslöshetsansvar": "مسؤولية الخطأ والإهمال",
    "Felparkeringsavgift": "غرامة وقوف خاطئ",
    "Fingerad": "وهمي أو مصطنع",
    "Firmatecknare": "المفوض بالتوقيع (عن الشركة)",
    "Flyktfara": "خطر الهرب",
    "Flyktingstatus": "صفة لاجئ",
    "Folkmord": "إبادة جماعية",
    "Fordran": "دين (حق مالي للدائن)",
    "Fordringsägare": "دائن",
    "Fotboja": "سوار المراقبة الإلكتروني",
    "Framkallande av fara": "تعريض للخطر (إحداث خطر)",
    "Framställan": "طلب أو التماس"
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
