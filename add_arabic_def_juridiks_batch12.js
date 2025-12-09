/**
 * Add Arabic definitions for JuridikS terms - Batch 12
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

// Arabic definitions for JuridikS terms - Batch 12
const arabicDefinitions = {
    "Olaga frihetsberövande": "حجز الحرية غير القانوني (الاختطاف)",
    "Olaga förföljelse": "المطاردة غير القانونية (Stalking)",
    "Olaga hot": "التهديد غير القانوني (إجرامي)",
    "Olaga spridning av efterbildning - olaga spridande av efterbildning": "انتهاك حقوق النشر (القرصنة)",
    "Olaga våldsskildring": "تصوير العنف غير القانوني",
    "Olaglig fildelning": "مشاركة ملفات غير قانونية",
    "Olovlig avledning av värmeenergi": "سرقة الطاقة الحرارية",
    "Olovlig avlyssning": "التنصت غير القانوني",
    "Olovlig befattning med falska pengar": "التعامل غير القانوني بالنقود المزورة",
    "Olovlig befattning med hemlig uppgift": "التعامل غير المصرح به مع معلومات سرية",
    "Olovlig befattning med kemiska vapen": "حيازة أسلحة كيميائية بشكل غير قانوني",
    "Olovlig befattning med minor": "حيازة ألغام بشكل غير قانوني",
    "Olovlig befattning med narkotikaprekursorer": "التعامل بالمواد الأولية للمخدرات",
    "Olovlig kemikaliehantering": "تداول المواد الكيميائية بشكل غير قانوني",
    "Olovlig kraftavledning": "سرقة التيار الكهربائي",
    "Olovlig kårverksamhet": "نشاط شبه عسكري غير قانوني (ميليشيا)",
    "Olovlig underrättelseverksamhet": "نشاط استخباري غير قانوني (تجسس)",
    "Olovlig underrättelseverksamhet mot främmande makt": "تجسس ضد دولة أجنبية",
    "Olovlig underrättelseverksamhet mot person": "تجسس على الأفراد (تتبع غير قانوني)",
    "Olovlig underrättelseverksamhet mot Sverige": "تجسس ضد السويد",
    "Olovlig värvning": "تجنيد غير قانوني",
    "Olovligt ingående av äktenskap": "الزواج غير القانوني (كالقاصرين أو متعدد الزوجات)",
    "Olovligt partnerskap": "شراكة غير قانونية",
    "Ombildning": "إعادة تشكيل أو تحويل (شركة أو عقار)",
    "Ombuds och biträdesjäv": "عدم صلاحية الوكيل أو المساعد (لتضارب المصالح)",
    "Ombudsmannen mot diskriminering på grund av sexuell läggning": "أمين مظالم التمييز الجنسي (سابقاً)",
    "Omedelbar verkställighet": "تنفيذ فوري للحكم",
    "Omedelbarhetsprincipen": "مبدأ الفورية (الحكم يستند لما عرض في الجلسة فقط)",
    "Omhäktningsförhandling": "جلسة تمديد التوقيف الاحتياطي",
    "Omprövar": "يعيد النظر في القرار (مراجعة)",
    "Omröstning": "تصويت",
    "Omyndig": "قاصر (فاقد الأهلية)",
    "Oneröst": "بمقابل (عقد معاوضة)",
    "Opartisk": "غير متحيز (نزيه)",
    "Oprioriterad fordringsägare": "دائن عادي (بدون امتياز أو رهن)",
    "Oprioriterade fordringsägare": "دائنون عاديون",
    "Ordförande": "رئيس (الجلسة أو المحكمة)",
    "Ordinära rättsmedel": "طرق الطعن العادية (الاستئناف)",
    "Ordningsföreskrifter": "لوائح تنظيمية أو أنظمة السلوك",
    "Ordningspolis": "شرطة النجدة والنظام العام",
    "Ordningsvakt": "حارس أمن (ذو صلاحيات شرطية محدودة)",
    "Ordningsvakter": "حراس أمن",
    "Oredlighet": "خيانة الأمانة أو عدم النزاهة",
    "Oredlighet mot borgenär": "الاحتيال على الدائنين (إخفاء الأموال)",
    "Oredligt förfarande": "تصرف غير نزيه (احتيال)",
    "Oren accept": "قبول العقد مع تعديل الشروط (يعد إيجاباً جديداً)",
    "Organisationsnummer": "رقم التسجيل الضريبي للمؤسسة",
    "Organisationstalan": "دعوى ترفعها منظمة (نيابة عن أعضائها)",
    "Organiserad verksamhet": "نشاط منظم",
    "Organiserande av människosmuggling": "تنظيم تهريب البشر",
    "Originära fång": "اكتساب الملكية ابتداءً (كوضع اليد على شيء مباح)",
    "Osann försäkran och vårdslös försäkran": "شهادة زور وتصريح متهور",
    "Osant intygande": "إصدار شهادة كاذبة (من موظف)",
    "Osant intygande och brukande av osann urkund": "تزوير الشهادات واستخدامها",
    "Oskiftat bo": "تركة غير مقسمة (شيوع)",
    "Oskäligt": "غير معقول أو مجحف",
    "Otillbörlig verkande vid röstning": "تأثير غير مشروع على التصويت (شراء أصوات)",
    "Otillbörligt gynnande av borgenär": "تفضيل دائن على آخرين (بشكل غير قانوني)",
    "Otillbörligt utverkande av samtycke eller tillstånd till adoption av barn": "الحصول غير المشروع على موافقة التبني",
    "Otillbörligt verkande vid röstning och tagande av otillbörlig belöning vid röstning": "الرشوة وتزوير الانتخابات",
    "Otillåten avfallstransport": "نقل نفايات غير مصرح به",
    "Otillåten miljöverksamhet": "نشاط بيئي محظور",
    "Otillåten utlämning av teknisk upptagning": "تسريب تسجيلات تقنية محظورة",
    "Otillåtet förfarande med pornografisk bild": "نشر غير قانوني لصور إباحية",
    "Ovarsam utsaga": "تصريح غير حذر (شهادة متهورة)",
    "Oäkta underlåtenhet": "الامتناع الإجرامي (جريمة سلبية)",
    "Pacta sunt servanda": "العقد شريعة المتعاقدين (الالتزام بالعهود)",
    "Pactum turpe": "اتفاق غير مشروع (مخالف للآداب العامة)",
    "Pantbrev": "سند رهن عقاري",
    "Panträtt": "حق الرهن",
    "Pantsätta": "يرهن",
    "Paragraf": "مادة قانونية (بند)",
    "Part": "طرف في الدعوى (مدعي أو مدعى عليه)",
    "Parter": "أطراف الخصومة",
    "Partsbehörighet": "أهلية الخصومة (الصفة)",
    "Partsförhör": "استجواب الخصوم",
    "Partshabilitet": "أهلية التقاضي",
    "Partsutsaga": "أقوال الطرف",
    "Passkrav": "شرط حيازة جواز سفر",
    "Patent och registreringsverket": "مكتب براءات الاختراع والتسجيل (PRV)",
    "Patent och upphovsrätt": "براءات الاختراع وحقوق المؤلف",
    "Patentintrång": "انتهاك براءة الاختراع",
    "PEACE": "نموذج بيس (أسلوب تحقيق بريطاني)",
    "Penningförfalskning": "تزوير العملة",
    "Penninglån": "قرض مالي",
    "Penningtvätt": "غسيل الأموال",
    "Permanent uppehållstillstånd ( PUT )": "إقامة دائمة (PUT)",
    "Permanent uppehållstillstånd PUT": "إقامة دائمة",
    "Permanentbostad": "مسكن دائم",
    "Permutation": "تغيير الغرض الوقفي أو الشرط",
    "Personalia": "بيانات شخصية",
    "Personella bevismedel": "أدلة شخصية (شهادة الشهود)",
    "Personella tvångsmedel": "تدابير قسرية شخصية (كالاعتقال والحجز)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Mapping keys to avoid duplications in object definition
    const definitionMap = {
        "Omedelbarhetsprincipen": "مبدأ الفورية (الحكم يستند لما عرض في الجلسة فقط)",
        "Omedelbarhetsprincipen": "مبدأ الفورية",
        // Correcting manually since object literaly overwrites keys
    };

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
