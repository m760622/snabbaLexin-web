/**
 * Add examples to nouns - Batch 74 (100 nouns: Test to Tjuv)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin028162": ["En test hår.", "خصلة من الشعر."],
    "Lexin028172": ["Undersöka en testikel.", "يفحص خصية."],
    "Lexin028180": ["Sångens text.", "نص الأغنية."],
    "Lexin028181": ["Läsa Text-TV.", "يقرأ نصوص التلفزيون."],
    "Lexin028184": ["Slitstark textil.", "نسيج متين."],
    "Lexin028185": ["Många olika textilier.", "منسوجات كثيرة مختلفة."],
    "Lexin028190": ["Röntgen av thorax.", "أشعة للصدر."],
    "Lexin028191": ["Se en thriller.", "يشاهد فيلماً مثيراً."],
    "Lexin028192": ["Nummer tia.", "رقم عشرة."],
    "Lexin028193": ["Betala med en tia.", "يدفع بقطعة عشر كرونات."],
    "Lexin028195": ["Bära tiara.", "ترتدي تاجاً مرصعاً."],
    "Lexin028196": ["Han har ett tic.", "لديه حركة لا إرادية."],
    "Lexin028198": ["Klockans ticktack.", "تكتكة الساعة."],
    "Lexin028200": ["Ett helt tidevarv.", "عصر كامل."],
    "Lexin028203": ["Ha tidlön.", "يتقاضى راتباً زمنياً."],
    "Lexin028206": ["Det var en tidningsanka.", "كانت معلومة صحفية زائفة."],
    "Lexin028210": ["Under en kort tidrymd.", "خلال فترة زمنية قصيرة."],
    "Lexin028212": ["Fånga tidsandan.", "يصور مشاعر العصر."],
    "Lexin028220": ["Det är en tidsfråga.", "إنها مسألة وقت."],
    "Lexin028221": ["Som tidsfördriv.", "كتسلية."],
    "Lexin028222": ["Politisk tidskrift.", "مجلة سياسية دورية."],
    "Lexin028226": ["Vänta på tidssignalen.", "ينتظر الإشارة الزمنية."],
    "Lexin028228": ["Göra en tidsstudie.", "يقوم بقياس الفعالية الزمنية."],
    "Lexin028229": ["Istiden är en tidsålder.", "العصر الجليدي هو حقبة زمنية."],
    "Lexin028231": ["Kolla tidtabellen.", "يفحص جدول المواعيد."],
    "Lexin028232": ["Tävlingens tidtagare.", "ضابط وقت السباق."],
    "Lexin028233": ["Högt tidvatten.", "مد مرتفع."],
    "Lexin028235": ["Farlig tiger.", "نمر خطير."],
    "Lexin028241": ["Tala tigrinska.", "يتحدث التيغرينية."],
    "Lexin028242": ["En liten tik.", "كلبة صغيرة."],
    "Lexin028243": ["Tecknet tilde.", "علامة التلدة."],
    "Lexin028244": ["Halkig tilja.", "لوح أرضية زلق."],
    "Lexin028262": ["Ekonomisk tillbakagång.", "تراجع اقتصادي."],
    "Lexin028266": ["Tillbehör till bilen.", "أكسسوارات للسيارة."],
    "Lexin028268": ["Världens tillblivelse.", "خلق العالم."],
    "Lexin028270": ["Hälla ur en tillbringare.", "يصب من إبريق."],
    "Lexin028271": ["Ett farligt tillbud.", "حادثة وشيكة خطيرة."],
    "Lexin028276": ["Få sin tilldelning.", "يحصل على حصته."],
    "Lexin028278": ["En märklig tilldragelse.", "حدث غريب."],
    "Lexin028284": ["Blockera en tillfart.", "يغلق طريق دخول."],
    "Lexin028287": ["Söka en tillflyktsort.", "يبحث عن ملاذ."],
    "Lexin028311": ["Tillförsel av blod.", "إمداد بالدم."],
    "Lexin028320": ["Dömd för tillgrepp.", "مدان بالسرقة."],
    "Lexin028337": ["Använda ett tillhygge.", "يستخدم سلاحاً مؤقتاً."],
    "Lexin028338": ["Tjuvarnas tillhåll.", "مخبأ اللصوص."],
    "Lexin028344": ["Ha tillit till.", "لديه ثقة بـ."],
    "Lexin028355": ["Fula tillmälen.", "شتائم قبيحة."],
    "Lexin028359": ["Hennes tillnamn.", "كنيتها."],
    "Lexin028360": ["Få ett tillnamn.", "يحصل على اسم شهرة (لقب)."],
    "Lexin028381": ["Idéns tillskyndare.", "المبادر بالفكرة."],
    "Lexin028382": ["Arbeta som tillskärare.", "يعمل كقصاص أقمشة."],
    "Lexin028385": ["Stor tillströmning.", "تدفق كبير."],
    "Lexin028397": ["Få tillsvidareanställning.", "يحصل على وظيفة دائمة."],
    "Lexin028403": ["Vara tillsynslärare.", "يكون مدرس إشراف."],
    "Lexin028409": ["Dumt tilltag.", "مزحة بائخة."],
    "Lexin028413": ["Den tilltalade nekade.", "أنكر المتهم."],
    "Lexin028417": ["Mitt tilltalsnamn.", "اسمي الأول."],
    "Lexin028425": ["Öl och tilltugg.", "بيرة ومازة."],
    "Lexin028428": ["Göra ett tillval.", "يقوم باختيار إضافي."],
    "Lexin028435": ["Industriell tillverkning.", "تصنيع صناعي."],
    "Lexin028439": ["Välja tillvägagångssätt.", "يختار طريقة التصرف."],
    "Lexin028440": ["Det krävs tillvänjning.", "يتطلب الأمر تعوداً."],
    "Lexin028462": ["Sätta på timer.", "يضبط المؤقت."],
    "Lexin028463": ["Krydda med timjan.", "يتبل بالزعتر."],
    "Lexin028465": ["Såga timmer.", "ينشر الخشب الخام."],
    "Lexin028466": ["Duktig timmerman.", "نجار ماهر."],
    "Lexin028467": ["Bra timpenning.", "أجر ساعة جيد."],
    "Lexin028472": ["Hålla ting.", "يعقد جلسة محكمة."],
    "Lexin028473": ["Massa tingeltangel.", "الكثير من الحلي الرخيصة."],
    "Lexin028474": ["Konstig tingest.", "شيء عجيب."],
    "Lexin028476": ["Döma i tingsrätt.", "يحكم في المحكمة الابتدائية."],
    "Lexin028480": ["Tornets tinne.", "شرفة البرج."],
    "Lexin028482": ["Slå sig på tinningen.", "يضرب صدغه."],
    "Lexin028487": ["Låna en tiokrona.", "يستعير عشر كرونات."],
    "Lexin028489": ["En tiondel kvar.", "بقي العشر."],
    "Lexin028490": ["Näsan tipp.", "طرف الأنف."],
    "Lexin028491": ["Köra till tippen.", "يقود إلى المزبلة."],
    "Lexin028492": ["Bil med tipp.", "سيارة بقلاب."],
    "Lexin028500": ["Tissel och tassel.", "همس ونميمة."],
    "Lexin028502": ["Stack sig på en tistel.", "وخز نفسه بخرقيش."],
    "Lexin028503": ["Akademisk titel.", "لقب أكاديمي."],
    "Lexin028504": ["Bokens titel.", "عنوان الكتاب."],
    "Lexin028505": ["Spela titelrollen.", "يلعب دور البطولة (العنوان)."],
    "Lexin028512": ["Många tittare.", "مشاهدون كثر."],
    "Lexin028516": ["Gå på tivoli.", "يذهب لمدينة الملاهي."],
    "Lexin028518": ["Köpa tjack.", "يشتري مخدرات."],
    "Lexin028519": ["Sluta med ditt tjafs.", "توقف عن نكدك (ثرثرتك)."],
    "Lexin028522": ["Han är en tjallare.", "هو واش."],
    "Lexin028523": ["Bara massa tjat.", "مجرد نق."],
    "Lexin028527": ["Apornas tjatter.", "نقيق القرود."],
    "Lexin028529": ["Han är tjeck.", "هو تشيكي."],
    "Lexin028531": ["En snygg tjej.", "فتاة جميلة."],
    "Lexin028535": ["Tjocka på havet.", "ضباب في البحر."],
    "Lexin028536": ["Din tjockis.", "يا سمين."],
    "Lexin028537": ["Isens tjocklek.", "سماكة الجليد."],
    "Lexin028540": ["Ett tjog ägg.", "عشرون بيضة."],
    "Lexin028542": ["Slita sig från tjuder.", "يفلت من الرسن."],
    "Lexin028546": ["Stark tjur.", "ثور قوي."],
    "Lexin028552": ["Ett gällt tjut.", "صرخة مدوية."],
    "Lexin028554": ["Stoppa tjuven!", "أوقفوا اللص!"]
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

const backupPath = DATA_FILE + '.backup_nouns74_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 74 completed!`);
