/**
 * Add examples to CONSTRUCTION terms - Batch 19 (27 terms: Vägnät to Övertramp)
 * Carefully matching IDs from construction_pending_batch.json
 * This is the FINAL batch for Construction terms!
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin031497": ["Planera kommunens vägnät.", "تخطيط شبكة طرق البلدية."],
    "Lexin031504": ["Budget för vägunderhåll.", "ميزانية صيانة الطرق."],
    "Lexin031508": ["Köra vägvält på asfalten.", "تشغيل مدحلة الطرق على الأسفلت."],
    "Lexin031554": ["Platta till jorden med en vält.", "دك التربة بمدحلة."],
    "Lexin031602": ["Beräkna fastighetens värde.", "حساب قيمة العقار."],
    "Lexin031654": ["Förbättra husets värmeisolering.", "تحسين العزل الحراري للمنزل."],
    "Lexin031655": ["Lägga in en värmematta under klinkern.", "وضع حصيرة تدفئة تحت البلاط."],
    "Lexin031659": ["Byta ut hela värmesystemet.", "استبدال نظام التدفئة بالكامل."],
    "Lexin031660": ["Installera en värmeväxlare ventilationen.", "تركيب مبادل حراري في التهوية."],
    "Lexin031661": ["Effektiv värmeväxling sparar energi.", "التبادل الحراري الفعال يوفر الطاقة."],
    "Lexin031662": ["System med värmeåtervinning.", "نظام مع استرجاع الحرارة."],
    "Lexin031666": ["Säkerhetsregler för att värna om livet.", "قواعد السلامة لحماية الأرواح."],
    "Lexin031711": ["Samla upp vätska som läcker.", "جمع السائل المتسرب."],
    "Lexin031806": ["Vi söker duktiga yrkesarbetare.", "نحن نبحث عن عمال مهنيين مهرة."],
    "Lexin031807": ["Har du rätt yrkesbakgrund?", "هل لديك الخلفية المهنية الصحيحة؟"],
    "Lexin031837": ["Göra en sista ytbearbetning av golvet.", "إجراء تشطيب سطحي نهائي للأرضية."],
    "Lexin031962": ["Använda ånggenerator för att tina tjäle.", "استخدام مولد بخار لإذابة الصقيع."],
    "Lexin031964": ["Tejpa skarvarna i ångspärren.", "لصق فواصل حاجز البخار."],
    "Lexin032051": ["Gropen är nu återfylld.", "الحفرة الآن مردومة."],
    "Lexin032108": ["Föreslå en åtgärd för problemet.", "اقتراح إجراء للمشكلة."],
    "Lexin032141": ["Snickerier i ädelträ.", "نجارة من الخشب الثمين."],
    "Lexin032305": ["Lägga ärtsingel på gången.", "وضع حصى ناعم (Ärtsingel) على الممشى."],
    "Lexin032390": ["Ömsesidig respekt på bygget.", "احترام متبادل في الموقع."],
    "Lexin032446": ["Använd öronproppar mot bullret.", "استخدم سدادات الأذن ضد الضجيج."],
    "Lexin032543": ["Vi har en övergångsperiod på två månader.", "لدينا فترة انتقالية مدتها شهرين."],
    "Lexin032630": ["Kolla kommunens översiktsplan.", "تحقق من المخطط الشامل للبلدية."],
    "Lexin032678": ["Inga övertramp av säkerhetsreglerna.", "لا تجاوزات لقواعد السلامة."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

let updated = 0;
for (let i = 0; i < data.length; i++) {
    if (examples[data[i][0]]) {
        data[i][7] = examples[data[i][0]][0];
        data[i][8] = examples[data[i][0]][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_construction19_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 19 completed! All construction terms done!`);
