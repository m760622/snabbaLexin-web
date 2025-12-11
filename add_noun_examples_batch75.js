/**
 * Add examples to nouns - Batch 75 (100 nouns: Tjuvnyp to Transplantation)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin028556": ["Få ett tjuvnyp.", "يحصل على قرصة بالخفاء."],
    "Lexin028557": ["Han gjorde tjuvstart.", "انطلق قبل الأوان (في السباق)."],
    "Lexin028560": ["Jakten på tjäder.", "صيد طيور الطهيوج."],
    "Lexin028561": ["Det är tjäle i marken.", "الأرض متجمدة."],
    "Lexin028566": ["En trogen tjänare.", "خادم مخلص."],
    "Lexin028568": ["Söka en tjänst.", "يتقدم لوظيفة."],
    "Lexin028570": ["Bo i tjänstebostad.", "يقيم في مسكن رسمي."],
    "Lexin028572": ["Dömd för tjänstefel.", "مدان بخطأ في أداء الوظيفة."],
    "Lexin028575": ["Har du tjänstegrupplivförsäkring?", "هل لديك تأمين حياة الخدمة الجماعي؟"],
    "Lexin028576": ["Statlig tjänsteman.", "موظف حكومي."],
    "Lexin028581": ["Det råder tjänsteplikt.", "هناك واجب خدمة."],
    "Lexin028586": ["Lång och trogen tjänstgöring.", "خدمة طويلة ومخلصة."],
    "Lexin028589": ["Svart tjära.", "قار أسود."],
    "Lexin028590": ["Bada i en tjärn.", "يسبح في بحيرة صغيرة."],
    "Lexin028592": ["Gå på toa.", "يذهب للمرحاض."],
    "Lexin028595": ["Klädd i toalett.", "ترتدي ملابس السهرة."],
    "Lexin028597": ["Dyra toalettartiklar.", "مواد عناية شخصية غالية."],
    "Lexin028598": ["Slut på toalettpapper.", "نفد ورق المرحاض."],
    "Lexin028599": ["Packa en toalettväska.", "يحزم حقيبة العناية الشخصية."],
    "Lexin028600": ["Röka tobak.", "يدخن التبغ."],
    "Lexin028601": ["En toffel på foten.", "خف في القدم."],
    "Lexin028602": ["Mössa med tofs.", "قبعة بخصلة."],
    "Lexin028606": ["Han är en tok.", "هو أبله."],
    "Lexin028613": ["Anlita en tolk.", "يستعين بمترجم فوري."],
    "Lexin028620": ["Simultan tolkning.", "ترجمة فورية متزامنة."],
    "Lexin028621": ["En annan tolkning.", "تفسير آخر."],
    "Lexin028623": ["Beställa tolkservice.", "يطلب خدمة ترجمة."],
    "Lexin028627": ["Slå en tolva.", "يرمي رقم اثني عشر (بالنرد)."],
    "Lexin028631": ["Spela tombola.", "يلعب الطمبولا."],
    "Lexin028632": ["Panta tomglas.", "يعيد الزجاجات الفارغة."],
    "Lexin028633": ["Gå på tomgång.", "يدور على الفاضي (للمحرك) / بدون تقدم."],
    "Lexin028636": ["Köpa en tomt.", "يشتري قطعة أرض."],
    "Lexin028638": ["Tror du på tomten?", "هل تؤمن ببابا نويل؟"],
    "Lexin028639": ["Tända tomtebloss.", "يشعل فتاش."],
    "Lexin028641": ["Stå i tomtkö.", "يقف في طابور الأراضي."],
    "Lexin028642": ["Hus med tomträtt.", "منزل بحق استئجار الأرض."],
    "Lexin028644": ["Betala tomträttsavgäld.", "يدفع رسم استئجار الأرض."],
    "Lexin028655": ["Ett vänligt tonfall.", "نبرة صوت ودودة."],
    "Lexin028656": ["Fiska tonfisk.", "يصطاد التونة."],
    "Lexin028659": ["Fartyg med stort tonnage.", "سفينة بحمولة كبيرة."],
    "Lexin028661": ["Operera bort en tonsill.", "يستأصل اللوزة."],
    "Lexin028662": ["Känd tonsättare.", "ملحن مشهور."],
    "Lexin028663": ["Lägga tonvikt på.", "يؤكد على."],
    "Lexin028664": ["I de tidiga tonåren.", "في سنوات المراهقة المبكرة."],
    "Lexin028665": ["En bångstyrig tonåring.", "مراهق عنيد."],
    "Lexin028666": ["Markens topografi.", "طوبوغرافيا الأرض."],
    "Lexin028669": ["Snygg topp.", "بلوزة جميلة."],
    "Lexin028673": ["Har du topplån?", "هل لديك قرض إضافي؟"],
    "Lexin028675": ["Hålla toppmöte.", "يعقد اجتماع قمة."],
    "Lexin028680": ["Lida av torgskräck.", "يعاني av رهاب الخلاء."],
    "Lexin028681": ["Virket ligger i tork.", "الخشب في التجفيف."],
    "Lexin028686": ["Sitta under torkhuv.", "تجلس تحت خوذة التجفيف."],
    "Lexin028687": ["Hänga tvätt i torkskåp.", "يعلق الغسيل في خزانة التجفيف."],
    "Lexin028688": ["Torktumlare sparar tid.", "المجففة توفر الوقت."],
    "Lexin028691": ["Ett rött torp.", "كوخ أحمر صغير."],
    "Lexin028692": ["Fattig torpare.", "مزارع صغير فقير."],
    "Lexin028694": ["Skjuta en torped.", "يطلق طربيداً."],
    "Lexin028703": ["Fånga torsk.", "يصطاد سمك القد."],
    "Lexin028704": ["Polisen grep en torsk.", "قبضت الشرطة på زبون مومس."],
    "Lexin028705": ["En antik torso.", "جذع تمثال أثري."],
    "Lexin028711": ["Bryta torv.", "يستخرج الخث."],
    "Lexin028712": ["En grön torva.", "قطعة أرض عشبية."],
    "Lexin028717": ["Spela på totalisator.", "يراهن في التوتاليساتور."],
    "Lexin028720": ["Spela på toto.", "يلعب في التوتو."],
    "Lexin028721": ["Se en toto.", "يرى حصاناً."], // Childish
    "Lexin028722": ["En tott hår.", "خصلة شعر صغيرة."],
    "Lexin028724": ["En personlig touche.", "لمسة شخصية."],
    "Lexin028735": ["Oskyddad trafikant.", "مستخدم طريق غير محمي (مشاة/دراج)."],
    "Lexin028741": ["Teckna trafikförsäkring.", "يوقع تأمين مرور."],
    "Lexin028742": ["Han har trafikkort.", "لديه رخصة سياقة عمومية."],
    "Lexin028743": ["Tala med trafikledare.", "يتحدث مع منسق الطيران."],
    "Lexin028744": ["Rött trafikljus.", "إشارة مرور حمراء."],
    "Lexin028746": ["Följa trafikmärken.", "يتبع شاخصات المرور."],
    "Lexin028747": ["Gå i trafikskola.", "يذهب لمدرسة السياقة."],
    "Lexin028750": ["Akta dig för trafikvakt.", "احذر من مراقب الوقوف."],
    "Lexin028754": ["Det var en tragik.", "كانت مأساة."],
    "Lexin028756": ["Lastbil med trailer.", "شاحنة بمقطورة."],
    "Lexin028757": ["Se en trailer.", "يشاهد دعاية فيلم."],
    "Lexin028763": ["Få traktamente.", "يحصل á علاوة بدل سفر."],
    "Lexin028765": ["Skriva under ett traktat.", "يوقع معاهدة."],
    "Lexin028769": ["Köra traktor.", "يقود جراراً."],
    "Lexin028771": ["En glad trall.", "لحن مفرح."],
    "Lexin028772": ["Lägga trall på balkongen.", "يضع ألواح خشبية على الشرفة."],
    "Lexin028776": ["Höra tramp.", "يسمع صوت أقدام."],
    "Lexin028777": ["Trampa på pedalen.", "يدوس على الدواسة."], // "Trampa på trampan" is redundant but correct
    "Lexin028779": ["Hoppa från trampolin.", "يقفز من المنصة."],
    "Lexin028780": ["Sluta med ditt trams.", "توقف عن هراءك."],
    "Lexin028781": ["Trana dansar.", "يرقص طائر الكركي."],
    "Lexin028784": ["Göra en transfer.", "يقوم بتحويل مالي."],
    "Lexin028785": ["Transfer till hotellet.", "نقل إلى الفندق."],
    "Lexin028786": ["Dyr transfer.", "انتقال لاعب غالي."],
    "Lexin028788": ["Trasig transformator.", "محول تيار معطل."],
    "Lexin028789": ["Få en transfusion.", "يتلقى نقل دم."],
    "Lexin028790": ["Lyssna på transistor.", "يستمع للراديو الترانزستور."],
    "Lexin028791": ["En liten transistor.", "ترانزستور صغير."],
    "Lexin028792": ["Varor i transit.", "بضائع عبور (ترانزيت)."],
    "Lexin028794": ["Fonetisk transkription.", "تدوين صوتي."],
    "Lexin028796": ["Auktoriserad translator.", "مترجم محلف."],
    "Lexin028799": ["Kraftig transpiration.", "تعرق شديد."],
    "Lexin028800": ["Hjärttransplantation.", "زراعة قلب."]
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

const backupPath = DATA_FILE + '.backup_nouns75_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 75 completed!`);
