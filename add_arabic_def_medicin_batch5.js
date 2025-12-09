/**
 * Add Arabic definitions for Medicin terms - Batch 5
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

// Arabic definitions for Medicin terms - Batch 5
const arabicDefinitions = {
    "Brista - Bristning": "ينفجر - تمزق (أو انفجار)",
    "Bromsa": "يبطئ (يكبح سير المرض)",
    "Bromsmedicin": "دواء كابح (للفيروسات/للمرض)",
    "Bromsmediciner": "أدوية كابحة (خاصة للإيدز)",
    "Bronker ( Luftrören )": "قصبات هوائية",
    "Bronkiektasier": "توسع القصبات",
    "Bronkit": "التهاب الشعب الهوائية",
    "Bronkopneumoni": "التهاب رئوي قصبي",
    "Bronkoskopi": "تنظير القصبات",
    "Bronssjukan": "مرض أديسون (تصبغ جلدي)",
    "Broskceller": "خلايا غضروفية",
    "Broskfog": "مفصل غضروفي (ارتفاق)",
    "Broskförbindelse": "اتصال غضروفي (التحام)",
    "Broskväv": "نسيج غضروفي",
    "Broskvävnad": "نسيج غضروفي",
    "Broskytor": "أسطح غضروفية",
    "Brustablett": "قرص فوار",
    "Brustet magsår": "قرحة منفجرة",
    "Bryggan": "الجسر (في جذع الدماغ: Pons)",
    "Bryta ut": "ينتشر (المرض) أو يظهر فجأة",
    "Brytningsfel": "عيوب انكسار البصر",
    "Bryts ned": "يتحلل (يهضم)",
    "Bråck": "فتق",
    "Bränna fast": "يكوي (كي الأوعية)",
    "Brännande känsla": "شعور بالحرقان",
    "Brässen, thymus": "الغدة الزعترية (التيموس)",
    "Bröstben": "عظم القص",
    "Bröstbenet": "عظم القص",
    "Bröstbevarande kirurgi": "جراحة الثدي التحفظية",
    "Bröstböld": "خُرّاج الثدي",
    "Bröstcancer": "سرطان الثدي",
    "Bröstförstoring": "تكبير الثدي",
    "Bröstkorgens muskler": "عضلات القفص الصدري",
    "Bröstkotor": "فقرات صدرية",
    "Bröstkörtlar": "غدد ثديية",
    "Bröstrekonstruktion": "إعادة بناء الثدي (ترميم)",
    "Buk innehållet": "محتويات البطن",
    "Buken ofta är spänd": "البطن غالباً مشدود (متيبس)",
    "Bukhinna": "غشاء البريتوان (الصفاق)",
    "Bukhinneinflammation": "التهاب البريتوان",
    "Bukhålan": "تجويف البطن",
    "Bukhåleorgan": "أعضاء البطن",
    "Bukmuskler": "عضلات البطن",
    "Bukspott": "عصارة البنكرياس",
    "Bukspottkörtelns Langerhanska öar": "جزر لانجرهانس في البنكرياس",
    "Bukta": "ينبعج (يتكور)",
    "Bukta in": "ينبعج للداخل (يتقعر)",
    "Bukta ut": "يبرز للخارج (ينفتق)",
    "Bukväggen": "جدار البطن",
    "Bulimia nervosa": "الشره المرضي العصبي (بوليميا)",
    "Bulkmedel": "ملينات كتلة البراز (ألياف)",
    "Byggnadsfett": "دهون بناء (هيكلية)",
    "Bypassoperation, Kranskärlskirurgi": "عملية مجازة الشريان التاجي (قلب مفتوح)",
    "Båggångar - Båggångarna": "قنوات هلالية (في الأذن)",
    "Bålen": "الجذع",
    "Bålen": "الجذع (مكرر)",
    "Bålens muskler": "عضلات الجذع",
    "Bålväggen": "جدار الجذع",
    "Bäckenbotten": "قاع الحوض",
    "Bäckenbottenmuskulaturen": "عضلات قاع الحوض",
    "Bäckenet": "الحوض",
    "Bäckenet - Bäckengördel": "الحوض - زنار الحوض",
    "Bäckenorgan": "أعضاء الحوض",
    "Bäckenreservoar": "خزان حوضي (للبول/البراز بعد الجراحة)",
    "Böjaren": "العضلة القابضة (المثنية)",
    "Böjning": "ثني (انحناء)",
    "Bönformiga": "كلوية الشكل (تشبه الفاصوليا)",
    "Caecum ( blindtarm )": "الأعور",
    "Cancer": "سرطان",
    "Cancer coli": "سرطان القولون",
    "Cancer i tjocktarmen koloncancer": "سرطان القولون (الأمعاء الغليظة)",
    "Cancer recti": "سرطان المستقيم",
    "Candida albicans": "المبيضات البيضاء (فطريات)",
    "Cardia ( överdelen av magmunnen )": "فؤاد المعدة (فتحة البواب العلوية)",
    "Cell": "خلية",
    "Cell enzymer": "إنزيمات خلوية",
    "Celldelning": "انقسام الخلايا",
    "Celldelning": "انقسام خلوي (تكرار)",
    "Celldifferentiering": "تمايز الخلايا",
    "Cellfragment": "شظايا خلوية",
    "Cellförändringar": "تغيرات خلوية",
    "Cellgift": "علاج كيماوي (سام للخلايا)",
    "Cellkärna": "نواة الخلية",
    "Cellmembran": "غشاء الخلية",
    "Cellmembran": "غشاء خلوي (تكرار)",
    "Cellorganeller": "عضيات الخلية",
    "Cellulosa": "سليلوز (ألياف)",
    "Cellvävnad": "نسيج خلوي",
    "Central dialyskateter, CDK": "قسطرة غسيل كلى مركزية",
    "Centrioler": "مريكزات (في الخلية)",
    "Cerebellum": "المخيخ",
    "Cerebral pares": "شلل دماغي",
    "Cerebral vaskulär insult": "نوبة وعائية دماغية (جلطة)",
    "Cerebrospinalvätska": "سائل دماغي شوكي",
    "Cerebrum": "المخ",
    "Cholecystektomi": "استئصال المرارة",
    "Cholesterol": "كوليسترول",
    "Chorioidit": "التهاب المشيمية (في العين)",
    "Cirkulationen": "الدورة الدموية",
    "Cirkulationsapparat": "جهاز الدوران"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Medicin.' && !currentDef.trim() && arabicDefinitions[word]) {
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
