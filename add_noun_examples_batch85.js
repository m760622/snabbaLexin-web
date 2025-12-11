/**
 * Add examples to nouns - Batch 85 (Final Batch: 81 nouns: Ättestupa to Övärld)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin032321": ["Gammal tro om ättestupa.", "معتقد قديم حول هوة الانتحار."],
    "Lexin032322": ["Lägga in i ättika.", "يخلل (يضع في الخل)."],
    "Lexin032324": ["Han är ättling till kungasläkten.", "هو سليل العائلة المالكة."],
    "Lexin032328": ["Till all äventyrs.", "بكل الأحوال (على أية حال)."],
    "Lexin032335": ["Lida av ödem.", "يعاني من الاستسقاء (تورم)."],
    "Lexin032337": ["Bo i ödemarken.", "يعيش في البرية."],
    "Lexin032341": ["Snabb ödla.", "سحلية سريعة."],
    "Lexin032348": ["Göra en ögla.", "يصنع أنشوطة (عقدة)."],
    "Lexin032355": ["Plocka ögonbrynen.", "ينتف الحواجب."],
    "Lexin032357": ["Långa ögonfransar.", "رموش طويلة."],
    "Lexin032362": ["Stänga ögonlocken.", "يغلق الجفون."],
    "Lexin032364": ["Använda ögonskugga.", "تستخدم ظلال العيون."],
    "Lexin032365": ["Du är min ögonsten.", "أنت قرة عيني (مفضلي)."],
    "Lexin032366": ["Vara ett ögonvittne.", "يكون شاهد عيان."],
    "Lexin032371": ["Få ett öknamn.", "يحصل على لقب (ساخر)."],
    "Lexin032374": ["Ta en öl.", "يشرب بيرة."],
    "Lexin032380": ["Känna ömkan.", "يشعر بالشفقة."],
    "Lexin032397": ["Bara en önskedröm.", "مجرد حلم."],
    "Lexin032398": ["Skriva en önskelista.", "يكتب قائمة أمنيات."],
    "Lexin032400": ["Det är rent önsketänkande.", "هذا مجرد وهم (تفكير رغبي)."],
    "Lexin032401": ["Har du någon önskning?", "هل لديك أي رغبة؟"],
    "Lexin032414": ["Tala med öppenhet.", "يتحدث بصراحة (انفتاح)."],
    "Lexin032417": ["Gå i öppenvård.", "يتلقى علاجاً في الرعاية المفتوحة."],
    "Lexin032420": ["Affärens öppethållande.", "أوقات دوام المتجر."],
    "Lexin032427": ["Använda kapsylöppnare.", "يستخدم فتاحة زجاجات."],
    "Lexin032428": ["En smal öppning.", "فتحة ضيقة."],
    "Lexin032429": ["Gå på öppningen.", "يحضر الافتتاح."],
    "Lexin032434": ["Ge en örfil.", "يعطي صفعة."],
    "Lexin032437": ["Fiska öring.", "يصطاد سمك التروته."],
    "Lexin032441": ["Byta örngott.", "يغير غطاء الوسادة."],
    "Lexin032444": ["Skada på öronmusslan.", "إصابة في صيوان الأذن."],
    "Lexin032452": ["Hål i örsnibben.", "ثقب في شحمة الأذن."],
    "Lexin032453": ["Ha svår örsprång.", "لديه ألم شديد في الأذن."],
    "Lexin032454": ["Krydda med örter.", "يتبل بالأعشاب."],
    "Lexin032457": ["Gå ut i ösregnet.", "يخرج في المطر الغزير."],
    "Lexin032458": ["Vind från öst.", "ريح من الشرق."],
    "Lexin032463": ["Han är östgöte.", "هو من أوستريوتلاند."],
    "Lexin032468": ["Gammal öststat.", "دولة شرقية سابقة."],
    "Lexin032488": ["Vila efter överansträngning.", "يرتاح بعد إجهاد مفرط."],
    "Lexin032493": ["Få överbalansen.", "يفقد توازنه."],
    "Lexin032495": ["Arméns överbefälhavare.", "قائد الجيش العام."],
    "Lexin032509": ["Soffa med överdrag.", "أريكة بغطاء."],
    "Lexin032510": ["Dyrt överdrag.", "سحب على المكشوف مكلف."], // "övertrassering"
    "Lexin032511": ["Tidsmässigt överdrag.", "تجاوز الوقت المحدد."],
    "Lexin032512": ["Ta på sig överdragskläder.", "يرتدي ملابس واقية (فوق ملابسه)."],
    "Lexin032532": ["Kommunens överförmyndare.", "كبير الأوصياء في البلدية."],
    "Lexin032537": ["Begå ett övergrepp.", "يرتكب اعتداء."],
    "Lexin032542": ["Resa med övergångsbiljett.", "يسافر بتذكرة تحويل."],
    "Lexin032544": ["Gå på övergångsstället.", "يمشي على معبر المشاة."],
    "Lexin032546": ["Komma i övergångsåldern.", "تصل لسن اليأس."],
    "Lexin032549": ["Ta överhand.", "يسيطر (تكون له الغلبة)."],
    "Lexin032550": ["Lyda överheten.", "يطيع السلطة (الطبقة الحاكمة)."],
    "Lexin032559": ["Under statligt överinseende.", "تحت إشراف الدولة."],
    "Lexin032561": ["Det var i överkant.", "كان ذلك مبالغاً فيه (أكثر من اللازم)."],
    "Lexin032562": ["Snyggt överkast.", "غطاء سرير جميل."],
    "Lexin032570": ["Tilhöra överklassen.", "ينتمي للطبقة العليا."],
    "Lexin032586": ["Hänga i överliggaren.", "يتعلق بالعارضة (في المرمى)."], // Sport context
    "Lexin032587": ["Han är en överliggare.", "هو طالب دائم (لم يتخرج بعد)."],
    "Lexin032594": ["Ha ett överläge.", "لديه الأفضلية (التفوق)."],
    "Lexin032597": ["Hemliga överläggningar.", "مداولatas سرية."],
    "Lexin032600": ["Rond med överläkaren.", "جولة مع رئيس الأطباء."],
    "Lexin032603": ["Avslöjad som överlöpare.", "كشف عنه كخائن (منشق)."],
    "Lexin032605": ["Hitta sin överman.", "يجد من يتفوق عليه."],
    "Lexin032607": ["Synd att straffa övermod.", "من المؤسف معاقبة التهور (الشجاعة المفرطة)."], // Idiom-ish
    "Lexin032608": ["I övermorgon.", "بعد غد."],
    "Lexin032621": ["En lugn överresa.", "رحلة عبور هادئة."],
    "Lexin032622": ["Varm överrock.", "معطف دافئ."],
    "Lexin032625": ["Få pengar till övers.", "يتبقى لديه مال."],
    "Lexin032629": ["Ge en översikt.", "يعطي نظرة عامة (ملخص)."],
    "Lexin032631": ["Han är en översittare.", "هو متسلط (مضطهد)."],
    "Lexin032638": ["Läs överskriften.", "اقرأ العنوان."],
    "Lexin032647": ["Befordras till överste.", "يرقى لرتبة عقيد."],
    "Lexin032658": ["Göra en översyn.", "يقوم بمراجعة (فحص)."],
    "Lexin032663": ["Jobba som översättare.", "يعمل كمترجم."],
    "Lexin032667": ["Bolagets övertag.", "استحواذ الشركة."], // Context dependent. Also "ha övertaget"
    "Lexin032671": ["Lyckad övertalning.", "إقناع ناجح."],
    "Lexin032691": ["Ha en övervakare.", "لديه مراقب (قضائي)."],
    "Lexin032707": ["Bo på övervåningen.", "يسكن في الطابق العلوي."],
    "Lexin032719": ["Börja övningskörning.", "يبدأ التدرب على القيادة."],
    "Lexin032720": ["Duktig övningslärare.", "مدرس مواد عملية جيد."],
    "Lexin032726": ["Den grekiska övärlden.", "الجزر اليونانية."]
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

const backupPath = DATA_FILE + '.backup_nouns85_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 85 completed! 🏁 ALL NOUNS DONE!`);
