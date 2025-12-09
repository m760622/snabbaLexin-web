/**
 * Add Arabic definitions for Bygg terms - Batch 18
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

// Arabic definitions for Bygg terms - Batch 18
const arabicDefinitions = {
    "Takpannor": "بلاط السقف (قرميد)",
    "Takränna": "مزراب السقف (قناة تصريف)",
    "Taksparrar": "عوارض السقف (Rafters)",
    "Takstege": "سلم السقف",
    "Takstol": "جملون السقف (هيكل خشبي مثلث)",
    "Taktäckning": "تغطية السقف (مواد التسقيف)",
    "Tandemvält": "محدلة ترادفية (بأسطوانتين)",
    "Tapet": "ورق جدران",
    "Tapetlinjal": "مسطرة ورق الجدران",
    "Tappvarmvatten": "ماء الصنبور الساخن",
    "Tegel": "طوب (آجر)",
    "Tegelmur": "جدار طوب",
    "Tegelsten": "طوبة",
    "Tekniskt samråd": "تشاور تقني (اجتماع فني)",
    "Temporära konstruktioner": "منشآت مؤقتة",
    "Teodolit": "تيودليت (جهاز مساحة)",
    "Terrass": "تراس (شرفة أرضية)",
    "Testning": "اختبار",
    "Testutvärdering": "تقييم الاختبار",
    "Tigersåg": "منشار ترددي (نمر/Sabre saw)",
    "Tillbud": "حادث وشيك (Near miss)",
    "Tillbyggnad": "توسعة (إضافة بناء)",
    "Tillföra": "يضيف",
    "Tillstånd byggnad": "تصريح البناء (أو حالة المبنى)",
    "Tillverkning": "تصنيع",
    "Tippvagn": "عربة قلابة",
    "Toalett": "مرحاض",
    "Tomt": "قطعة أرض (موقع البناء)",
    "Tomtkarta": "خريطة الموقع (الأرض)",
    "Topografisk kartläggning": "مسح طوبوغرافي",
    "Torpargrund": "أساس مهوى (Crawl space foundation)",
    "Totalentreprenad": "مقاولة شاملة (تصميم وتنفيذ)",
    "Totalhöjd": "ارتفاع كلي",
    "Trafikflöde": "تدفق مروري",
    "Trafikljus": "إشارات المرور",
    "Trafikskylt": "لافتة مرورية",
    "Trall": "ألواح السطح الخشبي (Decking)",
    "Trallolja": "زيت الأسطح الخشبية",
    "Transparens": "شفافية",
    "Transportlösningar": "حلول النقل",
    "Transportplanering": "تخطيط النقل",
    "Trapphusbelysning": "إضاءة بيت الدرج",
    "Trappor": "سلالم (أدراج)",
    "Trappräcke": "درابزين الدرج",
    "Trappstege": "سلم نقال (درج)",
    "Trekantslist": "شريط مثلث (نعلة زاوية)",
    "Trivsel": "رفاهية (راحة في العمل)",
    "Trottoar": "رصيف (للمشاة)",
    "Tryckimpregnering": "تشريب بالضغط (معالجة الخشب)",
    "Tryckluftsborr": "مثقاب هوائي",
    "Trygg arbetsplats": "مكان عمل آمن",
    "Träarbete": "أعمال النجارة",
    "Trädgård": "حديقة",
    "Trädäck": "سطح خشبي (تراس)",
    "Träflis": "رقائق الخشب",
    "Trälim": "غراء خشب",
    "Träskruv": "برغي خشب",
    "Trästomme": "هيكل خشبي",
    "Trött": "متعب (إجهاد)",
    "Tum": "بوصة",
    "Tunnel": "نفق",
    "Tunnelbana": "مترو أنفاق",
    "Tvärväggar": "جدران عرضية",
    "Tåhätta": "غطاء مقدمة الحذاء الفولاذي (للأمان)",
    "Täcklasyr": "طلاء شبه شفاف (تغطية خفيفة)",
    "Täljsten": "حجر صابوني",
    "Tätband": "شريط منع التسرب",
    "Tätskikt": "طبقة عازلة (لمنع التسرب)",
    "Underentreprenör": "مقاول باطن",
    "Underhållstekniker": "فني صيانة",
    "Underjord": "تحت الأرض",
    "Underjord kabelläggning": "تمديد كابلات أرضي",
    "Underlagsfoam": "فوم تبطين (للأرضيات)",
    "Underleverantör": "مورد فرعي (أو مقاول باطن)",
    "Uppdatering": "تحديث",
    "Uppdämningsnivå": "منسوب المياه المحجوزة (مستوى الارتداد)",
    "Uppföljning": "متابعة",
    "Uppförandekod": "قواعد السلوك",
    "Uppgift": "مهمة",
    "Upphandling": "طرح مناقصة (شراء عام)",
    "Upphävande": "إلغاء",
    "Uppmätta": "المقاسة (تم قياسها)",
    "Uppvärmning": "تدفئة",
    "Utbetalning": "صرف (دفع مالي)",
    "Uterum": "غرفة خارجية زجاجية (مشربية)",
    "Utfackningsvägg": "جدار حشو خارجي (Infill wall)",
    "Utformning": "تصميم (تشكيل)",
    "Utgrävning": "حفر (تنقيب)",
    "Utjämning": "تسوية",
    "Utkragning": "بروز كابولي (ظفر)",
    "Utmärkning": "تحديد الموقع (وضع العلامات)",
    "Utrustning": "معدات",
    "Utskjutande stöd": "دعامة بارزة",
    "Utstakning": "توقيع مساحي (تخطيط الحدود)",
    "Utställning process": "عملية العرض العام (للمخططات)",
    "Utveckla": "يطور",
    "Valmat tak": "سقف هرمي (مشطوف الجوانب - Hipped roof)",
    "Varmförzinkadspik": "مسمار مجلفن على الساخن",
    "Varmluftsfläkt": "مروحة هواء ساخن (سخان)",
    "Varmvatten": "ماء ساخن"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Bygg.' && !currentDef.trim() && arabicDefinitions[word]) {
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
