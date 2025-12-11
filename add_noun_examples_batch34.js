/**
 * Add examples to nouns - Batch 34 (100 nouns: Kolonistuga to Konstapel)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin014416": ["Kolonistugan målades.", "طُلي الكوخ الزراعي."],
    "Lexin014417": ["Kolonnen bar taket.", "حمل العمود الداعم السقف."],
    "Lexin014418": ["Kolonnen marscherade.", "سار الطابور."],
    "Lexin014420": ["Kolossen var enorm.", "كان العملاق ضخماً."],
    "Lexin014423": ["Koloxid är giftig.", "أكسيد الكربون سام."],
    "Lexin014426": ["Kolsyran bubblade.", "فار حامض الكربونيك."],
    "Lexin014428": ["Kolumnen lästes.", "قُرئ العمود."],
    "Lexin014429": ["Kolven rörde sig.", "تحركت الأسطوانة."],
    "Lexin014430": ["Kolven hölls stadigt.", "أُمسك المقبض بثبات."],
    "Lexin014431": ["Kolven värmdes.", "سُخنت المعوجة."],
    "Lexin014432": ["Kolven mognade.", "نضج الكوز."],
    "Lexin014434": ["Koman var djup.", "كان السبات العميق عميقاً."],
    "Lexin014440": ["Komedin var rolig.", "كانت الكوميديا مضحكة."],
    "Lexin014441": ["Kometen syntes.", "ظهر المذنب."],
    "Lexin014442": ["Komforten var hög.", "كانت الراحة عالية."],
    "Lexin014444": ["Komikern skämtade.", "مزح الكوميدي."],
    "Lexin014446": ["Kommat sattes.", "وُضعت الفاصلة."],
    "Lexin014453": ["Kommandot gavs.", "أُعطي الأمر."],
    "Lexin014454": ["Kommandot attackerade.", "هاجمت فرقة الصاعقة."],
    "Lexin014456": ["Kommentaren lästes.", "قُرئ التعليق."],
    "Lexin014457": ["Kommentatorn analyserade.", "حلل المعلق."],
    "Lexin014470": ["Kommersen ökade.", "زادت التجارة."],
    "Lexin014472": ["Komministern predikade.", "وعظ الخوري."],
    "Lexin014473": ["Kommissarien utredde.", "حقق المفوض."],
    "Lexin014474": ["Kommissionen beslutade.", "قررت اللجنة."],
    "Lexin014475": ["Kommissionen betalades.", "دُفع القومسيون."],
    "Lexin014477": ["Kommittén sammanträdde.", "اجتمعت اللجنة."],
    "Lexin014484": ["Kommunal rösträtt beviljades.", "مُنح حق التصويت البلدي."],
    "Lexin014491": ["Kommunalrådet talade.", "تحدث مستشار البلدية."],
    "Lexin014493": ["Kommunalskatten betalades.", "دُفعت ضريبة البلدية."],
    "Lexin014495": ["Kommunalvalet hölls.", "أُقيمت الانتخابات البلدية."],
    "Lexin014497": ["Kommunfullmäktige röstade.", "صوت مجلس البلدية."],
    "Lexin014502": ["Kommunikationen förbättrades.", "تحسنت الاتصالات."],
    "Lexin014507": ["Kommunikationsmedlet användes.", "استُخدمت وسائل المواصلات."],
    "Lexin014509": ["Kommunikén publicerades.", "نُشر البلاغ الرسمي."],
    "Lexin014510": ["Kommunismen diskuterades.", "نوقشت الشيوعية."],
    "Lexin014511": ["Kommunisten demonstrerade.", "تظاهر الشيوعي."],
    "Lexin014514": ["Kommunstyrelsen beslutade.", "قرر مجلس إدارة البلدية."],
    "Lexin014516": ["Kompet var bra.", "كانت المصاحبة جيدة."],
    "Lexin014519": ["Kompaktskivan spelades.", "شُغل القرص المدمج."],
    "Lexin014521": ["Kompaniet marscherade.", "سارت السرية."],
    "Lexin014524": ["Kompanjonen investerade.", "استثمر الشريك."],
    "Lexin014526": ["Komparationen lärdes.", "تعلم التفضيل."],
    "Lexin014528": ["Kompendiet lästes.", "قُرئت الخلاصة الوافية."],
    "Lexin014529": ["Kompensationen gavs.", "أُعطي التعويض."],
    "Lexin014532": ["Kompetensen krävdes.", "طُلب التأهيل."],
    "Lexin014539": ["Komplementet adderades.", "أُضيفت التكملة."],
    "Lexin014549": ["Komplexet byggdes.", "بُني المجمع."],
    "Lexin014553": ["Komplikationen uppstod.", "نشأ التعقيد."],
    "Lexin014556": ["Komplotten avslöjades.", "اكتُشفت المؤامرة."],
    "Lexin014561": ["Kompositionen spelades.", "عُزف اللحن الموسيقي."],
    "Lexin014562": ["Kompositionen analyserades.", "حُللت التركيبة."],
    "Lexin014563": ["Kompositören skapade.", "أبدع الملحن."],
    "Lexin014564": ["Kompotten serverades.", "قُدم الكومبوت."],
    "Lexin014565": ["Kompressen applicerades.", "وُضعت الضمادة."],
    "Lexin014572": ["Kompromissen nåddes.", "تحققت التسوية."],
    "Lexin014578": ["Koncentrationen var hög.", "كان التركيز عالياً."],
    "Lexin014579": ["Koncentrationen krävdes.", "طُلب الانتباه المركز."],
    "Lexin014580": ["Koncentrationslägret stängdes.", "أُغلق معسكر الاعتقال."],
    "Lexin014586": ["Konceptet skrevs.", "كُتب المفهوم."],
    "Lexin014587": ["Konceptet presenterades.", "قُدم المفهوم."],
    "Lexin014590": ["Koncernen expanderade.", "توسعت مجموعات الشركات."],
    "Lexin014592": ["Koncessionen beviljades.", "مُنح حق الامتياز."],
    "Lexin014594": ["Kondensen torkades.", "جُفف التكثيف."],
    "Lexin014598": ["Kondisen förbättrades.", "تحسنت اللياقة البدنية."],
    "Lexin014599": ["Kondisen besöktes.", "زُير مطعم الحلويات."],
    "Lexin014603": ["Konditorn bakade.", "خبز خباز الحلوى."],
    "Lexin014604": ["Konditoriet öppnade.", "فتح دكان الحلوى."],
    "Lexin014605": ["Kondomen användes.", "استُخدم الكبود."],
    "Lexin014607": ["Konduktören kontrollerade.", "فحص بائع التذاكر."],
    "Lexin014609": ["Konfekten smakades.", "تُذوقت الحلوى الفاخرة."],
    "Lexin014610": ["Konfektionen såldes.", "بيعت تجارة المنسوجات."],
    "Lexin014611": ["Konferenciern presenterade.", "قدم عميد الحفل."],
    "Lexin014612": ["Konferensen hölls.", "عُقد المؤتمر."],
    "Lexin014615": ["Konfessionen respekterades.", "احتُرمت الملة."],
    "Lexin014616": ["Konfettin kastades.", "رُميت قصاصات الورق الملون."],
    "Lexin014618": ["Konfirmanden förbereddes.", "أُعد مرشح تثبيت العماد."],
    "Lexin014619": ["Konfirmationen hölls.", "أُقيم تثبيت العماد."],
    "Lexin014620": ["Konfirmationsundervisningen gavs.", "أُعطي تعليم التثبيت."],
    "Lexin014626": ["Konformismen kritiserades.", "انتُقدت المطابقة."],
    "Lexin014627": ["Konfrontationen skedde.", "حدثت المواجهة."],
    "Lexin014635": ["Kongressen sammanträdde.", "انعقد المؤتمر."],
    "Lexin014636": ["Konjaken serverades.", "قُدم الكونياك."],
    "Lexin014637": ["Konjunktionen användes.", "استُخدمت كلمة الوصل."],
    "Lexin014638": ["Konjunkturen förbättrades.", "تحسن الوضع الاقتصادي."],
    "Lexin014642": ["Konklusionen drogs.", "اسُتنتج الاستنتاج."],
    "Lexin014644": ["Konkurrensen var hård.", "كانت المنافسة شديدة."],
    "Lexin014652": ["Konkurrenten vann.", "فاز المنافس."],
    "Lexin014656": ["Konkursen anmäldes.", "أُعلن الإفلاس."],
    "Lexin014670": ["Konseljen hölls.", "عُقد اجتماع الحكومة."],
    "Lexin014672": ["Konserten framfördes.", "قُدم الكونسرت."],
    "Lexin014674": ["Konserven öppnades.", "فُتح المعلب."],
    "Lexin014675": ["Konservatismen diskuterades.", "نوقشت أيديولوجية المحافظة."],
    "Lexin014679": ["Konservatorn restaurerade.", "رمم الصائن."],
    "Lexin014682": ["Konservöppnaren användes.", "استُخدمت فتاحة العلب."],
    "Lexin014684": ["Konsolen monterades.", "رُكب الحامل."],
    "Lexin014686": ["Konsonanten uttalades.", "نُطق الحرف الساكن."],
    "Lexin014687": ["Konspirationen avslöjades.", "اكتُشفت المؤامرة."],
    "Lexin014690": ["Konsten uppskattades.", "قُدر العمل الفني."],
    "Lexin014693": ["Konstapeln patrullerade.", "قام الشرطي بدورية."]
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

const backupPath = DATA_FILE + '.backup_nouns34_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3400 nouns!`);
