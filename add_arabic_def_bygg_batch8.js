/**
 * Add Arabic definitions for Bygg terms - Batch 8
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

// Arabic definitions for Bygg terms - Batch 8
const arabicDefinitions = {
    "Elstötar": "صدمات كهربائية",
    "Eluttag": "مقبس كهربائي (بريز)",
    "Emalj": "مينا (طلاء زجاجي)",
    "Emballage": "تغليف (عبوة)",
    "Emballageavfall": "نفايات التغليف",
    "Emballageband": "شريط تغليف (تحزيم)",
    "Emission": "انبعاث (إصدار)",
    "Energi": "طاقة",
    "Energi källor": "مصادر الطاقة",
    "Energianalys": "تحليل الطاقة",
    "Energianläggningar": "منشآت الطاقة (محطات)",
    "Energianvändning": "استخدام الطاقة (استهلاك)",
    "Energibesparing": "توفير الطاقة",
    "Energibesparingar": "توفيرات في الطاقة",
    "Energideklaration": "إعلان أداء الطاقة (شهادة)",
    "Energieffektivisering": "رفع كفاءة الطاقة",
    "Energihushållning": "إدارة الطاقة (ترشيد)",
    "Energiingenjör": "مهندس طاقة",
    "Energikälla": "مصدر الطاقة",
    "Energilagring": "تخزين الطاقة",
    "Energimängd": "كمية الطاقة",
    "Energiomställning": "تحول الطاقة",
    "Energiprestanda": "أداء الطاقة",
    "Energiskog": "غابة طاقة (زراعة وقود حيوي)",
    "Energiutvinning": "استخراج الطاقة (استخلاص)",
    "Englasfönster": "نافذة بزجاج مفرد",
    "Enhetschef": "رئيس وحدة",
    "Enplanshus": "منزل طابق واحد",
    "Enskild VA - anläggning": "منشأة مياه وصرف خاصة",
    "Enskild väg": "طريق خاص",
    "Enskilt avlopp": "صرف صحي خاص",
    "Entréplan": "طابق المدخل (الأرضي)",
    "Entreprenad": "مقاولة",
    "Entreprenadform": "شكل المقاولة (نوع العقد)",
    "Entreprenadingenjör": "مهندس مقاولات (مكتب فني)",
    "Entreprenadsumma": "مبلغ المقاولة",
    "Entreprenadtid": "مدة المقاولة",
    "Entreprenör": "مقاول",
    "Envalsvält": "مدحلة أحادية الأسطوانة",
    "Epoxygolv": "أرضية إيبوكسي",
    "Erfarenhetsåterföring": "نقل الخبرات (تغذية راجعة)",
    "Erosion": "تآكل (تعرية)",
    "Erosionsskydd": "حماية من التآكل (التعرية)",
    "Ersättningsanspråk": "مطالبة بالتعويض",
    "Ersättningsdel": "قطعة غيار (بديلة)",
    "Eternit": "إترنيت (ألواح أسمنتية ليفية)",
    "Eternitplattor": "ألواح إترنيت",
    "Eurokod": "الكود الأوروبي (للبناء)",
    "Expanderbult": "برغي توسعي (إسفين تثبيت)",
    "Expanderskruv": "مسمار توسعي (فيشر)",
    "Expansionskärl": "وعاء التمدد (خزان التعويض)",
    "Exploatering": "استغلال (تطوير عقاري)",
    "Exploateringsavtal": "اتفاقية تطوير عقاري",
    "Exploateringskostnad": "تكلفة التطوير",
    "Exploateringsområde": "منطقة تطوير",
    "Explosion": "انفجار",
    "Explosivt": "متفجر",
    "Exteriör": "خارجي (مظهر خارجي)",
    "F - ventilation": "تهوية ميكانيكية للعادم (F-system)",
    "Fabrik": "مصنع",
    "Fabriksbetong": "خرسانة جاهزة",
    "Fabriksbyggnad": "مبنى المصنع",
    "Fabrikstillverkning": "تصنيع مصنعي",
    "Faciliteter": "مرافق (تسهيلات)",
    "Facklig representant": "ممثل نقابي",
    "Fackverk": "جمالون (هيكل شبكي/جائز)",
    "Fackverkskonstruktion": "هيكل جمالوني (شبكي)",
    "Faktablad": "ورقة حقائق (بيانات)",
    "Faktura": "فاتورة",
    "Fakturering": "فوترة (إصدار فواتير)",
    "Fallhöjd": "ارتفاع السقوط",
    "Fallskydd": "حماية من السقوط",
    "Fallskyddsutrustning": "معدات الحماية من السقوط",
    "Falsa": "يطوي الحواف (وصل بالدسرة)",
    "Falsmått": "قياس الطية (أو الدسرة)",
    "Falsning": "طوي الحواف (للمعادن)",
    "Falsningsverktyg": "أداة طوي الحواف",
    "Falstakpanna": "قرميد متشابك (دسري)",
    "Fanér": "قشرة خشبية (فينير)",
    "Fanerremsa": "شريط قشرة خشبية",
    "Fara": "خطر",
    "Fara för hälsa och säkerhet": "خطر على الصحة والسلامة",
    "Farlig spänning": "جهد كهربائي خطير",
    "Farligt avfall": "نفايات خطرة",
    "Farligt gods": "بضائع خطرة",
    "Farligt tillstånd": "وضع خطير",
    "Fasad tegel": "طوب واجهات",
    "Fasadbeklädnad": "تكسية الواجهة",
    "Fasadelement": "عنصر واجهة",
    "Fasadglas": "زجاج واجهات",
    "Fasadhiss": "مصعد تنظيف الواجهات",
    "Fasadplåt": "صاج واجهات",
    "Fasadritning": "رسم واجهة (مسقط راسي)",
    "Fasadtegel": "طوب واجهات (للتكسية)",
    "Faskantsten": "حجر رصيف مشطوف الحافة",
    "Fasningsmaskin": "آلة شطف الحواف",
    "Fast avfall": "نفايات صلبة",
    "Fast belopp": "مبلغ ثابت",
    "Fast berg": "صخر صلب (ثابت)",
    "Fast pris": "سعر ثابت"
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
