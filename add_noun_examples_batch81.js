/**
 * Add examples to nouns - Batch 81 (100 nouns: Vattenklosett to Vippen)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin030788": ["Installera vattenklosett.", "يركب دورة مياه."],
    "Lexin030789": ["Barnen har vattenkoppor.", "الأطفال لديهم جدري الماء."],
    "Lexin030790": ["Utvinna vattenkraft.", "يستخرج طاقة مائية."],
    "Lexin030791": ["Äta vattenkrasse.", "يأكل الرشاد."],
    "Lexin030799": ["Råka ut för vattenplaning.", "يتعرض لانزلاق مائي."],
    "Lexin030802": ["Åka vattenskidor.", "يتزلج على الماء."],
    "Lexin030803": ["Högt vattenstånd.", "مستوى مياه مرتفع."],
    "Lexin030806": ["Jobba på vattenverket.", "يعمل في مصلحة المياه."],
    "Lexin030811": ["Forma i vax.", "يشكل في الشمع."],
    "Lexin030813": ["En rutig vaxduk.", "قماش مشمع مربعات."],
    "Lexin030817": ["Ack och ve!", "يا ويلاه!"],
    "Lexin030824": ["Få sin veckopeng.", "يحصل على مصروفه الأسبوعي."],
    "Lexin030825": ["Trevligt veckoslut.", "عطلة نهاية أسبوع ممتعة."],
    "Lexin030826": ["Läsa en veckotidning.", "يقرأ مجلة أسبوعية."],
    "Lexin030828": ["Hugga ved.", "يقطع الحطب."],
    "Lexin030829": ["Lägga ved i vedboden.", "يضع الحطب في كوخ الحطب."],
    "Lexin030833": ["Kräva vedergällning.", "يطلب الانتقام."],
    "Lexin030836": ["Få skäligt vederlag.", "يحصل على تعويض معقول."],
    "Lexin030846": ["Ett torrt vedträ.", "قطعة حطب جافة."],
    "Lexin030848": ["Jag är vegetarian.", "أنا نباتي."],
    "Lexin030851": ["Frodig vegetation.", "غطاء نباتي كثيف."],
    "Lexin030855": ["Tända veken.", "يشعل الفتيل."],
    "Lexin030862": ["Fylld av vemod.", "مليء بالحزن (الشجن)."],
    "Lexin030865": ["En synlig ven.", "وريد ظاهر."],
    "Lexin030869": ["Öppna ventilen.", "يفتح الصمام."],
    "Lexin030870": ["Dålig ventilation.", "تهوية سيئة."],
    "Lexin030876": ["Böja ett verb.", "يصرف فعلاً."],
    "Lexin030879": ["Spara verifikationen.", "يحفظ الإيصال."],
    "Lexin030884": ["Verk och anläggningar.", "مصانع ومنشآت."],
    "Lexin030885": ["Klockans verk.", "آلية الساعة."],
    "Lexin030900": ["Tala med verkmästaren.", "يتحدث مع رئيس الورشة."],
    "Lexin030907": ["Skriva verksamhetsberättelse.", "يكتب تقرير الأعمال السنوي."],
    "Lexin030911": ["Ute på verkstadsgolvet.", "في أرض الورشة."],
    "Lexin030913": ["Gå med i verkstadsklubben.", "ينضم لنقابة العمال."],
    "Lexin030918": ["Domens verkställighet.", "تنفيذ الحكم."],
    "Lexin030924": ["Gå på vernissage.", "يحضر افتتاح معرض فني."],
    "Lexin030926": ["Skriva vers.", "ينظم الشعر."],
    "Lexin030927": ["Skriva med versaler.", "يكتب بأحرف كبيرة."],
    "Lexin030930": ["Snabb som en vessla.", "سريع كابن عرس."],
    "Lexin030931": ["Vänta i vestibulen.", "ينتظر في الردهة."],
    "Lexin030935": ["Odla vete.", "يزرع القمح."],
    "Lexin030939": ["Han är en veteran.", "هو مخضرم."],
    "Lexin030941": ["Ringa en veterinär.", "يتصل بطبيب بيطري."],
    "Lexin030953": ["Köra som en vettvilling.", "يقود كمجنون."],
    "Lexin030954": ["Veva med veven.", "يدير بذراع التدوير."],
    "Lexin030959": ["Köra över viadukten.", "يقود فوق القنطرة."],
    "Lexin030960": ["Känna vibrationer.", "يشعر باهتزازات."],
    "Lexin030970": ["Äta vickning.", "يأكل وجبة ليلية خفيفة."],
    "Lexin030986": ["Gå en vidareutbildning.", "يتابع تعليماً تكميلياً."],
    "Lexin030990": ["Hela vidden av problemet.", "حجم المشكلة الكامل."],
    "Lexin030991": ["Korg av vide.", "سلة صفصاف."],
    "Lexin030992": ["Se en video.", "يشاهد فيديو."],
    "Lexin030993": ["Gammal videobandspelare.", "جهاز فيديو قديم."],
    "Lexin030999": ["För mitt vidkommande.", "بالنسبة لي."],
    "Lexin031007": ["Bara vidskepelse.", "مجرد خرافة."],
    "Lexin031013": ["Ett fult vidunder.", "وحش قبيح."],
    "Lexin031017": ["Han är vietnames.", "هو فيتنامي."],
    "Lexin031019": ["Vara ute på vift.", "يكون خارجاً (للمرح)."],
    "Lexin031024": ["Borgerlig vigsel.", "زواج مدني."],
    "Lexin031031": ["En skyddad vik.", "خليج محمي."],
    "Lexin031032": ["Ge vika.", "يستسلم/ينهار."],
    "Lexin031033": ["Få ett vikariat.", "يحصل على وظيفة مؤقتة."],
    "Lexin031034": ["Jobba som vikarie.", "يعمل كبديل."],
    "Lexin031039": ["Vikingarnas skepp.", "سفن الفايكنج."],
    "Lexin031055": ["Leva som en vilde.", "يعيش كبدائي (وحشي)."],
    "Lexin031056": ["Politisk vilde.", "سياسي مستقل (غير حزبي)."],
    "Lexin031061": ["Få sin viljes.", "يحصل على مراده."],
    "Lexin031063": ["Ha viljestyrka.", "يمتلك قوة إرادة."],
    "Lexin031070": ["Köpa en villa.", "يشتري فيلا."],
    "Lexin031071": ["Leda i villa.", "يضلل."],
    "Lexin031073": ["Falla offer som villebråd.", "يسقط فريسة سهلة."],
    "Lexin031074": ["Det blev villervalla.", "حدثت فوضى."],
    "Lexin031088": ["Leda in på villospår.", "يضلل (يقود لمسار خاطئ)."],
    "Lexin031097": ["Sitta i en vilstol.", "يجلس i كرسي استرخاء."],
    "Lexin031099": ["Jaga vilt.", "يصطاد حيوانات برية."],
    "Lexin031100": ["Råka ut för en viltolycka.", "يصطدم بحيوان بري."],
    "Lexin031102": ["Försvinna i vimlet.", "يختفي في الزحام."],
    "Lexin031104": ["Hissa en vimpel.", "يرفع راية."],
    "Lexin031111": ["Leka på vinden.", "يلعب في العلية."],
    "Lexin031114": ["Vända sig som en vindflöjel.", "يدور مثل ديك الرياح (يغير رأيه)."],
    "Lexin031115": ["Satsa på vindkraft.", "يستثمر في طاقة الرياح."],
    "Lexin031119": ["Sura vindruvor.", "عنب حامض."],
    "Lexin031123": ["Fågelns vinge.", "جناح الطائر."],
    "Lexin031129": ["Mäta med vinkelhake.", "يقيس بمثلث الزوايا."],
    "Lexin031130": ["Inom vinkelparentes.", "بين زاويتي حصر."],
    "Lexin031135": ["Be om vinlistan.", "يطلب قائمة النبيذ."],
    "Lexin031139": ["En lycklig vinnare.", "فائز سعيد."],
    "Lexin031143": ["Göra en vinning.", "يحقق مكسباً."],
    "Lexin031146": ["Beskära vinrankor.", "يقلم دوالي العنب."],
    "Lexin031147": ["Söka vinrättighet.", "يطلب رخصة نبيذ."],
    "Lexin031148": ["Dra med vinsch.", "يسحب بالرافعة."],
    "Lexin031160": ["Träd i vinterskrud.", "أشجار بحلة الشتاء."],
    "Lexin031162": ["Snabb vinthund.", "كلب سلوقي سريع."],
    "Lexin031163": ["I vintras.", "في الشتاء الماضي."],
    "Lexin031164": ["Skiva av vinyl.", "اسطوانة فينيل."],
    "Lexin031166": ["Blå viol.", "زهرة بنفسج زرقاء."],
    "Lexin031168": ["Spela violin.", "يعزف كمان."],
    "Lexin031169": ["Spela violoncell.", "يعزف تشيلو."],
    "Lexin031171": ["En vippa.", "نِفاشة."],
    "Lexin031174": ["På vippen.", "على وشك."]
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

const backupPath = DATA_FILE + '.backup_nouns81_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 81 completed!`);
