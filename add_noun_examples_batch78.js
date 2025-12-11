/**
 * Add examples to nouns - Batch 78 (100 nouns: Törst to Uppslagsord)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin029461": ["Känna törst.", "يشعر بالعطش."],
    "Lexin029465": ["En söt tös.", "فتاة لطيفة."],
    "Lexin029466": ["Det blir töväder.", "سيصبح الجو دافئاً (مذيباً للثلوج)."],
    "Lexin029467": ["Öka u-hjälpen.", "يزيد مساعدة الدول النامية."],
    "Lexin029468": ["Fattigt u-land.", "دولة نامية فقيرة."],
    "Lexin029469": ["Göra en U-sväng.", "يقوم بلفة على شكل حرف U."],
    "Lexin029470": ["Kärnvapendriven ubåt.", "غواصة نووية."],
    "Lexin029472": ["Udden av en nål.", "رأس إبرة."],
    "Lexin029475": ["Huset på udden.", "المنزل على الرعن (اللسان البحري)."],
    "Lexin029481": ["Varm ullstrumpa.", "جورب صوفي دافئ."],
    "Lexin029488": ["Ulv i fårakläder.", "ذئب في ثياب حمل."],
    "Lexin029497": ["Tviste om umgängesrätt.", "نزاع حول حق المقابلة."],
    "Lexin029514": ["Begära undantagande från ATP.", "يطلب استثناء من نظام التقاعد الإضافي."],
    "Lexin029515": ["Utlysa undantagstillstånd.", "يعلن حالة الطوارئ."],
    "Lexin029527": ["Musikaliskt underbarn.", "طفل موسيقي معجزة."],
    "Lexin029533": ["Rena underbyxor.", "سراويل داخلية نظيفة."],
    "Lexin029543": ["Gå genom undergången.", "يمر عبر الممشى السفلي."],
    "Lexin029552": ["Husets underhåll.", "صيانة المنزل."],
    "Lexin029553": ["Betala underhåll.", "يدفع نفقة."],
    "Lexin029560": ["Lätt underhållning.", "ترفيه خفيف."],
    "Lexin029561": ["Höjt underhållsbidrag.", "نفقة طفل زائدة."],
    "Lexin029564": ["Ha underhållsskyldighet.", "لديه واجب النفقة."],
    "Lexin029574": ["Vara i underkant.", "يكون في الحد الأدنى (أقل مما ينبغي)."],
    "Lexin029576": ["Total underkastelse.", "خضوع تام."],
    "Lexin029590": ["Ont i underlivet.", "ألم في الأعضاء التناسلية."],
    "Lexin029599": ["Ett mjukt underlägg.", "واقية طرية (تحت الطبق)."],
    "Lexin029607": ["Dö av undernäring.", "يموت من نقص التغذية."],
    "Lexin029612": ["Rostigt underrede.", "قاعدة (هيكل) سيارة صدئة."],
    "Lexin029613": ["Döma i underrätt.", "يحكم في المحكمة البدائية."],
    "Lexin029615": ["Få underrättelse om.", "يتلقى إشعاراً بـ."],
    "Lexin029618": ["Jobba för underrättelsetjänsten.", "يعمل لصالح المخابرات."],
    "Lexin029622": ["Budget med underskott.", "ميزانية بعجز."],
    "Lexin029629": ["Det var ett understatement.", "كان تصريحاً مكبوحاً (أقل من الحقيقة)."],
    "Lexin029631": ["Använda understreck.", "يستخدم خط التوكيد (_)."],
    "Lexin029632": ["Skriva en understreckare.", "يكتب مقالاً ثقافياً طويلاً."],
    "Lexin029634": ["Göra en understrykning.", "يضع خطاً تحت الكلمة."],
    "Lexin029637": ["Få statligt understöd.", "يحصل على دعم حكومي."],
    "Lexin029641": ["Kungens undersåte.", "رعية الملك."],
    "Lexin029655": ["Vit undertröja.", "فانلة بيضاء."],
    "Lexin029659": ["Undervisning i svenska.", "تدريس اللغة السويدية."],
    "Lexin029672": ["En grön undulat.", "ببغاء أسترالية خضراء."],
    "Lexin029696": ["Placeras på ungdomsvårdsskola.", "يوضع في مدرسة رعاية الشباب (إصلاحية)."],
    "Lexin029697": ["En busig unge.", "طفل شقي."],
    "Lexin029698": ["Kattens ungar.", "صغار القطة."],
    "Lexin029702": ["Gammal ungkarl.", "عازب عجوز."],
    "Lexin029703": ["Bo på ungkarlshotell.", "يسكن في فندق العزاب."],
    "Lexin029704": ["Han är ungrare.", "هو مجري."],
    "Lexin029707": ["Bära uniform.", "يرتدي بزة نظامية."],
    "Lexin029710": ["Europeiska unionen.", "الاتحاد الاوروبي."],
    "Lexin029713": ["Vara universalarvinge.", "يكون وريثاً وحيداً."],
    "Lexin029714": ["Tror på ett universalmedel.", "يؤمن بدواء عام (لكل شيء)."],
    "Lexin029720": ["Universums uppkomst.", "نشأة الكون."],
    "Lexin029723": ["Inte ett uns sanning.", "ولا ذرة (فتات) حقيقة."],
    "Lexin029731": ["Anläggning för upparbetning.", "منشأة لمعالجة الوقود النووي."],
    "Lexin029732": ["Kalla på uppassaren.", "ينادي الخادم/النادل."],
    "Lexin029733": ["Det var dålig uppassning.", "كانت الخدمة سيئة."],
    "Lexin029734": ["Få uppbackning av chefen.", "يحصل على دعم المدير."],
    "Lexin029747": ["Mötas av ett uppbåd.", "يواجه بحشد."],
    "Lexin029750": ["Uppbörd av skatt.", "جباية الضرائب."],
    "Lexin029756": ["Göra en uppdelning.", "يقوم بتقسيم."],
    "Lexin029768": ["Det är uppehåll i regnet.", "توقف المطر (جو غير ماطر)."],
    "Lexin029769": ["Få permanent uppehållstillstånd.", "يحصل على إقامة دائمة."],
    "Lexin029788": ["Köra in på uppfarten.", "يقود إلى المسار (أمام المنزل)."],
    "Lexin029791": ["Ha en annan uppfattning.", "لديه وجهة نظر (تفهّم) مختلفة."],
    "Lexin029796": ["Få en god uppfostran.", "يتلقى تربية جيدة."],
    "Lexin029798": ["Diskutera uppfostringsmetoder.", "يناقش أساليب التربية."],
    "Lexin029804": ["Hunduppfödare.", "مربي كلاب."],
    "Lexin029805": ["Filmens uppföljare.", "الجزء اللاحق للفيلم."],
    "Lexin029814": ["Bejublat uppförande.", "تقديم (أداء) لاقى استحساناً."],
    "Lexin029816": ["Cykla i uppförsbacke.", "يركب الدراجة في طلعة."],
    "Lexin029825": ["Stå i uppgången.", "يقف في المدخل (بيت الدرج)."],
    "Lexin029832": ["Hittelön till upphittaren.", "مكافأة للمكتشف (لمن وجد الشيء)."],
    "Lexin029835": ["Vara upphov till.", "يكون سبباً لـ."],
    "Lexin029837": ["Skyddad av upphovsrätt.", "محمي بحق النشر."],
    "Lexin029840": ["Vara på upphällningen.", "يكون على وشك النفاد."],
    "Lexin029852": ["En rik uppkomling.", "محدث نعمة غني."],
    "Lexin029859": ["Klara uppkörningen.", "ينجح في امتحان السواقة."],
    "Lexin029862": ["Förvara i upplag.", "يحفظ في مخزن."],
    "Lexin029863": ["Bokens första upplaga.", "الطبعة الأولى للكتاب."],
    "Lexin029871": ["Stoppa upploppet.", "يوقف الشغب."],
    "Lexin029872": ["Spurta på upploppet.", "يسرع في مسافة نهاية السباق."],
    "Lexin029889": ["Taktisk uppläggning.", "تخطيط تكتيكي."],
    "Lexin029890": ["Nyheternas uppläsare.", "قارئ الأخبار (خطيب)."],
    "Lexin029895": ["Vara i upplösningstillstånd.", "يكون في حالة انحلال."],
    "Lexin029899": ["Göra uppmjukning.", "يقوم بتمارين التليين."],
    "Lexin029912": ["Politisk upprensning.", "تطهير سياسي."],
    "Lexin029914": ["Det var en upprepning.", "كانت تلك إعادة."],
    "Lexin029918": ["Göra upprop.", "يقوم بمناداة الأسماء."],
    "Lexin029920": ["Starta ett uppror.", "يبدأ تمرداً."],
    "Lexin029924": ["Militär upprustning.", "حشد تسلح عسكري."],
    "Lexin029925": ["Upprustning av huset.", "ترميم المنزل."],
    "Lexin029928": ["Göra en uppryckning.", "يحسن أداءه."],
    "Lexin029930": ["Lång uppräkning.", "سرد (حساب) طويل."],
    "Lexin029937": ["Få upprättelse.", "يحصل على إنصاف."],
    "Lexin029946": ["Skriva en uppsats.", "يكتب موضوع إنشاء."],
    "Lexin029952": ["En uppsjö av varor.", "كمية كبيرة من البضائع."],
    "Lexin029970": ["Ett helt uppslag.", "صفحتان متقابلتان كاملتان."],
    "Lexin029971": ["Byxans uppslag.", "ثنية البنطلون."],
    "Lexin029972": ["Slå i en uppslagsbok.", "يبحث في موسوعة."],
    "Lexin029973": ["Söka på uppslagsord.", "يبحث عن كلمة مفتاحية."]
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

const backupPath = DATA_FILE + '.backup_nouns78_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 78 completed!`);
